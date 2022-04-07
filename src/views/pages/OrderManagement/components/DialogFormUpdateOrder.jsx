import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";
import { accountActions } from "Redux/Actions";
import moment from "moment";
import queryString from "query-string";
import InputCustom from "views/pages/components/InputCustom";
import Select from "react-select";
import { productTypesActions } from "Redux/Actions";
import { orderActions } from "Redux/Actions";
import { AddSVG } from "assets/svg";
import { notify } from "common";
const DialogFormUpdateOrder = ({
  toggle,
  open,
  handleUpdate,
  dataFormModal,
}) => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customerReducer);
  const { productTypes } = useSelector((state) => state.productTypesReducer);

  const [productTypesSearch, setProductTypesSearch] = useState("");
  const notificationAlertRef = useRef(null);
  const [accountValue, setAccountValue] = useState({});
  const [accountSearch, setAccountSearch] = useState("");
  const [orderInfo, setOrderInfo] = useState({
    code: "",
    name: "",
    manager: "",
    products: [
      {
        productTypesValue: {},
        productTypeId: "",
        amount: "",
      },
    ],
    startDate: moment().unix(),
    endDate: moment().unix(),
    guaranteeDate: moment().unix(),
    actualDate: moment().unix(),
    notes: "test",
  });
  const handleAccounts = () => {
    if (accountSearch === "") {
      dispatch(
        accountActions.getAccounts(queryString.stringify({ status: "active" }))
      );
    } else {
      dispatch(
        accountActions.getAccounts(
          queryString.stringify({ status: "active", name: accountSearch })
        )
      );
    }
  };
  const handleGetProductTypes = () => {
    if (productTypesSearch === "") {
      dispatch(
        productTypesActions.getProductTypes(
          queryString.stringify({ status: "active" })
        )
      );
    } else {
      dispatch(
        productTypesActions.getProductTypes(
          queryString.stringify({
            status: "active",
            name: productTypesSearch,
          })
        )
      );
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleAccounts();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [accountSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetProductTypes();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [productTypesSearch]);
  useEffect(() => {
    if (dataFormModal && Object.keys(dataFormModal).length > 0) {
      setOrderInfo(dataFormModal);
      // setCustomers();
    }
  }, [dataFormModal]);
  // console.log(moment().toLocaleString());
  return (
    <>
      <Modal size="lg" centered isOpen={open}>
        <Card>
          <CardHeader>
            <p className="h3 font-weight-500">Cập nhật thông tin đơn hàng</p>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={3} className="h3 font-weight-400 ">
                    Mã đơn hàng
                  </Col>
                  <Col xs={4}>
                    <FormGroup>
                      <InputCustom
                        placeholder="AD123456"
                        type="text"
                        valid={false}
                        invalid={false}
                        onChange={(e) => {
                          setOrderInfo({
                            ...orderInfo,
                            code: e.target.value,
                          });
                        }}
                        // disabled={disabled}
                        value={orderInfo.code}
                        // size="sm"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} className="h3 font-weight-400">
                    Tên đơn hàng
                  </Col>
                  <Col xs={9}>
                    <FormGroup>
                      <InputCustom
                        placeholder="Nhập tên"
                        type="text"
                        valid={false}
                        invalid={false}
                        onChange={(e) => {
                          setOrderInfo({
                            ...orderInfo,
                            name: e.target.value,
                          });
                        }}
                        value={orderInfo.name}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col xs={3} className="h3 font-weight-400">
                    Chủ nhiệm quản lý
                  </Col>
                  <Col xs={9}>
                    <Select
                      placeholder="Nhập tên tìm kiếm"
                      isClearable={true}
                      value={accountValue}
                      onChange={(e) => {
                        setAccountValue({ ...e });
                        setOrderInfo({
                          ...orderInfo,
                          manager: e ? e.value : "",
                        });
                      }}
                      options={customers.items.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      defaultInputValue={
                        orderInfo?.customerOrganizationId?.name
                      }
                      onInputChange={(value) => {
                        setAccountSearch(value);
                      }}
                    />
                  </Col>
                </Row>
                {orderInfo?.products?.map((item, index) => {
                  // console.log(item);
                  return (
                    <Row>
                      <Col xs={3} className="h3 font-weight-400">
                        Chọn dòng sản phẩm
                      </Col>
                      <Col xs={9}>
                        <Row>
                          <Col xs={5}>
                            <Select
                              placeholder="Lựa chọn"
                              isClearable={true}
                              value={item.productTypesValue}
                              onChange={(e) => {
                                // setProductTypesValue({ ...e });
                                setOrderInfo({
                                  ...orderInfo,
                                  products: [
                                    ...orderInfo.products.slice(0, index),
                                    {
                                      ...orderInfo.products[index],
                                      productTypeId: !!e ? e.value : "",
                                      productTypesValue: { ...e },
                                    },
                                    ...orderInfo.products.slice(index + 1),
                                  ],
                                });
                              }}
                              options={productTypes.items.map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))}
                              onInputChange={(value) => {
                                setProductTypesSearch(value);
                              }}
                              defaultInputValue={item.productTypeId.name}
                            />
                          </Col>
                          <Col xs={7}>
                            <Row
                              className="mx-0 "
                              style={{ justifyContent: "flex-end" }}
                            >
                              <p
                                className="mb-0 mr-3 h3 font-weight-400 "
                                style={{ lineHeight: "40px" }}
                              >
                                Số lượng may
                              </p>
                              <FormGroup>
                                <InputCustom
                                  placeholder="AD123456"
                                  type="number"
                                  valid={false}
                                  invalid={false}
                                  onChange={(e) => {
                                    setOrderInfo({
                                      ...orderInfo,
                                      products: [
                                        ...orderInfo.products.slice(0, index),
                                        {
                                          ...orderInfo.products[index],
                                          amount: e.target.value,
                                        },
                                        ...orderInfo.products.slice(index + 1),
                                      ],
                                    });
                                  }}
                                  // disabled={disabled}
                                  value={item.amount}
                                  // size="sm"
                                  style={{ maxWidth: 80 }}
                                />
                              </FormGroup>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
                <Row className="pr-3" style={{ justifyContent: "flex-end" }}>
                  <span
                    onClick={() => {
                      setOrderInfo({
                        ...orderInfo,
                        products: [
                          ...orderInfo.products,
                          {
                            productTypeId: "",
                            amount: null,
                          },
                        ],
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <AddSVG />
                  </span>
                </Row>
              </Col>
              <Col xs={12}>
                <p className=" h5 text-muted text-uppercase">Thời gian</p>
                <Row className="mb-4">
                  <Col xs={6}>
                    <p className="h4 font-weight-400">
                      Thời gian bắt đầu thực hiện
                    </p>
                    <Input
                      type="date"
                      value={moment(orderInfo.startDate).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        setOrderInfo({
                          ...orderInfo,
                          startDate: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col xs={6}>
                    <p className="h4 font-weight-400">Thời gian trả hàng</p>
                    <Input
                      type="date"
                      value={moment(orderInfo.endDate).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        setOrderInfo({
                          ...orderInfo,
                          endDate: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <p className="h4 font-weight-400">Thời gian bảo hành</p>
                    <Input
                      type="date"
                      value={moment(orderInfo.guaranteeDate).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) => {
                        setOrderInfo({
                          ...orderInfo,
                          guaranteeDate: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col xs={6}>
                    <p className="h4 font-weight-400">
                      Thời gian hoàn thành chỉnh sửa
                    </p>
                    <Input
                      type="date"
                      value={moment(orderInfo.actualDate).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        setOrderInfo({
                          ...orderInfo,
                          actualDate: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="d-flex justify-content-center">
            <Button onClick={toggle}>Đóng</Button>
            <Button color="primary" onClick={() => handleUpdate(orderInfo)}>
              Cập nhật
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </>
  );
};

export default DialogFormUpdateOrder;
