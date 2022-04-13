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
import Select from "react-select";
import queryString from "query-string";
import {
  productActions,
  unitActions,
  productTypesActions,
} from "Redux/Actions";
import { notify } from "common";
import Error from "views/pages/components/Error";

const FormProduct = ({
  setFormModal,
  formModal,
  isModalAdd,
  product,
  handleGetProducts,
  notificationAlertRef,
}) => {
  const { isCreateProduct, isUpdateProduct } = useSelector(
    (state) => state.productReducer
  );
  const { units } = useSelector((state) => state.unitReducer);
  const { productTypes } = useSelector((state) => state.productTypesReducer);
  const dispatch = useDispatch();

  const productSchema = yup.object().shape({
    code: yup.string().required("Vui lòng mã sản phẩm!"),
    name: yup.string().required("Vui lòng nhập tên sản phẩm!"),
    price: yup.number().required("Vui lòng nhập giá sản phẩm!"),
    itemUnitId: yup.number().required("Vui lòng nhập đơn vị tính!"),
    itemTypeId: yup.number().required("Vui lòng nhập loại sản phẩm!"),
  });

  // const notificationAlertRef = useRef(null);
  const [productInfo, setProductInfo] = useState({
    code: "",
    name: "",
    price: "",
    itemUnitId: "",
    itemTypeId: "",
    description: "",
  });
  const [unitValue, setUnitValue] = useState(null);
  const [unitSearch, setUnitSearch] = useState("");
  const [productTypeValue, setProductTypeValue] = useState(null);
  const [productTypeSearch, setProductTypeSearch] = useState("");

  const [focused, setFocused] = useState({
    itemUnitId: false,
    itemTypeId: false,
  });

  useEffect(() => {
    if (!_.isEmpty(product)) {
      setProductInfo({
        code: product.code,
        name: product.name,
        price: product.price,
        itemUnitId: product.itemUnit.id,
        itemTypeId: product.itemType.id,
        description: product.description,
      });
      setUnitValue({
        label: `${product?.itemUnit?.name}(${product?.itemUnit?.code})`,
        value: product?.itemUnit?.id,
      });
      setProductTypeValue({
        label: `${product?.itemType?.name}(${product?.itemType?.code})`,
        value: product?.itemType?.id,
      });
    }
  }, [product]);

  useEffect(() => {
    if (unitSearch === "") {
      dispatch(
        unitActions.getUnits(queryString.stringify({ page: 1, limit: 10 }))
      );
    } else {
      dispatch(
        unitActions.getUnits(
          queryString.stringify({ page: 1, limit: 10, keyWord: unitSearch })
        )
      );
    }
  }, [unitSearch]);

  useEffect(() => {
    if (productTypeSearch === "") {
      dispatch(
        productTypesActions.getProductTypes(
          queryString.stringify({ page: 1, limit: 10 })
        )
      );
    } else {
      dispatch(
        productTypesActions.getProductTypes(
          queryString.stringify({
            page: 1,
            limit: 10,
            keyWord: productTypeSearch,
          })
        )
      );
    }
  }, [productTypeSearch]);

  const onSubmit = (values, actions) => {
    const body = { ...values };
    delete body.id;
    isModalAdd
      ? dispatch(
          productActions.createProduct(values, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Thêm sản phẩm thành công!`
              );
              handleGetProducts();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Thêm sản phẩm thất bại. Lỗi ${mess}!`
              );
            },
          })
        )
      : dispatch(
          productActions.updateProduct(body, product.id, {
            success: () => {
              actions.resetForm();
              clearData();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Cập nhật sản phẩm thành công!`
              );
              handleGetProducts();
              setFormModal(false);
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Cập nhật sản phẩm thất bại. Lỗi ${mess}!`
              );
            },
          })
        );
  };

  const clearData = () => {
    setProductInfo({
      code: "",
      name: "",
      price: "",
      itemUnitId: "",
      itemTypeId: "",
      description: "",
    });
    setUnitValue(null);
    setProductTypeValue(null);
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
                {isModalAdd ? "Thêm sản phẩm" : "Cập nhật thông tin sản phẩm"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={productInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={productSchema}
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
                                  label="Mã sản phẩm"
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
                                  label="Tên sản phẩm"
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
                                  label="Giá sản phẩm"
                                  placeholder="Nhập giá"
                                  type="number"
                                  name="price"
                                  id="price"
                                  invalid={errors.price && touched.price}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "price",
                                      e.target.value !== ""
                                        ? Number(e.target.value)
                                        : ""
                                    );
                                  }}
                                  value={values.price}
                                  messageInvalid={errors.price}
                                />
                              </Col>
                              <Col md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="itemUnitId"
                                >
                                  Đơn vị tính
                                </label>
                                <Select
                                  placeholder="Chọn đơn vị tính"
                                  value={unitValue}
                                  isClearable={true}
                                  id="itemUnitId"
                                  onChange={(e) => {
                                    setUnitValue({ ...e });
                                    setFieldValue(
                                      "itemUnitId",
                                      e ? e.value : ""
                                    );
                                  }}
                                  options={units.items.map((item) => ({
                                    label: `${item.name}(${item.code})`,
                                    value: item.id,
                                  }))}
                                  onInputChange={(value) => {
                                    setUnitSearch(value);
                                  }}
                                  onFocus={() => {
                                    setFocused({
                                      ...focused,
                                      itemUnitId: true,
                                    });
                                  }}
                                />
                                {errors.itemUnitId && focused.itemUnitId && (
                                  <Error messageInvalid={errors.itemUnitId} />
                                )}
                              </Col>
                              <Col md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="itemTypeId"
                                >
                                  Loại sản phẩm
                                </label>
                                <Select
                                  placeholder="Chọn loại sản phẩm"
                                  value={productTypeValue}
                                  isClearable={true}
                                  id="itemTypeId"
                                  onChange={(e) => {
                                    setProductTypeValue({ ...e });
                                    setFieldValue(
                                      "itemTypeId",
                                      e ? e.value : ""
                                    );
                                  }}
                                  options={productTypes.items.map((item) => ({
                                    label: `${item.name}(${item.code})`,
                                    value: item.id,
                                  }))}
                                  onInputChange={(value) => {
                                    setProductTypeSearch(value);
                                  }}
                                  onFocus={() => {
                                    setFocused({
                                      ...focused,
                                      itemTypeId: true,
                                    });
                                  }}
                                />
                                {errors.itemTypeId && focused.itemTypeId && (
                                  <Error messageInvalid={errors.itemTypeId} />
                                )}
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
                              if (isCreateProduct || isUpdateProduct) {
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
                            loading={isCreateProduct || isUpdateProduct}
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

export default FormProduct;
