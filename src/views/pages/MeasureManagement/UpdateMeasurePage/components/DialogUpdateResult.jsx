import { AddSVG } from "assets/svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import {
	Button,
	Col,
	FormGroup,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import { productActions } from "Redux/Actions";
import queryString from "query-string";
import * as yup from "yup";
import { orderActions } from "Redux/Actions";
import InputCustom from "views/pages/components/InputCustom";
import { Formik } from "formik";
const DialogUpdateResult = ({ open, toggle, data, handleUpdate }) => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productReducer);
	const [textSearchProducts, setTextSearchProducts] = useState("");
	const [payload, setPayload] = useState({
		price: "",
		quota: "",
		productTypeId: "",
	});
	const [changed, setChanged] = useState({
		productTypeId: false,
	});
	const payloadSchema = yup.object().shape({
		price: yup.string().required("Trường này không được để trống"),
		quota: yup
			.number()
			.lessThan(data.quota, "Số lượng phải nhỏ hơn ban đầu")
			.required("Trường này không được để trống"),
		productTypeId: yup.string().required("Trường này không được để trống"),
	});
	const handleGetProducts = () => {
		if (textSearchProducts === "") {
			dispatch(
				productActions.getProducts(queryString.stringify({ limit: 10 }))
			);
		} else {
			dispatch(
				productActions.getProducts(
					queryString.stringify({ limit: 10, name: textSearchProducts })
				)
			);
		}
	};
	useEffect(() => {
		handleGetProducts();
	}, [textSearchProducts]);
	const handleChangeInput = (e) => {
		setPayload({ ...payload, [e.target.name]: e.target.value });
	};

	return (
		<Modal isOpen={open} toggle={toggle}>
			<Formik
				initialValues={payload}
				enableReinitialize
				onSubmit={(values) => {
					handleUpdate(values, data.id);
				}}
				validationSchema={payloadSchema}
			>
				{({
					values,
					setFieldValue,
					handleSubmit,
					handleChange,
					errors,
					touched,
					resetForm,
					handleBlur,
					setFieldTouched,
				}) => {
					console.log(errors);
					return (
						<>
							<ModalHeader>
								<p className="h3 text-uppercase">
									Cập nhật trạng thái chuyển đổi
								</p>
							</ModalHeader>
							<ModalBody>
								<Row>
									<Col xs={3}>
										<p className="text-sm font-weight-500 h5 mb-3">
											Mã nhân viên
										</p>
									</Col>
									<Col xs={9}>
										<small>{data.customerCode}</small>
									</Col>
								</Row>
								<Row>
									<Col xs={3}>
										<p className="text-sm font-weight-500 h5 mb-3">
											Tên nhân viên
										</p>
									</Col>
									<Col xs={9}>
										<small>{data.customerName}</small>
									</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<p className="text-sm font-weight-500 h5 mb-3">
											Thông tin chuyển đổi
										</p>
									</Col>
								</Row>
								<div className="mx-4">
									<Row>
										<Col xs={6} style={{ borderRight: "1px solid #BABCBE" }}>
											<small className="mb-3 d-block">
												Chỉ tiêu theo hợp đồng
											</small>
											<Row>
												<Col xs={6}>
													<p className="text-sm font-weight-500 h5 mb-3">
														Sản phẩm
													</p>
												</Col>
												<Col xs={6}>
													<small>{data.productTypeId?.name || 0}</small>
												</Col>
											</Row>
											<Row>
												<Col xs={6}>
													<p className="text-sm font-weight-500 h5 mb-3">
														Số lượng
													</p>
												</Col>
												<Col xs={6}>
													<small>{data.quota}</small>
												</Col>
											</Row>
											<Row>
												<Col xs={6}>
													<p className="text-sm font-weight-500 h5 mb-3">
														Đơn giá
													</p>
												</Col>
												<Col xs={6}>
													<small>
														{data.price || data.productTypeId?.price || 0}
													</small>
												</Col>
											</Row>
											<Row>
												<Col xs={6}>
													<p className="text-sm font-weight-500 h5 mb-3">
														Thành tiền
													</p>
												</Col>
												<Col xs={6}>
													<small>
														{data.price * data.quota ||
															data.productTypeId?.price ||
															0 * data.quota}
													</small>
												</Col>
											</Row>
										</Col>
										<Col xs={6}>
											<small className="mb-3 d-block">
												Chỉ tiêu chuyển đổi
											</small>

											<ReactSelect
												className="mb-2 mt--1 text-sm"
												placeholder="Nhập tên tìm kiếm"
												isClearable={true}
												name="productTypeId"
												onChange={(e) => {
													console.log(e);
													setFieldValue("productTypeId", e ? e.value : "");
													setFieldValue("barcode", e ? e.barCode : "");
												}}
												onInputChange={(value) => {
													console.log(value);
													setTextSearchProducts(value);
													// setChanged({ ...changed, productTypeId: true });
												}}
												options={products.results.map((item) => ({
													label: item.name,
													value: item.id,
													barCode: item.code,
												}))}
											/>
											{changed.productTypeId && errors.productTypeId && (
												<div className="invalid-feedback d-block">
													{"Không được để trống"}
												</div>
											)}
											<InputCustom
												className="mb-2"
												size="sm"
												type="number"
												name="quota"
												placeholder="Số lượng chuyển đổi"
												onBlur={handleBlur}
												invalid={errors.quota && touched.quota}
												onChange={handleChange}
												messageInvalid={errors.quota}
												// onChange={handleChangeInput}
												value={values.quota}
											></InputCustom>

											<InputCustom
												className="mb-2"
												size="sm"
												placeholder="Đơn giá mới"
												name="price"
												onBlur={handleBlur}
												invalid={errors.price && touched.price}
												onChange={handleChange}
												messageInvalid={errors.price}
												// onChange={handleChangeInput}
												value={values.price}
											></InputCustom>
										</Col>
									</Row>
								</div>
								{/* <p className="text-sm font-weight-500 h5 mb-3">Thông tin thêm</p>
				<div className="ml-3">
					<Row>
						<Col className="px-1" xs={3}>
							<p className="text-sm font-weight-500 h5 mb-3">Sản phẩm</p>
						</Col>
						<Col className="px-1" xs={3}>
							<p className="text-sm font-weight-500 h5 mb-3">Số lượng</p>
						</Col>
						<Col className="px-1" xs={3}>
							<p className="text-sm font-weight-500 h5 mb-3">Đơn giá(VNĐ)</p>
						</Col>
						<Col className="px-1" xs={3}>
							<p className="text-sm font-weight-500 h5 mb-3">Thành tiền</p>
						</Col>
					</Row>
					<hr className="mt-0 mb-2" />
					<Row>
						<Col className="px-1" xs={3}>
							<Input type="select" size="sm">
								<option value="" hidden>
									Lựa chọn
								</option>
							</Input>
						</Col>
						<Col className="px-1" xs={3}>
							<Input size="sm" />
						</Col>
						<Col className="px-1" xs={3}>
							<Input size="sm" />
						</Col>
						<Col className="px-1" xs={3}>
							<Input size="sm" />
						</Col>
					</Row>
					<div className="d-flex justify-content-end mt-3">
						<span style={{ cursor: "pointer" }}>
							<AddSVG />
						</span>
					</div>
				</div> */}
								<div className="mt-4">
									<div className="text-sm font-weight-500 mb-2">Ghi chú</div>
									<Input type="textarea" name="text" id="exampleText" />
								</div>
							</ModalBody>
							<ModalFooter className="justify-content-center">
								<Button onClick={toggle}>Hủy bỏ</Button>
								<Button
									color="primary"
									// onClick={() => {
									// 	console.log(payload);
									// 	handleUpdate(payload, data.id);
									// }}
									onClick={() => {
										setChanged({ ...changed, productTypeId: true });

										handleSubmit();
									}}
								>
									Cập nhật
								</Button>
							</ModalFooter>
						</>
					);
				}}
			</Formik>
		</Modal>
	);
};

export default DialogUpdateResult;
