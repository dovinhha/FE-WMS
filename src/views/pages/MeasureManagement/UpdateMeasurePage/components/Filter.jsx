import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { provincesActions } from "Redux/Actions";
// import { FilterContext } from "../ListOrder/context";
import queryString from "query-string";
import ReactSelect from "react-select";
import { orderActions } from "Redux/Actions";
// import { Style } from "./style";
const Filter = ({ open, toggle }) => {
	const [optionFilter, setOptionFilter] = useState({});
	const range = (start, step) => {
		const date = new Date();
		const stop = date.getFullYear();
		return Array.from(
			{ length: (stop - start) / step + 1 },
			(_, i) => start + i * step
		);
	};
	const [textSearchOrder, setTextSearchOrder] = useState("");
	const dispatch = useDispatch();
	const { provinces } = useSelector((state) => state.provincesReducer);
	const { orders } = useSelector((state) => state.orderReducer);
	useEffect(() => {
		dispatch(
			provincesActions.getProvinces(queryString.stringify({ limit: 100 }))
		);
	}, []);
	const handleFindOrder = () => {
		if (textSearchOrder === "") {
			dispatch(orderActions.getOrders(queryString.stringify({})));
		} else {
			dispatch(
				orderActions.getOrders(queryString.stringify({ name: textSearchOrder }))
			);
		}
	};
	useEffect(() => {
		handleFindOrder();
	}, [textSearchOrder]);
	const hanleChange = (e) => {
		setOptionFilter({ ...optionFilter, [e.target.name]: e.target.value });
	};
	return (
		<>
			<Card className={`filterOption ${open && "show"}`}>
				<CardHeader>
					<span
						style={{ cursor: "pointer" }}
						className="text-danger"
						onClick={toggle}
					>
						Đóng
					</span>
				</CardHeader>
				{/* <hr className="my-3"/> */}
				<CardBody>
					<FormGroup className="row">
						<Label
							className="form-control-label"
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
								name="year"
							>
								<option value="" hidden>
									Chọn năm
								</option>
								{range(1990, 1).map((item) => {
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
							className="form-control-label"
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
							>
								<option value="">Chọn tỉnh</option>
								{provinces.results.map((item) => {
									return (
										<option key={item.id} value={item.id}>
											{item.provinceName}
										</option>
									);
								})}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup>
						<Label className="form-control-label" htmlFor="example-email-input">
							Chọn mã đơn hàng
						</Label>
						<ReactSelect
							options={orders.results.map((item) => {
								return { value: item.id, label: item.name };
							})}
							onInputChange={(value) => setTextSearchOrder(value)}
						/>
					</FormGroup>
				</CardBody>
				<CardFooter>
					<button className="btn btn-secondary btn-md btn-block">
						Xóa bộ lọc
					</button>
					<button className="btn btn-primary btn-md btn-block">
						Áp dụng bộ lọc
					</button>
				</CardFooter>
			</Card>
		</>
	);
};

export default Filter;
