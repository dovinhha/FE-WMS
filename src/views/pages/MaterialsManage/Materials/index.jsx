import React, { useState, useEffect, useRef } from "react";
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
  Button,
} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Style } from "../style";
import BootstrapTable from "react-bootstrap-table-next";
import { EditSVG } from "assets/svg";
import { ViewSVG } from "assets/svg";
import { BinSVG } from "assets/svg";
import { useDispatch, useSelector } from "react-redux";
import { nplOrderActions, orderActions } from "Redux/Actions";
import queryString from "query-string";
import moment from "moment";
import { useHistory } from "react-router";
import FormNplOrder from "../FormNplOrder";
import ReactNotificationAlert from "react-notification-alert";
import _ from "lodash";
import Select from "react-select";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import { notify } from "common";
import NplOrderDetail from "../NplOrderDetail";
import FormNplOrderDetail from "../NplOrderDetail";

const Materials = () => {
  const { isGetNplOrders, nplOrders, isDeleteNplOrder } = useSelector(
    (state) => state.nplOrderReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const notificationAlertRef = useRef(null);
  const [notificationModal, setNotificationModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [formModalDetail, setFormModalDetail] = useState(false);
  const [isFormAdd, setIsFormAdd] = useState(false);
  const [nplOrder, setNplOrder] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate:
      "orderId, createdBy, updatedBy, orderPlanId.orderId,suggestDetails.materialId.unitId",
  });
  const [queryOrders, setQueryOrders] = useState({
    page: 1,
    limit: 10,
    orderPlanStatus: "0",
  });
  const [orderSearch, setOrderSearch] = useState("");
  const [orderValue, setOrderValue] = useState({});
  const [orders, setOrders] = useState({ items: [] });

  const boxAction = (cell, row) => {
    return (
      <>
        <button
          id="view"
          onClick={() => {
            setFormModalDetail(true);
            setNplOrder(row);
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
            // history.push(`/norm-materials/update/${row.id}`);
            setFormModal(true);
            setIsFormAdd(false);
            setNplOrder(row);
          }}
          className="btn-none"
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật đề xuất NPL
        </UncontrolledTooltip>
        <button
          className="btn-none"
          onClick={() => {
            setNplOrder(row);
            setNotificationModal(true);
          }}
          id="delete"
        >
          <BinSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa đề xuất
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
          placeholder="Mã đề xuất"
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
      dataField: "suggestDate",
      text: "Ngày cập nhật",
      formatter: (cell) => {
        return cell ? moment(cell).format("DD/MM/YYYY") : "Không có dữ liệu!";
      },
    },
    {
      dataField: "createdBy.name",
      text: "Người đề xuất",
      formatter: (cell) => {
        return cell ? cell : "Không có dữ liệu!";
      },
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
    totalSize: nplOrders?.totalResults,
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
            {page * rowsPerPage > nplOrders.items.length
              ? !isNaN(nplOrders?.totalResults)
                ? nplOrders.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(nplOrders?.totalResults) ? nplOrders.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleGetNplOrders = () => {
    dispatch(
      nplOrderActions.getNplOrders(
        queryString.stringify({ ...query, orderId: orderValue.value })
      )
    );
  };

  const handleGetOrderDefault = () => {
    dispatch(
      orderActions.getOrders(queryString.stringify(queryOrders), {
        success: (data) => {
          setOrders(data);
          if (!_.isEmpty(data?.items[0])) {
            setOrderValue({
              label: data.items[0].name,
              value: data.items[0].id,
            });
          }
        },
      })
    );
  };

  const handleGetOrders = () => {
    if (orderSearch === "" && !_.isEmpty(orderValue)) {
      dispatch(
        orderActions.getOrders(queryString.stringify(queryOrders), {
          success: (data) => {
            setOrders(data);
          },
        })
      );
    } else if (!_.isEmpty(orderValue)) {
      dispatch(
        orderActions.getOrders(
          queryString.stringify({ ...queryOrders, name: orderSearch }),
          {
            success: (data) => {
              setOrders(data);
            },
          }
        )
      );
    }
  };

  const handleDelete = () => {
    if (_.isEmpty(nplOrder)) return;
    dispatch(
      nplOrderActions.deleteNplOrder(nplOrder.id, {
        success: () => {
          setNotificationModal(false);
          setNplOrder({});
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa đề xuất thành công!`
          );
          handleGetNplOrders();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa đề xuất thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  useEffect(() => {
    handleGetOrderDefault();
  }, [queryOrders]);

  useEffect(() => {
    handleGetNplOrders();
  }, [orderValue]);

  useEffect(() => {
    handleGetOrders();
  }, [orderSearch]);

  return (
    <Style>
      {formModal && (
        <FormNplOrder
          open={formModal}
          setFormModal={setFormModal}
          isFormAdd={isFormAdd}
          nplOrder={nplOrder}
          notificationAlertRef={notificationAlertRef}
          orderValue={orderValue}
          handleGetNplOrders={handleGetNplOrders}
        />
      )}
      {formModalDetail && (
        <FormNplOrderDetail
          open={formModalDetail}
          setFormModalDetail={setFormModalDetail}
          nplOrder={nplOrder}
        />
      )}
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="đề xuất"
          func={handleDelete}
          isDelete={isDeleteNplOrder}
        />
      )}
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  Quản lý nguyên phụ liệu
                </h6>
                <h5 className="text-info">Đơn hàng đang chọn: </h5>
                <div>
                  <Select
                    className="select-custom"
                    size="sm"
                    placeholder="Chọn đơn hàng"
                    isClearable={false}
                    value={orderValue}
                    onChange={(e) => {
                      setOrderValue({ ...e });
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
                  onClick={() => {
                    // history.push("/add-npl");
                    setIsFormAdd(true);
                    setFormModal(true);
                  }}
                  className="btn-neutral"
                  color="default"
                  size="sm"
                >
                  Đề xuất NPL
                </Button>
                {nplOrders.items.length > 0 && (
                  <Button
                    // onClick={toggle}
                    className="btn-neutral"
                    color="default"
                    size="md"
                  >
                    Lọc hiển thị
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={nplOrders.items}
                keyField="id"
                columns={columns}
                search
                bootstrap4
              >
                {(props) => (
                  <>
                    {isGetNplOrders ? (
                      <Row className="align-items-center ">
                        <Col
                          md="12"
                          className="d-flex justify-content-center p-5"
                        >
                          <div className="spinner-bnplOrder text-info" />
                        </Col>
                      </Row>
                    ) : (
                      <>
                        <Row>
                          <Col>
                            <CardHeader>
                              <h3 className="mb-0">
                                Danh sách nguyên phụ liệu cho đơn hàng
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

export default Materials;
