import { UserProfileSVG } from "assets/svg";
import { PaperSVG } from "assets/svg";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, Container, Row, CardBody, Button } from "reactstrap";
import ListResultMeasure from "./components/ListResultMeasure";
// import IconComponent from "utils/createSVG";
import { dataTable } from "variables/general";

import Header from "./components/Header";
import { Style } from "../style";
import Filter from "./components/Filter";
import ListConverted from "./components/ListConverted";
import DialogFormMeasure from "./components/DialogFormMeasure";
import DialogExtractMeasure from "./components/DialogExtractMeasure";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify } from "common";
import ReactNotificationAlert from "react-notification-alert";
// import {orderActions} from ''
const UpdateMeasurePage = () => {
  const dispatch = useDispatch();
  const notificationAlertRef = useRef();
  const [sectionState, setSectionState] = useState(0);
  const [currentOrders, setCurrentOrders] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [openDialogFormMeasure, setOpenDialogFormMeasure] = useState(false);
  const [openExtractModal, setOpenExtractModal] = useState(false);
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const toggleDialogFormMeasure = () => {
    setOpenDialogFormMeasure(!openDialogFormMeasure);
  };
  const toggleDialogExtractModal = () => {
    setOpenExtractModal(!openExtractModal);
  };
  // console.log(currentOrders);
  const acceptOrder = () => {
    if (!currentOrders) {
      notify(
        notificationAlertRef,
        "danger",
        "Thông báo",
        `Bạn chưa chọn đơn hàng nào!`
      );
      return;
    }
    dispatch(
      orderActions.approveAllCustomerInOrder({}, currentOrders, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Gửi duyệt số đo thành công`
          );
          // setOrderValue({});
          // handleGetOrderDefault();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Phê duyệt đơn hàng thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };
  return (
    <Style>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <Header
        name="Quản lý số đo"
        toggle={toggleFilter}
        toggleFormMeasure={toggleDialogFormMeasure}
        toggleDialogExtractModal={toggleDialogExtractModal}
        setCurrentOrders={setCurrentOrders}
      />
      <Container fluid className="mt--6">
        <Card className="p-0">
          <CardHeader className="py-0">
            <Row className="mx-0">
              <Row
                className={`align-items-center py-3 mx-0 ${
                  sectionState === 0 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSectionState(0);
                }}
              >
                <PaperSVG />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    sectionState !== 0 && "text-muted"
                  }`}
                >
                  Danh sách kết quả đo
                </p>
              </Row>
              <Row
                className={`align-items-center py-3 ml-5 mx-0 ${
                  sectionState === 1 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSectionState(1);
                }}
              >
                <UserProfileSVG />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    sectionState !== 1 && "text-muted"
                  }`}
                >
                  Danh sách đã chuyển đổi
                </p>
              </Row>
              {sectionState === 1 && (
                <div
                  className="d-flex  py-2"
                  style={{ justifyContent: "flex-end", flex: "1" }}
                >
                  <Button onClick={acceptOrder} color="danger">
                    Gửi duyệt
                  </Button>
                </div>
              )}
            </Row>
          </CardHeader>
          <CardBody className="p-0">
            {sectionState === 0 ? (
              <ListResultMeasure
                data={dataTable}
                currentOrders={currentOrders}
              />
            ) : (
              <ListConverted data={dataTable} currentOrders={currentOrders} />
            )}
          </CardBody>
        </Card>
      </Container>
      {openFilter && <Filter open={openFilter} toggle={toggleFilter} />}

      <DialogFormMeasure
        open={openDialogFormMeasure}
        toggle={toggleDialogFormMeasure}
      />
      <DialogExtractMeasure
        open={openExtractModal}
        toggle={toggleDialogExtractModal}
      />
    </Style>
  );
};

export default UpdateMeasurePage;
