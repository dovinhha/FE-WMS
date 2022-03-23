import React, { useState } from "react";

import { useParams } from "react-router";
import { Button, Card, Col, Container, Input, Row, Table } from "reactstrap";
import Header from "../components/Header";
import IconComponent from "utils/createSVG";
import { Style } from "../style";
import DialogUpdatePlan from "./components/DialogUpdatePlan";
import DialogAddWorkForPlan from "./components/DialogAddWorkForPlan";
import InforOrder from "./components/InforOrder";
import BoxComment from "../../components/BoxComment";
import { EditSVG } from "assets/svg";
import { AddSVG } from "assets/svg";
import { SendMailSVG } from "assets/svg";

const UpdatePlan = () => {
	const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
	const [openDialogAddWorkForPlan, setOpenDialogAddWorkForPlan] =
		useState(false);
	const { id } = useParams();
	console.log(id);

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
					{/* <div className="groub-btn">
						<Button color="danger">Từ chối</Button>
						<Button color="primary">Duyệt</Button>
					</div> */}
					<Button color="primary">Gửi cập nhật</Button>
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
								<th>Hành động</th>
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
								<td
									onClick={toggleOpenDialogUpdate}
									style={{ textAlign: "center" }}
								>
									<EditSVG />
								</td>
							</tr>
							<tr rowSpan={2} style={{ position: "relative" }}>
								<th>I</th>
								<th colSpan={8}>Kế hoạch sản xuất</th>
								<div
									style={{
										position: "absolute",
										top: ".25rem",
										right: "2.5rem",
									}}
									onClick={toggleOpenDialogAddWorkForPlan}
								>
									<AddSVG />
								</div>
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
								<td
									onClick={toggleOpenDialogUpdate}
									style={{ textAlign: "center" }}
								>
									<EditSVG />
								</td>
							</tr>
							<tr>
								<td colSpan={9}></td>
							</tr>
						</tbody>
						<div
							style={{
								position: "absolute",
								bottom: "0rem",
								right: "2.5rem",
							}}
							onClick={toggleOpenDialogUpdate}
						>
							<AddSVG />
						</div>
					</Table>
				</Card>

				<h3 className="mt-3">Lịch sử trao đổi thông tin</h3>
				<Card className="px-5 py-3">
					<BoxComment />

					<Row className="mt-3">
						<Col>
							<Input
								resize="none"
								rows="2"
								type="textarea"
								placeholder="Nhập yêu cầu thêm"
							/>
						</Col>
						<Col style={{ maxWidth: "80px" }}>
							<SendMailSVG />
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

export default UpdatePlan;
