import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  Row,
  Table,
} from "reactstrap";
import moment from "moment";
import _ from "lodash";

const FormNplOrderDetail = ({ open, setFormModalDetail, nplOrder }) => {
  return (
    <>
      <Modal
        size="lg"
        isOpen={open}
        toggle={() => {
          setFormModalDetail(false);
        }}
      >
        <Card className="mb-0">
          <CardHeader>
            <p className="h2 text-uppercase">Đề xuất mua nguyên phụ liệu</p>
          </CardHeader>
          <CardBody className="pb-0">
            <Row className="mb-3">
              <Col xs={3}>
                <p className="h3 text-sm font-weight-500">Người đề xuất</p>
              </Col>
              <Col xs={9}>{nplOrder.createdBy.name}</Col>
            </Row>
            <Row className="mb-3">
              <Col xs={3}>
                <p className="h3 text-sm font-weight-500">Ngày đề xuất</p>
              </Col>
              <Col xs={9}>
                {moment(nplOrder.suggestDate).format("DD/MM/YYYY")}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={3}>
                <p className="h3 text-sm font-weight-500">Mã đề xuất</p>
              </Col>
              <Col xs={9}>{nplOrder.code}</Col>
            </Row>
            <Row className="mb-3">
              <Col xs={3}>
                <p className="h3 text-sm font-weight-500">Tên đề xuất</p>
              </Col>
              <Col xs={9}>{nplOrder.name}</Col>
            </Row>
            <Row className="mb-0">
              <Col xs={3}>
                <p className="h3 text-sm font-weight-500">Kế hoạch SX</p>
              </Col>
              <Col xs={9}>{nplOrder?.orderPlanId?.name}</Col>
            </Row>
          </CardBody>
        </Card>
        <Card style={{ boxShadow: "none" }} className="mb-0">
          <CardBody>
            Danh sách nguyên phụ liệu
            <Table>
              <thead>
                <tr>
                  <td>STT</td>
                  <td>Tên vật tư</td>
                  <td>Đơn vị tính</td>
                  <td>Số lượng SP</td>
                  <td>Số lượng NPL</td>
                  <td>Tồn kho</td>
                  <td>SL đặt mua</td>
                </tr>
              </thead>
              <tbody>
                {nplOrder.suggestDetails.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.materialId?.name}</td>
                      <td>{item?.materialId?.unitId?.name}</td>
                      <td>{nplOrder.totalProduct}</td>
                      <td>{item?.materialId?.amount}</td>
                      <td>{item?.remainAmount}</td>
                      <td>{item?.needBuy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center mt-2">
              <Button
                onClick={() => {
                  setFormModalDetail(false);
                }}
              >
                Hủy bỏ
              </Button>
            </div>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
};

export default FormNplOrderDetail;
