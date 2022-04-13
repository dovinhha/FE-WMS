import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  CardBody,
  CardHeader,
  Modal,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";
import _ from "lodash";

import { unitActions } from "Redux/Actions";
import { notify } from "common";

const FormUnit = ({
  setFormModal,
  formModal,
  isModalAdd,
  unit,
  handleGetUnits,
  notificationAlertRef,
}) => {
  const { isCreateUnit, isUpdateUnit } = useSelector(
    (state) => state.unitReducer
  );
  const dispatch = useDispatch();

  const unitSchema = yup.object().shape({
    code: yup.string().required("Vui lòng mã đơn vị!"),
    name: yup.string().required("Vui lòng nhập tên đơn vị!"),
  });

  // const notificationAlertRef = useRef(null);
  const [unitInfo, setUnitInfo] = useState({
    code: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    !_.isEmpty(unit) && setUnitInfo(unit);
  }, [unit]);

  const onSubmit = (values, actions) => {
    const body = { ...values };
    delete body.id;
    isModalAdd
      ? dispatch(
          unitActions.createUnit(values, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Thêm đơn vị thành công!`
              );
              handleGetUnits();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Thêm đơn vị thất bại. Lỗi ${mess}!`
              );
            },
          })
        )
      : dispatch(
          unitActions.updateUnit(body, unit.id, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Cập nhật đơn vị thành công!`
              );
              handleGetUnits();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Cập nhật đơn vị thất bại. Lỗi ${mess}!`
              );
            },
          })
        );
  };

  const clearData = () => {
    setUnitInfo({
      code: "",
      name: "",
      description: "",
    });
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={formModal}
        toggle={() => {
          setFormModal(false);
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0">
            <CardHeader className="bg-transparent pb-2">
              <h2 className="mb-0">
                {isModalAdd ? "Thêm đơn vị" : "Cập nhật thông tin đơn vị"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={unitInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={unitSchema}
            >
              {({
                values,
                setFieldValue,
                handleSubmit,
                errors,
                touched,
                resetForm,
                handleBlur,
                setFieldTouched,
              }) => {
                return (
                  <>
                    <CardBody className="px-lg-5 py-lg-3">
                      <Form className="needs-validation" noValidate>
                        <Row className="justify-content-center">
                          <Col>
                            <Row className="mt-2">
                              <Col md="6">
                                <InputCustom
                                  className="max-height-input-custom"
                                  label="Mã đơn vị"
                                  placeholder="Nhập mã"
                                  type="text"
                                  id="code"
                                  name="code"
                                  invalid={errors.code && touched.code}
                                  messageInvalid={errors.code}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue("code", e.target.value);
                                  }}
                                  value={values.code}
                                />
                              </Col>
                              <Col md="6">
                                <InputCustom
                                  className="max-height-input-custom"
                                  label="Tên đơn vị"
                                  placeholder="Nhập tên"
                                  type="text"
                                  id="name"
                                  name="name"
                                  invalid={errors.name && touched.name}
                                  messageInvalid={errors.name}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue("name", e.target.value);
                                  }}
                                  value={values.name}
                                />
                              </Col>

                              <Col md="12">
                                <InputCustom
                                  label="Mô tả"
                                  name="description"
                                  placeholder="Nhập ghi chú"
                                  type="textarea"
                                  rows="4"
                                  id="description"
                                  invalid={
                                    errors.description && touched.description
                                  }
                                  onChange={(e) => {
                                    setFieldValue(
                                      "description",
                                      e.target.value
                                    );
                                  }}
                                  value={values.description}
                                  messageInvalid={errors.description}
                                />
                              </Col>
                            </Row>
                            {/* </Card> */}
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-2">
                          <Button
                            onClick={() => {
                              if (isCreateUnit || isUpdateUnit) {
                                return;
                              }
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
                            loading={isCreateUnit || isUpdateUnit}
                            onClick={handleSubmit}
                            color="primary"
                            size="md"
                            type="button"
                          >
                            {isModalAdd ? "Thêm mới" : "Lưu lại"}
                          </LoadingButtonCustom>
                        </Row>
                      </Form>
                    </CardBody>
                  </>
                );
              }}
            </Formik>
          </Card>
        </div>
      </Modal>

      {/* </Container> */}
    </>
  );
};

export default FormUnit;
