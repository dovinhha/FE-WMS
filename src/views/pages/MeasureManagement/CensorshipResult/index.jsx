import { FileClipboardTextSVG } from "assets/svg";
import { FileClipboardCheckSVG } from "assets/svg";
import { FileClipboardBlockSVG } from "assets/svg";
import { notify } from "common";
import React, { useRef, useState } from "react";
import ReactNotificationAlert from "react-notification-alert";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { orderActions } from "Redux/Actions";
import { Style } from "../style";
import Filter from "./components/Filter";
import Header from "./components/Header";
import ListResidual from "./components/ListResidual";
import ListResolved from "./components/ListResolved";
import UnusualList from "./components/UnusualList";

const CensorshipResult = () => {
	const notificationAlertRef = useRef();
	const [sectionState, setSectionState] = useState(0);
	const [openFilter, setOpenFilter] = useState(false);
	const [currentOrder, setCurrentOrder] = useState("");
	const { unusualList } = useSelector((state) => state.orderReducer);
	const changeSectionState = (number) => {
		setSectionState(number);
	};
	const toggleOpenFilter = () => {
		setOpenFilter(!openFilter);
	};
	// console.log(currentOrder);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const handleCheckUnusual = () => {
		dispatch(
			orderActions.checkUnusualSize({}, currentOrder, {
				success: () => {
					notify(
						notificationAlertRef,
						"success",
						"Thông báo",
						`Kiểm tra bất thường thành công!`
					);
					setLoading(true);
				},
				failed: (err) => {
					notify(
						notificationAlertRef,
						"danger",
						"Thông báo",
						`Kiểm tra bất thường thất bại!, Lỗi : ${err}`
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
				toggle={toggleOpenFilter}
				setCurrentOrders={setCurrentOrder}
				handleCheckUnusual={handleCheckUnusual}
			/>
			<Container fluid className="mt--6">
				<Card style={{ overflowX: "auto" }}>
					<CardHeader className="py-0">
						<div className="d-flex">
							<div
								onClick={() => {
									changeSectionState(0);
								}}
								className={`d-flex sidenav-toggler py-3 align-items-center mr-4 ${
									sectionState === 0 ? "nav-active" : ""
								}`}
							>
								<FileClipboardBlockSVG />
								<p
									className={`h5 text-uppercase font-weight-500 mb-0 ml-2 ${
										sectionState !== 0 ? "text-muted" : ""
									}`}
								>
									Danh sách số đo bất thường ({unusualList.totalResults})
								</p>
							</div>
							<div
								onClick={() => {
									changeSectionState(1);
								}}
								className={`d-flex sidenav-toggler py-3 align-items-center mr-4 ${
									sectionState === 1 ? "nav-active" : ""
								}`}
							>
								<FileClipboardCheckSVG />
								<p
									className={`h5 text-uppercase font-weight-500 mb-0 ml-2 ${
										sectionState !== 1 ? "text-muted" : ""
									}`}
								>
									Danh sách đã quy size (10)
								</p>
							</div>
							<div
								onClick={() => {
									changeSectionState(2);
								}}
								className={`d-flex sidenav-toggler py-3 align-items-center mr-4 ${
									sectionState === 2 ? "nav-active" : ""
								}`}
							>
								<FileClipboardTextSVG />
								<p
									className={`h5 text-uppercase font-weight-500 mb-0 ml-2 ${
										sectionState !== 2 ? "text-muted" : ""
									}`}
								>
									Danh sách tồn sau quy size (10)
								</p>
							</div>
						</div>
					</CardHeader>

					{sectionState === 0 ? (
						<UnusualList
							currentOrder={currentOrder}
							loading={loading}
							setLoading={setLoading}
						/>
					) : sectionState === 1 ? (
						<ListResolved currentOrder={currentOrder} />
					) : (
						<ListResidual
							currentOrder={currentOrder}
							loading={loading}
							setLoading={setLoading}
						/>
					)}
				</Card>
			</Container>
			<Filter open={openFilter} toggle={toggleOpenFilter} />
		</Style>
	);
};

export default CensorshipResult;
