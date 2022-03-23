import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import _ from "lodash";
function Header({ name, orderId }) {
  const history = useHistory();
  return (
    <>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  {name}
                </h6>
                {!_.isEmpty(orderId) && (
                  <h4 className="text-info mb-0">
                    Đơn hàng đang chọn: {orderId.name}
                  </h4>
                )}
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                {/* <Button
                  onClick={() => {
                    history.push("/add-npl");
                  }}
                  className="btn-neutral"
                  color="default"
                  size="sm"
                >
                  Thêm mới
                </Button> */}
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
