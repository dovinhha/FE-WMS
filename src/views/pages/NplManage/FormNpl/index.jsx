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

const FormNplGroup = ({
  formModal,
  setFormModal,
  npl,
  notificationAlertRef,
  handleGetNpls,
}) => {
  const { isUpdateNpl, nplGroups } = useSelector((state) => state.nplReducer);
  const { units } = useSelector((state) => state.unitReducer);
  const dispatch = useDispatch();
  const nplSchema = yup.object().shape({
    code: yup.string().required("Mã NPL không được để trống!"),
    name: yup.string().required("Tên NPL không được để trống!"),
    materialTypeId: yup.string().required("Vui lòng chọn nhóm NPL!"),
    amount: yup.string().required("Số lượng không được để trống!"),
    price: yup.string().required("Đơn giá không được để trống!"),
    unitId: yup.string().required("Vui lòng chọn đơn vị tính!"),
    color: yup.string().required("Màu sắc không được để trống!"),
    // notes: yup.string().required(""),
  });

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

  const [focused, setFocused] = useState({
    materialTypeId: false,
    unitId: false,
  });

  const [queryNplGroups, setQueryNplGroups] = useState({
    page: 1,
    limit: 10,
  });
  const [queryUnits, setQueryUnits] = useState({
    page: 1,
    limit: 10,
  });

  const [materialTypeIdValue, setMaterialTypeIdValue] = useState({});
  const [materialTypeIdSearch, setMaterialTypeIdSearch] = useState("");
  const [unitIdValue, setUnitIdValue] = useState({});
  const [unitIdSearch, setUnitIdSearch] = useState("");

  useEffect(() => {
    if (!_.isEmpty(npl)) {
      setNplInfo({
        code: npl.code,
        name: npl.name,
        materialTypeId: !_.isEmpty(npl?.materialTypeId)
          ? npl.materialTypeId.id
          : "",
        amount: npl.amount,
        price: npl.price,
        unitId: npl.unitId.id,
        color: npl.color,
        notes: npl.notes,
      });
      !_.isEmpty(npl?.materialTypeId) &&
        setMaterialTypeIdValue({
          value: npl.materialTypeId.id,
          label: npl.materialTypeId.name,
        });
      setUnitIdValue({
        value: npl.unitId.id,
        label: npl.unitId.name,
      });
    }
  }, [npl]);

  const onSubmit = (values, actions) => {
    const id = values.id;
    delete values.id;
    dispatch(
      nplActions.updateNplGroup(values, id, {
        success: () => {
          setNplInfo({
            code: "",
            name: "",
            notes: "",
          });
          actions.resetForm();
          handleGetNplGroups();
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Cập nhật thể loại NPL ${values.name} thành công!`
          );
          setFormModal(false);
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Cập nhật thể loại NPL ${values.name} thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };
  const handleGetNplGroups = () => {
    if (materialTypeIdSearch === "") {
      dispatch(nplActions.getNplGroups(queryString.stringify(queryNplGroups)));
    } else {
      dispatch(
        nplActions.getNplGroups(
          queryString.stringify({
            ...queryNplGroups,
            name: materialTypeIdSearch,
          })
        )
      );
    }
  };

  const handleGetUnits = () => {
    if (unitIdSearch === "") {
      dispatch(unitActions.getUnits(queryString.stringify(queryUnits)));
    } else {
      dispatch(
        unitActions.getUnits(
          queryString.stringify({
            ...queryUnits,
            name: unitIdSearch,
          })
        )
      );
    }
  };

  const clearData = () => {
    setNplInfo({
      code: "",
      name: "",
      materialTypeId: "",
      amount: "",
      price: "",
      unitId: "",
      color: "",
      notes: "",
    });
    setFocused({
      materialTypeId: false,
      unitId: false,
    });
    setMaterialTypeIdValue({});
    setUnitIdValue({});
  };

  useEffect(() => {
    handleGetNplGroups();
  }, [queryNplGroups]);

  useEffect(() => {
    handleGetUnits();
  }, [queryUnits]);
  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      style={{ minWidth: 1024 }}
      isOpen={formModal}
      toggle={() => {
        setFormModal(false);
      }}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary border-0 mb-0">
          <CardHeader className="bg-transparent pb-2">
            <h2 className="mb-0">Cập nhật thông tin thể loại NPL</h2>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={nplInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={nplSchema}
            >
              {({
                values,
                setFieldValue,
                handleSubmit,
                errors,
                touched,
                resetForm,
                handleBlur,
              }) => {
                return (
                  <>
                    <Row
                      style={{ maxWidth: 1024 }}
                      className="justify-content-center"
                    >
                      <Col md="8">
                        <h3>Nhập thông tin nguyên phụ liệu</h3>
                        <DropdownItem divider />
                        <Row className="mt-4">
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">Mã NPL</label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <InputCustom
                              placeholder="Nhập mã NPL"
                              type="text"
                              id="code"
                              name="code"
                              invalid={errors.code && touched.code}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("code", e.target.value);
                              }}
                              messageInvalid={errors.code}
                              value={values.code}
                            />
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Tên nguyên phụ liệu
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <InputCustom
                              placeholder="Nhập tên nguyên phụ liệu"
                              type="text"
                              id="name"
                              name="name"
                              invalid={errors.name && touched.name}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("name", e.target.value);
                              }}
                              messageInvalid={errors.name}
                              value={values.name}
                            />
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Nhóm nguyên phụ liệu
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <Select
                              placeholder="Chọn nhóm NPL"
                              value={materialTypeIdValue}
                              isClearable={true}
                              onChange={(e) => {
                                setMaterialTypeIdValue({ ...e });
                                setFieldValue(
                                  "materialTypeId",
                                  e ? e.value : ""
                                );
                              }}
                              options={nplGroups.items.map((item) => ({
                                label: item.name,
                                value: item.id,
                              }))}
                              onInputChange={(value) => {
                                setMaterialTypeIdSearch(value);
                              }}
                              onFocus={() => {
                                setFocused({
                                  ...focused,
                                  materialTypeId: true,
                                });
                              }}
                            />
                            {errors.materialTypeId &&
                              focused.materialTypeId && (
                                <Error messageInvalid={errors.materialTypeId} />
                              )}
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Số lượng
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <InputCustom
                              placeholder="Nhập số lượng"
                              type="number"
                              id="amount"
                              name="amount"
                              onBlur={handleBlur}
                              invalid={errors.amount && touched.amount}
                              onChange={(e) => {
                                setFieldValue(
                                  "amount",
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                                );
                              }}
                              messageInvalid={errors.amount}
                              value={values.amount}
                            />
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Đơn giá
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <InputCustom
                              placeholder="Nhập đơn giá"
                              type="number"
                              id="price"
                              name="price"
                              onBlur={handleBlur}
                              invalid={errors.price && touched.price}
                              onChange={(e) => {
                                setFieldValue(
                                  "price",
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                                );
                              }}
                              messageInvalid={errors.price}
                              value={values.price}
                            />
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Đơn vị tính
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <Select
                              placeholder="Chọn đơn vị"
                              value={unitIdValue}
                              isClearable={true}
                              onChange={(e) => {
                                setUnitIdValue({ ...e });
                                setFieldValue("unitId", e ? e.value : "");
                              }}
                              options={units.items.map((item) => ({
                                label: item.name,
                                value: item.id,
                              }))}
                              onInputChange={(value) => {
                                setUnitIdSearch(value);
                              }}
                              onFocus={() => {
                                setFocused({
                                  ...focused,
                                  unitId: true,
                                });
                              }}
                            />
                            {errors.unitId && focused.unitId && (
                              <Error messageInvalid={errors.unitId} />
                            )}
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Màu sắc
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <InputCustom
                              placeholder="Nhập màu sắc"
                              type="text"
                              id="color"
                              name="color"
                              onBlur={handleBlur}
                              invalid={errors.color && touched.color}
                              onChange={(e) => {
                                setFieldValue("color", e.target.value);
                              }}
                              messageInvalid={errors.color}
                              value={values.color}
                            />
                          </Col>
                          <Col className="mb-3" md="3">
                            <label className="form-control-label">
                              Ghi chú
                            </label>
                          </Col>
                          <Col className="mb-3" md="9">
                            <InputCustom
                              placeholder="Nhập ghi chú"
                              type="textarea"
                              rows="5"
                              id="notes"
                              name="notes"
                              onBlur={handleBlur}
                              invalid={errors.notes && touched.notes}
                              onChange={(e) => {
                                setFieldValue("notes", e.target.value);
                              }}
                              messageInvalid={errors.notes}
                              value={values.notes}
                            />
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
                          clearData();
                          resetForm();
                          setFormModal(false);
                        }}
                        color=""
                        size="md"
                        type="button"
                      >
                        Hủy
                      </Button>
                      <LoadingButtonCustom
                        loading={isUpdateNpl}
                        onClick={() => {
                          setFocused({
                            unitId: true,
                            materialTypeId: true,
                          });
                          handleSubmit();
                        }}
                        color="primary"
                        size="md"
                        type="button"
                      >
                        Thêm mới
                      </LoadingButtonCustom>
                    </Row>
                  </>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default FormNplGroup;
