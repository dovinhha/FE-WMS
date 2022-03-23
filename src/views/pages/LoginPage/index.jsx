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
import { emailRegex } from "common";
import HelperText from "views/pages/components/HelperText";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //!State
  const { isLogIn } = useSelector((state) => state.accountReducer);
  const [focusedEmail, setFocusedEmail] = React.useState(false);
  const [focusedPassword, setFocusedPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessages] = React.useState("");
  const [valueAppLogin, setValueAppLogin] = React.useState(1);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  localStorage.clear();

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

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("Mật khẩu không được để trống!");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let check = false;
    if (email === "") {
      setEmailError("Email không được để trống!");
      check = true;
    }
    if (password === "") {
      setPasswordError("Mật khẩu không được để trống!");
      check = true;
    }

    if (isLogIn) return;
    if (check) return;

    try {
      dispatch(
        accountActions.accountLogin(
          {
            email,
            password,
          },
          {
            success: (data) => {
              setMessages("");
              localStorage.setItem("expiresAt", data.tokens.access.expires);
              localStorage.setItem("token", data.tokens.access.token);
              localStorage.setItem("roleId", data.user.roleId);
              localStorage.setItem("refreshtoken", data.tokens.refresh.token);
              localStorage.setItem("id", data.user.id);
              history.push("/");
            },
            failed: (mess) => {
              setMessages(mess);
            },
          }
        )
      );
    } catch (error) {
      console.log("login error: ", error);
    }
  };

  const selectAppLogin = (e) => {
    if (0 === parseInt(e.target.value)) {
      setValueAppLogin(1);
      window.open("https://duan.fovina.vn/auth/login", "_blank");
    }
  };

  return (
    <>
      <AuthHeader
        title="Hệ thống quản lý quy trình đơn hàng"
        lead="Đăng nhập để sử dụng các chức năng của hệ thống"
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="8">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <h1 className="text-center text-uppercase">Đăng nhập</h1>
                <Form role="form">
                  {/* <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Chọn ứng dụng truy cập
                    </label>
                    <Input
                      defaultValue={1}
                      value={valueAppLogin}
                      onChange={selectAppLogin}
                      id="exampleFormControlSelect3"
                      type="select"
                    >
                      <option value={0}>Quản lý hồ sơ thầu</option>
                      <option value={1}>Quản lý quy trình đơn hàng</option>
                    </Input>
                  </FormGroup> */}
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-0">
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
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={() => setFocusedPassword(true)}
                        onBlur={() => setFocusedPassword(false)}
                        onChange={handleChangePassword}
                      />
                    </InputGroup>
                    <HelperText message={passwordError} />
                  </FormGroup>
                  <div className="d-flex justify-content-center">
                    {message !== "" ? (
                      <span className="text-danger">{message}</span>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <LoadingButtonCustom
                      loading={isLogIn}
                      onClick={handleSubmit}
                      className="mt-4"
                      color="info"
                      type="button"
                      outline={false}
                      block={false}
                    >
                      Đăng nhập
                    </LoadingButtonCustom>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row>
              <Col xs="6">
                <a className="text-light" href="forgot-password">
                  <small>Quên mật khẩu ?</small>
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
