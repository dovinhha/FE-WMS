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

import { producerActions } from "Redux/Actions";
import { notify } from "common";

const FormProducer = ({
  setFormModal,
  formModal,
  isModalAdd,
  producer,
  handleGetProducers,
  notificationAlertRef,
}) => {
  const { isCreateProducer, isUpdateProducer } = useSelector(
    (state) => state.producerReducer
  );
  const dispatch = useDispatch();

  const producerSchema = yup.object().shape({
    code: yup.string().required("Vui lòng mã nhà sản xuất!"),
    name: yup.string().required("Vui lòng nhập tên nhà sản xuất!"),
    address: yup.string().required("Vui lòng nhập địa chỉ nhà sản xuất!"),
    phone: yup
      .string()
      .required("Số điện thoại không được để trống!")
      .matches("0[1-9][0-9]{8}", "Vui lòng nhập đúng định dạng số điện thoại!"),
    contactPerson: yup.string().required("Vui lòng nhập tên người liên hệ!"),
    capacity: yup
      .string()
      .required("Vui lòng nhập công xuất gia công nhà sản xuất!"),
  });

  // const notificationAlertRef = useRef(null);
  const [producerInfo, setProducerInfo] = useState({
    code: "",
    name: "",
    address: "",
    phone: "",
    contactPerson: "",
    capacity: "",
    notes: "",
  });

  useEffect(() => {
    !_.isEmpty(producer) && setProducerInfo(producer);
  }, [producer]);

  const onSubmit = (values, actions) => {
    const body = { ...values };
    delete body.id;
    isModalAdd
      ? dispatch(
          producerActions.createProducer(values, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Thêm nhà sản xuất thành công!`
              );
              handleGetProducers();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Thêm nhà sản xuất thất bại. Lỗi ${mess}!`
              );
            },
          })
        )
      : dispatch(
          producerActions.updateProducer(body, producer.id, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Cập nhật nhà sản xuất thành công!`
              );
              handleGetProducers();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Cập nhật nhà sản xuất thất bại. Lỗi ${mess}!`
              );
            },
          })
        );
  };

  const clearData = () => {
    setProducerInfo({
      code: "",
      name: "",
      address: "",
      phone: "",
      contactPerson: "",
      capacity: "",
      notes: "",
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
                {isModalAdd
                  ? "Thêm nhà sản xuất"
                  : "Cập nhật thông tin nhà sản xuất"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={producerInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={producerSchema}
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
                                  label="Mã sản xuất"
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
                              <Col md="6" />
                              <Col md="6">
                                <InputCustom
                                  label="Tên nhà sản xuất"
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
                              <Col md="6">
                                <InputCustom
                                  label="Điện thoại"
                                  placeholder="Nhập số điện thoại"
                                  type="text"
                                  name="phone"
                                  id="phone"
                                  invalid={errors.phone && touched.phone}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue("phone", e.target.value);
                                  }}
                                  value={values.phone}
                                  messageInvalid={errors.phone}
                                />
                              </Col>
                              <Col md="6">
                                <InputCustom
                                  label="Nhười liên hệ"
                                  name="contactPerson"
                                  placeholder="Nhập tên"
                                  type="text"
                                  id="contactPerson"
                                  invalid={
                                    errors.contactPerson &&
                                    touched.contactPerson
                                  }
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "contactPerson",
                                      e.target.value
                                    );
                                  }}
                                  value={values.contactPerson}
                                  messageInvalid={errors.contactPerson}
                                />
                              </Col>
                              <Col md="6">
                                <InputCustom
                                  label="Công xuất gia công"
                                  name="capacity"
                                  placeholder="Nhập công xuất gia công"
                                  type="text"
                                  id="capacity"
                                  invalid={errors.capacity && touched.capacity}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue("capacity", e.target.value);
                                  }}
                                  value={values.capacity}
                                  messageInvalid={errors.capacity}
                                />
                              </Col>
                              <Col md={12}>
                                <InputCustom
                                  label="Địa chỉ"
                                  name="address"
                                  placeholder="Nhập địa chỉ"
                                  type="textarea"
                                  rows="4"
                                  id="address"
                                  invalid={errors.address && touched.address}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue("address", e.target.value);
                                  }}
                                  value={values.address}
                                  messageInvalid={errors.address}
                                />
                              </Col>

                              <Col md="12">
                                <InputCustom
                                  label="Ghi chú"
                                  name="notes"
                                  placeholder="Nhập ghi chú"
                                  type="textarea"
                                  rows="4"
                                  id="notes"
                                  invalid={errors.notes && touched.notes}
                                  onChange={(e) => {
                                    setFieldValue("notes", e.target.value);
                                  }}
                                  value={values.notes}
                                  messageInvalid={errors.notes}
                                />
                              </Col>
                            </Row>
                            {/* </Card> */}
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-2">
                          <Button
                            onClick={() => {
                              if (isCreateProducer || isUpdateProducer) {
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
                            loading={isCreateProducer || isUpdateProducer}
                            onClick={handleSubmit}
                            color="primary"
                            size="md"
                            type="button"
                          >
                            Lưu
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

export default FormProducer;
