import React from "react";
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Modal,
  Row,
} from "reactstrap";

const DetailMeasurementStandard = ({ open, toggle, data }) => {
  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="lg">
        <CardHeader>
          <p className="h3 font-weight-500">Nhập thông tin size tiêu chuẩn</p>
        </CardHeader>
        {Object.keys(data).length > 0 && (
          <>
            <CardBody>
              <Row>
                <Col xs={9}>
                  <Row>
                    <Col xs={4}>
                      <p className="font-weight-500 text-sm">Mã tiêu chuẩn</p>
                    </Col>
                    <Col xs={8}>
                      <p className="h3 text-sm font-weight-500">{data.code}</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={3}></Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Row>
                    <Col xs={6}>
                      <p className="font-weight-500 text-sm">Tên </p>
                    </Col>
                    <Col xs={6}>
                      <p className="h3 text-sm font-weight-500">{data.name}</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row>
                    <Col xs={6} className="font-weight-500 text-sm">
                      Tên sản phẩm
                    </Col>
                    <Col xs={6}>
                      <p className="h3 text-sm font-weight-500">
                        {data.productTypeId.name}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col xs={6}>
                  <Row>
                    <Col xs={6}>
                      <p className="font-weight-500 text-sm">Chiều cao</p>
                    </Col>
                    <Col xs={6}>
                      <p className="h3 text-sm font-weight-500">
                        {data.height}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row>
                    <Col xs={6}>
                      <p className="font-weight-500 text-sm">Cân nặng</p>
                    </Col>
                    <Col xs={6}>
                      <p className="h3 text-sm font-weight-500">
                        {data.weight}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <p className="h3 text-sm font-weight-500">Vị trí đo</p>

              {data.standardSizes.map((item) => {
                // console.log(item);
                return (
                  <div className="mx-3">
                    <Row>
                      <Col xs={4} className="d-flex align-items-center">
                        <p className="h3 text-sm font-weight-500 col-6 mb-0">
                          {item.productParameterId.name}
                        </p>
                        <p className="h3 text-sm font-weight-500">
                          {item.size || 0}
                        </p>
                      </Col>
                      <Col xs={4} className="d-flex align-items-center">
                        <p className="h3 text-sm font-weight-500 col-6 mb-0">
                          Biên độ
                        </p>
                        <p className="h3 text-sm font-weight-500">
                          {item.bias || 0}
                        </p>
                      </Col>
                      <Col xs={4} className="d-flex align-items-center">
                        <p className="h3 text-sm font-weight-500 col-6 mb-0">
                          Trọng số
                        </p>
                        <p className="h3 text-sm font-weight-500">
                          {item.priority || 0}
                        </p>
                      </Col>
                    </Row>
                    <hr className="my-2" />
                  </div>
                );
              })}
            </CardBody>
            <CardFooter className="d-flex justify-content-center">
              <Button onClick={toggle}>Đóng</Button>
            </CardFooter>
          </>
        )}
      </Modal>
    </>
  );
};

export default DetailMeasurementStandard;
