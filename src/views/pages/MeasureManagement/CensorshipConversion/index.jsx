import React, { useRef, useState } from "react";
import {
	Button,
	Card,
	CardHeader,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";
import { Style } from "../style";
import Header from "./components/Header";
import TableData from "./components/TableData";
import { dataTable } from "variables/general";
import BoxComment from "views/pages/components/BoxComment";
import { SendMailSVG } from "assets/svg";
import Filter from "./components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "Redux/Actions";
import queryString from "query-string";
import { notify } from "common";
import ReactNotificationAlert from "react-notification-alert";
const CensorshipConversion = () => {
	const dispatch = useDispatch();
	const notificationAlertRef = useRef();
	const [currentOrder, setCurrentOrder] = useState("");
	const [openFilter, setOpenFilter] = useState(false);
	const { isApproveManyCustomersInOrder } = useSelector(
		(state) => state.orderReducer
	);
	const [listCustomerInOrderConvert, setListCustomerinOrderConvert] = useState(
		[]
	);

	const toggleOpenFilter = () => {
		setOpenFilter(!openFilter);
	};
	// console.log(currentOrder, isGetOrdersConvert);
	const hanldeAccept = () => {
		dispatch(
			orderActions.approveManyCustomerInOrder(
				{ customerInOrderIds: listCustomerInOrderConvert },
				"true",
				{
					success: () => {
						notify(
							notificationAlertRef,
							"success",
							"Thông báo",
							`Duyệt chuyển đổi số đo thành công!`
						);
					},
					failed: (mess) => {
						notify(
							notificationAlertRef,
							"danger",
							"Thông báo",
							`Duyệt chuyển đổi số đo thất bại!, Lỗi : ${mess}`
						);
					},
				}
			)
		);
	};
	const handleReject = () => {
		dispatch(
			orderActions.approveManyCustomerInOrder(
				{ customerInOrderIds: listCustomerInOrderConvert },
				"false",
				{
					success: () => {
						notify(
							notificationAlertRef,
							"success",
							"Thông báo",
							`Từ chối chuyển đổi số đo thành công!`
						);
					},
					failed: (mess) => {
						notify(
							notificationAlertRef,
							"danger",
							"Thông báo",
							`Từ chối chuyển đổi số đo thất bại!, Lỗi : ${mess}`
						);
					},
				}
			)
		);
	};
	console.log(listCustomerInOrderConvert);
	return (
		<Style>
			<div className="rna-wrapper">
				<ReactNotificationAlert ref={notificationAlertRef} />
			</div>
			<Header
				name="Quản lý số đo"
				toggle={toggleOpenFilter}
				setCurrentOrders={setCurrentOrder}
			/>
			<Container fluid className="mt--6">
				<Card style={{ overflowX: "scroll" }}>
					<CardHeader className="py-3">
						<Row className="justify-content-between align-items-center px-3">
							<h3 className="mb-0">Danh sách số đo dã chuyển đổi</h3>
							<div className="d-flex py-0">
								<Button size="md" color="danger" onClick={handleReject}>
									Từ chối
								</Button>
								<Button size="md" color="primary" onClick={hanldeAccept}>
									Duyệt
								</Button>
							</div>
						</Row>
					</CardHeader>
					{isApproveManyCustomersInOrder ? (
						<Row className="align-items-center ">
							<Col md="12" className="d-flex justify-content-center p-5">
								<div className="spinner-border text-info" />
							</Col>
						</Row>
					) : (
						<>
							<TableData
								data={dataTable}
								currentOrders={currentOrder}
								listCustomerInOrderConvert={listCustomerInOrderConvert}
								setListCustomerinOrderConvert={setListCustomerinOrderConvert}
							/>
						</>
					)}
				</Card>
				<p className="h2 my-3">Lịch sử trao đổi thông tin</p>

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
			<Filter open={openFilter} toggle={toggleOpenFilter} />
		</Style>
	);
};

export default CensorshipConversion;
