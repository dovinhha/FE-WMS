import React, { useEffect, useState } from "react";
import { dataTable } from "variables/general";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
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
// core components
import SimpleHeader from "./components/Header";
import FormRole from "./FormRole";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import { EditSVG, DeleteSVG } from "assets/svg";
import { useSelector, useDispatch } from "react-redux";
import { roleActions } from "Redux/Actions";
import queryString from "query-string";

const AccountManage = () => {
  const { roles, isGetRoles } = useSelector((state) => state.roleReducer);
  const dispatch = useDispatch();

  const [formModal, setFormModal] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });

  const handleGetRoles = () => {
    dispatch(roleActions.getRoles(queryString.stringify(query)));
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
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật phân quyền
        </UncontrolledTooltip>
        <button
          onClick={() => {
            setNotificationModal(true);
          }}
          id="delete"
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa phân quyền
        </UncontrolledTooltip>
      </>
    );
  };

  const columns = [
    {
      dataField: "name",
      text: "Tên quyền",
    },
    {
      dataField: "id",
      text: "Mã quyền",
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      headerStyle: {
        textAlign: "center",
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
    totalSize: !isNaN(roles?.totalResults) ? roles.totalResults : 0,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > roles.items.length
              ? !isNaN(roles?.totalResults)
                ? roles.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số {!isNaN(roles?.totalResults) ? roles.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {};

  useEffect(() => {
    handleGetRoles();
  }, [query]);

  return (
    <>
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="phân quyền"
          func={handleDelete}
        />
      )}
      {formModal && (
        <FormRole
          isModalAdd={isModalAdd}
          formModal={formModal}
          setFormModal={setFormModal}
        />
      )}
      <SimpleHeader
        setIsModalAdd={setIsModalAdd}
        setFormModal={setFormModal}
        name="Quản lý phân quyền"
        parentName="Quản lý"
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={roles.items}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    {isGetRoles ? (
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
                              <h3 className="mb-0">Danh sách phân quyền</h3>
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
                                <h4 className="mb-0">Tìm kiếm tên quyền</h4>
                              </Col>
                              <Col md={6} className="d-flex align-items-center">
                                <Input
                                  id="search-by-name"
                                  placeholder="Nhập tên"
                                  type="text"
                                  onChange={() => {}}
                                  // value={""}
                                  className="py-0"
                                  size="sm"
                                />
                              </Col>
                            </Row>
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
                          hover
                          remote
                          filter={filterFactory()}
                          bootstrap4={true}
                          pagination={pagination}
                          bordered={false}
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
    </>
  );
};

export default AccountManage;
