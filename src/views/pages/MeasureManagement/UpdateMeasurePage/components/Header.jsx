/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
// import { FilterContext } from "../ListOrder/context";
import queryString from "query-string";
import orderActions from "Redux/Actions/orderActions";
function Header({
  name,
  parentName,
  toggle,
  toggleFormMeasure,
  toggleDialogExtractModal,
  setCurrentOrders,
}) {
  const dispatch = useDispatch();
  const [orderSearch, setOrderSearch] = useState("");
  const [orderValue, setOrderValue] = useState({});
  const { orders } = useSelector((state) => state.orderReducer);
  const [firstLoading, setFirstLoading] = useState(true);
  const [queryOrders, setQueryOrders] = useState({
    page: 1,
    limit: 10,
    // orderPlanStatus: "0",
    sortBy: "createdAt:desc",
  });
  const handleGetOrders = () => {
    if (orderSearch === "") {
      dispatch(
        orderActions.getOrders(queryString.stringify(queryOrders), {
          success: (data) => {
            console.log(data);
            if (firstLoading && data.items.length > 0) {
              console.log("firstLoading");
              setOrderValue({
                value: data.items[0].id,
                label: data.items[0].name,
              });
              console.log("setCurrentOrders");
              setCurrentOrders(data.items[0].id);
              setFirstLoading(false);
            }
          },
          failed: (err) => {
            console.log(err);
          },
        })
      );
    } else {
      dispatch(
        orderActions.getOrders(
          queryString.stringify({ ...queryOrders, name: orderSearch }),
          {
            success: (data) => {
              console.log(data);
              if (firstLoading && data.items.length > 0) {
                setOrderValue({
                  value: data.items[0].id,
                  label: data.items[0].name,
                });
                setFirstLoading(false);
              }
            },
            failed: (err) => {
              console.log(err);
            },
          }
        )
      );
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, [orderSearch]);
  return (
    <>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  {name}
                </h6>{" "}
                <p className="font-weight-500 mt-2 text-success">
                  Đơn hàng đang chọn:
                </p>
                <div>
                  <ReactSelect
                    className="select-custom"
                    size="sm"
                    placeholder="Chọn đơn hàng"
                    isClearable={false}
                    value={orderValue}
                    onChange={(e) => {
                      setOrderValue({ ...e });
                      setCurrentOrders(e.value);
                    }}
                    options={orders.items.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    onInputChange={(value) => {
                      setOrderSearch(value);
                    }}
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                    noOptionsMessage={() => null}
                  />
                </div>
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                <Button
                  outline={true}
                  className="text-white"
                  size="md"
                  onClick={toggleFormMeasure}
                >
                  Nhập danh sách số đo
                </Button>
                <Button
                  outline={true}
                  className="text-white"
                  size="md"
                  onClick={toggleDialogExtractModal}
                >
                  Xuất danh sách số đo
                </Button>
                <Button
                  onClick={toggle}
                  className="btn-neutral"
                  color="default"
                  size="md"
                >
                  Lọc hiển thị
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default Header;
