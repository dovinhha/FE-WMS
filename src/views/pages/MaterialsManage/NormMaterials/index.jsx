import React, { useState, useEffect } from "react";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  Card,
  UncontrolledTooltip,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Style } from "../style";
import SimpleHeader from "../components/Header";
import BootstrapTable from "react-bootstrap-table-next";
import { EditSVG } from "assets/svg";
import { ViewSVG } from "assets/svg";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "Redux/Actions/orderActions";
import queryString from "query-string";
import moment from "moment";
import { useHistory } from "react-router";

const NormMaterials = () => {
  const { isGetOrders, orders } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [orderSearch, setMaterialNormSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate: "orderId, productId, materialId",
  });

  const boxAction = (cell, row) => {
    return (
      <>
        <button
          id="view"
          onClick={() => {
            history.push(`/norm-materials/detail/${row.id}`);
          }}
          className="btn-none"
        >
          <ViewSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="view">
          Xem chi tiết
        </UncontrolledTooltip>
        <button
          id="edit"
          onClick={() => {
            history.push(`/norm-materials/update/${row.id}`);
          }}
          className="btn-none"
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật định mức NPL
        </UncontrolledTooltip>
      </>
    );
  };
  const columns = [
    {
      dataField: "code",
      text: "",
      filter: textFilter(),
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          className="border-bottom-search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Mã đơn hàng"
        />
      ),
    },
    {
      dataField: "name",
      text: "",
      filter: textFilter(),
      style: {
        maxWidth: 100,
      },
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          className="border-bottom-search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Tên đơn hàng"
        />
      ),
    },
    {
      dataField: "updateAt",
      text: "Ngày cập nhật",
      formatter: (cell) => {
        return cell ? moment(cell).format("DD/MM/YYYY") : "Không có dữ liệu!";
      },
    },
    {
      dataField: "personId",
      text: "Người cập nhật",
      formatter: (cell) => {
        return cell ? cell : "Không có dữ liệu!";
      },
    },
    {
      dataField: "status",
      text: "Trạng thái",
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
    },
  ];

  const onSizePerPageChange = (value) => {
    setRowsPerPage(value);
    setPage(1);
    setQuery({ ...query, page: 1, limit: value });
  };

  const pagination = paginationFactory({
    page: page,
    onPageChange: (value) => {
      setPage(value);
      setQuery({ ...query, page: value });
    },
    sizePerPage: rowsPerPage,
    totalSize: orders?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col className="d-flex align-items-center">
          <div className="mb-0 d-flex align-items-center">
            <p className="mb-0">Hiển thị </p>
            {
              <select
                value={rowsPerPage}
                name="datatable-basic_length"
                aria-controls="datatable-basic"
                className="form-control form-control-sm mx-2"
                style={{ maxWidth: 60 }}
                onChange={(e) => onSizePerPageChange(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            }{" "}
            <p className="mb-0">dòng.</p>
          </div>
          <p className="mb-0 ml-3">
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > orders.results.length
              ? !isNaN(orders?.totalResults)
                ? orders.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số {!isNaN(orders?.totalResults) ? orders.totalResults : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleGetOrders = () => {
    if (orderSearch === "") {
      dispatch(orderActions.getOrders(queryString.stringify(query)));
    } else {
      dispatch(
        orderActions.getOrders(
          queryString.stringify({ ...query, name: orderSearch })
        )
      );
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, [query]);

  return (
    <Style>
      <SimpleHeader name="Quản lý nguyên phụ liệu" handleFilter={() => {}} />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={orders.results}
                keyField="id"
                columns={columns}
                search
                bootstrap4
              >
                {(props) => (
                  <>
                    {isGetOrders ? (
                      <Row className="align-items-center ">
                        <Col
                          md="12"
                          className="d-flex justify-content-center p-5"
                        >
                          <div className="spinner-border text-info" />
                        </Col>
                      </Row>
                    ) : (
                      <>
                        <Row>
                          <Col>
                            <CardHeader>
                              <h3 className="mb-0">
                                Danh sách đơn hàng có định mức NPL cho đơn hàng
                              </h3>
                            </CardHeader>
                          </Col>
                        </Row>

                        <BootstrapTable
                          {...props.baseProps}
                          noDataIndication={() => {
                            return (
                              <span className="font-weight-bold text-danger">
                                Không có dữ liệu!
                              </span>
                            );
                          }}
                          filter={filterFactory()}
                          pagination={pagination}
                          bordered={false}
                          hover
                          striped
                          condensed
                        />
                      </>
                    )}
                  </>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </Style>
  );
};

export default NormMaterials;
