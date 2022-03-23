import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  Row,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "Redux/Actions";
import { Formik } from "formik";
import * as yup from "yup";
import { productTypesActions } from "Redux/Actions";
import queryString from "query-string";
import Error from "views/pages/components/Error";
import { customerActions } from "Redux/Actions";
import { producerActions } from "Redux/Actions";
import moment from "moment";
import { orderActions } from "Redux/Actions";
import _, { values } from "lodash";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const DialogAddWorkForPlanV2 = ({
  open,
  setFormModal,
  handleCreate,
  isModalAdd,
  dataForm,
  handleUpdate,
}) => {
  const dispatch = useDispatch();

  const workPlanSchema = yup.object().shape({
    // orderId: yup.string().required("Vui lòng chọn đơn hàng!"),
    // customerOrganizationIds: yup.array().min(1),
    code: yup.string().required("Mã kế hoạch không được để trống!"),
    name: yup.string().required("Tên kế hoạch không được để trống!"),
    productTypeId: yup.string().required("Vui lòng chọn dòng sản phẩm!"),
    producerId: yup
      .string()
      .required("Vui lòng chọn đơn vị gia công/nhà cung cấp!"),
    productionDays: yup
      .string()
      .required("Số ngày sản xuất không được để trống!"),
    qcDays: yup.string().required("Số ngày QC không được để trống!"),
  });

  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState({});
  const [customerOrganName, setCustomerOrganName] = useState("");
  const [customerOrganValue, setCustomerOrganValue] = useState([]);
  const [producerName, setProducerName] = useState("");
  const [orderValue, setOrderValue] = useState({});
  // const [orderName, setOrderName] = useState("");
  const [producerValue, setProducerValue] = useState({});
  const { products } = useSelector((state) => state.productTypesReducer);
  const { producers } = useSelector((state) => state.producerReducer);
  const { customers } = useSelector((state) => state.customerReducer);

  useEffect(() => {
    setProductValue({});
    setCustomerOrganValue([]);
    setOrderValue({});
    setProducerValue({});
  }, [open]);

  const [workPlanInfo, setWorkPlanInfo] = useState({
    // orderId: "",
    code: "",
    name: "",
    customerOrganizationIds: [],
    productTypeId: "",
    producerId: "",
    productSyncDate: moment().format("YYYY-MM-DD"),
    embroiderDate: moment().format("YYYY-MM-DD"),
    produceCutDate: moment().format("YYYY-MM-DD"),
    qcDate: moment().format("YYYY-MM-DD"),
    qcCustomerDate: moment().format("YYYY-MM-DD"),
    warehouseReceipDate: moment().format("YYYY-MM-DD"),
    productionDays: "",
    qcDays: "",
  });
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
    status: "active",
  });
  const [focused, setFocused] = useState({
    orderId: false,
    customerOrganizationIds: false,
    productTypeId: false,
    producerId: false,
  });
  const handleGetProducts = () => {
    if (productName === "" || !productName) {
      dispatch(productActions.getProducts(queryString.stringify(query)));
    } else {
      dispatch(
        productActions.getProducts(
          queryString.stringify({
            ...query,
            name: productName,
          })
        )
      );
    }
  };
  const handleGetCustomers = () => {
    if (customerOrganName === "" || !customerOrganName) {
      dispatch(customerActions.getCustomers(queryString.stringify(query)));
    } else {
      dispatch(
        customerActions.getCustomers(
          queryString.stringify({ ...query, name: customerOrganName })
        )
      );
    }
  };
  const handleGetProducers = () => {
    if (customerOrganName === "" || !customerOrganName) {
      dispatch(
        producerActions.getProducers(
          queryString.stringify({ limit: 10, page: 1 })
        )
      );
    } else {
      dispatch(
        customerActions.getProducers(
          queryString.stringify({ limit: 10, page: 1, name: customerOrganName })
        )
      );
    }
  };
  // const handleGetOrders = () => {
  //   if (orderName === "" || !orderName) {
  //     dispatch(
  //       orderActions.getOrders(queryString.stringify({ limit: 10, page: 1 }))
  //     );
  //   } else {
  //     dispatch(
  //       orderActions.getOrders(
  //         queryString.stringify({
  //           limit: 10,
  //           page: 1,
  //           name: orderName,
  //         })
  //       )
  //     );
  //   }
  // };
  useEffect(() => {
    handleGetProducts();
  }, [productName]);
  useEffect(() => {
    handleGetCustomers();
  }, [customerOrganName]);
  useEffect(() => {
    handleGetProducers();
  }, [producerName]);
  // useEffect(() => {
  //   handleGetOrders();
  // }, [orderName]);

  useEffect(() => {
    if (!isModalAdd) {
      setWorkPlanInfo({
        // orderId: dataForm.orderId.id,
        code: dataForm.code,
        name: dataForm.name,
        customerOrganizationIds: dataForm.customerOrganizationIds.map(
          (item) => item.id
        ),
        productTypeId: dataForm.productTypeId.id,
        producerId: !_.isEmpty(dataForm?.producerId?.id)
          ? dataForm.producerId.id
          : "",
        productionDays:
          dataForm?.productionDays !== undefined
            ? dataForm?.productionDays
            : "",
        qcDays: !dataForm?.qcDays !== undefined ? dataForm.qcDays : "",
        productSyncDate: moment(dataForm.productSyncDate).format("YYYY-MM-DD"),
        embroiderDate: moment(dataForm.embroiderDate).format("YYYY-MM-DD"),
        produceCutDate: moment(dataForm.produceCutDate).format("YYYY-MM-DD"),
        qcDate: moment(dataForm.qcDate).format("YYYY-MM-DD"),
        qcCustomerDate: moment(dataForm.qcCustomerDate).format("YYYY-MM-DD"),
        warehouseReceipDate: moment(dataForm.warehouseReceipDate).format(
          "YYYY-MM-DD"
        ),
      });
      // setOrderValue({
      //   value: dataForm.orderId.id,
      //   label: dataForm.orderId.name,
      // });
      setProductValue({
        value: dataForm.productTypeId.id,
        label: dataForm.productTypeId.name,
      });
      setCustomerOrganValue(
        dataForm.customerOrganizationIds.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
      if (!_.isEmpty(dataForm?.producerId?.id)) {
        setProducerValue({
          value: dataForm.producerId.id,
          label: dataForm.producerId.name,
        });
      }
    }
  }, [dataForm]);

  return (
    <>
      <Modal
        size="lg"
        isOpen={open}
        toggle={() => {
          setFormModal(false);
        }}
      >
        <Formik
          initialValues={workPlanInfo}
          enableReinitialize
          onSubmit={isModalAdd ? handleCreate : handleUpdate}
          validationSchema={workPlanSchema}
        >
          {({
            values,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
            handleChange,
            resetForm,
            handleBlur,
          }) => {
            console.log("errors: ", errors);
            return (
              <>
                <Card className="mb-0 pb-5">
                  <CardHeader>
                    <p className="h2 text-uppercase">
                      Kế hoạch triển khai sản xuất cho đơn hàng
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Mã kế hoạch
                        </p>
                      </Col>
                      <Col xs={9}>
                        <InputCustom
                          style={{ flex: 1 }}
                          invalid={errors.code && touched.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="code"
                          value={values.code}
                          messageInvalid={errors.code}
                          type="text"
                          placeholder="Nhập mã kế hoạch"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Tên kế hoạch
                        </p>
                      </Col>
                      <Col xs={9}>
                        <InputCustom
                          style={{ flex: 1 }}
                          invalid={errors.name && touched.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="name"
                          value={values.name}
                          messageInvalid={errors.name}
                          type="text"
                          placeholder="Nhập mã kế hoạch"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">Sản phẩm</p>
                      </Col>
                      <Col xs={9}>
                        <Select
                          placeholder="Chọn sản phẩm"
                          isClearable={true}
                          value={productValue}
                          onChange={(e) => {
                            setProductValue({ ...e });
                            setFieldValue("productTypeId", e ? e.value : "");
                          }}
                          options={products.results.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          onInputChange={(value) => {
                            setProductName(value);
                          }}
                          onFocus={() => {
                            setFocused({
                              ...focused,
                              productTypeId: true,
                            });
                          }}
                        />
                        {errors.productTypeId && focused.productTypeId && (
                          <Error messageInvalid={errors.productTypeId} />
                        )}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Đơn vị/Phòng ban
                        </p>
                      </Col>
                      <Col xs={9}>
                        <Select
                          placeholder="Lựa chọn"
                          value={customerOrganValue}
                          components={animatedComponents}
                          className="select-muti"
                          isMulti
                          closeMenuOnSelect={false}
                          isClearable={false}
                          onChange={(e, remove) => {
                            if (_.isEmpty(remove?.removedValue)) {
                              setCustomerOrganValue([...e]);
                              setFieldValue("customerOrganizationIds", [
                                ...e.map((item) => item.value),
                              ]);
                            } else {
                              const tempListCustomerOrganValue =
                                customerOrganValue.filter(
                                  (item) =>
                                    item.value !== remove.removedValue.value
                                );
                              setCustomerOrganValue(tempListCustomerOrganValue);
                              const tempCustomerOrganIds =
                                values.customerOrganizationIds.filter(
                                  (item) => item !== remove.removedValue.value
                                );

                              setFieldValue(
                                "customerOrganizationIds",
                                tempCustomerOrganIds
                              );
                            }
                          }}
                          options={customers.results.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          onInputChange={(value) => {
                            setCustomerOrganName(value);
                          }}
                          onFocus={() => {
                            setFocused({
                              ...focused,
                              customerOrganizationIds: true,
                            });
                          }}
                        />
                        {values.customerOrganizationIds.length === 0 &&
                          focused.customerOrganizationIds && (
                            <Error messageInvalid="Vui lòng chọn đơn vị/ phòng ban!" />
                          )}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Đơn vị gia công/Nhà cung cấp
                        </p>
                      </Col>
                      <Col xs={9}>
                        <Select
                          placeholder="Lựa chọn"
                          isClearable={true}
                          value={producerValue}
                          id="producerId"
                          name="producerId"
                          onChange={(e) => {
                            setProducerValue({ ...e });
                            setFieldValue("producerId", e ? e.value : "");
                          }}
                          options={producers.results.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          onInputChange={(value) => {
                            setProducerName(value);
                          }}
                          onFocus={() => {
                            setFocused({
                              ...focused,
                              producerId: true,
                            });
                          }}
                        />
                        {errors.producerId && focused.producerId && (
                          <Error messageInvalid={errors.producerId} />
                        )}
                      </Col>
                    </Row>
                    <p className="h3 text-sm font-weight-500">Mốc thời gian</p>
                    <Row>
                      <Col xs={4}>
                        <p className="h5 text-sm font-weight-400 mb-0">
                          Ngày đồng bộ NPL
                        </p>
                        <InputCustom
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="productSyncDate"
                          value={values.productSyncDate}
                        />
                      </Col>
                      <Col xs={4}>
                        <p className="h5 text-sm font-weight-400 mb-0">
                          Ngày thêu
                        </p>
                        <InputCustom
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="embroiderDate"
                          value={values.embroiderDate}
                        />
                      </Col>
                      <Col xs={4}>
                        <p className="h5 text-sm font-weight-400 mb-0">
                          Ngày cắt SX
                        </p>
                        <InputCustom
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="produceCutDate"
                          value={values.produceCutDate}
                        />
                      </Col>
                      <Col xs={4}>
                        <p className="h5 text-sm font-weight-400 mb-0 mt-2">
                          Ngày giao GC
                        </p>
                        <InputCustom
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="qcDate"
                          value={values.qcDate}
                        />
                      </Col>
                      <Col xs={4}>
                        <p className="h5 text-sm font-weight-400 mb-0 mt-2">
                          Ngày QC KH
                        </p>
                        <InputCustom
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="qcCustomerDate"
                          value={values.qcCustomerDate}
                        />
                      </Col>
                      <Col xs={4}>
                        <p className="h5 text-sm font-weight-400 mb-0 mt-2">
                          Ngày NK KH
                        </p>
                        <InputCustom
                          type="date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="warehouseReceipDate"
                          value={values.warehouseReceipDate}
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-between">
                      <Col xs={5}>
                        <p className="h3 text-sm font-weight-500 mr-3 mb-0 mt-2">
                          Số ngày SX
                        </p>
                        <InputCustom
                          style={{ flex: 1 }}
                          invalid={
                            errors.productionDays && touched.productionDays
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="productionDays"
                          value={values.productionDays}
                          messageInvalid={errors.productionDays}
                          type="text"
                          placeholder="số"
                        />
                      </Col>
                      <Col xs={5}>
                        <p className="h3 text-sm font-weight-500 mr-3 mb-0 mt-2">
                          Số ngày QC
                        </p>
                        <InputCustom
                          style={{ flex: 1 }}
                          type="text"
                          placeholder="số"
                          invalid={errors.qcDays && touched.qcDays}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="qcDays"
                          value={values.qcDays}
                          messageInvalid={errors.qcDays}
                        />
                      </Col>
                    </Row>
                    <Row></Row>
                  </CardBody>
                  <div className="d-flex justify-content-center">
                    <Button
                      onClick={() => {
                        setFormModal(false);
                      }}
                    >
                      Hủy bỏ
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => {
                        setFocused({
                          orderId: true,
                          customerOrganizationIds: true,
                          productTypeId: true,
                          producerId: true,
                        });
                        handleSubmit();
                      }}
                    >
                      {isModalAdd ? "Thêm mới" : "Lưu lại"}
                    </Button>
                  </div>
                </Card>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default DialogAddWorkForPlanV2;
