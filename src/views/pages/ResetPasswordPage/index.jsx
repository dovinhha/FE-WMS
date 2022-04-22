import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import AuthHeader from "components/Headers/AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { accountActions } from "Redux/Actions";
import HelperText from "views/pages/components/HelperText";
import NotificationAlert from "react-notification-alert";
import { notify } from "common";
import queryString from "query-string";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
const LoginPage = () => {
  const { isResetPassword } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const notificationAlertRef = React.useRef(null);
  const [focusedNewPassword, setFocusedNewPassword] = React.useState(false);
  const [focusedReNewPassword, setFocusedReNewPassword] = React.useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorReNewPassword, setErrorReNewPassword] = useState("");
  const [message, setMessages] = React.useState("");

  localStorage.clear();

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value === "") {
      setErrorNewPassword("Mật khẩu không được để trống!");
    } else {
      setErrorNewPassword("");
    }
  };

  const handleChangeReNewPassword = (e) => {
    setReNewPassword(e.target.value);
    if (e.target.value === "") {
      setErrorReNewPassword("Nhập lại mật khẩu không được để trống!");
    } else {
      setErrorReNewPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorPassword = false;
    if (newPassword === "") {
      setErrorNewPassword("Mật khẩu không được để trống!");
      errorPassword = true;
    }
    if (reNewPassword === "") {
      setErrorReNewPassword("Nhập lại mật khẩu không được để trống!");
      errorPassword = true;
    }
    if (errorPassword) return;
    if (isResetPassword) return;
    if (reNewPassword !== newPassword) {
      setErrorReNewPassword("Mật khẩu không khớp. Vui lòng nhập lại!");
      return;
    }
    const query = queryString.stringify({
      token: window.location.href.split("token=")[1],
    });

    dispatch(
      accountActions.resetPassword({ password: newPassword }, query, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Thiết lập mật khẩu thành công. Vui lòng đăng nhập!`
          );
          setTimeout(() => {
            history.push("auth/login");
          }, 5000);
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Thao tác thất bại!. Lỗi: ${mess !== undefined ? mess : ""}.`
          );
        },
      })
    );
  };

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <AuthHeader
        title="Hệ thống quản lý quy trình đơn hàng"
        lead="Nhập mật khẩu mới"
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="8">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <h1 className="text-center text-uppercase">
                  Thay đổi mật khẩu
                </h1>
                <Form role="form">
                  <FormGroup
                    className={classnames({
                      focused: focusedNewPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mật khẩu mới"
                        type="password"
                        value={newPassword}
                        onFocus={() => setFocusedNewPassword(true)}
                        onBlur={() => setFocusedNewPassword(false)}
                        onChange={handleChangeNewPassword}
                      />
                    </InputGroup>
                    <HelperText message={errorNewPassword} />
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedReNewPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        value={reNewPassword}
                        onFocus={() => setFocusedReNewPassword(true)}
                        onBlur={() => setFocusedReNewPassword(false)}
                        onChange={handleChangeReNewPassword}
                      />
                    </InputGroup>
                    <HelperText message={errorReNewPassword} />
                  </FormGroup>
                  <div className="text-center">
                    <LoadingButtonCustom
                      loading={isResetPassword}
                      onClick={handleSubmit}
                      className="mt-4"
                      color="info"
                      type="button"
                      outline={false}
                      block={false}
                    >
                      Xác nhận
                    </LoadingButtonCustom>
                    {/* <Button
                      onClick={handleSubmit}
                      className="mt-4"
                      color="info"
                      type="button"
                    >
                      Đặt lại mật khẩu
                    </Button> */}
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row>
              <Col xs="6">
                <a className="text-light" href="login">
                  <small>Đăng nhập ?</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
