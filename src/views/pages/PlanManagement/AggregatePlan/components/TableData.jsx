import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import queryString from "query-string";
import { CardHeader, Row, Col, Button } from "reactstrap";
import styled from "styled-components";
import IconComponent from "utils/createSVG";
import { useHistory } from "react-router-dom";
import { ViewSVG } from "assets/svg";
import { AddWorkDone } from "assets/svg";
import { ClockSVG } from "assets/svg";
import { notify } from "common";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { orderPlanActions, orderActions } from "Redux/Actions";

function TableData({
  orders,
  setOrders,
  orderValue,
  setOrderValue,
  orderSearch,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isGetOrderPlans } = useSelector((state) => state.orderPlanReducer);
  const [orderPlansData, setOrderPlansData] = useState({ results: [] });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate:
      "orderId.customerOrganizationId.provinceId,customerOrganizationId,producerId,productTypeId",
  });
  const [queryOrders, setQueryOrders] = useState({
    page: 1,
    limit: 10,
    // orderPlanStatus: "2",
  });

  const notificationAlertRef = useRef(null);
  const [opentFilter, setOpentFilter] = useState(false);
  const [openAddWork, setOpenAddWork] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [dataOrderForm, setDataOrderForm] = useState({});
  const [idPlanSelect, setIdPlanSelect] = useState(null);
  const [notificationModal, setNotificationModal] = useState(false);
  const toggleFilter = () => {
    setOpentFilter(!opentFilter);
  };

  const columns = [
    {
      dataField: "orderId.customerOrganizationId.name",
      text: "Đơn vị thực hiện",
    },
    {
      dataField: "orderId.customerOrganizationId.provinceId.provinceName",
      text: "Tỉnh/TP",
    },
    {
      dataField: "customerOrganizationId.name",
      text: "Đơn vị/Phòng ban",
    },
    {
      dataField: "productTypeId.code",
      text: "Mã sản phẩm",
    },
    {
      dataField: "productTypeId.name",
      text: "Tên sản phẩm",
    },
    {
      dataField: "productTypeId.gender",
      text: "Giới tính",
    },
    {
      dataField: "productTypeId.amount",
      text: "SL HĐ",
    },
    {
      dataField: "producerId.name",
      text: "Nhà gia công",
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
    totalSize: orderPlansData?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > orderPlansData.results.length
              ? !isNaN(orderPlansData?.totalResults)
                ? orderPlansData.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(orderPlansData?.totalResults)
              ? orderPlansData.totalResults
              : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });
  const handleGetOrderPlans = () => {
    // if (!_.isEmpty(orderValue)) {
    dispatch(
      orderPlanActions.getOrderPlans(queryString.stringify(query), {
        success: (data) => {
          setOrderPlansData(data);
        },
      })
    );
    // }
  };
  // const handleGetOrderDefault = () => {
  //   dispatch(
  //     orderActions.getOrders(queryString.stringify(queryOrders), {
  //       success: (data) => {
  //         setOrders(data);
  //         if (!_.isEmpty(data?.results[0])) {
  //           setOrderValue({
  //             label: data.results[0].name,
  //             value: data.results[0].id,
  //           });
  //         }
  //       },
  //     })
  //   );
  // };
  // const handleGetOrders = () => {
  //   if (orderSearch === "" && !_.isEmpty(orderValue)) {
  //     dispatch(
  //       orderActions.getOrders(queryString.stringify(queryOrders), {
  //         success: (data) => {
  //           setOrders(data);
  //         },
  //       })
  //     );
  //   } else if (!_.isEmpty(orderValue)) {
  //     dispatch(
  //       orderActions.getOrders(
  //         queryString.stringify({ ...queryOrders, name: orderSearch }),
  //         {
  //           success: (data) => {
  //             setOrders(data);
  //           },
  //         }
  //       )
  //     );
  //   }
  // };

  // const handleFilter = (optionFilter) => {
  //   // console.log("optionFilter: ", optionFilter);
  //   Object.keys(optionFilter).map((key, index) => {
  //     if (optionFilter[key] === "") {
  //       delete optionFilter[key];
  //     }
  //   });
  //   dispatch(
  //     orderActions.getOrders(
  //       queryString.stringify({ ...queryOrders, ...optionFilter }),
  //       {
  //         success: (data) => {
  //           setOrders(data);
  //         },
  //       }
  //     )
  //   );
  // };

  useEffect(() => {
    handleGetOrderPlans();
  }, [query]);

  // useEffect(() => {
  //   handleGetOrderDefault();
  // }, [queryOrders]);

  // useEffect(() => {
  //   handleGetOrders();
  // }, [orderSearch]);
  return (
    <>
      <ToolkitProvider
        data={orderPlansData.results}
        keyField="id"
        columns={columns}
        search
      >
        {(props) => (
          <>
            <CardHeader>
              <Row>
                <Col md="6">
                  <h3 className="mb-0">Bảng tổng hợp kế hoạch đơn hàng</h3>
                </Col>
                <Col md="6">
                  <div className="mb-0 d-flex justify-content-end">
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
                </Col>
              </Row>
            </CardHeader>
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
