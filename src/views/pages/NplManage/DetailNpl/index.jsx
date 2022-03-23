import React, { useEffect, useState } from "react";
import {
  CardBody,
  Modal,
  Card,
  CardHeader,
  Col,
  Row,
  Button,
  DropdownItem,
} from "reactstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { nplActions, unitActions } from "Redux/Actions";
import { notify } from "common";
import _ from "lodash";
import Select from "react-select";
import UploadFileCustom from "views/pages/components/UploadFileCustom";
import Error from "views/pages/components/Error";

const DetailNpl = ({ modalDetail, setModalDetail, npl }) => {
  const dispatch = useDispatch();
  const [nplInfo, setNplInfo] = useState({
    code: "",
    name: "",
    materialTypeId: "",
    amount: "",
    price: "",
    unitId: "",
    color: "",
    notes: "",
  });
  useEffect(() => {
    if (!_.isEmpty(npl)) {
      setNplInfo({
        code: npl.code,
        name: npl.name,
        materialTypeId: !_.isEmpty(npl?.materialTypeId)
          ? npl.materialTypeId.name
          : "",
        amount: npl.amount,
        price: npl.price,
        unitId: npl.unitId.name,
        color: npl.color,
        notes: npl.notes,
      });
    }
  }, [npl]);

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      // style={{ minWidth: 1024 }}
      isOpen={modalDetail}
      toggle={() => {
        setModalDetail(false);
      }}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary border-0 mb-0">
          <CardHeader className="bg-transparent pb-2">
            <h2 className="mb-0">Thông tin thể loại NPL</h2>
          </CardHeader>
          <CardBody>
            <Row style={{ maxWidth: 1024 }} className="justify-content-center">
              <Col md="8">
                <Row className="mt-4">
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">Mã NPL</label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.code}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">
                      Tên nguyên phụ liệu
                    </label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.name}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">
                      Nhóm nguyên phụ liệu
                    </label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.materialTypeId}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">Số lượng</label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.amount}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">Đơn giá</label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.price}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">Đơn vị tính</label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.unitId}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">Màu sắc</label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.color}
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label">Ghi chú</label>
                  </Col>
                  <Col className="mb-3" md="8">
                    : {nplInfo.notes}
                  </Col>
                </Row>
              </Col>
              <Col md="4">
                <h3>Ảnh mô tả</h3>
                <DropdownItem divider />
                <UploadFileCustom />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Button
                onClick={() => {
                  setModalDetail(false);
                }}
                color=""
                size="md"
                type="button"
              >
                Đóng
              </Button>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default DetailNpl;
