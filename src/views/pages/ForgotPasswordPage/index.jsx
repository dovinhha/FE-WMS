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
import { emailRegex, notify } from "common";
import HelperText from "views/pages/components/HelperText";
import NotificationAlert from "react-notification-alert";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";

const LoginPage = () => {
  const { isForgotPassword } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();
  const history = useHistory();
  const notificationAlertRef = React.useRef(null);
  const [focusedEmail, setFocusedEmail] = React.useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessages] = React.useState("");
  const [emailError, setEmailError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email không được để trống!");
    } else if (!emailRegex.test(e.target.value)) {
      setEmailError("Vui lòng nhập đúng định dạng email!");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError("Email không được để trống!");
      return;
    }
    if (isForgotPassword) return;

    dispatch(
      accountActions.forgotPassword(
        {
          email,
        },
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Mật khẩu mới đã được gửi vào email ${email}. Vui lòng kiểm tra để đăng nhập!`
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
        }
      )
    );
  };

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <AuthHeader
        title="Hệ thống quản lý quy trình đơn hàng"
        lead="Nhập Email cần cấp lại mật khẩu"
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="8">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <h1 className="text-center text-uppercase">Quên mật khẩu</h1>
                <Form role="form">
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={email}
                        placeholder="Email"
                        type="email"
                        onFocus={() => setFocusedEmail(true)}
                        onBlur={() => setFocusedEmail(false)}
                        onChange={handleChangeEmail}
                      />
                    </InputGroup>
                    <HelperText message={emailError} />
                  </FormGroup>
                  <div className="text-center">
                    <LoadingButtonCustom
                      loading={isForgotPassword}
                      onClick={handleSubmit}
                      className="mt-4"
                      color="info"
                      type="button"
                      outline={false}
                      block={false}
                    >
                      Gửi
                    </LoadingButtonCustom>
                    {/* <Button
                      onClick={handleSubmit}
                      className="mt-4"
                      color="info"
                      type="button"
                    >
                      Cấp lại mật khẩu
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
