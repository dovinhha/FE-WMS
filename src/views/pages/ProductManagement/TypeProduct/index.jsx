import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import { EditSVG } from "assets/svg";
import { BinSVG } from "assets/svg";
import { Style } from "../style";
import queryString from "query-string";
import BootstrapTable from "react-bootstrap-table-next";
import SimpleHeader from "components/Headers/SimpleHeader";
import InputCustom from "views/pages/components/InputCustom";
import { productTypesActions } from "Redux/Actions";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import { useDispatch, useSelector } from "react-redux";
import ReactNotificationAlert from "react-notification-alert";
import { notify } from "common";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import DialogFormUpdateProductType from "./components/DialogFormUpdateProductType";
const TypeProduct = () => {
  const notificationAlertRef = useRef(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [dataFormModal, setDataFormModal] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);
  const [dataProductType, setDataProductType] = useState({
    code: "",
    name: "",
    notes: "",
  });
  const [changed, setChanged] = useState({
    name: false,
    code: false,
    notes: false,
  });
  const { productTypes, isGetProductTypes } = useSelector(
    (state) => state.productTypesReducer
  );
  const toggleFormModal = () => {
    setOpenFormModal(!openFormModal);
  };
  const handleChangeInputProductType = (e) => {
    setChanged({ ...changed, [e.target.name]: true });
    setDataProductType({ ...dataProductType, [e.target.name]: e.target.value });
  };
  const [idProductType, setIdProductType] = useState("");

  const openModalUpdate = (data) => {
    // console.log("Sửa  ", data);
    setDataFormModal(data);
    toggleFormModal();
  };
  const handleUpdateProductType = (data) => {
    dispatch(
      productTypesActions.updateProductType(
        data,
        {},
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Cập nhật dòng sản phẩm thành công!`
            );
            toggleFormModal();
            handleGetProductTypes();
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Cập nhật dòng sản phẩm thất bại. Lỗi: ${mess}!`
            );
          },
        }
      )
    );
  };
  const handleDelete = () => {
    dispatch(
      productTypesActions.deleteProductType(idProductType, {
        success: () => {
          setNotificationModal(false);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa dòng sản phẩm thành công!`
          );
          handleGetProductTypes();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa dòng sản phẩm thất bại. Lỗi: ${mess}`
          );
        },
      })
    );
  };
  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    // console.log(cell);
    return (
      <>
        <button
          className="btn-none"
          onClick={() => {
            openModalUpdate(row);
          }}
          id="edit"
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật dòng sản phẩm
        </UncontrolledTooltip>
        <button
          onClick={() => {
            setIdProductType(cell);
            setNotificationModal(true);
          }}
          className="btn-none"
          id="delete"
        >
          <BinSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa dòng sản phẩm
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
      text: "Tên dòng",
    },
    {
      dataField: "notes",
      text: "Mô tả",
    },

    {
      dataField: "id",
      text: "Hành động",
      formatter: boxAction,
    },
  ];

  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    // populate: "parentId",
    // level: "0",
    // name: "",
    // status: "active",
  });

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
            {page * rowsPerPage > productTypes.results.length
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
  const handleGetProductTypes = () => {
    let payload = { ...query };
    // if (payload.name.length === 0) delete payload["name"];
    dispatch(
      productTypesActions.getProductTypes(queryString.stringify(payload))
    );
  };
  const handleAddProductType = () => {
    setChanged({
      name: true,
      code: true,
      // notes: true,
    });
    if (
      dataProductType.name.length > 0 &&
      dataProductType.code.length > 0
      // &&
      // dataProductType.notes.length > 0
    )
      dispatch(
        productTypesActions.createProductType(dataProductType, {
          success: () => {
            // setNotificationModal(false);
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Thêm dòng sản phẩm thành công!`
            );
            handleGetProductTypes();
            setDataProductType({
              code: "",
              name: "",
              notes: "",
            });
            setChanged({
              code: false,
              name: false,
              // notes: false,
            });
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Thêm dòng sản phẩm thất bại. Lỗi ${mess}!`
            );
          },
        })
      );
  };

  useEffect(() => {
    handleGetProductTypes();
  }, [query]);
  return (
    <Style>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>

      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="dòng sản phẩm"
          func={handleDelete}
        />
      )}
      <SimpleHeader name="Danh mục sản phẩm" />
      <Container fluid className="mt--6">
        <Row>
          <Col xs={4}>
            <Card>
              <CardHeader>
                <p className="h3 font-weight-500">Dòng sản phẩm</p>
              </CardHeader>
              <CardBody>
                <FormGroup className="mb-2">
                  <p className="h3 text-sm font-weight-500">Mã dòng sản phẩm</p>
                  <InputCustom
                    placeholder="Nhập mã dòng sản phẩm"
                    type="text"
                    messageInvalid={"Mã sản phẩm không được để trống"}
                    valid={false}
                    invalid={dataProductType.code.length === 0 && changed.code}
                    onChange={handleChangeInputProductType}
                    name="code"
                    value={dataProductType.code}
                    // size="sm"
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <p className="h3 text-sm font-weight-500">Tên dòng</p>
                  <InputCustom
                    placeholder="Nhập thể loại dòng sản phẩm"
                    type="text"
                    valid={false}
                    invalid={dataProductType.name.length === 0 && changed.name}
                    name="name"
                    messageInvalid={"Tên sản phẩm không được để trống"}
                    value={dataProductType.name}
                    onChange={handleChangeInputProductType}
                    // disabled={disabled}

                    // size="sm"
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <p className="h3 text-sm font-weight-500">Mô tả</p>
                  <InputCustom
                    placeholder="Nhập mô tả"
                    type="textarea"
                    rows={3}
                    // valid={false}
                    // invalid={
                    //   dataProductType.notes.length === 0 && changed.notes
                    // }
                    // messageInvalid={"Ghi chú không được để trống"}
                    name="notes"
                    value={dataProductType.notes}
                    onChange={handleChangeInputProductType}
                  />
                </FormGroup>
              </CardBody>
              <CardFooter className="d-flex justify-content-center">
                <Button
                  onClick={() => {
                    setDataProductType({
                      code: "",
                      name: "",
                      notes: "",
                    });
                    setChanged({
                      code: false,
                      name: false,
                      // notes: false,
                    });
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button color="primary" onClick={handleAddProductType}>
                  Thêm mới
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={8}>
            <Card style={{ overflowX: "scroll" }}>
              <CardHeader>
                <p className="h3 font-weight-500">Danh sách dòng sản phẩm</p>
              </CardHeader>
              <ToolkitProvider
                data={[...productTypes.results]}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    {isGetProductTypes ? (
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
          </Col>
        </Row>
      </Container>
      <DialogFormUpdateProductType
        toggle={toggleFormModal}
        open={openFormModal}
        handleUpdateProductType={handleUpdateProductType}
        dataFormModal={dataFormModal}
      />
    </Style>
  );
};

export default TypeProduct;
