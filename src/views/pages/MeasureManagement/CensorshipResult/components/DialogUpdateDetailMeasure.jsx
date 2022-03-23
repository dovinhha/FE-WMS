import React from "react";
import {
	Button,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";

const DialogUpdateDetailMeasure = ({ open, toggle, data }) => {
	console.log(data);
	return (
		<Modal isOpen={open} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle}>
				<p className="h2 text-uppercase">Thông tin chi tiết số đo</p>
			</ModalHeader>
			<ModalBody>
				<Row className="mb-2">
					<Col xs={6}>
						<Row>
							<Col xs={7}>
								<p className="h4 text-sm mb-0">Mã khách hàng</p>
							</Col>
							<Col xs={5}>
								<p className=" text-sm mb-0">{data.customerCode}</p>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className="mb-2">
					<Col xs={6}>
						<Row>
							<Col xs={7}>
								<p className="h4 text-sm mb-0">Tên khách hàng</p>
							</Col>
							<Col xs={5}>
								<p className=" text-sm mb-0">{data.customerName}</p>
							</Col>
						</Row>
					</Col>
					<Col xs={6}>
						<div className="d-flex justify-content-between">
							<Row>
								<Col xs={7}>
									<p className="h4 text-sm mb-0">Tuổi</p>
								</Col>
								<Col xs={5}>
									<p className=" text-sm mb-0">{data.age}</p>
								</Col>
							</Row>
							<Row>
								<Col xs={7}>
									<p className="h4 text-sm mb-0">Giới tính</p>
								</Col>
								<Col xs={5}>
									<p className=" text-sm mb-0">{data.gender}</p>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
				<Row className="mb-2">
					<Col xs={6}>
						<Row>
							<Col xs={7}>
								<p className="h4 text-sm mb-0">Bộ phận/Phòng ban</p>
							</Col>
							<Col xs={5}>
								<p className=" text-sm mb-0">{data.customerOrgId.name}</p>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className="mb-2">
					<Col xs={6}>
						{/* <div className="d-flex justify-content-between"> */}
						<Row>
							<Col xs={7}>
								<p className="h4 text-sm mb-0">Mã sản phẩm được may</p>
							</Col>
							<Col xs={5}>
								<p className=" text-sm mb-0">
									{data.productTypeId?.code || "Không rõ"}
								</p>
							</Col>
						</Row>
						{/* <Row>
								<Col xs={7}>
									<p className="h4 text-sm mb-0">Loại sản phẩm</p>
								</Col>
								<Col xs={5}>
									<p className=" text-sm mb-0">{data.productTypeId.name}</p>
								</Col>
							</Row> */}
						{/* </div> */}
					</Col>
					<Col xs={6}>
						<div className="d-flex">
							<p className="h4 text-sm mb-0 mr-3">Loại sản phẩm</p>
							<p className=" text-sm mb-0">
								{data.productTypeId?.name || "không rõ"}
							</p>
						</div>
					</Col>
				</Row>
				<hr />
				<Row>
					{/* {data.customerSizeId.sizes.map((item, idx) => {
						return ( */}

					<Col xs={12}>
						<div className="d-flex justify-content-between">
							<p className="h3 text-sm mb-0 font-weight-500">
								Thông tin số đo sản phẩm
							</p>
							<p className="text-sm">
								{data.productTypeId?.name || "Không rõ"}
							</p>
						</div>
						<div className="ml-5">
							<table width={"100%"}>
								<tbody>
									<tr>
										<td className="h3 text-sm mb-0 font-weight-500">
											Số lượng HĐ
										</td>
										<td className="text-sm">02</td>
									</tr>
									<tr>
										<td className="h3 text-sm mb-0 font-weight-500">
											Đơn giá(VNĐ)
										</td>
										<td className="text-sm">
											{data.price && data.price !== 0
												? data.price
												: data.productTypeId?.price || 0}
										</td>
									</tr>
									<tr>
										<td className="h3 text-sm mb-0 font-weight-500">Mặc</td>
										<td className="text-sm">
											{data?.customerSizeId?.wearType}
										</td>
									</tr>

									{data?.customerSizeId?.sizes?.map((item) => {
										return (
											<tr>
												<td className="h3 text-sm mb-0 font-weight-500">
													{item.productParameterId.name}
												</td>
												<td
													className="text-sm d-flex"
													style={{ width: "max-content" }}
												>
													<p className="mr-3 mb-1">{item.size}</p>{" "}
													<InputCustom
														style={{ width: "60px" }}
														size="sm"
														type="number"
													/>{" "}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</Col>

					{/* );
					})} */}
				</Row>
			</ModalBody>
			<ModalFooter className="d-flex justify-content-center">
				<Button onClick={toggle}>Hủy bỏ</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DialogUpdateDetailMeasure;
