import React from "react";
import InputCustom from "views/pages/components/InputCustom";
import {
  Row,
  Card,
  Col,
  CardBody,
  CardImg,
  CardHeader,
  Button,
} from "reactstrap";
import { Style } from "../style";

const ChangePassword = () => {
  return (
    <Style>
      <Row>
        <Col md={4}>
          <Card className="card-profile">
            <CardImg
              alt="..."
              src={require("assets/default/background-default.jpg").default}
              top
              className="bg-gradient-info cardImg"
            />
            <div className="bg-gradient-info"></div>
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle bg-white"
                      src={require("assets/default/avatar-default.png").default}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardBody className="pt-7">
              <div className="text-center ">
                <h5 className="h3">Admin</h5>
                <div className="h4 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  admin@admin.vn
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <CardBody className="d-flex flex-column align-items-center">
              <div style={{ minWidth: 300 }}>
                <InputCustom
                  label="Mật khẩu hiện tại *"
                  defaultValue=""
                  placeholder="Vui lòng nhập mật khẩu hiện tại"
                  type="text"
                  id="oldPassword"
                  valid={true}
                  invalid={false}
                  onChange={() => {}}
                  messageValid={""}
                  messageInvalid={""}
                  style={{ maxWidth: 300 }}
                />
                <InputCustom
                  label="Mật khẩu mới*"
                  defaultValue=""
                  placeholder="Vui lòng nhập mật khẩu mới"
                  type="text"
                  id="newPassword"
                  valid={true}
                  invalid={false}
                  onChange={() => {}}
                  messageValid={""}
                  messageInvalid={""}
                  style={{ maxWidth: 300 }}
                />
                <InputCustom
                  label="Xác nhận mật khẩu *"
                  defaultValue=""
                  placeholder="Vui lòng nhập lại mật khẩu mới"
                  type="text"
                  id="reNewPassword"
                  valid={true}
                  invalid={false}
                  onChange={() => {}}
                  messageValid={""}
                  messageInvalid={""}
                  style={{ maxWidth: 300 }}
                />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button className="btn btn-info">Cập nhật</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Style>
  );
};

export default ChangePassword;
