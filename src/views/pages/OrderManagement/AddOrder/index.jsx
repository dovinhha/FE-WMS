import { UserProfileSVG } from "assets/svg";
import { PaperSVG } from "assets/svg";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";
import Header from "components/Headers/SimpleHeader";
import CustomerInfor from "../components/AddOrderPage/CustomerInfor";
import OrderInfor from "../components/AddOrderPage/OrderInfor";
import { Style } from "../components/style";
import { useParams, useHistory, useLocation } from "react-router-dom";

const AddOrder = () => {
  const location = useLocation();
  const history = useHistory();

  const [sectionState, setSectionState] = useState(0);

  useEffect(() => {
    if (location.pathname.includes("add-order/customer")) {
      setSectionState(1);
    }
  }, [location]);

  const handleChangeTab = (tab) => {
    console.log(tab);
    setSectionState(tab);
  };

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
                  history.push("/add-order");
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
                  // setSectionState(1);
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
              <OrderInfor handleChangeTab={handleChangeTab} />
            ) : (
              <CustomerInfor handleChangeTab={handleChangeTab} />
            )}
          </CardBody>
        </Card>
      </Container>
    </Style>
  );
};

export default AddOrder;
