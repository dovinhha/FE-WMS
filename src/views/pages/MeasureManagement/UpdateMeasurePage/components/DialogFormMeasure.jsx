import { AddSVG } from "assets/svg";
import React from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

const DialogFormMeasure = ({ open, toggle, data }) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <p className="h3 text-uppercase">Nhập danh sách số đo</p>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={3}>
            <p className="text-sm font-weight-500">Tên đơn hàng</p>
          </Col>
          <Col xs={9}>
            <p className="text-sm">May đồng phục công sở</p>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <p className="text-sm font-weight-500">Tên chủ đầu tư</p>
          </Col>
          <Col xs={9}>
            <p className="text-sm">Công ty điện lực miền bắc</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="h5">
              Cập nhật danh sách kết quả đo cho các đơn vị, phòng ban
            </p>
          </Col>
        </Row>
        <div className="">
          <Table>
            <thead>
              <tr>
                <td className="text-sm font-weight-500">
                  Tên đơn vị/Phòng ban
                </td>
                <td className="text-sm font-weight-500">Dòng SP</td>
                <td className="text-sm font-weight-500">Tải file</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-sm">Chi nhánh 1</td>
                <td>
                  <Input type="select" size="sm">
                    <option value="" hidden>
                      Lựa chọn
                    </option>
                  </Input>
                </td>
                <td>
                  <Input type="file" id="file1" hidden />
                  <label htmlFor="file1">
                    <Button size="sm">Upload</Button>
                    <Button size="sm" color="info">
                      Save
                    </Button>
                  </label>
                </td>
              </tr>
              <tr>
                <td className="text-sm">Chi nhánh 1</td>
                <td>
                  <Input type="select" size="sm">
                    <option value="" hidden>
                      Lựa chọn
                    </option>
                  </Input>
                </td>
                <td>
                  <Input type="file" id="file2" hidden />
                  <label htmlFor="file2">
                    <Button size="sm">Upload</Button>
                  </label>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-center">
        <Button onClick={toggle}>Hủy bỏ</Button>
        <Button color="primary">Cập nhật</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DialogFormMeasure;
