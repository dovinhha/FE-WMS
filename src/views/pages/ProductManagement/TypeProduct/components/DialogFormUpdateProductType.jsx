import React, { useEffect, useRef, useState } from "react";
import { GET } from "Services/ServiceBase";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  DropdownItem,
  Button,
  CardBody,
  Form,
  CardHeader,
  Modal,
  CardFooter,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { useSelector, useDispatch } from "react-redux";
import { customerActions } from "Redux/Actions";
import ServiceURL from "Services/ServiceURL";
// import { notify } from "common";
import Select from "react-select";

const DialogFormUpdateProductType = ({
  toggle,
  open,
  handleUpdateProductType,
  dataFormModal,
}) => {
  const [dataProductType, setDataProductType] = useState({
    code: "",
    name: "",
    notes: "",
  });
  const [changed, setChanged] = useState({
    name: false,
    code: false,
    notes: false,
  });
  const handleChangeInputProductType = (e) => {
    setChanged({ ...changed, [e.target.name]: true });
    setDataProductType({ ...dataProductType, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setDataProductType(dataFormModal);
  }, [dataFormModal]);
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="md"
        isOpen={open}
        toggle={toggle}
      >
        <Card>
          <CardHeader>
            <p className="h3 font-weight-500">Thông tin dòng sản phẩm</p>
          </CardHeader>
          {Object.keys(dataProductType).length !== 0 && (
            <>
              <CardBody>
                <FormGroup className="mb-2">
                  <p className="h3 text-sm font-weight-500">Mã dòng sản phẩm</p>
                  <InputCustom
                    placeholder="Nhập mã dòng sản phẩm"
                    type="text"
                    messageInvalid={"Mã sản phẩm không được để trống"}
                    valid={false}
                    invalid={dataProductType.code.length === 0 && changed.code}
                    onChange={handleChangeInputProductType}
                    name="code"
                    value={dataProductType.code}
                    // size="sm"
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <p className="h3 text-sm font-weight-500">Tên dòng</p>
                  <InputCustom
                    placeholder="Nhập thể loại dòng sản phẩm"
                    type="text"
                    valid={false}
                    invalid={dataProductType.name.length === 0 && changed.name}
                    name="name"
                    messageInvalid={"Tên sản phẩm không được để trống"}
                    value={dataProductType.name}
                    onChange={handleChangeInputProductType}
                    // disabled={disabled}

                    // size="sm"
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <p className="h3 text-sm font-weight-500">Mô tả</p>
                  <InputCustom
                    placeholder="Nhập mô tả"
                    type="textarea"
                    rows={3}
                    // valid={false}
                    // invalid={
                    //   dataProductType.notes.length === 0 && changed.notes
                    // }
                    // messageInvalid={"Ghi chú không được để trống"}
                    name="notes"
                    value={dataProductType.notes}
                    onChange={handleChangeInputProductType}
                  />
                </FormGroup>
              </CardBody>
              <CardFooter className="d-flex justify-content-center">
                <Button onClick={toggle}>Hủy bỏ</Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleUpdateProductType(dataProductType);
                  }}
                >
                  Cập nhật
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default DialogFormUpdateProductType;
