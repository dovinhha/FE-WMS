import React from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

function TimelineHeader({ name, parentName, handleAdd, handleFilter }) {
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
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                {handleAdd && (
                  <Button
                    className="btn-neutral"
                    color="default"
                    size="sm"
                    onClick={handleAdd}
                  >
                    Thêm mới
                  </Button>
                )}
                {handleFilter && (
                  <Button
                    className="btn-neutral"
                    color="default"
                    size="sm"
                    onClick={handleFilter}
                  >
                    Lọc hiển thị
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

TimelineHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default TimelineHeader;
