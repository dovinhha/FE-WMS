import { AddSVG } from "assets/svg";
import { ArrowDownSVG } from "assets/svg";
import React, { useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Collapse,
	Input,
	Row,
	Table,
} from "reactstrap";

const InforOrder = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	return (
		<>
			<Card>
				<CardBody className="p-3">
					<div
						className="d-flex align-items-center"
						style={{ justifyContent: "space-between" }}
					>
						<p className="h3 mb-0 font-weight-600">Chi tiết đơn hàng</p>
						<span onClick={toggle} style={{ cursor: "pointer" }}>
							<ArrowDownSVG />
						</span>
					</div>
					<Collapse isOpen={isOpen} className="mx--3">
						<Card style={{ boxShadow: "none" }}>
							<CardHeader>
								<p className="h3 text-uppercase">Thông tin đơn hàng</p>
							</CardHeader>
							<CardBody>
								<Row>
									<Col xs={7} style={{ borderRight: "1px solid #BABCBE" }}>
										<Row>
											<Col xs={3} className="h3 font-weight-400 ">
												Mã đơn hàng
											</Col>
											<Col xs={4}>
												<p className="text-sm">Mã hàng</p>
											</Col>
										</Row>
										<Row>
											<Col xs={3} className="h3 font-weight-400">
												Tên đơn hàng
											</Col>
											<Col xs={9}>
												<p className="text-sm">Tên hàng</p>
											</Col>
										</Row>
										<Row>
											<Col xs={3} className="h3 font-weight-400">
												Chủ nhiệm quản lý
											</Col>
											<Col xs={9}></Col>
										</Row>
										<Row>
											<Col xs={3} className="h3 font-weight-400">
												Chọn dòng sản phẩm
											</Col>
											<Col xs={9}>
												<Row>
													<Col xs={5}></Col>
													<Col xs={7}>
														<Row className="mx--2">
															<p
																className="mb-0 h3 font-weight-400"
																style={{ lineHeight: "40px" }}
															>
																Số lượng may
															</p>
														</Row>
													</Col>
												</Row>
											</Col>
										</Row>
									</Col>
									<Col xs={5}>
										<p className=" h5 text-muted text-uppercase">Thời gian</p>
										<div className="mt-3">
											<Row>
												<Col className="h3 font-weight-500">
													Thời gian bắt đầu thực hiện
												</Col>
												<Col>25/3/2022</Col>
											</Row>
											<Row>
												<Col className="h3 font-weight-500">
													Thời gian trả hàng
												</Col>
												<Col>25/3/2022</Col>
											</Row>
											<Row>
												<Col className="h3 font-weight-500">
													Thời gian bảo Hành
												</Col>
												<Col>25/03/2022</Col>
											</Row>
											<Row>
												<Col className="h3 font-weight-500">
													Thời gian hoàn thành chỉnh sửa
												</Col>
												<Col>25/03/2022</Col>
											</Row>
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>
						<Card className="mt-3 p-3">
							<CardHeader>
								<p className="h3 text-uppercase">Thông tin khách hàng</p>
							</CardHeader>
							<CardBody>
								<Table bordered={false} borderless={true}>
									<thead>
										<tr>
											<th className="h3 font-weight-500">Chủ đầu tư</th>
											<th className="h3 font-weight-500">Dòng sản phẩm</th>
											<th className="h3 font-weight-500">Số lượng may</th>
											<th className="h3 font-weight-500">Người liên hệ</th>
											<th className="h3 font-weight-500">Điện thoại LH</th>
										</tr>
									</thead>
								</Table>
							</CardBody>
						</Card>
					</Collapse>
				</CardBody>
			</Card>
		</>
	);
};

export default InforOrder;
