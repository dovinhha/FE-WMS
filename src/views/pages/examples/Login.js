/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
// nodejs library that concatenates classes
import classnames from 'classnames'
// reactstrap components
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
    Label,
} from 'reactstrap'
// core components
import AuthHeader from 'components/Headers/AuthHeader.js'

function Login() {
    const [focusedEmail, setfocusedEmail] = React.useState(false)
    const [focusedPassword, setfocusedPassword] = React.useState(false)
    return (
        <>
            <AuthHeader
                title="HỆ THỐNG QUẢN LÝ TRỰC TUYẾN"
                lead="Đăng nhập để sử dụng hệ thống"
            />
            <Container className="mt--7 pb-5">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                            <CardHeader className="bg-transparent pb-2">
                                <div className="text-muted text-center mt-2 mb-2">
                                    <p style={{ fontSize: '20px' }}>
                                        Đăng nhập
                                    </p>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup
                                        className={classnames('mb-3', {
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
                                                placeholder="Email"
                                                type="email"
                                                onFocus={() =>
                                                    setfocusedEmail(true)
                                                }
                                                onBlur={() =>
                                                    setfocusedEmail(true)
                                                }
                                            />
                                        </InputGroup>
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
                                                onFocus={() =>
                                                    setfocusedPassword(true)
                                                }
                                                onBlur={() =>
                                                    setfocusedPassword(true)
                                                }
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin"
                                        >
                                            <span className="text-muted">
                                                Ghi nhớ
                                            </span>
                                        </label>
                                    </div>
                                    <FormGroup className="mt-4 ">
                                        <Label
                                            for="exampleSelect"
                                            className="font-wweight-500 text-gray"
                                        >
                                            Chọn ứng dụng truy cập
                                        </Label>
                                        <Input
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="info"
                                            type="button"
                                        >
                                            Đăng nhập
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <small>Quên mật khẩu</small>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login
