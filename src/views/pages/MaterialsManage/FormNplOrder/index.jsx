import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  Row,
  Table,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import queryString from "query-string";
import Error from "views/pages/components/Error";
import { orderPlanActions } from "Redux/Actions";
import moment from "moment";
import _, { values } from "lodash";
import { nplOrderActions } from "Redux/Actions";
import { notify } from "common";

const FormNplOrder = ({
  open,
  setFormModal,
  isFormAdd,
  nplOrder,
  notificationAlertRef,
  orderValue,
  handleGetNplOrders,
}) => {
  const dispatch = useDispatch();

  const nplOrderSchemaCreate = yup.object().shape({
    code: yup.string().required("Mã đề xuất không được để trống!"),
    name: yup.string().required("Tên đề xuất không được để trống!"),
    orderPlanId: yup.string().required("Vui lòng chọn kế hoạch sản xuất!"),
  });
  const nplOrderSchemaUpdate = yup.object().shape({
    code: yup.string().required("Mã đề xuất không được để trống!"),
    name: yup.string().required("Tên đề xuất không được để trống!"),
    orderPlanId: yup.string().required("Vui lòng chọn kế hoạch sản xuất!"),
  });

  const [nplOrderInfo, setNplOrderInfo] = useState({
    code: "",
    name: "",
    suggestDate: new Date(),
    orderPlanId: "",
  });

  const [suggestDetails, setSuggestDetails] = useState([]);
  const [orderPlanValue, setOrderPlanValue] = useState({});
  const [orderPlanSearch, setOrderPlanSearch] = useState("");
  const { orderPlans } = useSelector((state) => state.orderPlanReducer);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    populate: "orderId",
  });
  const [focused, setFocused] = useState({
    orderPlanId: false,
  });
  const handleGetOrderPlans = () => {
    if (orderPlanSearch === "") {
      dispatch(orderPlanActions.getOrderPlans(queryString.stringify(query)));
    } else {
      dispatch(
        orderPlanActions.getOrderPlans(
          queryString.stringify({
            ...query,
            name: orderPlanSearch,
          })
        )
      );
    }
  };
  useEffect(() => {
    if (!isFormAdd) {
      setNplOrderInfo({
        name: nplOrder.name,
        code: nplOrder.code,
        orderPlanId: nplOrder.orderPlanId.id,
      });
      setOrderPlanValue({
        label: nplOrder.orderPlanId?.name,
        value: nplOrder.orderPlanId.id,
      });
      setSuggestDetails(nplOrder.suggestDetails);
    }
  }, [nplOrder]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetOrderPlans();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [orderPlanSearch]);

  const onSubmit = (values, actions) => {
    if (isFormAdd) {
      dispatch(
        nplOrderActions.createNplOrder(
          {
            orderId: orderValue.value,
            orderPlanId: values.orderPlanId,
            code: values.code,
            name: values.name,
            suggestDate: moment(values.suggestDate).format("MM/DD/YYYY"),
          },
          {
            success: () => {
              setFormModal(false);
              clearData();
              handleGetNplOrders();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Đề xuất NPL thành công!`
              );
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Đề xuất NPL thất bại. Lỗi: ${mess}!`
              );
            },
          }
        )
      );
    } else {
      dispatch(
        nplOrderActions.updateNplOrder(
          {
            orderId: orderValue.value,
            orderPlanId: values.orderPlanId,
            code: values.code,
            name: values.name,
            suggestDate: moment(values.suggestDate).format("MM/DD/YYYY"),
          },
          nplOrder.id,
          {
            success: () => {
              setFormModal(false);
              clearData();
              handleGetNplOrders();
              notify(
                notificationAlertRef,
                "success",
                "Thông báo",
                `Cập nhật đề xuất NPL thành công!`
              );
            },
            failed: (mess) => {
              notify(
                notificationAlertRef,
                "danger",
                "Thông báo",
                `Cập nhật đề xuất NPL thất bại. Lỗi: ${mess}!`
              );
            },
          }
        )
      );
    }
  };

  const clearData = () => {
    setNplOrderInfo({
      name: "",
      code: "",
      orderPlanId: "",
    });
    setOrderPlanValue({});
    setSuggestDetails([]);
  };

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
          initialValues={nplOrderInfo}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={
            isFormAdd ? nplOrderSchemaCreate : nplOrderSchemaUpdate
          }
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
                <Card className="mb-0 pb-3">
                  <CardHeader>
                    <p className="h2 text-uppercase">
                      Đề xuất mua nguyên phụ liệu
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Row className="mb-3">
                      {!isFormAdd && (
                        <>
                          <Col xs={3}>
                            <p className="h3 text-sm font-weight-500">
                              Người đề xuất
                            </p>
                          </Col>
                          <Col xs={9}>{nplOrder.createdBy.name}</Col>
                        </>
                      )}
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Ngày đề xuất
                        </p>
                      </Col>
                      <Col xs={9}>
                        {moment(nplOrder.suggestDate).format("DD/MM/YYYY")}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">Mã đề xuất</p>
                      </Col>
                      <Col xs={9}>
                        <InputCustom
                          style={{ maxWidth: 150 }}
                          type="text"
                          name="code"
                          id="code"
                          invalid={errors.code && touched.code}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("code", e.target.value);
                          }}
                          value={values.code}
                          messageInvalid={errors.code}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Tên đề xuất
                        </p>
                      </Col>
                      <Col xs={9}>
                        <InputCustom
                          type="text"
                          name="name"
                          id="name"
                          invalid={errors.name && touched.name}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("name", e.target.value);
                          }}
                          value={values.name}
                          messageInvalid={errors.name}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={3}>
                        <p className="h3 text-sm font-weight-500">
                          Kế hoạch SX
                        </p>
                      </Col>
                      <Col xs={9}>
                        <Select
                          placeholder="Lựa chọn"
                          isDisabled={!isFormAdd}
                          isClearable={true}
                          value={orderPlanValue}
                          onChange={(e) => {
                            setOrderPlanValue({ ...e });
                            setFieldValue("orderPlanId", e ? e.value : "");
                          }}
                          options={orderPlans.results
                            .map(
                              (item) =>
                                !_.isEmpty(item.orderId) && {
                                  value: item?.id,
                                  label: item?.name,
                                }
                            )
                            .filter((item) => item !== false)}
                          onInputChange={(value) => {
                            setOrderPlanSearch(value);
                          }}
                          onFocus={() => {
                            setFocused({
                              ...focused,
                              orderPlanId: true,
                            });
                          }}
                        />
                        {errors.orderPlanId && focused.orderPlanId && (
                          <Error messageInvalid={errors.orderPlanId} />
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                  <div className="d-flex justify-content-center">
                    <Button
                      onClick={() => {
                        clearData();
                        setFormModal(false);
                      }}
                    >
                      Hủy bỏ
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => {
                        setFocused({
                          orderPlanId: true,
                        });
                        handleSubmit();
                      }}
                    >
                      {isFormAdd ? "Thêm mới" : "Lưu và tải"}
                    </Button>
                  </div>
                </Card>
              </>
            );
          }}
        </Formik>
        {!isFormAdd && (
          <Card style={{ boxShadow: "none" }} className="mb-0 pb-5">
            <CardBody>
              Danh sách nguyên phụ liệu
              <Table>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Tên vật tư</td>
                    <td>Đơn vị tính</td>
                    <td>Số lượng SP</td>
                    <td>Số lượng NPL</td>
                    <td>Tồn kho</td>
                    <td>SL đặt mua</td>
                  </tr>
                </thead>
                <tbody>
                  {suggestDetails.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.materialId?.name}</td>
                        <td>{item?.materialId?.unitId?.name}</td>
                        <td>{nplOrder.totalProduct}</td>
                        <td>{item?.materialId?.amount}</td>
                        <td>{item?.remainAmount}</td>
                        <td>{item?.needBuy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        )}
      </Modal>
    </>
  );
};

export default FormNplOrder;
