import React, { useRef, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { CardHeader, Row, Col, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ViewSVG } from "assets/svg";
import { AddWorkDone } from "assets/svg";
import { ClockSVG } from "assets/svg";
import { useSelector, useDispatch } from "react-redux";
import { orderPlanActions } from "Redux/Actions";
import { notify } from "common";
import queryString from "query-string";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import moment from "moment";
import { EditSVG } from "assets/svg";

function TableData({ nameTable, data }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { orderPlans, isGetOrderPlans } = useSelector(
    (state) => state.orderPlanReducer
  );
  const [nameSearch, setNameSearch] = useState("");
  const [orderPlan, setOrderPlan] = useState({});
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate: "orderId,customerOrganizationId,producTypeId,producerId",
  });
  const notificationAlertRef = useRef(null);
  const handleView = (data) => {
    history.push(`/plan-pending-apply/${data}`);
  };

  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <button className="btn-none">
          <EditSVG />
        </button>
      </>
    );
  };
  const columns = [
    {
      dataField: "orderId.code",
      text: "Mã đơn hàng",
    },
    {
      dataField: "orderId.name",
      text: "Đơn vị thực hiện",
    },
    {
      dataField: "customerOrganizationId.name",
      text: "Tỉnh/TP",
    },
    {
      dataField: "age",
      text: "Đơn vị/Phòng ban",
    },
    {
      dataField: "qcDate",
      text: "Ngày tạo",
      formatter: (cell) => {
        return moment(cell).format("DD/MM/YYYY");
      },
    },
    {
      dataField: "startDate",
      formatter: (cell) => {
        return moment(cell).format("DD/MM/YYYY");
      },
      text: "Thời gian bắt đầu làm",
    },
    {
      dataField: "endDate",
      text: "Thời gian trả hàng",
      formatter: (cell) => {
        return moment(cell).format("DD/MM/YYYY");
      },
    },
    {
      dataField: "id",
      text: "Hành động",
      formatter: boxAction,
      formatExtraData: {
        name: "nam",
        age: "20",
      },
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
    totalSize: orderPlans?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > orderPlans.items.length
              ? !isNaN(orderPlans?.totalResults)
                ? orderPlans.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(orderPlans?.totalResults) ? orderPlans.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {
    dispatch(
      orderPlanActions.deleteOrderPlan(orderPlan.id, {
        success: () => {
          setNotificationModal(false);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa nhà sản xuất thành công!`
          );
          handleGetOrderPlans();
        },
        failed: () => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa nhà sản xuất thất bại!`
          );
        },
      })
    );
  };

  const handleGetOrderPlans = () => {
    dispatch(orderPlanActions.getOrderPlans(queryString.stringify(query)));
  };
  const handleFindOrderPlans = () => {
    setPage(1);
    if (nameSearch)
      dispatch(
        orderPlanActions.getOrderPlans(
          queryString.stringify({ ...query, page: 1, name: nameSearch })
        )
      );
    else {
      handleGetOrderPlans();
    }
  };
  useEffect(() => {
    handleGetOrderPlans();
  }, [query]);

  return (
    <>
      <ToolkitProvider
        data={orderPlans.items}
        keyField="id"
        columns={columns}
        search
      >
        {(props) => (
          <>
            <Row>
              <Col>
                <CardHeader>
                  <h3 className="mb-0">Danh sách kế hoạch chờ tạo</h3>
                </CardHeader>
              </Col>
            </Row>

            <Row>
              <Col>
                <CardHeader>
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
                    <p className="mb-0">dòng</p>
                  </div>
                </CardHeader>
              </Col>
              <Col className="d-flex align-items-center mr-4 justify-content-end">
                <Row style={{ width: "100%" }}>
                  {/* <Col
										md={6}
										className="d-flex align-items-center justify-content-end"
									>
										<h4 className="mb-0">Tìm kiếm tên kế hoạch</h4>
									</Col> */}
                  {/* <Col md={6} className="d-flex align-items-center">
										<Input
											id="search-by-name"
											placeholder="Nhập tên"
											type="text"
											onChange={(e) => {
												setNameSearch(e.target.value);
												handleFindOrderPlans();
											}}
											value={nameSearch}
											className="py-0"
											size="sm"
										/>
									</Col> */}
                </Row>
              </Col>
            </Row>
            {isGetOrderPlans ? (
              <Row className="align-items-center ">
                <Col md="12" className="d-flex justify-content-center p-5">
                  <div className="spinner-border text-info" />
                </Col>
              </Row>
            ) : (
              <>
                <div style={{ overflowX: "auto" }}>
                  <BootstrapTable
                    {...props.baseProps}
                    noDataIndication={() => {
                      return (
                        <span className="font-weight-bold text-danger">
                          Không có dữ liệu!
                        </span>
                      );
                    }}
                    hover
                    remote
                    filter={filterFactory()}
                    bootstrap4={true}
                    pagination={pagination}
                    bordered={false}
                  />
                </div>
              </>
            )}
          </>
        )}
      </ToolkitProvider>
    </>
  );
}

export default TableData;
