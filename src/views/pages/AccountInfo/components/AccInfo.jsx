import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardImg,
  CardHeader,
  CardBody,
} from "reactstrap";
import FormUpdate from "./FormUpdate";
import { Style } from "../style";

const AccInfo = () => {
  const [formModal, setFormModal] = useState(false);

  return (
    <Style>
      <Row>
        <FormUpdate formModal={formModal} setFormModal={setFormModal} />
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
            <CardHeader>
              <div className="d-flex justify-content-between">
                <h3 className="h2 mb-0">Thông tin cá nhân</h3>
                <Button
                  onClick={() => {
                    setFormModal(true);
                  }}
                  className="btn btn-info"
                >
                  Cập nhật thông tin cá nhân
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <h3>Họ tên</h3>
                </Col>
                <Col md={3}>Admin001</Col>
                <Col md={3}>
                  <h3>Giới tính</h3>
                </Col>
                <Col md={3}>Nam</Col>
                <Col md={3}>
                  <h3>Email</h3>
                </Col>
                <Col md={3}>admin@admin.vn</Col>
                <Col md={3}>
                  <h3>Nhóm quyền</h3>
                </Col>
                <Col md={3}>Admin</Col>
                <Col md={12}>
                  <h3>Địa chỉ</h3>
                </Col>
                <Col md={12}>Viet Nam</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Style>
  );
};

export default AccInfo;
