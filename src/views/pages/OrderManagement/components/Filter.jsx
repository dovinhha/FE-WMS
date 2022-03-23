import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	FormGroup,
	Input,
	Label,
	CardFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Style } from "./style";
import { provincesActions } from "Redux/Actions";
import queryString from "query-string";
import orderActions from "Redux/Actions/orderActions";
const Filter = ({ handleClose, handleFilter }) => {
	const initialFilter = {
		years: "",
		orderStatus: "",
		provinceId: "",
		customerName: "",
	};
	const listStatus = [
		{ status: 0, name: "Khởi tạo" },
		{ status: 1, name: "Đang tạo" },
		{ status: 2, name: "Hoàn thành" },
		{ status: 3, name: "Đã hủy" },
	];
	const dispatch = useDispatch();
	const { provinces } = useSelector((state) => state.provincesReducer);
	const [optionFilter, setOptionFilter] = useState(initialFilter);
	const changeOptionFilter = (e) => {
		setOptionFilter({ ...optionFilter, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		dispatch(
			provincesActions.getProvinces(queryString.stringify({ limit: 100 }))
		);
	}, []);
	const createArray = (start, step) => {
		const now = new Date();
		const stop = now.getFullYear();

		return Array.from(
			{ length: (stop - start) / step + 1 },
			(_, i) => start + i * step
		);
	};
	const resetFilter = () => {
		setOptionFilter(initialFilter);
	};

	return (
		<Style>
			<Card className={`filter ${false} && "show"}`}>
				<CardHeader>
					<span
						style={{ cursor: "pointer" }}
						className="text-danger font-weight-bold"
						onClick={handleClose}
					>
						Đóng
					</span>
				</CardHeader>
				{/* <hr className="my-3"/> */}
				<CardBody>
					<FormGroup className="row">
						<Label
							className="form-control-label text-sm"
							htmlFor="example-text-input"
							md="5"
						>
							Lọc theo năm
						</Label>
						<Col md="7">
							<Input
								defaultValue="John Snow"
								id="example-text-input"
								type="select"
								name="years"
								value={optionFilter.years}
								onChange={changeOptionFilter}
							>
								<option value="" hidden>
									Chọn năm
								</option>
								{createArray(1990, 1).map((item) => {
									return (
										<option value={item} key={item}>
											{item}
										</option>
									);
								})}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup className="row">
						<Label
							className="form-control-label text-sm"
							htmlFor="example-search-input"
							md="5"
						>
							Lọc theo trạng thái
						</Label>
						<Col md="7">
							<Input
								defaultValue="Tell me your secret ..."
								id="example-search-input"
								type="select"
								name="orderStatus"
								value={optionFilter.orderStatus}
								onChange={changeOptionFilter}
							>
								<option value="" hidden>
									Lựa chọn
								</option>
								{listStatus.map((item) => {
									return (
										<option value={item.status} key={item.status}>
											{item.name}
										</option>
									);
								})}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup className="row">
						<Label
							className="form-control-label text-sm"
							htmlFor="example-email-input"
							md="5"
						>
							Lọc theo tỉnh thành
						</Label>
						<Col md="7">
							<Input
								defaultValue="argon@example.com"
								id="example-email-input"
								type="select"
								name="provinceId"
								value={optionFilter.provinceId}
								onChange={changeOptionFilter}
							>
								<option value="" hidden>
									Chọn tỉnh
								</option>
								{provinces?.results.map((item) => {
									return <option value={item.id}>{item.provinceName}</option>;
								})}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup>
						<Label
							className="form-control-label text-sm"
							htmlFor="example-email-input"
						>
							Chọn tên khách hàng
						</Label>

						<Input
							type="text"
							placeholder="Nhập để tìm kiếm"
							name="name"
							value={optionFilter.name}
							onChange={changeOptionFilter}
						/>
					</FormGroup>
				</CardBody>
				<CardFooter>
					<button
						className="btn btn-secondary btn-md text-sm btn-block"
						onClick={resetFilter}
					>
						Xóa bộ lọc
					</button>
					<button
						className="btn btn-primary btn-md text-sm btn-block"
						onClick={() => {
							handleFilter(optionFilter);
						}}
					>
						Áp dụng bộ lọc
					</button>
				</CardFooter>
			</Card>
		</Style>
	);
};

export default Filter;
