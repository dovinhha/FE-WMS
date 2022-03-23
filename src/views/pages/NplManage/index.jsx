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
import { EditSVG, DeleteSVG, ViewSVG } from "assets/svg";
import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import { nplActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify } from "common";
import InputCustom from "views/pages/components/InputCustom";
import FormNpl from "./FormNpl";
import ReactNotificationAlert from "react-notification-alert";
import DetailNpl from "./DetailNpl";
const NPLManage = () => {
  const dispatch = useDispatch();
  const { npls, isDeleteNpl, isGetNpls } = useSelector(
    (state) => state.nplReducer
  );

  const notificationAlertRef = useRef(null);

  const [npl, setNpl] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [modalDetail, setModalDetail] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [nplSearch, setNplSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate: "materialTypeId, unitId",
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
          id="view"
          onClick={() => {
            setNpl(row);
            setModalDetail(true);
          }}
        >
          <ViewSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="view">
          Xem chi tiết
        </UncontrolledTooltip>
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
            setNpl(row);
            // setIsModalAdd(false);
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật nguyên phụ liệu
        </UncontrolledTooltip>
        <button
          id="delete"
          onClick={() => {
            setNpl(row);
            setNotificationModal(true);
          }}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa nguyên phụ liệu
        </UncontrolledTooltip>
      </>
    );
  };
  const columns = [
    {
      dataField: "name",
      text: "Tên nguyên phụ liệu",
    },
    {
      dataField: "materialTypeId.name",
      text: "Nhóm nguyên phụ liệu",
    },
    {
      dataField: "amount",
      text: "Số lượng",
    },
    {
      dataField: "price",
      text: "Đơn giá",
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
    totalSize: npls?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > npls.results.length
              ? !isNaN(npls?.totalResults)
                ? npls.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số {!isNaN(npls?.totalResults) ? npls.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {
    if (_.isEmpty(npl)) return;
    dispatch(
      nplActions.deleteNpl(npl.id, {
        success: () => {
          handleGetNpls();
          setNotificationModal(false);
          setNpl({});
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa NPL thành công!`
          );
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa NPL thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  const handleGetNpls = () => {
    if (nplSearch === "") {
      dispatch(nplActions.getNpls(queryString.stringify(query)));
    } else {
      dispatch(
        nplActions.getNpls(queryString.stringify({ ...query, name: nplSearch }))
      );
    }
  };

  useEffect(() => {
    handleGetNpls();
  }, [query]);

  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      {formModal && (
        <FormNpl
          formModal={formModal}
          setFormModal={setFormModal}
          npl={npl}
          notificationAlertRef={notificationAlertRef}
          handleGetNpls={handleGetNpls}
        />
      )}
      {modalDetail && (
        <DetailNpl
          modalDetail={modalDetail}
          setModalDetail={setModalDetail}
          npl={npl}
        />
      )}
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="nguyên phụ liệu"
          func={handleDelete}
        />
      )}
      <SimpleHeader name="Nguyên phụ liệu" parentName="Quản lý" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={npls.results}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    {isGetNpls ? (
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
                                Danh sách nguyên phụ liệu
                              </h3>
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
                                <h4 className="mb-0">
                                  Tìm kiếm tên nguyên phụ liệu
                                </h4>
                              </Col>
                              <Col md={6} className="d-flex align-items-center">
                                <Input
                                  id="search-by-name"
                                  placeholder="Nhập tên"
                                  type="text"
                                  onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                      handleGetNpls();
                                    }
                                  }}
                                  onChange={(e) => {
                                    setNplSearch(e.target.value.trim());
                                  }}
                                  value={nplSearch}
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default NPLManage;
