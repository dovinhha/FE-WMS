import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
  FormGroup,
  Button,
  Input,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import { accountActions } from "Redux/Actions";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "common";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";

const FormAccount = ({
  formModalChangePassword,
  setFormModalChangePassword,
  account,
  notificationAlertRef,
}) => {
  const { isConfigPasswordAccount } = useSelector(
    (state) => state.accountReducer
  );
  const [changed, setChanged] = useState({
    newPassword: false,
    reNewPassword: false,
  });
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [errReNewPasswordMessage, setErrReNewPasswordMessage] = useState("");
  const handleSubmit = () => {
    if (
      errReNewPasswordMessage !== "" ||
      !changed.newPassword ||
      !changed.reNewPassword ||
      newPassword === "" ||
      reNewPassword === ""
    ) {
      setChanged({
        newPassword: true,
        reNewPassword: true,
      });
      return;
    }
    dispatch(
      accountActions.configPasswordAccount(
        { userId: account.id, password: newPassword },
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Thiết lập mật khẩu tài khoản ${account.email} thành công!`
            );
            setFormModalChangePassword(false);
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Thiết lập mật khẩu tài khoản ${account.email} thất bại. Lỗi: ${mess}!`
            );
          },
        }
      )
    );
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="md"
        isOpen={formModalChangePassword}
        toggle={() =>
          !isConfigPasswordAccount && setFormModalChangePassword(false)
        }
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0">
            <CardHeader className="bg-transparent pb-2">
              <h2 className="mb-0">Thiết lập mật khẩu</h2>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-3">
              <Form
                className="needs-validation d-flex justify-content-center"
                noValidate
              >
                <div style={{ minWidth: 300 }}>
                  <InputCustom
                    label="Mật khẩu mới*"
                    defaultValue=""
                    placeholder="Vui lòng nhập mật khẩu mới"
                    type="password"
                    id="newPassword"
                    valid={newPassword !== "" && changed.newPassword}
                    invalid={newPassword === "" && changed.newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value.trim());
                      setChanged({
                        ...changed,
                        newPassword: true,
                      });
                    }}
                    messageValid={"Hợp lệ"}
                    messageInvalid={"Mật khẩu không được để trống"}
                    style={{ maxWidth: 300 }}
                    value={newPassword}
                  />
                  <InputCustom
                    label="Xác nhận mật khẩu *"
                    defaultValue=""
                    placeholder="Vui lòng nhập lại mật khẩu mới"
                    type="password"
                    id="reNewPassword"
                    valid={
                      changed.reNewPassword &&
                      errReNewPasswordMessage === "" &&
                      reNewPassword !== ""
                    }
                    invalid={
                      changed.reNewPassword && errReNewPasswordMessage !== ""
                    }
                    onChange={(e) => {
                      setReNewPassword(e.target.value.trim());
                      setChanged({
                        ...changed,
                        reNewPassword: true,
                      });
                      if (e.target.value === "") {
                        setErrReNewPasswordMessage(
                          "Mật khẩu nhập lại không được để trống!"
                        );
                      } else if (newPassword !== e.target.value) {
                        setErrReNewPasswordMessage("Mật khẩu không khớp!");
                      } else {
                        setErrReNewPasswordMessage("");
                      }
                    }}
                    messageValid={
                      (errReNewPasswordMessage === "" ||
                        reNewPassword !== "") &&
                      reNewPassword === newPassword
                        ? "Hợp lệ"
                        : ""
                    }
                    messageInvalid={errReNewPasswordMessage}
                    value={reNewPassword}
                    style={{ maxWidth: 300 }}
                  />
                </div>
              </Form>
            </CardBody>
            <div className="px-lg-5 py-lg-3 d-flex justify-content-end align-items-center">
              <Button
                onClick={() => {
                  !isConfigPasswordAccount && setFormModalChangePassword(false);
                }}
                color=""
                size="md"
                type="button"
              >
                Hủy
              </Button>
              <LoadingButtonCustom
                loading={isConfigPasswordAccount}
                onClick={handleSubmit}
                // className="mt-4"
                color="info"
                type="button"
                outline={false}
                block={false}
              >
                Lưu lại
              </LoadingButtonCustom>
              {/* <Button
                onClick={() => {
                  setFormModalChangePassword(false);
                  handleSubmit();
                }}
                color="primary"
                size="md"
                type="button"
              >
                Lưu lại
              </Button> */}
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FormAccount;
