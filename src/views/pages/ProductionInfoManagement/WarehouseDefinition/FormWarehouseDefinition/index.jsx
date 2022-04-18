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
  UncontrolledTooltip,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";
import _ from "lodash";
import queryString from "query-string";
import { warehouseActions, productActions } from "Redux/Actions";
import { notify } from "common";
import Select from "react-select";
import { DeleteSVG } from "assets/svg";
import Error from "views/pages/components/Error";

const FormWarehouse = ({
  setFormModal,
  formModal,
  isModalAdd,
  warehouse,
  handleGetWarehouses,
  notificationAlertRef,
}) => {
  const { isCreateWarehouse, isUpdateWarehouse } = useSelector(
    (state) => state.warehouseReducer
  );
  const { products } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const warehouseSchema = yup.object().shape({
    code: yup.string().required("Vui lòng mã kho!"),
    name: yup.string().required("Vui lòng nhập tên kho!"),
  });

  const [warehouseInfo, setWarehouseInfo] = useState({
    code: "",
    name: "",
    address: "",
    description: "",
  });

  const [productSearch, setProductSearch] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productsOfWarehouse, setProductsOfWarehouse] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });
  const [focused, setFocused] = useState({
    items: false,
  });

  const boxAction = (cell, row, index) => {
    return (
      <>
        <button
          id="delete"
          onClick={() => {
            setProductsOfWarehouse([
              ...productsOfWarehouse.slice(0, index),
              ...productsOfWarehouse.slice(index + 1),
            ]);
          }}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa sản phẩm
        </UncontrolledTooltip>
      </>
    );
  };
  const columns = [
    {
      dataField: "code",
      text: "Mã sản phẩm",
    },
    {
      dataField: "name",
      text: "Tên sản phẩm",
    },
    {
      dataField: "code",
      text: "Kiểu sản phẩm",
    },
    {
      dataField: "price",
      text: "Giá sản phẩm",
    },
    {
      dataField: "itemUnit.name",
      text: "Đơn vị tính",
    },
    {
      dataField: "itemType.name",
      text: "Kiểu sản phẩm",
    },
    {
      dataField: "description",
      text: "Mô tả",
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
      style: {
        textAlign: "center",
      },
      headerStyle: {
        textAlign: "center",
      },
    },
  ];

  const onSizePerPageChange = (value) => {
    setRowsPerPage(value);
    setPage(1);
    setQuery({ ...query, page: 1, limit: value });
  };

  const pagination = paginationFactory({
    page: page,
    onPageChange: (value) => {
      setPage(value);
      setQuery({ ...query, page: value });
    },
    sizePerPage: rowsPerPage,
    totalSize: productsOfWarehouse.length,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage >
            productsOfWarehouse.slice(
              page * rowsPerPage - rowsPerPage,
              page * rowsPerPage
            ).length
              ? !isNaN(productsOfWarehouse?.length)
                ? productsOfWarehouse.length
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(productsOfWarehouse?.length)
              ? productsOfWarehouse.length
              : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });

  useEffect(() => {
    if (!_.isEmpty(warehouse)) {
      setWarehouseInfo({
        code: warehouse.code,
        name: warehouse.name,
        address: warehouse.address,
        description: warehouse.description,
      });
      setProductsOfWarehouse(warehouse.items);
    }
  }, [warehouse]);

  const onSubmit = (values, actions) => {
    if (productsOfWarehouse.length === 0) return;
    isModalAdd
      ? dispatch(
          warehouseActions.createWarehouse(
            { ...values, items: productsOfWarehouse.map((item) => item.id) },
            {
              success: () => {
                actions.resetForm();
                clearData();
                notify(
                  notificationAlertRef,
                  "success",
                  "Thông báo",
                  `Thêm kho thành công!`
                );
                handleGetWarehouses();
                setFormModal(false);
              },
              failed: (mess) => {
                notify(
                  notificationAlertRef,
                  "danger",
                  "Thông báo",
                  `Thêm kho thất bại. Lỗi ${mess}!`
                );
              },
            }
          )
        )
      : dispatch(
          warehouseActions.updateWarehouse(
            { ...values, items: productsOfWarehouse.map((item) => item.id) },
            warehouse.id,
            {
              success: () => {
                actions.resetForm();
                clearData();
                notify(
                  notificationAlertRef,
                  "success",
                  "Thông báo",
                  `Cập nhật kho thành công!`
                );
                handleGetWarehouses();
                setFormModal(false);
              },
              failed: (mess) => {
                notify(
                  notificationAlertRef,
                  "danger",
                  "Thông báo",
                  `Cập nhật kho thất bại. Lỗi ${mess}!`
                );
              },
            }
          )
        );
  };

  const clearData = () => {
    setWarehouseInfo({
      code: "",
      name: "",
      address: "",
      description: "",
    });
    setProductsOfWarehouse([]);
    setProductValue(null);
  };

  const handleGetProducts = () => {
    if (productSearch === "") {
      dispatch(
        productActions.getProducts(
          queryString.stringify({
            page: 1,
            limit: 10,
          })
        )
      );
    } else {
      dispatch(
        productActions.getProducts(
          queryString.stringify({
            page: 1,
            limit: 10,
            keyWord: productSearch,
          })
        )
      );
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [productSearch]);

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={formModal}
        style={{ minWidth: 1024 }}
        toggle={() => {
          setFormModal(false);
        }}
      >
        <div className="modal-body p-0">
          <Card className="border-0 mb-0">
            <CardHeader className="bg-transparent pb-2">
              <h2 className="mb-0">
                {isModalAdd ? "Thêm kho" : "Cập nhật thông tin kho"}
              </h2>
            </CardHeader>
            <Formik
              initialValues={warehouseInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={warehouseSchema}
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
                                  label="Mã kho"
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
                                  label="Tên kho"
                                  placeholder="Nhập tên"
                                  type="text"
                                  className="max-height-input-custom"
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
                                  label="Địa chỉ"
                                  placeholder="Nhập địa chỉ"
                                  type="textarea"
                                  rows="4"
                                  name="address"
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
                              <Col md="6">
                                <InputCustom
                                  label="Mô tả"
                                  name="description"
                                  placeholder="Nhập tên"
                                  type="textarea"
                                  rows="4"
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
                              <Col md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="itemId"
                                >
                                  Sản phẩm
                                </label>
                                <Select
                                  placeholder="Chọn sản phẩm"
                                  value={productValue}
                                  isClearable={true}
                                  id="itemId"
                                  onChange={(e) => {
                                    setProductValue(e);
                                  }}
                                  options={products.items.map((item) => ({
                                    label: `${item.name}(${item.code})`,
                                    value: item.id,
                                    code: item.code,
                                    description: item.description,
                                    itemType: item.itemType,
                                    itemUnit: item.itemUnit,
                                    name: item.name,
                                    price: item.price,
                                    id: item.id,
                                  }))}
                                  onInputChange={(value) => {
                                    setProductSearch(value);
                                  }}
                                  onFocus={() => {
                                    setFocused({ items: true });
                                  }}
                                />
                              </Col>
                              <Col className="d-flex align-items-end" md="6">
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    if (_.isEmpty(productValue)) return;
                                    // setFieldValue(
                                    //   "items",
                                    //   _.uniq([
                                    //     productValue.value,
                                    //     ...values.items,
                                    //   ])
                                    // );
                                    setProductsOfWarehouse(
                                      _.uniqBy(
                                        [productValue, ...productsOfWarehouse],
                                        "id"
                                      )
                                    );
                                    setProductValue(null);
                                  }}
                                >
                                  Thêm vào kho
                                </Button>
                              </Col>
                              <Col md="12">
                                <ToolkitProvider
                                  data={productsOfWarehouse}
                                  keyField="id"
                                  columns={columns}
                                  search
                                >
                                  {(props) => (
                                    <>
                                      <Row>
                                        <Col className="py-2">
                                          {/* <CardHeader> */}
                                          <div className="mb-0 d-flex align-items-center">
                                            <p className="mb-0">Hiển thị </p>
                                            {
                                              <select
                                                value={rowsPerPage}
                                                name="datatable-basic_length"
                                                aria-controls="datatable-basic"
                                                className="form-control form-control-sm mx-2"
                                                style={{ maxWidth: 60 }}
                                                onChange={(e) =>
                                                  onSizePerPageChange(
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                              </select>
                                            }{" "}
                                            <p className="mb-0">dòng</p>
                                          </div>
                                          {/* </CardHeader> */}
                                        </Col>
                                      </Row>
                                      <BootstrapTable
                                        {...props.baseProps}
                                        noDataIndication={() => {
                                          return (
                                            <span className="font-weight-bold text-danger">
                                              Không có dữ liệu!
                                            </span>
                                          );
                                        }}
                                        hover
                                        remote
                                        filter={filterFactory()}
                                        bootstrap4={true}
                                        pagination={pagination}
                                        bordered={false}
                                      />
                                    </>
                                  )}
                                </ToolkitProvider>
                              </Col>
                              <Col md="12">
                                {productsOfWarehouse.length === 0 &&
                                  focused.items && (
                                    <Error messageInvalid="Vui lòng thêm sản phẩm cho đơn hàng!" />
                                  )}
                              </Col>
                            </Row>
                            {/* </Card> */}
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-2">
                          <Button
                            onClick={() => {
                              if (isCreateWarehouse || isUpdateWarehouse) {
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
                            loading={isCreateWarehouse || isUpdateWarehouse}
                            onClick={() => {
                              setFocused({
                                items: true,
                              });
                              handleSubmit();
                            }}
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

export default FormWarehouse;
