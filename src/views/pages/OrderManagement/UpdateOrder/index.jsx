import { UserProfileSVG } from "assets/svg";
import { PaperSVG } from "assets/svg";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";
import Header from "components/Headers/SimpleHeader";
import CustomerInfor from "../components/UpdateOrderPage/CustomerInfor";
import OrderInfor from "../components/UpdateOrderPage/OrderInfor";
import { Style } from "../components/style";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { orderActions } from "Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

const UpdateOrder = () => {
  const { orderById } = useSelector((state) => state.orderReducer);
  const history = useHistory();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const [sectionState, setSectionState] = useState(0);

  const handleChangeTab = (tab) => {
    setSectionState(tab);
  };

  useEffect(() => {
    if (!!orderId) {
      dispatch(
        orderActions.getOrderById(
          orderId,
          queryString.stringify({
            populate:
              "products.productTypeId, manager, customerOrganizationId, orderDetails.listProduct.productTypeId",
          })
        )
      );
    }
  }, [orderId, sectionState]);

  return (
    <Style>
      <Header name="Thêm mới đơn hàng"></Header>
      <Container fluid className="mt--6">
        <Card className="p-3">
          <CardHeader className="py-0">
            <Row className="mx-0">
              <Row
                className={`align-items-center py-3 mx-0 ${
                  sectionState === 0 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSectionState(0);
                }}
              >
                <PaperSVG />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    sectionState !== 0 && "text-muted"
                  }`}
                >
                  Thông tin đơn hàng
                </p>
              </Row>
              <Row
                className={`align-items-center py-3 ml-5 mx-0 ${
                  sectionState === 1 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSectionState(1);
                }}
              >
                <UserProfileSVG />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    sectionState !== 1 && "text-muted"
                  }`}
                >
                  Thông tin khách hàng
                </p>
              </Row>
            </Row>
          </CardHeader>
          <CardBody>
            {sectionState === 0 ? (
              <OrderInfor
                orderById={orderById}
                handleChangeTab={handleChangeTab}
              />
            ) : (
              <CustomerInfor
                orderById={orderById}
                handleChangeTab={handleChangeTab}
              />
            )}
          </CardBody>
        </Card>
      </Container>
    </Style>
  );
};

export default UpdateOrder;
