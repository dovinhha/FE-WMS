import React, { useEffect, useRef, useState } from "react";
import { UploadSVG } from "assets/svg";
import {
  Col,
  Form,
  Row,
  Button,
  Table,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  Spinner,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import queryString, { stringify } from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { customerActions, orderActions } from "Redux/Actions";
import Select from "react-select";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";
import { notify } from "common";
import ReactNotificationAlert from "react-notification-alert";

let orderDetails = [];

const ListParent = ({
  item,
  index,
  arrOpen,
  collapsesToggle,
  life,
  products,
  customersInOrder,
  setProducts,
  handleGetCustomersInOrder,
  orderDetailsInOrder,
}) => {
  const dispatch = useDispatch();
  const [itemsInfo, setItemsInfo] = useState([]);
  const [fileValue, setFileValue] = useState("");
  const [file, setFile] = useState({});
  const { orderId } = useParams();
  const notificationAlertRef = useRef(null);
  useEffect(() => {
    const temp = [];
    if (!_.isEmpty(orderDetailsInOrder)) {
      orderDetailsInOrder.every((val) => {
        if (val.customerOrganizationId === item.id) {
          val.listProduct.forEach((v) => {
            temp.push({ ...v, amountInput: v.amount });
          });
          return false;
        }
        return true;
      });
      setItemsInfo(temp);
    }
  }, [orderDetailsInOrder]);

  useEffect(() => {
    if (!_.isEmpty(itemsInfo)) {
      const tempOrderDetails = orderDetails.filter(
        (val) => val.customerOrganizationId !== item.id
      );
      const temp = [];
      itemsInfo.forEach((val) => {
        temp.push({
          productTypeId: val.productTypeId.id,
          amount: val.amountInput === "" ? 0 : val.amountInput,
        });
      });
      const obj = {
        customerOrganizationId: item.id,
        listProduct: temp,
      };
      orderDetails = [...tempOrderDetails, obj];
    }
  }, [itemsInfo]);

  const handleChangeFile = (e, val) => {
    if (_.isEmpty(e)) return;
    const arrNameFile = e.target.files[0].name.split(".");
    if (arrNameFile[arrNameFile.length - 1] === "xlsx") {
      const params = `${orderId}/${item.id}/${val.productTypeId.id}`;
      dispatch(
        orderActions.uploadCustomerOrder(e.target.files[0], params, {
          success: () => {
            handleGetCustomersInOrder();
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Tải tệp lên thành công cho công ty/ phòng ban ${item.name}, sẩn phẩm ${val.productTypeId.name}`
            );
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Tải tệp lên không thành công cho công ty/ phòng ban ${item.name}, sẩn phẩm ${val.productTypeId.name}. Lỗi: ${mess}`
            );
          },
        })
      );
    } else {
      notify(
        notificationAlertRef,
        "danger",
        "Thông báo",
        `Vui lòng chọn đúng định dạng file exel!`
      );
    }
  };

  return (
    <Card
      style={
        life === 1
          ? {}
          : {
              boxShadow: "none",
              paddingTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
            }
      }
      className="card-plain"
    >
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <CardHeader
        style={{ padding: 8 }}
        role="tab"
        // onClick={() => collapsesToggle(index)}
        aria-expanded={arrOpen[index] || false}
      >
        <Table className="p-0">
          <tbody className="p-0">
            {itemsInfo.map((val, inVal) => {
              return (
                <tr key={inVal} className="p-0">
                  {inVal === 0 && (
                    <td
                      rowSpan={itemsInfo.length}
                      className="border-0 w-25"
                      style={{ padding: 0, paddingLeft: 8 * (life - 1) }}
                    >
                      <h5 className="mb-0">{item.name}</h5>
                    </td>
                  )}
                  <td style={{ width: "15%" }} className="py-1 px-2 border-0">
                    {val.productTypeId.name}
                  </td>
                  <td style={{ width: "15%" }} className="py-1 px-2 border-0">
                    <InputCustom
                      placeholder="Nhập số lượng"
                      type="number"
                      valid={false}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setItemsInfo([
                            ...itemsInfo.slice(0, inVal),
                            {
                              ...itemsInfo[inVal],
                              amountInput: "",
                            },
                            ...itemsInfo.slice(inVal + 1),
                          ]);
                        } else if (Number(e.target.value) >= 0) {
                          setItemsInfo([
                            ...itemsInfo.slice(0, inVal),
                            {
                              ...itemsInfo[inVal],
                              amountInput:
                                Number(e.target.value) <= val.amount
                                  ? Number(e.target.value)
                                  : val.amount,
                            },
                            ...itemsInfo.slice(inVal + 1),
                          ]);
                        }
                      }}
                      value={val.amountInput}
                      size="sm"
                    />
                  </td>
                  <td style={{ width: "20%" }} className="py-1 px-2 border-0">
                    <InputCustom
                      disabled={true}
                      type="text"
                      onChange={(e) => {
                        // setItemsInfo([
                        //   ...itemsInfo.slice(0, inVal),
                        //   {
                        //     ...itemsInfo[inVal],
                        //     contactPerson: e.target.value.trim(),
                        //   },
                        //   ...itemsInfo.slice(inVal + 1),
                        // ]);
                      }}
                      value={item.contactPerson}
                      size="sm"
                    />
                  </td>
                  <td style={{ width: "15%" }} className="py-1 px-2 border-0">
                    <InputCustom
                      placeholder="Nhập điện thoại"
                      type="number"
                      disabled={true}
                      invalid={false}
                      onChange={(e) => {
                        // setItemsInfo([
                        //   ...itemsInfo.slice(0, inVal),
                        //   {
                        //     ...itemsInfo[inVal],
                        //     phone:
                        //       e.target.value.trim() === ""
                        //         ? ""
                        //         : e.target.value,
                        //   },
                        //   ...itemsInfo.slice(inVal + 1),
                        // ]);
                      }}
                      value={item.phone}
                      size="sm"
                    />
                  </td>
                  <td style={{ width: "10%" }} className="py-1 px-2 border-0">
                    <div className="d-flex align-items-center">
                      <input
                        className="custom-file-input-css"
                        id="customFileLang"
                        lang="en"
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => handleChangeFile(e, val)}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="customFileLang">
                        <UploadSVG />
                      </label>
                      &emsp;
                      <Button color="primary" size="sm">
                        Lưu
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardHeader>
      {!_.isEmpty(item.childrentIds) && (
        <Collapse role="tabpanel" isOpen={arrOpen[index]}>
          <CardBody style={{ padding: 0 }}>
            <ListChildrent
              item={item}
              life={1}
              products={products}
              customersInOrder={customersInOrder}
              setProducts={setProducts}
              handleGetCustomersInOrder={handleGetCustomersInOrder}
              orderDetailsInOrder={orderDetailsInOrder}
            />
          </CardBody>
        </Collapse>
      )}
    </Card>
  );
};

const ListChildrent = ({
  item,
  life,
  products,
  customersInOrder,
  setProducts,
  handleGetCustomersInOrder,
  orderDetailsInOrder,
}) => {
  const dispatch = useDispatch();

  const [arrOpen, setArrOpen] = useState([]);
  const [customerById, setCustomerById] = useState({});
  const [queryCustomerId, setQueryCustomerId] = useState({
    status: "active",
    populate: "childrentIds",
  });
  const [openedCollapses, setOpenedCollapses] = useState(true);
  const collapsesToggle = (index) => {
    // let temp = [...arrOpen];
    // temp[index] = !arrOpen[index];
    // setArrOpen(temp);
  };

  const handleGetCustomerById = () => {
    dispatch(
      customerActions.getCustomerById(
        item.id,
        queryString.stringify(queryCustomerId),
        {
          success: (data) => {
            setCustomerById(data);
            const temp = [];
            data.childrentIds.forEach(() => {
              temp.push(true);
            });
            setArrOpen(temp);
          },
        }
      )
    );
  };

  useEffect(() => {
    if (!_.isEmpty(item.childrentIds)) {
      handleGetCustomerById();
    }
  }, [item]);

  return (
    !_.isEmpty(customerById) &&
    customerById.childrentIds.map((item, index) => {
      return (
        <ListParent
          item={item}
          index={index}
          key={index}
          arrOpen={arrOpen}
          collapsesToggle={collapsesToggle}
          life={life + 1}
          products={products}
          customersInOrder={customersInOrder}
          setProducts={setProducts}
          handleGetCustomersInOrder={handleGetCustomersInOrder}
          orderDetailsInOrder={orderDetailsInOrder}
        />
      );
    })
  );
};

const CustomerInfor = ({ handleChangeTab }) => {
  const { customers } = useSelector((state) => state.customerReducer);
  const [isGetCustomerById, setIsGetCustomerById] = useState(false);
  const [customerById, setCustomerById] = useState({});
  const { customersInOrder, orderById } = useSelector(
    (state) => state.orderReducer
  );
  const [orderDetailsInOrder, setOrderDetailsInOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const history = useHistory();
  const notificationAlertRef = useRef(null);
  const [openedCollapses, setOpenedCollapses] = useState(true);
  const [arrOpen, setArrOpen] = useState([]);
  const [customerValue, setCustomerValue] = useState({});
  const [customerSearch, setCustomerSearch] = useState("");
  const [queryCustomer, setQueryCustomer] = useState({
    status: "active",
  });
  const [queryCustomerId, setQueryCustomerId] = useState({
    status: "active",
    populate: "childrentIds",
  });
  const [queryCustomerInOrder, setQueryCustomerInOrder] = useState({
    populate: "productTypeId",
  });

  const [queryOrderById, setQueryOrderById] = useState({
    populate: "products.productTypeId",
  });

  const handleGetCustomers = () => {
    if (customerSearch === "") {
      dispatch(
        customerActions.getCustomers(queryString.stringify(queryCustomer))
      );
    } else {
      dispatch(
        customerActions.getCustomers(
          queryString.stringify({ ...queryCustomer, name: customerSearch })
        )
      );
    }
  };

  const collapsesToggle = (index) => {
    let temp = [...arrOpen];
    temp[index] = !arrOpen[index];
    setArrOpen(temp);
  };

  const handleGetCustomersInOrder = () => {
    dispatch(
      orderActions.getCustomersInOrder(
        queryString.stringify({ orderId: orderId })
      )
    );
  };

  const handleGetOrderById = () => {
    dispatch(
      orderActions.getOrderById(orderId, queryString.stringify(queryOrderById))
    );
  };

  useEffect(() => {
    if (orderId !== undefined) {
      handleGetCustomers();
      // handleGetOrderById();
      handleGetCustomersInOrder();
    }
  }, [queryCustomer, orderId, queryCustomerInOrder]);

  const handleGetCustomerById = (id) => {
    dispatch(
      customerActions.getCustomerById(
        id,
        queryString.stringify(queryCustomerId),
        {
          success: (data) => {
            setIsGetCustomerById(false);
            setCustomerById(data);
            const temp = [];
            data.childrentIds.forEach(() => {
              temp.push(true);
            });
            setArrOpen(temp);
          },
        }
      )
    );
  };

  // useEffect(() => {
  //   if (!_.isEmpty(customerOrganizationId)) {
  //   }
  // }, [orderById]);

  useEffect(() => {
    if (!_.isEmpty(orderById)) {
      const temp = [];
      orderById.products.forEach((item) => {
        temp.push({ ...item, amountInput: 0 });
      });
      setProducts(temp);
      setCustomerValue({
        value: orderById.customerOrganizationId.id,
        label: orderById.customerOrganizationId.name,
      });
      setOrderDetailsInOrder(orderById.orderDetails);
      handleGetCustomerById(orderById.customerOrganizationId.id);
    }
  }, [orderById]);

  const handleSubmit = () => {
    if (_.isEmpty(customerValue)) return;
    const body = {
      ...orderById,
      manager: orderById.manager.id,
      orderDetails: orderDetails,
      products: orderById.products.map((item) => ({
        amount: item.amount,
        productTypeId: item.productTypeId.id,
      })),
      // customerOrganizationId: customerValue.value,
    };
    delete body.id;
    delete body.history;
    delete body.orderStaus;
    delete body.orderPlanStatus;
    delete body.customerOrganizationId;
    dispatch(
      orderActions.updateOrder(body, orderId, {
        success: () => {
          // setTimeout(() => {
          //   history.push("/order-manage");
          // }, 2000);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Cập nhật đơn hàng thành công!`
          );
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Cập nhật đơn hàng thất bại. Lỗi: ${mess}`
          );
        },
      })
    );
  };

  return (
    <div>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <div
      // className="accordion"
      >
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <th
                  className="h3 font-weight-500 w-25 p-2"
                  style={{ paddingRight: 16 }}
                >
                  Đơn vị{" "}
                  <Select
                    isDisabled={true}
                    placeholder="Nhập tên tìm kiếm"
                    isClearable={true}
                    value={customerValue}
                    onChange={(e) => {
                      orderDetails = [];
                      setIsGetCustomerById(true);
                      setCustomerValue({ ...e });
                    }}
                    options={customers.results.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    onInputChange={(value) => {
                      setCustomerSearch(value);
                    }}
                  />
                </th>
                <th style={{ width: "15%" }} className="h3 font-weight-500 p-2">
                  Dòng sản phẩm
                </th>
                <th style={{ width: "15%" }} className="h3 font-weight-500 p-2">
                  Số lượng may
                </th>
                <th style={{ width: "20%" }} className="h3 font-weight-500 p-2">
                  Người liên hệ
                </th>
                <th style={{ width: "15%" }} className="h3 font-weight-500 p-2">
                  Điện thoại liên hệ
                </th>
                <th style={{ width: "10%" }} className="h3 font-weight-500 p-2">
                  Tải lên
                </th>
              </thead>
            </Table>
            {!_.isEmpty(customerById) &&
              customerById.childrentIds.map((item, index) => {
                return (
                  <ListParent
                    item={item}
                    index={index}
                    key={index}
                    arrOpen={arrOpen}
                    collapsesToggle={collapsesToggle}
                    life={1}
                    products={products}
                    customersInOrder={customersInOrder}
                    setProducts={setProducts}
                    handleGetCustomersInOrder={handleGetCustomersInOrder}
                    orderDetailsInOrder={orderDetailsInOrder}
                  />
                );
              })}
            {isGetCustomerById && (
              <Row className="align-items-center ">
                <Col md="12" className="d-flex justify-content-center p-5">
                  <div className="spinner-border text-info" />
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        <div className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              history.push("/order-manage");
            }}
          >
            Quay lại
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
          >
            Lưu lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfor;
