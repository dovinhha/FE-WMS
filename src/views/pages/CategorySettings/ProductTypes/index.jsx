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
import { useDispatch, useSelector } from "react-redux";
import { productTypesActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify } from "common";
import FormProductType from "./FormProductType";
import ReactNotificationAlert from "react-notification-alert";
const ProductTypes = () => {
  const dispatch = useDispatch();
  const { productTypes, isDeleteProductType, isGetProductTypes } = useSelector(
    (state) => state.productTypesReducer
  );

  const notificationAlertRef = useRef(null);
  const [productType, setProducer] = useState({});
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });

  const boxAction = (cell, row) => {
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
            setProducer(row);
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật thông tin kiểu sản phẩm
        </UncontrolledTooltip>
        <button
          id="delete"
          onClick={() => {
            setNotificationModal(true);
            setProducer(row);
          }}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa kiểu sản phẩm
        </UncontrolledTooltip>
      </>
    );
  };
  const columns = [
    {
      dataField: "code",
      text: "Mã kiểu",
    },
    {
      dataField: "name",
      text: "Tên kiểu",
    },
    {
      dataField: "description",
      text: "Mô tả",
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
      style: {
        textAlign: "center",
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
    totalSize: productTypes?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > productTypes.items.length
              ? !isNaN(productTypes?.totalResults)
                ? productTypes.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(productTypes?.totalResults) ? productTypes.totalResults : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {
    dispatch(
      productTypesActions.deleteProductType(productType.id, {
        success: () => {
          setNotificationModal(false);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa kiểu sản phẩm thành công!`
          );
          handleGetProductTypes();
        },
        failed: () => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa kiểu sản phẩm thất bại!`
          );
        },
      })
    );
  };

  const handleGetProductTypes = () => {
    dispatch(productTypesActions.getProductTypes(queryString.stringify(query)));
  };

  useEffect(() => {
    handleGetProductTypes();
  }, [query]);

  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="kiểu sản phẩm"
          func={handleDelete}
          isDelete={isDeleteProductType}
        />
      )}
      {formModal && (
        <FormProductType
          isModalAdd={isModalAdd}
          formModal={formModal}
          setFormModal={setFormModal}
          productType={productType}
          handleGetProductTypes={handleGetProductTypes}
          notificationAlertRef={notificationAlertRef}
        />
      )}
      <SimpleHeader
        name="Cài đặt kiểu sản phẩm"
        parentName="Quản lý"
        setFormModal={setFormModal}
        setIsModalAdd={setIsModalAdd}
        setProducer={setProducer}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={productTypes.items}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <Row>
                      <Col>
                        <CardHeader>
                          <h3 className="mb-0">Danh sách kiểu sản phẩm</h3>
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
                            <h4 className="mb-0">Tìm kiếm tên nhóm sản phẩm</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nhập tên"
                              type="text"
                              onChange={() => {}}
                              // value={""}
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
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ProductTypes;
