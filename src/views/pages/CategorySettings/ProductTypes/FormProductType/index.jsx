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

import { productTypesActions } from "Redux/Actions";
import { notify } from "common";

const FormProducer = ({
  setFormModal,
  formModal,
  isModalAdd,
  productType,
  handleGetProductTypes,
  notificationAlertRef,
}) => {
  const { isCreateProductType, isUpdateProductType } = useSelector(
    (state) => state.productTypesReducer
  );
  const dispatch = useDispatch();

  const productTypeSchema = yup.object().shape({
    code: yup.string().required("Vui lòng mã kiểu sản phẩm!"),
    name: yup.string().required("Vui lòng nhập tên kiểu sản phẩm!"),
    // description: yup
    //   .string()
    //   .required("Vui lòng nhập mô tả kiểu sản phẩm!"),
  });

  // const notificationAlertRef = useRef(null);
  const [productTypeInfo, setProductTypeInfo] = useState({
    code: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    !_.isEmpty(productType) && setProductTypeInfo(productType);
  }, [productType]);

  const onSubmit = (values, actions) => {
    const body = { ...values };
    delete body.id;
    isModalAdd
      ? dispatch(
          productTypesActions.createProductType(values, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Thêm kiểu sản phẩm thành công!`
              );
              handleGetProductTypes();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Thêm kiểu sản phẩm thất bại. Lỗi ${mess}!`
              );
            },
          })
        )
      : dispatch(
          productTypesActions.updateProductType(body, productType.id, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Cập nhật kiểu sản phẩm thành công!`
              );
              handleGetProductTypes();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Cập nhật kiểu sản phẩm thất bại. Lỗi ${mess}!`
              );
            },
          })
        );
  };

  const clearData = () => {
    setProductTypeInfo({
      code: "",
      name: "",
      description: "",
    });
  };

  return (
    <>
      <Modal
        className=" modal-dialog-centered"
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
                  ? "Thêm kiểu sản phẩm"
                  : "Cập nhật thông tin kiểu sản phẩm"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={productTypeInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={productTypeSchema}
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
                                  label="Mã kiểu sản phẩm"
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
                                  label="Tên kiểu sản phẩm"
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
                                  placeholder="Nhập mô tả"
                                  type="textarea"
                                  rows="5"
                                  name="description"
                                  id="description"
                                  invalid={
                                    errors.description && touched.description
                                  }
                                  onBlur={handleBlur}
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
                              if (isCreateProductType || isUpdateProductType) {
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
                            loading={isCreateProductType || isUpdateProductType}
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
    </>
  );
};

export default FormProducer;
