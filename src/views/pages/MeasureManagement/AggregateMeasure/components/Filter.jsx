import React, { useContext } from "react";
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
// import { FilterContext } from "../ListOrder/context";

// import { Style } from "./style";
const Filter = ({ open, toggle }) => {
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
							Chọn mã đơn hàng
						</Label>
						<Col md="7">
							<Input placeholder="xxxyyy" type="search" />
						</Col>
					</FormGroup>
					<FormGroup className="row">
						<Label
							className="form-control-label"
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
							>
								<option value="">Lựa chọn</option>
							</Input>
						</Col>
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
