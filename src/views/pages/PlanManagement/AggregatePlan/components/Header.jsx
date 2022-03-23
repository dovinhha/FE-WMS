import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col } from "reactstrap";
import _ from "lodash";
import Select from "react-select";
function Header({
  name,
  setOpenFilter,
  orderValue,
  setOrderValue,
  setOrderSearch,
  orders,
}) {
  return (
    <>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                {/* <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  {name}
                </h6>
                <h5 className="text-info">Đơn hàng đang chọn:</h5>
                <div>
                  <Select
                    size="sm"
                    placeholder="Chọn đơn hàng"
                    isClearable={false}
                    value={orderValue}
                    onChange={(e) => {
                      setOrderValue({ ...e });
                    }}
                    options={orders.results.map((item) => ({
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
                </div> */}
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                <Button
                  onClick={() => {
                    setOpenFilter(true);
                  }}
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
