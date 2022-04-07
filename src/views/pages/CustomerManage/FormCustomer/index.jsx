import React, { useEffect, useRef, useState } from "react";
import { GET } from "Services/ServiceBase";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  DropdownItem,
  Button,
  CardBody,
  Form,
  CardHeader,
  Modal,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { useSelector, useDispatch } from "react-redux";
import { customerActions } from "Redux/Actions";
import ServiceURL from "Services/ServiceURL";
// import { notify } from "common";
import Select from "react-select";
import TypeActions from "Redux/TypeActions";
import { provincesActions } from "Redux/Actions";
import queryString from "query-string";
import * as yup from "yup";
import { Formik } from "formik";
import _ from "lodash";
import Error from "views/pages/components/Error";
const FormCustomer = ({
  formModal,
  customer,
  isModalAdd,
  closeModal,
  notificationAlertRef,
  notify,
  handleGetCustomersManage,
}) => {
  const customerSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên khách hàng!"),
    code: yup.string().required("Vui lòng nhập mã khách hàng!"),
    address: yup.string().required("Vui lòng nhập địa chỉ!"),
    // parentId: yup.string().required("Vui lòng chọn đơn vị cha!"),
    contactPerson: yup.string().required("Vui lòng nhập người lên hệ!"),
    provinceId: yup.string().required("Vui lòng chọn tỉnh thành!"),
    phone: yup
      .string()
      .required("Số điện thoại không được để trống!")
      .matches("0[1-9][0-9]{8}", "Vui lòng nhập đúng định dạng số điện thoại!"),
  });
  const { provinces } = useSelector((state) => state.provincesReducer);
  const { isAddCustomer, customers } = useSelector(
    (state) => state.customerReducer
  );
  const dispatch = useDispatch();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    code: "",
    address: "",
    contactPerson: "",
    parentId: "",
    provinceId: "",
    phone: "",
  });
  const [customerValue, setCustomerValue] = useState({});
  const [provinceValue, setProvinceValue] = useState({});
  const [customerSearch, setCustomerSearch] = useState("");
  const [query, setQuery] = useState({
    status: "active",
  });
  const [changed, setChanged] = useState({
    parentId: false,
    provinceId: false,
  });

  const updateCustomer = (values, actions) => {
    // delete values["level"];
    // delete values["childrentIds"];
    if (!values.parentId) {
      delete values["parentId"];
    }
    dispatch(
      customerActions.updateCustomer(values, customer.id, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Cập nhật khách hàng thành công!`
          );
          closeModal();
          handleGetCustomersManage();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Cập nhật khách hàng thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };
  const createCustomer = (values, actions) => {
    if (!values.parentId) {
      delete values["parentId"];
    }
    dispatch(
      customerActions.createCustomer(values, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Thêm khách hàng thành công!`
          );
          closeModal();
          handleGetCustomersManage();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Thêm khách hàng thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };
  const onSubmit = (values, actions) => {
    isModalAdd
      ? createCustomer(values, actions)
      : updateCustomer(values, actions);
  };
  const handleGetCustomers = () => {
    if (customerSearch === "") {
      dispatch(customerActions.getCustomers(queryString.stringify(query)));
    } else {
      dispatch(
        customerActions.getCustomers(
          queryString.stringify({ ...query, name: customerSearch })
        )
      );
    }
  };
  useEffect(() => {
    handleGetCustomers();
  }, [customerSearch]);

  useEffect(() => {
    dispatch(
      provincesActions.getProvinces(queryString.stringify({ limit: 100 }))
    );
  }, []);
  useEffect(() => {
    if (!_.isEmpty(customer)) {
      if (!_.isEmpty(customer?.parentId?.id)) {
        setCustomerInfo({
          name: customer.name,
          code: customer.code,
          address: customer.address,
          contactPerson: customer.contactPerson,
          provinceId: customer.provinceId.id,
          phone: customer.phone,
          parentId: customer.parentId.id,
        });
        setCustomerValue({
          value: customer.parentId.id,
          label: customer.parentId.name,
        });
        setProvinceValue({
          value: customer.provinceId.id,
          label: customer.provinceId.provinceName,
        });
      } else {
        setCustomerInfo({
          name: customer.name,
          code: customer.code,
          address: customer.address,
          contactPerson: customer.contactPerson,
          provinceId: customer.provinceId.id,
          phone: customer.phone,
        });
      }
    }
  }, [customer]);

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={formModal}
        toggle={closeModal}
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
                  <CardBody className="px-lg-5 py-lg-3">
                    <Form className="needs-validation" noValidate>
                      <Row className="mt-2">
                        <Col md="12">
                          <InputCustom
                            label="Tên khách hàng"
                            placeholder="Nhập tên"
                            type="text"
                            name="name"
                            id="name"
                            invalid={touched.name && errors.name}
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
                            label="Mã khách hàng"
                            disabled={!isModalAdd}
                            placeholder="Nhập mã khách hàng"
                            type="text"
                            id="code"
                            name="code"
                            onBlur={handleBlur}
                            invalid={touched.code && errors.code}
                            onChange={(e) => {
                              setFieldValue("code", e.target.value);
                            }}
                            messageInvalid={errors.code}
                            value={values.code}
                          />
                        </Col>
                        <Col md={12}>
                          <InputCustom
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            type="text"
                            id="address"
                            name="address"
                            onBlur={handleBlur}
                            invalid={touched.address && errors.address}
                            onChange={(e) => {
                              setFieldValue("address", e.target.value);
                            }}
                            messageValid={""}
                            messageInvalid={errors.address}
                            value={values.address}
                          />
                        </Col>
                        <Col xs={6}>
                          <label className="form-control-label">
                            Đơn vị cha
                          </label>
                          <Select
                            placeholder="Nhập đơn vị cha"
                            value={customerValue}
                            isClearable={true}
                            onChange={(e) => {
                              setCustomerValue({ ...e });
                              setFieldValue("parentId", e ? e.value : "");
                            }}
                            options={customers.items.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                            onInputChange={(value) => {
                              setCustomerSearch(value);
                            }}
                            onFocus={() => {
                              setChanged({
                                ...changed,
                                parentId: true,
                              });
                            }}
                          />
                          {changed.parentId && errors.parentId && (
                            <Error messageInvalid={errors.parentId} />
                          )}
                        </Col>
                        <Col md="6" />
                        <Col md="6">
                          <InputCustom
                            label="Người liên hệ"
                            placeholder="Nhập tên người liên hệ"
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            invalid={
                              touched.contactPerson && errors.contactPerson
                            }
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue("contactPerson", e.target.value);
                            }}
                            messageInvalid={errors.contactPerson}
                            value={values.contactPerson}
                          />
                        </Col>
                        <Col md="6" />
                        <Col md="6">
                          <InputCustom
                            label="Điện thoại"
                            placeholder="Nhập số điện thoại"
                            type="text"
                            id="phone"
                            name="phone"
                            onBlur={handleBlur}
                            value={values.phone}
                            invalid={touched.phone && errors.phone}
                            onChange={(e) => {
                              setFieldValue("phone", e.target.value);
                            }}
                            messageInvalid={errors.phone}
                          />
                        </Col>
                        <Col md="6" />
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="exampleFormControlSelect3"
                            >
                              Tỉnh thành
                            </label>
                            <Select
                              placeholder="Nhập tỉnh"
                              value={provinceValue}
                              isClearable={true}
                              onChange={(e) => {
                                setProvinceValue({ ...e });
                                setFieldValue("provinceId", e ? e.value : "");
                              }}
                              options={provinces.items.map((item) => ({
                                label: item.provinceName,
                                value: item.id,
                              }))}
                              onInputChange={(value) => {
                                // setCustomerSearch(value);
                              }}
                              onFocus={() => {
                                setChanged({
                                  ...changed,
                                  provinceId: true,
                                });
                              }}
                            />
                            {changed.provinceId && errors.provinceId && (
                              <Error messageInvalid={errors.provinceId} />
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="d-flex justify-content-center">
                        <Button
                          onClick={closeModal}
                          color=""
                          size="md"
                          type="button"
                        >
                          Hủy
                        </Button>
                        <LoadingButtonCustom
                          loading={isAddCustomer}
                          onClick={() => {
                            setChanged({ parentId: true, provinceId: true });
                            handleSubmit();
                          }}
                          color="primary"
                          size="md"
                          type="button"
                        >
                          {isModalAdd ? "Thêm mới" : "Lưu lại"}
                        </LoadingButtonCustom>
                      </Row>
                    </Form>
                  </CardBody>
                );
              }}
            </Formik>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FormCustomer;
