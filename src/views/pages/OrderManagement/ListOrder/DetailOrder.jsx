import { AddSVG } from "assets/svg";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  Table,
  Collapse,
} from "reactstrap";
import queryString from "query-string";
import Header from "views/pages/OrderManagement/components/Header";
import { Style } from "../style";
import { orderActions, customerActions } from "Redux/Actions";
import moment from "moment";
import _ from "lodash";

let orderDetails = [];

const ListParent = ({ item, index, life, orderDetailsInOrder }) => {
  const dispatch = useDispatch();
  const [itemsInfo, setItemsInfo] = useState([]);
  const [fileValue, setFileValue] = useState("");
  const [file, setFile] = useState({});
  const { orderId } = useParams();
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
      <CardHeader style={{ padding: 8 }} role="tab">
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
                    {val.amountInput}
                  </td>
                  <td style={{ width: "20%" }} className="py-1 px-2 border-0">
                    {item.contactPerson}
                  </td>
                  <td style={{ width: "15%" }} className="py-1 px-2 border-0">
                    {item.phone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardHeader>
      {!_.isEmpty(item.childrentIds) && (
        <Collapse role="tabpanel" isOpen={true}>
          <CardBody style={{ padding: 0 }}>
            <ListChildrent
              item={item}
              life={1}
              orderDetailsInOrder={orderDetailsInOrder}
            />
          </CardBody>
        </Collapse>
      )}
    </Card>
  );
};

const ListChildrent = ({ item, life, orderDetailsInOrder }) => {
  const dispatch = useDispatch();
  const [customerById, setCustomerById] = useState({});
  const [queryCustomerId, setQueryCustomerId] = useState({
    status: "active",
    populate: "childrentIds",
  });
  const handleGetCustomerById = () => {
    dispatch(
      customerActions.getCustomerById(
        item.id,
        queryString.stringify(queryCustomerId),
        {
          success: (data) => {
            setCustomerById(data);
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
          life={life + 1}
          orderDetailsInOrder={orderDetailsInOrder}
        />
      );
    })
  );
};

const DetailOrder = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [query, setQuery] = useState({
    populate:
      "customerOrganizationId,manager,products.productTypeId, orderDetails.listProduct.productTypeId",
  });
  const [customerById, setCustomerById] = useState({});
  const [orderDetailsInOrder, setOrderDetailsInOrder] = useState({});
  const { orderById, isGetOrderById } = useSelector(
    (state) => state.orderReducer
  );
  const [queryCustomerId, setQueryCustomerId] = useState({
    status: "active",
    populate: "childrentIds",
  });

  useEffect(() => {
    dispatch(orderActions.getOrderById(id, queryString.stringify(query)));
  }, [query]);

  const handleGetCustomerById = () => {
    if (!_.isEmpty(orderById)) {
      dispatch(
        customerActions.getCustomerById(
          orderById.customerOrganizationId.id,
          queryString.stringify(queryCustomerId),
          {
            success: (data) => {
              setCustomerById(data);
            },
          }
        )
      );
    }
  };

  useEffect(() => {
    handleGetCustomerById();
  }, [queryCustomerId, orderById]);

  useEffect(() => {
    setOrderDetailsInOrder(orderById.orderDetails);
  }, [orderById]);

  return (
    <Style>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  Xem chi tiết thông tin
                </h6>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container fluid className="mt--6">
        <Card>
          <CardHeader>
            <p className="h3 text-uppercase">Thông tin đơn hàng</p>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={7} style={{ borderRight: "1px solid #BABCBE" }}>
                <Row>
                  <Col xs={3} className="h3 font-weight-500">
                    Mã đơn hàng
                  </Col>
                  <Col xs={4}>
                    <p className="h4 font-weight-400">{orderById.code}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} className="h3 font-weight-500">
                    Tên đơn hàng
                  </Col>
                  <Col xs={9}>
                    <p className="h4 font-weight-400">{orderById.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} className="h3 font-weight-500">
                    Chủ nhiệm quản lý
                  </Col>
                  <Col xs={9}>
                    <p className="h4 font-weight-400">
                      {orderById.manager?.name}
                    </p>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={6}>Dòng sản phẩm</Col>
                  <Col xs={3}>Đơn giá</Col>
                  <Col xs={3}>Số lượng</Col>
                  {orderById.products?.map((i) => {
                    return (
                      <>
                        <Col xs={6}>{i.productTypeId.name}</Col>
                        <Col xs={3}>
                          <p className="text-md">{i.price}</p>
                        </Col>
                        <Col xs={3}>
                          <p className="text-md">{i.amount}</p>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </Col>
              <Col xs={5}>
                <p className="h4 text-muted text-uppercase">Thời gian</p>
                <div className="mt-3">
                  <Row>
                    <Col className="h3 font-weight-500">
                      Thời gian bắt đầu thực hiện
                    </Col>
                    <Col className="h4 font-weight-400">
                      {moment(orderById.startDate).format("DD/MM/YYYY")}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="h3 font-weight-500">Thời gian trả hàng</Col>
                    <Col className="h4 font-weight-400">
                      {moment(orderById.endDate).format("DD/MM/YYYY")}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="h3 font-weight-500">Thời gian bảo Hành</Col>
                    <Col className="h4 font-weight-400">
                      {moment(orderById.guaranteeDate).format("DD/MM/YYYY")}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="h3 font-weight-500">
                      Thời gian hoàn thành chỉnh sửa
                    </Col>
                    <Col className="h4 font-weight-400">
                      {moment(orderById.actualDate).format("DD/MM/YYYY")}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mt-3 p-3">
          <CardHeader>
            <p className="h3 text-uppercase">Thông tin khách hàng</p>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <th
                      className="h3 font-weight-500 w-25 p-2"
                      style={{ paddingRight: 16 }}
                    >
                      Đơn vị:{" "}
                      <span
                        style={{
                          fontFamily: "inherit",
                          fontWeight: 600,
                          lineHeight: 1.5,
                          color: "#32325d",
                          fontSize: "0.8125rem",
                        }}
                      >
                        {customerById.name}
                      </span>
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="h3 font-weight-500 p-2"
                    >
                      Dòng sản phẩm
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="h3 font-weight-500 p-2"
                    >
                      Số lượng may
                    </th>
                    <th
                      style={{ width: "20%" }}
                      className="h3 font-weight-500 p-2"
                    >
                      Người liên hệ
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="h3 font-weight-500 p-2"
                    >
                      Điện thoại liên hệ
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
                        life={1}
                        orderDetailsInOrder={orderDetailsInOrder}
                      />
                    );
                  })}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className="text-md-right">
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            Quay lại
          </Button>
        </div>
      </Container>
    </Style>
  );
};

export default DetailOrder;
