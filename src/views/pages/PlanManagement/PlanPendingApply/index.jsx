import React, { useState, useEffect } from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "../components/Header";
import TableData from "./components/TableData";
import { Style } from "../style";

function PlanPendingApply() {
  const [orders, setOrders] = useState({ results: [] });
  const [orderSearch, setOrderSearch] = useState("");
  const [orderValue, setOrderValue] = useState({});
  return (
    <Style>
      <Header
        orders={orders}
        name="Quản lý kế hoạch đơn hàng"
        parentName="Quản lý"
        orderValue={orderValue}
        setOrderSearch={setOrderSearch}
        setOrderValue={setOrderValue}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <TableData
                orderValue={orderValue}
                orderSearch={orderSearch}
                orders={orders}
                setOrders={setOrders}
                setOrderValue={setOrderValue}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </Style>
  );
}

export default PlanPendingApply;
