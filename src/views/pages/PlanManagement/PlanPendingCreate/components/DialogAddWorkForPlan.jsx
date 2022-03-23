import React from "react";
import {
	Button,
	Col,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import ReactDatetime from "react-datetime";
import InputCustom from "views/pages/components/InputCustom";
const DialogAddWorkForPlan = ({ openDialog, toggle }) => {
	return (
		<Modal size="lg" centered isOpen={openDialog}>
			<ModalHeader>
				<h3 className="text-uppercase">
					Thêm công việc cho hạng mục kế hoạch đơn hàng
				</h3>
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={3}>
						<h5 className="mb-3">Hạng mục</h5>
					</Col>
					<Col xs={9}>Kế hoạch đo</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<h5 className="mb-3">Tên công việc</h5>
					</Col>
					<Col xs={9}>
						<FormGroup>
							<InputCustom
								placeholder="Nhập tên công việc"
								type="text"
								valid={false}
								invalid={false}
								onChange={() => {}}
								// disabled={disabled}
								value=""
								// size="sm"
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<h5>Chi tiết công việc</h5>
					</Col>
					<Col xs={9}>
						<FormGroup>
							<InputCustom
								placeholder="Nhập mô tả chi tiết"
								type="text"
								valid={false}
								invalid={false}
								onChange={() => {}}
								// disabled={disabled}
								value=""
								// size="sm"
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<h5>Người thực hiện</h5>
					</Col>
					<Col xs={9}>
						<FormGroup>
							<InputCustom
								placeholder="Nhập tên để tìm kiếm"
								type="text"
								valid={false}
								invalid={false}
								onChange={() => {}}
								// disabled={disabled}
								value=""
								// size="sm"
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<h5>Người phối hợp</h5>
					</Col>
					<Col xs={9}>
						<FormGroup>
							<InputCustom
								placeholder="Nhập tên để tìm kiếm"
								type="text"
								valid={false}
								invalid={false}
								onChange={() => {}}
								// disabled={disabled}
								value=""
								// size="sm"
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<h5>Người giám sát</h5>
					</Col>
					<Col xs={9}>
						<FormGroup>
							<InputCustom
								placeholder="Nhập tên để tìm kiếm"
								type="text"
								valid={false}
								invalid={false}
								onChange={() => {}}
								// disabled={disabled}
								value=""
								// size="sm"
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<h5>Thời gian</h5>
					</Col>
					<Col xs={9}>
						<Row>
							<Col xs={6}>
								<p className="mt-2">Ngày bắt đầu</p>

								<Input type="date" />
							</Col>
							<Col xs={6}>
								<p className="mt-2">Ngày hoàn thành</p>

								<Input type="date" />
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col xs={3}>
						<h5>Ghi chú</h5>
					</Col>
					<Col xs={9}>
						<InputCustom
							placeholder="Nhập yêu cầu thêm"
							type="textarea"
							rows="3"
							valid={false}
							invalid={false}
							onChange={() => {}}
							// disabled={disabled}
							value=""
							// size="sm"
						/>
					</Col>
				</Row>
			</ModalBody>
			<ModalFooter style={{ justifyContent: "center" }}>
				<Button color="secondary" onClick={toggle}>
					Hủy bỏ
				</Button>{" "}
				<Button color="primary" onClick={toggle}>
					Thêm mới
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DialogAddWorkForPlan;
