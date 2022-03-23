import React, { useState } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";

const FormUpdate = ({ formModal, setFormModal }) => {
  const [valueGender, setValueGender] = useState(0);
  const [valueStatus, setValueStatus] = useState(0);
  const [valueRole, setValueRole] = useState(0);

  const selectGender = (e) => {
    setValueGender(parseInt(e.target.value));
  };

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={formModal}
      toggle={() => setFormModal(false)}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary border-0 mb-0">
          <CardHeader className="bg-transparent pb-2">
            <h2 className="mb-0">Cập nhật thông tin cá nhân</h2>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-3">
            <Form className="needs-validation" noValidate>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <InputCustom
                    label="Họ tên *"
                    defaultValue=""
                    placeholder="Vui lòng nhập tên người dùng"
                    type="text"
                    id="name"
                    valid={true}
                    invalid={false}
                    onChange={() => {}}
                    messageValid={""}
                    messageInvalid={""}
                  />
                </Col>
                <Col className="mb-3" md="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Giới tính
                    </label>
                    <Input
                      defaultValue={0}
                      value={valueGender}
                      onChange={selectGender}
                      id="exampleFormControlSelect3"
                      type="select"
                    >
                      <option value={0}>Nữ</option>
                      <option value={1}>Nam</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="6">
                  <InputCustom
                    disabled={true}
                    label="Email"
                    defaultValue=""
                    placeholder=""
                    type="text"
                    id="email"
                    valid={true}
                    invalid={false}
                    onChange={() => {}}
                    messageValid={""}
                    messageInvalid={""}
                    value="admin@admin.vn"
                  />
                </Col>
                <Col className="mb-3" md="6">
                  <InputCustom
                    disabled={true}
                    label="Nhóm quyền"
                    defaultValue=""
                    placeholder=""
                    type="text"
                    id="role"
                    valid={true}
                    invalid={false}
                    onChange={() => {}}
                    messageValid={""}
                    messageInvalid={""}
                    value="Admin"
                  />
                </Col>
                <Col className="mb-3" md="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlTextarea2"
                    >
                      Địa chỉ
                    </label>
                    <Input
                      id="exampleFormControlTextarea2"
                      rows="3"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
              </div>
            </Form>
          </CardBody>
          <div className="px-lg-5 py-lg-3 d-flex justify-content-end">
            <Button
              onClick={() => {
                setFormModal(false);
              }}
              color=""
              size="md"
              type="button"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                setFormModal(false);
              }}
              color="primary"
              size="md"
              type="button"
            >
              Lưu lại
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default FormUpdate;
