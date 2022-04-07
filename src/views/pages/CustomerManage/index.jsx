import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import SimpleHeader from "./components/Header";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import { EditSVG, DeleteSVG } from "assets/svg";
import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import { customerActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify } from "common";
import NotificationAlert from "react-notification-alert";
import InputCustom from "views/pages/components/InputCustom";
import FormCustomer from "./FormCustomer";
import ReactNotificationAlert from "react-notification-alert";

const CustomerManage = () => {
  const notificationAlertRef = useRef(null);
  const dispatch = useDispatch();
  const { isDeleteCustomer } = useSelector((state) => state.customerReducer);
  const [isGetCustomers, setIsGetCustomers] = useState(false);
  const [customers, setCustomers] = useState({ items: [] });
  const [customerSearch, setCustomerSearch] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [dataFormModal, setDataFormModal] = useState({});
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    // level: "0",
    status: "active",
    populate: "childrentIds, parentId, provinceId",
  });
  const [idCustomerSelect, setIdCustomerSelect] = useState(null);
  const closeModal = () => {
    setFormModal(false);
    setDataFormModal({});
  };
  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <button
          style={{
            padding: 0,
            border: "none",
            marginRight: ".5rem",
            background: "none",
          }}
          id="edit"
          onClick={() => {
            setFormModal(true);
            setIsModalAdd(false);
            setDataFormModal(row);
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật thông tin khách hàng
        </UncontrolledTooltip>
        <button
          id="delete"
          onClick={() => {
            setNotificationModal(true);
            setIdCustomerSelect(row.id);
          }}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa khách hàng
        </UncontrolledTooltip>
      </>
    );
  };
  const columns = [
    {
      dataField: "code",
      text: "Mã số",
    },
    {
      dataField: "name",
      text: "Tên đơn vị",
    },
    {
      dataField: "childrentIds",
      text: "Chi nhánh/phòng ban",
      formatter: (cell) => {
        return cell.map((item, index) =>
          index === cell.length - 1 ? `${item.name}.` : `${item.name}, `
        );
      },
    },
    {
      dataField: "phone",
      text: "Số điện thoại",
    },
    {
      dataField: "contactPerson",
      text: "Người liên hệ",
    },
    {
      dataField: "address",
      text: "Địa chỉ",
      style: {
        width: 300,
      },
      headerStyle: {
        maxWidth: 300,
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
    totalSize: customers?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > customers.items.length
              ? !isNaN(customers?.totalResults)
                ? customers.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(customers?.totalResults) ? customers.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {
    dispatch(
      customerActions.deleteCustomer(idCustomerSelect, {
        success: () => {
          setNotificationModal(false);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa khách hàng thành công!`
          );
          handleGetCustomers();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa tài khoản thất bại.Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  const handleGetCustomers = () => {
    if (customerSearch === "") {
      dispatch(
        customerActions.getCustomers(queryString.stringify(query), {
          success: (data) => {
            console.log("data1: ", data);
            setCustomers(data);
            setIsGetCustomers(false);
          },
          failed: () => {
            setIsGetCustomers(false);
          },
        })
      );
    } else {
      dispatch(
        customerActions.getCustomers(
          queryString.stringify({ ...query, name: customerSearch }),
          {
            success: (data) => {
              console.log("data2: ", data);
              setCustomers(data);
              setIsGetCustomers(false);
            },
            failed: () => {
              setIsGetCustomers(false);
            },
          }
        )
      );
    }
  };

  useEffect(() => {
    setIsGetCustomers(true);
    handleGetCustomers();
  }, [query]);

  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      {formModal && (
        <FormCustomer
          handleGetCustomersManage={handleGetCustomers}
          isModalAdd={isModalAdd}
          formModal={formModal}
          setFormModal={setFormModal}
          customer={dataFormModal}
          listCustomers={customers.items}
          closeModal={closeModal}
          notify={notify}
          notificationAlertRef={notificationAlertRef}
          setNotificationModal={setNotificationModal}
        />
      )}
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="khách hàng"
          func={handleDelete}
        />
      )}
      <SimpleHeader
        name="Quản lý khách hàng"
        parentName="Quản lý"
        setFormModal={setFormModal}
        setIsModalAdd={setIsModalAdd}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={customers.items}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <Row>
                      <Col>
                        <CardHeader>
                          <h3 className="mb-0">Danh sách công ty khách hàng</h3>
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
                                onChange={(e) =>
                                  onSizePerPageChange(e.target.value)
                                }
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
                          <Col
                            md={6}
                            className="d-flex align-items-center justify-content-end"
                          >
                            <h4 className="mb-0">Tìm kiếm tên khách hàng</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nhập tên"
                              type="text"
                              onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                  handleGetCustomers();
                                }
                              }}
                              value={customerSearch}
                              onChange={(e) => {
                                setCustomerSearch(e.target.value);
                              }}
                              className="py-0"
                              bsSize="sm"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {isGetCustomers ? (
                      <Row className="align-items-center ">
                        <Col
                          md="12"
                          className="d-flex justify-content-center p-5"
                        >
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CustomerManage;
