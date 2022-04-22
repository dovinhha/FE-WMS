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

import { customerActions } from "Redux/Actions";
import { notify } from "common";

const FormCustomer = ({
  setFormModal,
  formModal,
  isModalAdd,
  customer,
  handleGetCustomers,
  notificationAlertRef,
}) => {
  const { isCreateCustomer, isUpdateCustomer } = useSelector(
    (state) => state.customerReducer
  );
  const dispatch = useDispatch();

  const customerSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên khách hàng!"),
    // address: yup.string().required("Vui lòng nhập địa chỉ khách hàng!"),
    phone: yup
      .string()
      .required("Số điện thoại không được để trống!")
      .matches("0[1-9][0-9]{8}", "Vui lòng nhập đúng định dạng số điện thoại!"),
  });

  // const notificationAlertRef = useRef(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    !_.isEmpty(customer) &&
      setCustomerInfo({
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
        description: customer.description,
      });
  }, [customer]);

  const onSubmit = (values, actions) => {
    isModalAdd
      ? dispatch(
          customerActions.createCustomer(values, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Thêm khách hàng thành công!`
              );
              handleGetCustomers();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Thêm khách hàng thất bại. Lỗi ${mess}!`
              );
            },
          })
        )
      : dispatch(
          customerActions.updateCustomer(values, customer.id, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Cập nhật khách hàng thành công!`
              );
              handleGetCustomers();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Cập nhật khách hàng thất bại. Lỗi ${mess}!`
              );
            },
          })
        );
  };

  const clearData = () => {
    setCustomerInfo({
      name: "",
      address: "",
      phone: "",
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
                {isModalAdd
                  ? "Thêm khách hàng"
                  : "Cập nhật thông tin khách hàng"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={customerInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={customerSchema}
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
                    <CardBody className="px-lg-5 py-lg-3">
                      <Form className="needs-validation" noValidate>
                        <Row className="justify-content-center">
                          <Col>
                            <Row className="mt-2">
                              <Col md="6">
                                <InputCustom
                                  className="max-height-input-custom"
                                  label="Tên khách hàng"
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
                                  className="max-height-input-custom"
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
                                  label="Mô tả"
                                  name="description"
                                  placeholder="Nhập mô tả"
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
                              if (isCreateCustomer || isUpdateCustomer) {
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
                            loading={isCreateCustomer || isUpdateCustomer}
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

export default FormCustomer;
