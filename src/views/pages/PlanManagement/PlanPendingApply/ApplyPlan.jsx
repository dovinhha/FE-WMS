import React, { useState } from "react";

import { useParams } from "react-router";
import { Button, Card, Col, Container, Input, Row, Table } from "reactstrap";
import Header from "../components/Header";
import IconComponent from "utils/createSVG";
import { Style } from "../style";
import DialogUpdatePlan from "../PlanPendingCreate/components/DialogUpdatePlan";
import DialogAddWorkForPlan from "../PlanPendingCreate/components/DialogAddWorkForPlan";
import InforOrder from "../PlanPendingCreate/components/InforOrder";
import BoxComment from "views/pages/components/BoxComment";

const ApplyPlan = () => {
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogAddWorkForPlan, setOpenDialogAddWorkForPlan] =
    useState(false);
  const { id } = useParams();

  const toggleOpenDialogUpdate = () => {
    setOpenDialogUpdate(!openDialogUpdate);
  };
  const toggleOpenDialogAddWorkForPlan = () => {
    setOpenDialogAddWorkForPlan(!openDialogAddWorkForPlan);
  };
  return (
    <Style>
      <Header name={"Đơn hàng xxxx"} />
      <Container fluid className="mt--6">
        <InforOrder />
        <Row
          className="mx-1 mb-4"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <h2>Kế hoạch đơn hàng</h2>
          <div className="groub-btn">
            <Button color="danger">Từ chối</Button>
            <Button color="primary">Duyệt</Button>
          </div>
        </Row>
        <Card>
          <Table className="table_data position-relative mb-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Hạng mục</th>
                <th>Chi tiết công việc</th>
                <th>Người thực hiện, phối hợp</th>
                <th>Người thực hiện giám sát</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày hoàn thành</th>
                <th>Yêu cầu </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>I</th>
                <th colSpan={8}>Kế hoạch đo</th>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Phân công nhân sự</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr rowSpan={2} style={{ position: "relative" }}>
                <th>I</th>
                <th colSpan={8}>Kế hoạch sản xuất</th>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Phân công nhân sự</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <h3 className="mt-3">Lịch sử trao đổi thông tin</h3>
        <Card className="px-5 py-3">
          <BoxComment />
          <Row className="mt-3">
            <Col>
              <Input
                id="exampleFormControlTextarea3"
                resize="none"
                rows="2"
                type="textarea"
                placeholder="Nhập yêu cầu thêm"
              />
            </Col>
            <Col style={{ maxWidth: "80px" }}>
              <IconComponent
                svg={`<svg viewBox="0 0 50 50"><g transform="matrix(3.5714285714285716,0,0,3.5714285714285716,0,0)"><path d="M5.818,10.992,8,13.171a1.124,1.124,0,0,0,1.861-.439L13.442,1.979A1.123,1.123,0,0,0,12.021.558L1.268,4.142A1.124,1.124,0,0,0,.829,6L3.57,8.744l-.093,3.465Z" fill="none" stroke="#0B29D8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.121 0.782L3.57 8.744" fill="none" stroke="#0B29D8" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`}
              />
            </Col>
          </Row>
        </Card>
      </Container>
      <DialogUpdatePlan
        openDialog={openDialogUpdate}
        toggle={toggleOpenDialogUpdate}
      />
      <DialogAddWorkForPlan
        openDialog={openDialogAddWorkForPlan}
        toggle={toggleOpenDialogAddWorkForPlan}
      />
    </Style>
  );
};

export default ApplyPlan;
