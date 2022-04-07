import React, { useState } from "react";
import { Card, Container } from "reactstrap";
import { dataTable } from "variables/general";
import { Style } from "../style";
import Header from "./components/Header";
import TableData from "./components/TableData";
import Filter from "../components/Filter";
const AggregatePlan = () => {
  const [orders, setOrders] = useState({ items: [] });
  const [orderSearch, setOrderSearch] = useState("");
  const [orderValue, setOrderValue] = useState({});
  const [opentFilter, setOpenFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    orderIds: [],
    provinceId: "",
    year: "",
  });
  const handleFilter = () => {
    console.log("values: ", filterValues);
  };
  return (
    <Style>
      <Header
        orderValue={orderValue}
        setOrderSearch={setOrderSearch}
        setOrderValue={setOrderValue}
        orders={orders}
        setOpenFilter={setOpenFilter}
        name="Quản lý kế hoạch đơn hàng"
      />
      <Container fluid className="mt--6">
        {opentFilter && (
          <Filter
            handleClose={() => setOpenFilter(false)}
            handleFilter={handleFilter}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
          />
        )}
        <Card>
          <TableData
            orderValue={orderValue}
            orderSearch={orderSearch}
            orders={orders}
            setOrders={setOrders}
            setOrderValue={setOrderValue}
          />
        </Card>
      </Container>
    </Style>
  );
};

export default AggregatePlan;
