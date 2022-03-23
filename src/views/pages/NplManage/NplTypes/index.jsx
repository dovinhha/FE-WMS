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
  DropdownItem,
  Button,
} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import SimpleHeader from "../components/Header";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import { EditSVG, DeleteSVG } from "assets/svg";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import queryString from "query-string";
import { notify } from "common";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { nplActions } from "Redux/Actions";
import { Formik } from "formik";
import * as yup from "yup";
import ReactNotificationAlert from "react-notification-alert";
import FormNplGroup from "../FormNplGroup";

const NPLTypes = () => {
  const { isGetNplGroups, isCreateNplGroup, nplGroups } = useSelector(
    (state) => state.nplReducer
  );
  const dispatch = useDispatch();

  const nplGroupSchema = yup.object().shape({
    code: yup.string().required("Mã thể loại không được để trống!"),
    name: yup.string().required("Tên thể loại không được để trống!"),
    // notes: yup.string().required("Ghi chú không được để trống!"),
  });

  const [nplGroupInfo, setNplGroupInfo] = useState({
    code: "",
    name: "",
    notes: "",
  });

  const notificationAlertRef = useRef(null);
  const [formModal, setFormModal] = useState(false);
  const [nplGroupSearch, setNplGroupSearch] = useState("");
  const [nplGroup, setNplGroup] = useState("");
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });

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
            setNplGroup(row);
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật thông tin nhà sản xuất
        </UncontrolledTooltip>
        <button
          id="delete"
          onClick={() => {
            setNplGroup(row);
            setNotificationModal(true);
          }}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa nhà sản xuất
        </UncontrolledTooltip>
      </>
    );
  };
  const columns = [
    {
      dataField: "code",
      text: "Mã thể loại",
    },
    {
      dataField: "name",
      text: "Tên thể loại",
    },
    {
      dataField: "notes",
      text: "Mô tả",
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
    totalSize: !isNaN(nplGroups?.totalResults) ? nplGroups.totalResults : 0,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > nplGroups.results.length
              ? !isNaN(nplGroups?.totalResults)
                ? nplGroups.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(nplGroups?.totalResults) ? nplGroups.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {
    if (_.isEmpty(nplGroup)) return;
    dispatch(
      nplActions.deleteNplGroup(nplGroup.id, {
        success: () => {
          handleGetNplGroups();
          setNotificationModal(false);
          setNplGroup({});
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa thể loại NPL thành công!`
          );
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa thể loại NPL thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  const handleGetNplGroups = () => {
    if (nplGroupSearch === "") {
      dispatch(nplActions.getNplGroups(queryString.stringify(query)));
    } else {
      dispatch(
        nplActions.getNplGroups(
          queryString.stringify({ ...query, name: nplGroupSearch })
        )
      );
    }
  };

  useEffect(() => {
    handleGetNplGroups();
  }, [query]);

  const onSubmit = (values, actions) => {
    dispatch(
      nplActions.createNplGroup(values, {
        success: () => {
          setNplGroupInfo({
            code: "",
            name: "",
            notes: "",
          });
          actions.resetForm();
          handleGetNplGroups();
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Thêm thể loại NPL thành công!`
          );
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Thêm thể loại NPL thất bại. Lỗi: ${mess}!`
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
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="thể loại NPL"
          func={handleDelete}
        />
      )}
      {formModal && (
        <FormNplGroup
          formModal={formModal}
          setFormModal={setFormModal}
          nplGroup={nplGroup}
          notificationAlertRef={notificationAlertRef}
          handleGetNplGroups={handleGetNplGroups}
        />
      )}
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  Thêm mới
                </h6>
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5"></Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col md="4">
            <Card className="px-4 py-3">
              <h3>Thể loại nhóm nguyên phụ liệu</h3>
              <DropdownItem divider />
              <Formik
                initialValues={nplGroupInfo}
                enableReinitialize
                onSubmit={onSubmit}
                validationSchema={nplGroupSchema}
              >
                {({
                  values,
                  setFieldValue,
                  handleSubmit,
                  errors,
                  touched,
                  resetForm,
                  handleBlur,
                }) => {
                  return (
                    <>
                      <Row className="mt-4">
                        <Col className="mb-3" md={12}>
                          <InputCustom
                            label="Mã thể loại"
                            placeholder="Nhập mã thể loại"
                            type="text"
                            id="code"
                            name="code"
                            onBlur={handleBlur}
                            invalid={errors.code && touched.code}
                            onChange={(e) => {
                              setFieldValue("code", e.target.value);
                            }}
                            messageInvalid={errors.code}
                            value={values.code}
                          />
                        </Col>
                        <Col className="mb-3" md={12}>
                          <InputCustom
                            label="Tên thể loại"
                            placeholder="Nhập tên thể loại"
                            type="text"
                            id="name"
                            name="name"
                            onBlur={handleBlur}
                            invalid={errors.name && touched.name}
                            onChange={(e) => {
                              setFieldValue("name", e.target.value);
                            }}
                            messageInvalid={errors.name}
                            value={values.name}
                          />
                        </Col>
                        <Col className="mb-3" md={12}>
                          <InputCustom
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            type="textarea"
                            rows="5"
                            id="notes"
                            name="notes"
                            onBlur={handleBlur}
                            invalid={errors.notes && touched.notes}
                            onChange={(e) => {
                              setFieldValue("notes", e.target.value);
                            }}
                            messageInvalid={errors.notes}
                            value={values.notes}
                          />
                        </Col>
                      </Row>
                      <Row className="d-flex justify-content-center">
                        <Button
                          onClick={() => {
                            setNplGroupInfo({
                              code: "",
                              name: "",
                              notes: "",
                            });
                            resetForm();
                          }}
                          size="md"
                          type="button"
                        >
                          Hủy
                        </Button>
                        <LoadingButtonCustom
                          loading={isCreateNplGroup}
                          onClick={() => {
                            handleSubmit();
                          }}
                          color="primary"
                          size="md"
                          type="button"
                        >
                          Thêm mới
                        </LoadingButtonCustom>
                      </Row>
                    </>
                  );
                }}
              </Formik>
            </Card>
          </Col>
          <Col md="8">
            <Card className="px-4 py-3">
              <h3>Danh sách nhóm nguyên phụ liệu</h3>
              <DropdownItem divider />
              <Row className="mt-4">
                <Col md={12} style={{ overflowX: "scroll" }}>
                  <ToolkitProvider
                    data={nplGroups.results}
                    keyField="id"
                    columns={columns}
                    search
                  >
                    {(props) => (
                      <>
                        {isGetNplGroups ? (
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
                            <Row className="d-flex justify-content-between">
                              <Col md={4}>
                                <CardHeader className="px-0">
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
                              <Col
                                md={7}
                                className="d-flex align-items-center justify-content-end"
                              >
                                <Row style={{ width: "100%" }}>
                                  <Col
                                    md={6}
                                    className="d-flex align-items-center justify-content-end"
                                  >
                                    <h5 className="mb-0">
                                      Tìm kiếm tên theo tên thể loại
                                    </h5>
                                  </Col>
                                  <Col
                                    md={6}
                                    className="d-flex align-items-center"
                                  >
                                    <Input
                                      id="search-by-name"
                                      placeholder="Nhập tên"
                                      type="text"
                                      onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                          handleGetNplGroups();
                                        }
                                      }}
                                      onChange={(e) => {
                                        setNplGroupSearch(
                                          e.target.value.trim()
                                        );
                                      }}
                                      value={nplGroupSearch}
                                      className="py-0"
                                      bsSize="sm"
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
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NPLTypes;
