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
import {
  saleOrderActions,
  productActions,
  warehouseActions,
} from "Redux/Actions";
import { notify } from "common";
import queryString from "query-string";
import { AddSVG } from "assets/svg";

const FormSaleOrder = ({
  setFormModal,
  formModal,
  isModalAdd,
  saleOrder,
  handleGetSaleOrders,
  notificationAlertRef,
}) => {
  const { isCreateSaleOrder, isUpdateSaleOrder } = useSelector(
    (state) => state.saleOrderReducer
  );
  const { products } = useSelector((state) => state.productReducer);
  const { warehouses } = useSelector((state) => state.warehouseReducer);
  const dispatch = useDispatch();

  const saleOrderSchema = yup.object().shape({
    code: yup.string().required("Vui lòng mã nhà đơn!"),
    name: yup.string().required("Vui lòng nhập tên nhà đơn!"),
  });

  // const notificationAlertRef = useRef(null);
  const [saleOrderInfo, setSaleOrderInfo] = useState({
    code: "",
    name: "",
    description: "",
    items: [
      {
        itemId: "",
        itemValue: null,
        warehouseId: "",
        warehouseValue: null,
        planQuantity: "",
        price: "",
      },
    ],
  });

  const [productSearch, setProductSearch] = useState("");
  const [warehouseSearch, setWarehouseSearch] = useState("");

  useEffect(() => {
    !_.isEmpty(saleOrder) && setSaleOrderInfo(saleOrder);
  }, [saleOrder]);

  const onSubmit = (values, actions) => {
    const tempItems = _.cloneDeep(values.items);
    tempItems.forEach((item) => {
      delete item.itemId;
      delete item.warehouseValue;
    });
    isModalAdd
      ? dispatch(
          saleOrderActions.createSaleOrder(
            { ...values, items: [...tempItems] },
            {
              success: () => {
                actions.resetForm();
                clearData();
                notify(
                  notificationAlertRef,
                  "success",
                  "Thông báo",
                  `Thêm đơn bán hàng thành công!`
                );
                handleGetSaleOrders();
                setFormModal(false);
              },
              failed: (mess) => {
                notify(
                  notificationAlertRef,
                  "danger",
                  "Thông báo",
                  `Thêm đơn bán hàng thất bại. Lỗi ${mess}!`
                );
              },
            }
          )
        )
      : dispatch(
          saleOrderActions.updateSaleOrder(
            { ...values, items: [...tempItems] },
            saleOrder.id,
            {
              success: () => {
                actions.resetForm();
                clearData();
                notify(
                  notificationAlertRef,
                  "success",
                  "Thông báo",
                  `Cập nhật đơn bán hàng thành công!`
                );
                handleGetSaleOrders();
                setFormModal(false);
              },
              failed: (mess) => {
                notify(
                  notificationAlertRef,
                  "danger",
                  "Thông báo",
                  `Cập nhật đơn bán hàng thất bại. Lỗi ${mess}!`
                );
              },
            }
          )
        );
  };

  const handleGetProducts = () => {
    if (productSearch === "") {
      dispatch(
        productActions.getProducts(
          queryString.stringify({ limit: 10, page: 1 })
        )
      );
    } else {
      dispatch(
        productActions.getProducts(
          queryString.stringify({ limit: 10, page: 1, keyWord: productSearch })
        )
      );
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [productSearch]);

  const handleGetWarehouses = () => {
    if (warehouseSearch === "") {
      dispatch(
        warehouseActions.getWarehouses(
          queryString.stringify({ limit: 10, page: 1 })
        )
      );
    } else {
      dispatch(
        warehouseActions.getWarehouses(
          queryString.stringify({
            limit: 10,
            page: 1,
            keyWord: warehouseSearch,
          })
        )
      );
    }
  };

  useEffect(() => {
    handleGetWarehouses();
  }, [warehouseSearch]);

  const clearData = () => {
    setSaleOrderInfo({
      code: "",
      name: "",
      description: "",
      items: [
        {
          itemId: "",
          itemValue: null,
          warehouseId: "",
          warehouseValue: null,
          planQuantity: "",
          price: "",
        },
      ],
    });
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        style={{ minWidth: 1024 }}
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
                  ? "Thêm đơn bán hàng"
                  : "Cập nhật thông tin đơn bán hàng"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={saleOrderInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={saleOrderSchema}
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
                                  label="Mã đơn"
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
                                  label="Tên đơn"
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
                            <Row>
                              <Col className="mt-3" md="12">
                                <h3 className="m-0" htmlFor="itemId">
                                  Chi tiết đơn bán hàng
                                </h3>
                              </Col>
                            </Row>

                            {values.items.map((item, index) => (
                              <Row key={index}>
                                <Col md="4">
                                  <label
                                    className="form-control-label"
                                    htmlFor="itemId"
                                  >
                                    Sản phẩm
                                  </label>
                                  <Select
                                    placeholder="Chọn sản phẩm"
                                    value={item.itemValue}
                                    isClearable={true}
                                    id="itemId"
                                    onChange={(e) => {
                                      setFieldValue("items", [
                                        ...values.items.slice(0, index),
                                        {
                                          ...values.items[index],
                                          itemId: !!e ? e.value : "",
                                          itemValue: e,
                                        },
                                        ...values.items.slice(index + 1),
                                      ]);
                                    }}
                                    options={products.items.map((item) => ({
                                      label: `${item.name}(${item.code})`,
                                      value: item.id,
                                    }))}
                                    onInputChange={(value) => {
                                      setProductSearch(value);
                                    }}
                                  />
                                </Col>
                                <Col md="4">
                                  <label className="form-control-label">
                                    Kho
                                  </label>
                                  <Select
                                    placeholder="Chọn sản phẩm"
                                    value={item.warehouseValue}
                                    isClearable={true}
                                    onChange={(e) => {
                                      setFieldValue("items", [
                                        ...values.items.slice(0, index),
                                        {
                                          ...values.items[index],
                                          warehouseId: !!e ? e.value : "",
                                          warehouseValue: e,
                                        },
                                        ...values.items.slice(index + 1),
                                      ]);
                                    }}
                                    options={warehouses.items.map((item) => ({
                                      label: `${item.name}(${item.code})`,
                                      value: item.id,
                                    }))}
                                    onInputChange={(value) => {
                                      setWarehouseSearch(value);
                                    }}
                                  />
                                </Col>
                                <Col md="2">
                                  <label className="form-control-label">
                                    Số lượng
                                  </label>
                                  <InputCustom
                                    className="max-height-input-custom"
                                    label=""
                                    placeholder="Nhập số lượng"
                                    type="number"
                                    id="planQuantity"
                                    name="planQuantity"
                                    onChange={(e) => {
                                      setFieldValue("items", [
                                        ...values.items.slice(0, index),
                                        {
                                          ...values.items[index],
                                          planQuantity:
                                            e.target.value !== ""
                                              ? Number(e.target.value)
                                              : "",
                                        },
                                        ...values.items.slice(index + 1),
                                      ]);
                                    }}
                                    value={item.planQuantity}
                                  />
                                </Col>
                                <Col md="2">
                                  <label className="form-control-label">
                                    Giá
                                  </label>
                                  <InputCustom
                                    className="max-height-input-custom"
                                    label=""
                                    placeholder="Nhập giá"
                                    type="number"
                                    id="price"
                                    name="price"
                                    onChange={(e) => {
                                      setFieldValue("items", [
                                        ...values.items.slice(0, index),
                                        {
                                          ...values.items[index],
                                          price:
                                            e.target.value !== ""
                                              ? Number(e.target.value)
                                              : "",
                                        },
                                        ...values.items.slice(index + 1),
                                      ]);
                                    }}
                                    value={item.price}
                                  />
                                </Col>
                              </Row>
                            ))}

                            <Row>
                              <Col
                                md="12"
                                className="d-flex justify-content-end"
                              >
                                <span
                                  onClick={() => {
                                    setFieldValue("items", [
                                      ...values.items,
                                      {
                                        itemId: "",
                                        itemValue: null,
                                        warehouseId: "",
                                        warehouseValue: null,
                                        planQuantity: "",
                                        price: "",
                                      },
                                    ]);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <AddSVG />
                                </span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-2">
                          <Button
                            onClick={() => {
                              if (isCreateSaleOrder || isUpdateSaleOrder) {
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
                            loading={isCreateSaleOrder || isUpdateSaleOrder}
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

export default FormSaleOrder;
