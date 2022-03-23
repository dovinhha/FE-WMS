import React, { useEffect, useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { notify } from "common";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import queryString from "query-string";
import { ViewSVG } from "assets/svg";
import { EditSVG } from "assets/svg";
import { BinSVG } from "assets/svg";
import { Style } from "../style";
import { useHistory } from "react-router";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import ReactNotificationAlert from "react-notification-alert";
import measurementStandardsActions from "Redux/Actions/measurementStandardsActions";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import DialogFormUpdateStandard from "./components/DialogFormUpdateStandard";
import DetailMeasurementStandard from "./components/DetailMeasurementStandard";
import moment from "moment";
function ListMeasurementStandards() {
  const history = useHistory();
  const notificationAlertRef = useRef(null);
  const dispatch = useDispatch();
  const { measurementStandards, isGetMeasurementStandards } = useSelector(
    (state) => state.measurementStandardsReducer
  );
  const [measureSearch, setMeasureSearch] = useState("");
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    populate: "standardSizes.productParameterId,productTypeId",
    limit: rowsPerPage,
  });
  const [idMeasurementStandardSelect, setIdMeasurementStandardSelect] =
    useState(null);
  const [dataDialogStandard, setDataDialogStandard] = useState({});
  const [openDialogFormUpdate, setOpenDialogFormUpdate] = useState(false);
  const [openDialogDetailStandard, setOpenDialogDetailStandard] =
    useState(false);

  const toggleDialogFormUpdate = () => {
    setOpenDialogFormUpdate(!openDialogFormUpdate);
  };
  const toggleDialogDetailStandard = () => {
    setOpenDialogDetailStandard(!openDialogDetailStandard);
  };
  const handleOpenFormUpdate = (data) => {
    toggleDialogFormUpdate();
    setDataDialogStandard(data);
  };
  const handleView = (data) => {
    toggleDialogDetailStandard();
    setDataDialogStandard(data);
  };
  const handleDelete = () => {
    dispatch(
      measurementStandardsActions.deleteMeasurementStandard(
        idMeasurementStandardSelect,
        {
          success: () => {
            setNotificationModal(false);
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Xóa tiêu chuẩn đo thành công!`
            );
            handleGetMeasurementStandards();
          },
          failed: () => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Xóa tiêu chuẩn đo thất bại!`
            );
          },
        }
      )
    );
  };

  const handleUpdateMeasurementStandard = (
    dataForm,
    standardSizes,
    actions,
    clearData
  ) => {
    // const arrInput = document.querySelectorAll(`input[name^=standardSizes]`);
    // const list = Array.from(arrInput).map((i) => {
    //   return { size: i.size, productParameterId: i.getAttribute("data-id") };
    // });
    // const payload = { ...dataForm, standardSizes: list };
    const tempStandardSizes = [];
    standardSizes.forEach((item) => {
      const productParameterId = item.id;
      delete item._id;
      delete item.id;
      item.productParameterId = productParameterId;
      tempStandardSizes.push(item);
    });
    const measurementStandardId = dataForm.id;
    delete dataForm.id;
    // console.log("{ ...dataForm, standardSizes: [...tempStandardSizes] }: ", {
    //   ...dataForm,
    //   standardSizes: [...tempStandardSizes],
    // });
    dispatch(
      measurementStandardsActions.updateMeasurementStandard(
        { ...dataForm, standardSizes: [...tempStandardSizes] },
        measurementStandardId,
        {
          success: () => {
            actions.resetForm();
            clearData();
            setOpenDialogFormUpdate(false);
            handleGetMeasurementStandards();
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Cập nhật tiêu chuẩn số đo thành công!`
            );
          },
          failed: () => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Cập nhật tiêu chuẩn số đo thất bại!`
            );
          },
        }
      )
    );
  };
  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <button className="btn-none" onClick={() => handleView(row)} id="view">
          <ViewSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="view">
          Xem chi tiết
        </UncontrolledTooltip>
        <button
          className="btn-none"
          onClick={() => {
            handleOpenFormUpdate(row);
          }}
          id="edit"
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="edit">
          Cập nhật số đo
        </UncontrolledTooltip>
        <button
          onClick={() => {
            setIdMeasurementStandardSelect(cell);
            setNotificationModal(true);
          }}
          className="btn-none"
          id="delete"
        >
          <BinSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target="delete">
          Xóa số đo
        </UncontrolledTooltip>
      </>
    );
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
    totalSize: measurementStandards?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > measurementStandards.results.length
              ? !isNaN(measurementStandards?.totalResults)
                ? measurementStandards.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(measurementStandards?.totalResults)
              ? measurementStandards.totalResults
              : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });
  const columns = [
    {
      dataField: "name",
      text: "Tên size",
    },
    {
      dataField: "productTypeId.name",
      text: "Tên sản phẩm",
    },
    {
      dataField: "updateAt",
      text: "Ngày cập nhật",
      formatter: (cell) => {
        return !!cell ? moment(cell).format("DD/MM/YYYY") : "Không có dữ liệu!";
      },
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
  const handleGetMeasurementStandards = () => {
    if (measureSearch === "") {
      dispatch(
        measurementStandardsActions.getMeasurementStandards(
          queryString.stringify(query)
        )
      );
    } else {
      dispatch(
        measurementStandardsActions.getMeasurementStandards(
          queryString.stringify({ ...query, name: measureSearch })
        )
      );
    }
  };
  useEffect(() => {
    handleGetMeasurementStandards();
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
          name="tiêu chuẩn đo"
          func={handleDelete}
        />
      )}
      <Header name="Tiêu chuẩn số đo" parentName="Quản lý" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card style={{ overflowX: "scroll" }}>
              <ToolkitProvider
                data={[...measurementStandards.results]}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <Row>
                      <Col>
                        <CardHeader>
                          <h3 className="mb-0">
                            Danh sách các loại kích thước đo (Size)
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
                            <h4 className="mb-0">Tìm kiếm tên size</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nhập tên"
                              type="text"
                              onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                  handleGetMeasurementStandards();
                                }
                              }}
                              onChange={(e) => {
                                setMeasureSearch(e.target.value);
                              }}
                              value={measureSearch}
                              className="py-0"
                              bsSize="sm"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {isGetMeasurementStandards ? (
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
      {openDialogDetailStandard && (
        <DetailMeasurementStandard
          open={openDialogDetailStandard}
          toggle={toggleDialogDetailStandard}
          data={dataDialogStandard}
        />
      )}
      {openDialogFormUpdate && (
        <DialogFormUpdateStandard
          open={openDialogFormUpdate}
          toggle={toggleDialogFormUpdate}
          data={dataDialogStandard}
          handleUpdate={handleUpdateMeasurementStandard}
        />
      )}
    </Style>
  );
}

export default ListMeasurementStandards;
