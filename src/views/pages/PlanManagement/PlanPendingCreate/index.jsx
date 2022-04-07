import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableData from "./components/TableData";
import { Style } from "../style";
import SimpleHeader from "components/Headers/SimpleHeader";
import Filter from "../components/Filter";
import DialogAddWorkForPlanV2 from "./components/DialogAddWorkForPlanV2";
import { useDispatch, useSelector } from "react-redux";
import { orderPlanActions, orderActions } from "Redux/Actions";
import ReactNotificationAlert from "react-notification-alert";
import { notify } from "common";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import queryString from "query-string";
import { useHistory } from "react-router";
import { EditSVG } from "assets/svg";
import Select from "react-select";
import _ from "lodash";
import { BinSVG } from "assets/svg";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";

function PlanPendingCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isGetOrderPlans, isDeleteOrderPlan } = useSelector(
    (state) => state.orderPlanReducer
  );
  const [orders, setOrders] = useState({ items: [] });
  const [orderSearch, setOrderSearch] = useState("");
  const [orderValue, setOrderValue] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate:
      "orderId.customerOrganizationId.provinceId,customerOrganizationIds,producerId,productTypeId",
  });
  const [queryOrders, setQueryOrders] = useState({
    page: 1,
    limit: 10,
    orderPlanStatus: "0",
    orderPlanStatus: "1",
  });

  const notificationAlertRef = useRef(null);
  const [notificationModal, setNotificationModal] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [dataOrderForm, setDataOrderForm] = useState({});
  const [formModal, setFormModal] = useState(false);
  const [orderPlansData, setOrderPlansData] = useState({ items: [] });
  // const toggleFilter = () => {
  //   setOpentFilter(!opentFilter);
  // };
  // const toggleOpenAddWork = () => {
  //   setOpenAddWork(!openAddWork);
  // };
  const handleCreate = (data) => {
    const { status, orderPlanStatus, id, ...payload } = data;
    if (payload.customerOrganizationIds.length === 0) {
      console.log(payload.customerOrganizationIds.length);
      return;
    }
    dispatch(
      orderPlanActions.createOrderPlan(
        { ...payload, orderId: orderValue.value },
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Thêm công việc thành công!`
            );
            setFormModal(false);
            handleGetOrderPlans();
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Thêm công việc thất bại!`
            );
          },
        }
      )
    );
  };
  const handleUpdate = (data) => {
    const { status, id, ...payload } = data;
    if (payload.customerOrganizationIds.length === 0) {
      return;
    }
    dispatch(
      orderPlanActions.updateOrderPlan({ ...payload }, dataOrderForm.id, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Cập nhật công việc thành công!`
          );
          setFormModal(false);
          handleGetOrderPlans();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Cập nhật công việc thất bại!`
          );
        },
      })
    );
  };

  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="d-flex justify-content-center">
        <button
          className="btn-none"
          onClick={() => {
            setIsModalAdd(false);
            setDataOrderForm(row);
            setFormModal(true);
          }}
          id="edit"
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật kế hoạch
        </UncontrolledTooltip>
        <button
          className="btn-none"
          onClick={() => {
            setDataOrderForm(row);
            setNotificationModal(true);
          }}
          id="delete"
        >
          <BinSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa kế hoạch
        </UncontrolledTooltip>
      </div>
    );
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
    totalSize: orderPlansData?.totalResults,
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
            {page * rowsPerPage > orderPlansData.items.length
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
    if (!_.isEmpty(orderValue)) {
      dispatch(
        orderPlanActions.getOrderPlans(
          queryString.stringify({ ...query, orderId: orderValue.value }),
          {
            success: (data) => {
              setOrderPlansData(data);
            },
          }
        )
      );
    }
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

  const handleApprove = () => {
    dispatch(
      orderActions.approveOrder({ orderPlanStatus: 1 }, orderValue.value, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Phê duyệt đơn hàng ${orderValue.label} thành công!`
          );
          setOrderValue({});
          handleGetOrderPlans();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Phê duyệt đơn hàng ${orderValue.label} thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      orderPlanActions.deleteOrderPlan(dataOrderForm.id, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa kế hoạch thành công!`
          );
          handleGetOrderPlans();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa kế hoạch thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  // const handleFilter = (optionFilter) => {
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
  }, [query, orderValue]);

  useEffect(() => {
    handleGetOrders();
  }, [orderSearch]);
  useEffect(() => {
    handleGetOrderDefault();
  }, [queryOrders]);

  return (
    <Style>
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="kế hoạch"
          func={handleDelete}
          isDelete={isDeleteOrderPlan}
        />
      )}
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col md="6">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  Quản lý kế hoạch đơn hàng
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
              <Col md="6">
                <div className="justify-content-end d-flex">
                  {!_.isEmpty(orderValue) && (
                    <Button
                      onClick={() => {
                        setFormModal(true);
                        setIsModalAdd(true);
                      }}
                      className="btn-neutral"
                      color="default"
                    >
                      Thêm mới
                    </Button>
                  )}
                  <Button
                    // onClick={toggle}
                    className="btn-neutral"
                    color="default"
                  >
                    Lọc hiển thị
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <ToolkitProvider
                data={orderPlansData.items}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <CardHeader>
                      <Row>
                        <Col md="6">
                          <h3 className="mb-0">Danh sách kế hoạch</h3>
                        </Col>
                        <Col className="d-flex justify-content-end" md="6">
                          <Button
                            color="primary"
                            size="sm"
                            onClick={handleApprove}
                          >
                            Gửi duyệt
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    {isGetOrderPlans ? (
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
            </Card>
          </div>
        </Row>
      </Container>
      {/* {opentFilter && (
        <Filter
          ordersDefault={orders}
          handleClose={toggleFilter}
          handleFilter={handleFilter}
        />
      )} */}
      {formModal && (
        <DialogAddWorkForPlanV2
          open={formModal}
          setFormModal={setFormModal}
          isModalAdd={isModalAdd}
          dataForm={dataOrderForm}
          handleUpdate={handleUpdate}
          handleCreate={handleCreate}
        />
      )}
    </Style>
  );
}

export default PlanPendingCreate;
