import React from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  DropdownItem,
  CardBody,
  Card,
} from "reactstrap";
import UploadFileCustom from "views/pages/components/UploadFileCustom";

const DetailProduct = ({ open, toggle, data }) => {
  return (
    <Modal size="lg" isOpen={open} toggle={toggle}>
      <ModalHeader>
        <p className="h3 text-uppercase">Chi tiết sản phẩm</p>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={7}>
            <Row>
              <Col md={4} className="h3 text-sm mt-3 font-weight-500">
                Mã sản phẩm
              </Col>
              <Col md={8} className="text-sm mt-3">
                {data?.code}
              </Col>
            </Row>
            <Row>
              <Col md={4} className="h3 text-sm mt-3 font-weight-500">
                Tên sản phẩm
              </Col>
              <Col md={8} className="text-sm mt-3">
                {data?.name}
              </Col>
            </Row>
            <Row>
              <Col md={4} className="h3 text-sm mt-3 font-weight-500">
                Dòng sản phẩm
              </Col>
              <Col md={8} className="text-sm mt-3">
                {data?.parentId?.name}
              </Col>
            </Row>
            <Row>
              <Col md={4} className="h3 text-sm mt-3 font-weight-500">
                Mô tả
              </Col>
              <Col md={8} className="text-sm mt-3">
                {data?.notes}
              </Col>
            </Row>
          </Col>
          <Col xs={5}>
            <Card>
              <CardBody>
                <p className="h3 text-sm font-weight-500">Ảnh mô tả</p>
                <DropdownItem divider />
                <UploadFileCustom handleGetImage={() => {}} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-center">
        <Button color="danger" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DetailProduct;
