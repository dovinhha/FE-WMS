import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	FormGroup,
	Row,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import SimpleHeader from "components/Headers/SimpleHeader";
const AddProducer = () => {
	return (
		<div>
			<SimpleHeader name="Thêm mới nhà sản xuất" />
			<Container fluid className="mt--6 dropzone align-items-center">
				<Card style={{ width: "1048px" }}>
					<CardHeader>
						<p className="h2 font-weight-500">Nhập thông tin nhà sản xuất</p>
					</CardHeader>
					<CardBody>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">Mã nhà sản xuất</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">
										Tên nhà suản xuất
									</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">Địa chỉ</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">Điện thoại</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">Người liên hệ</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">
										Công suất gia Công
									</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col xs={3}>
									<p className="h3 text-sm font-weight-500">Ghi chú</p>
								</Col>
								<Col>
									<InputCustom />
								</Col>
							</Row>
						</FormGroup>
					</CardBody>
				</Card>
				<div className="d-flex justify-content-center">
					<Button>Hủy bỏ</Button>
					<Button color="primary">Lưu</Button>
				</div>
			</Container>
		</div>
	);
};

export default AddProducer;
