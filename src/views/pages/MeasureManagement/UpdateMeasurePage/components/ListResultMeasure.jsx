import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import { measureSizeActions } from "Redux/Actions";
import filterFactory, {
  customFilter,
  textFilter,
  filterRenderer,
} from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Row, Col, Input, CardHeader } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ViewSVG } from "assets/svg";
import DialogUpdateResult from "./DialogUpdateResult";
import { Edit2SVG } from "assets/svg";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "Redux/Actions";
import _ from "lodash";
import { AddSVG } from "assets/svg";
import DialogDetailMeasure from "./DialogDetailMeasure";
import { notify } from "common";
import ReactNotificationAlert from "react-notification-alert";
import DialogUpdateSewMore from "./DialogUpdateSewMore";

// const { SearchBar } = Search;
function ListResultMeasure({ data, currentOrders }) {
  const { measureSizes } = useSelector((state) => state.measureSizeReducer);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const notificationAlertRef = useRef(null);
  // const { customers, isDeleteMeasureSize, isGetMeasureSizes } = useSelector(
  //   (state) => state.customerReducer
  // );
  const [measureSizeSearch, setMeasureSizeSearch] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [dataFormModal, setDataFormModal] = useState({});
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [current, setCurrent] = useState({});
  const [dataInOrder, setDataInOrder] = useState({});
  const [isShowDetailMeasure, setIsShowDetailMeasure] = useState(false);
  const [isShowDialogAddSew, setIsShowDialogAddSew] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    orderId: currentOrders,
    populate:
      "customerOrgId, customerOrgId,productTypeId,productTypeId.productTagIds,sizes.productParameterId,customerSizeId.sizes.productParameterId",
  });

  const { customersInOrder, customerInOrder, isGetCustomersInOrder } =
    useSelector((state) => state.orderReducer);

  const handleGetCustomerInOrder = () => {
    const payload = { ...query };
    if (payload.orderId == "") delete payload["orderId"];
    if (measureSizeSearch === "")
      dispatch(
        orderActions.getCustomersInOrder(queryString.stringify(payload))
      );
    else {
      dispatch(
        orderActions.getCustomersInOrder(
          queryString.stringify({ ...payload, name: measureSizeSearch })
        )
      );
    }
  };
  useEffect(() => {
    console.log(currentOrders);
    if (currentOrders) setQuery({ ...query, orderId: currentOrders });
  }, [currentOrders]);
  useEffect(() => {
    handleGetCustomerInOrder();
  }, [query]);
  const toggleShowDetailMeasure = () => {
    setIsShowDetailMeasure(!isShowDetailMeasure);
  };

  const toggleDialogAddSew = () => {
    setIsShowDialogAddSew(!isShowDialogAddSew);
  };

  const history = useHistory();
  const handleView = (data) => {
    setCurrent(data);
    toggleShowDetailMeasure();
  };

  const handleEdit = (data) => {
    setIsOpenModal(true);
    setDataModal(data);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setDataModal({});
  };
  const boxAction = (cell, row) => {
    return (
      <>
        <button className="btn-none" onClick={() => handleView(row)}>
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
        <button
          className="btn-none"
          onClick={() => {
            toggleDialogAddSew();
            setCurrent(row);
          }}
        >
          <AddSVG />
        </button>
      </>
    );
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
          className="border-bottom-search"
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
      filter: textFilter(),
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          className="border-bottom-search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Tên nhân viên"
        />
      ),
    },
    {
      dataField: "age",
      text: "Tuổi",
    },
    {
      dataField: "gender",
      text: "Giới tính",
    },
    {
      dataField: "customerOrgId.name",
      text: "Đơn vị/phòng ban",
      // hidden: true,
    },
    {
      dataField: "productTypeId.code",
      text: "Mã sản phẩm được may",
    },
    {
      dataField: "productTypeId.name",
      text: "Loại sản phẩm",
    },
    {
      dataField: "quota",
      text: "SL HĐ",
    },
    {
      dataField: "",
      text: "Ngày cập nhật",
    },
    {
      dataField: "",
      text: "Người cập nhật",
    },
    {
      dataField: "actions",
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
      console.log("value: ", value);
      setPage(value);
      setQuery({ ...query, page: value });
    },
    sizePerPage: rowsPerPage,
    totalSize: !isNaN(customersInOrder?.totalResults)
      ? customersInOrder?.totalResults
      : 0,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > customersInOrder.results.length
              ? !isNaN(customersInOrder?.totalResults)
                ? customersInOrder.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(customersInOrder?.totalResults)
              ? customersInOrder.totalResults
              : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleUpdate = (payload, id) => {
    dispatch(
      orderActions.convertMeasureSize(payload, id, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Cập nhật chuyển đổi thành công!`
          );
          handleGetCustomerInOrder();
          handleCloseModal();
        },
        failed: () => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Cập nhật chuyển đổi thất bại!`
          );
        },
      })
    );
  };

  const handleAddSewMeasure = (payload, id) => {
    dispatch(
      orderActions.addSewMeasureSize(payload, id, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Đặt may thêm thành công!`
          );
          handleGetCustomerInOrder();
          toggleDialogAddSew();
        },
        failed: () => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Đặt may thêm thất bại!`
          );
        },
      })
    );
  };
  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <ToolkitProvider
        bootstrap4
        data={customersInOrder.results}
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
            {isGetCustomersInOrder ? (
              <Row className="align-items-center ">
                <Col md="12" className="d-flex justify-content-center p-5">
                  <div className="spinner-border text-info" />
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
                filter={filterFactory()}
                bootstrap4={true}
                pagination={pagination}
                bordered={false}
              />
            )}
          </>
        )}
      </ToolkitProvider>

      {isOpenModal && (
        <DialogUpdateResult
          open={isOpenModal}
          data={dataModal}
          toggle={handleCloseModal}
          handleUpdate={handleUpdate}
        />
      )}

      {isShowDetailMeasure && (
        <DialogDetailMeasure
          open={isShowDetailMeasure}
          toggle={toggleShowDetailMeasure}
          data={current}
        />
      )}
      {isShowDialogAddSew && (
        <DialogUpdateSewMore
          open={isShowDialogAddSew}
          toggle={toggleDialogAddSew}
          data={current}
          handleAddSewMeasure={handleAddSewMeasure}
        />
      )}
    </>
  );
}

export default ListResultMeasure;
