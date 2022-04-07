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
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import filterFactory, {
  customFilter,
  textFilter,
  filterRenderer,
} from "react-bootstrap-table2-filter";

import { CardHeader, Row, Col, Input, Badge } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ViewSVG } from "assets/svg";
import { Edit2SVG } from "assets/svg";
// import DialogUpdateResult from "./DialogUpdateResult";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "Redux/Actions/orderActions";
import queryString from "query-string";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import constants from "../../../../../constant";
// const { SearchBar } = Search;
function TableData({
  currentOrders,
  listCustomerInOrderConvert,
  setListCustomerinOrderConvert,
}) {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    orderId: currentOrders,
    populate: "customerOrgId,productTypeId",
    customerInOrderStatus: constants.CUSTOMER_IN_ORDER_STATUS_PENDING_ACCEPT,
  });

  const { ordersConvert, isGetOrdersConvert } = useSelector(
    (state) => state.orderReducer
  );
  const handleGetOrdersConvert = () => {
    const payload = { ...query };
    if (payload.orderId == "") delete payload["orderId"];
    dispatch(orderActions.getOrdersConvert(queryString.stringify(payload)));
  };
  useEffect(() => {
    if (currentOrders !== "") setQuery({ ...query, orderId: currentOrders });
  }, [currentOrders]);
  useEffect(() => {
    handleGetOrdersConvert();
  }, [query]);

  const handleView = (data) => {
    history.push(`/plan-pending-apply/${data}`);
  };
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
    totalSize: ordersConvert?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > ordersConvert.items.length
              ? !isNaN(ordersConvert?.totalResults)
                ? ordersConvert.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(ordersConvert?.totalResults)
              ? ordersConvert.totalResults
              : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleEdit = (data) => {
    setIsOpenModal(true);
    setDataModal(data);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setDataModal({});
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <button className="btn-none">
          <ViewSVG />
        </button>
        <button
          className="btn-none"
          onClick={() => {
            handleEdit(row);
          }}
        >
          <Edit2SVG />
        </button>
      </>
    );
  };
  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    selectColumnPosition: "right",
    onSelect: (row, isSelect) => {
      console.log("an item", isSelect);
      if (isSelect) {
        const data = [...listCustomerInOrderConvert, row.id];
        setListCustomerinOrderConvert(data);
      } else {
        let data = [...listCustomerInOrderConvert];
        const index = listCustomerInOrderConvert.indexOf(row.id);
        if (index > -1) {
          data.splice(index, 1); // 2nd parameter means remove one item only
        }
        setListCustomerinOrderConvert(data);
      }
    },
    onSelectAll: (isSelect, rows) => {
      console.log("all");
      if (isSelect) {
        const data = rows.map((item) => item.id);
        setListCustomerinOrderConvert(data);
      } else {
        setListCustomerinOrderConvert([]);
      }
    },
    selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
      <div className="text-md-right" style={{ verticalAlign: "inherit" }}>
        Lựa chọn{" "}
        <input
          type="checkbox"
          style={{ height: "unset", verticalAlign: "inherit" }}
          ref={(input) => {
            if (input) input.indeterminate = indeterminate;
          }}
          {...rest}
        />
      </div>
    ),
    selectionRenderer: ({ mode, ...rest }) => (
      <div className="d-flex justify-content-end">
        <input type={mode} {...rest} />
      </div>
    ),
  };
  const columns = [
    {
      dataField: "customerCode",
      text: "",
      filter: textFilter(),
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Mã nhân viên"
        />
      ),
    },
    {
      dataField: "customerName",
      text: "",
      filter: customFilter(),
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Tên nhân viên"
        />
      ),
    },
    {
      dataField: "customerOrgId.name",
      text: "Đơn vị/Phòng ban",
    },
    {
      dataField: "",
      text: "Ngày cập nhật",
    },
    {
      dataField: "",
      text: "",
      headerFormatter: (column) => {
        return (
          <div className="customHeader">
            <tr>
              <td colSpan="4">Chỉ tiêu may thêm</td>
            </tr>

            <tr>
              <td>Số lượng</td>
              <td>Loại SP</td>
              <td>Đơn giá</td>
              <td>Thành tiền</td>
            </tr>
          </div>
        );
      },
      formatter: (cell, row) => {
        if (
          row.customerInOrderType === constants.CUSTOMER_IN_ORDER_TYPE_ADDITION
        )
          return (
            <>
              <td style={{ border: "none", padding: "none" }}>{row.quota}</td>
              <td style={{ border: "none", padding: "none" }}>
                {row?.productTypeId?.name}
              </td>
              <td style={{ border: "none", padding: "none" }}>
                {row?.productTypeId?.price}
              </td>
              <td style={{ border: "none", padding: "none" }}>
                {row?.quota * row.productTypeId?.price}
              </td>
            </>
          );
      },
    },
    {
      dataField: "salary",

      headerFormatter: (column) => {
        return (
          <div className="customHeader">
            <tr>
              <td colSpan="4">Chỉ tiêu chuyển đổi</td>
            </tr>
            <tr>
              <td>Số lượng</td>
              <td>Loại SP</td>
              <td>Đơn giá</td>
              <td>Thành tiền</td>
            </tr>
          </div>
        );
      },
      formatter: (cell, row) => {
        if (
          row.customerInOrderType === constants.CUSTOMER_IN_ORDER_TYPE_CONVERT
        )
          return (
            <>
              <td style={{ border: "none", padding: "none" }}>{row.quota}</td>
              <td style={{ border: "none", padding: "none" }}>
                {row?.productTypeId?.name}
              </td>
              <td style={{ border: "none", padding: "none" }}>
                {row?.productTypeId?.price}
              </td>
              <td style={{ border: "none", padding: "none" }}>
                {row?.quota * row.productTypeId?.price}
              </td>
            </>
          );
      },
    },
    {
      dataField: "customerInOrderStatus",
      text: "Trạng thái",
      formatter: (cell) => {
        console.log(cell);
        if (cell === constants.CUSTOMER_IN_ORDER_STATUS_INIT)
          return (
            <Badge className="badge-dot mr-4" color="">
              <i className="bg-success" />
              <span className="status">Khởi tạo</span>
            </Badge>
          );
        else if (cell === constants.CUSTOMER_IN_ORDER_STATUS_PENDING_SEND)
          return (
            <Badge className="badge-dot mr-4" color="">
              <i className="bg-info" />
              <span className="status">Chờ gửi duyệt</span>
            </Badge>
          );
        else if (cell === constants.CUSTOMER_IN_ORDER_STATUS_PENDING_ACCEPT)
          return (
            <Badge className="badge-dot mr-4" color="">
              <i className="bg-info" />
              <span className="status">Chờ duyệt</span>
            </Badge>
          );
        else if (cell === constants.CUSTOMER_IN_ORDER_STATUS_ACCEPT)
          return (
            <Badge className="badge-dot mr-4" color="">
              <i className="bg-primary" />
              <span className="status">Đã duyệt</span>
            </Badge>
          );
        else if (cell === constants.CUSTOMER_IN_ORDER_STATUS_REJECT)
          return (
            <Badge className="badge-dot mr-4" color="">
              <i className="bg-danger" />
              <span className="status">Đã hủy</span>
            </Badge>
          );
        else return <>Chưa rõ</>;
      },
    },
  ];
  return (
    <>
      <ToolkitProvider
        data={[...ordersConvert.items]}
        keyField="id"
        columns={columns}
        search
      >
        {(props) => (
          <>
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
            </Row>
            {isGetOrdersConvert ? (
              <Row className="align-items-center ">
                <Col md="12" className="d-flex justify-content-center p-5">
                  <div class="spinner-border text-info" />
                </Col>
              </Row>
            ) : (
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
                selectRow={selectRow}
                filter={filterFactory()}
                bootstrap4={true}
                pagination={pagination}
                bordered={false}
              />
            )}
          </>
        )}
      </ToolkitProvider>
      {/* <DialogUpdateResult
				open={isOpenModal}
				data={dataModal}
				toggle={handleCloseModal}
			/> */}
    </>
  );
}

export default TableData;
