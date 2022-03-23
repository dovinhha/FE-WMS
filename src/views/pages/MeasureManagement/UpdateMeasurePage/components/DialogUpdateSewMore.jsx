import { AddSVG } from "assets/svg";
import { Formik } from "formik";
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
import InputCustom from "views/pages/components/InputCustom";
import * as yup from "yup";
import queryString from "query-string";
const DialogUpdateSewMore = ({ open, toggle, data, handleAddSewMeasure }) => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productReducer);
	const [textSearchProducts, setTextSearchProducts] = useState("");
	const [changed, setChanged] = useState({
		productTypeId: false,
	});
	const [payload, setPayload] = useState({
		price: "",
		quota: "",
		productTypeId: "",
	});
	const payloadSchema = yup.object().shape({
		price: yup.number().required("Trường này không được để trống"),
		quota: yup.number().required("Trường này không được để trống"),
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
	return (
		<Modal isOpen={open} toggle={toggle}>
			<Formik
				initialValues={payload}
				enableReinitialize
				onSubmit={(values) => handleAddSewMeasure(values, data.id)}
				validationSchema={payloadSchema}
			>
				{({
					values,
					setFieldValue,
					handleChange,
					handleSubmit,
					errors,
					touched,
					handleBlur,
				}) => {
					console.log(errors);
					console.log(touched);
					return (
						<>
							<ModalHeader>
								<p className="h3 text-uppercase">
									Cập nhật trạng thái may thêm
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
								<p className="text-sm font-weight-500 h5 mb-3">
									Thông tin thêm
								</p>
								<div className="ml-3">
									<Row>
										<Col className="px-1" xs={3}>
											<p className="text-sm font-weight-500 h5 mb-3">
												Sản phẩm
											</p>
										</Col>
										<Col className="px-1" xs={3}>
											<p className="text-sm font-weight-500 h5 mb-3">
												Số lượng
											</p>
										</Col>
										<Col className="px-1" xs={3}>
											<p className="text-sm font-weight-500 h5 mb-3">
												Đơn giá(VNĐ)
											</p>
										</Col>
										<Col className="px-1" xs={3}>
											<p className="text-sm font-weight-500 h5 mb-3">
												Thành tiền
											</p>
										</Col>
									</Row>
									<hr className="mt-0 mb-2" />
									<Row>
										<Col className="px-1" xs={3}>
											<ReactSelect
												className="mb-2 mt--1 text-sm"
												placeholder="Nhập"
												isClearable={true}
												name="productTypeId"
												onInputChange={(value) => {
													console.log(value);

													setTextSearchProducts(value);
												}}
												onChange={(e) => {
													console.log(e);
													setFieldValue("productTypeId", e ? e.value : "");
													setFieldValue("barcode", e ? e.barCode : "");
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
										</Col>
										<Col className="px-1" xs={3}>
											<InputCustom
												name="quota"
												invalid={touched.quota && errors.quota}
												messageInvalid={errors.quota}
												value={values.quota}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Nhập số"
												size="sm"
												type="number"
											/>
										</Col>
										<Col className="px-1" xs={3}>
											<InputCustom
												name="price"
												value={values.price}
												onChange={handleChange}
												onBlur={handleBlur}
												invalid={touched.price && errors.price}
												messageInvalid={errors.price}
												placeholder="Nhập giá"
												size="sm"
												type="number"
											/>
										</Col>
										<Col className="px-1" xs={3}>
											<p>{values.price * values.quota || 0}</p>
										</Col>
									</Row>
									<div className="d-flex justify-content-end mt-3">
										<span style={{ cursor: "pointer" }}>
											<AddSVG />
										</span>
									</div>
								</div>
								<div className="mt-4">
									<div className="text-sm font-weight-500 mb-2">Ghi chú</div>
									<Input
										type="textarea"
										name="notes"
										id="exampleText"
										value={values.notes}
										onChange={handleChange}
									/>
								</div>
							</ModalBody>
							<ModalFooter className="justify-content-center">
								<Button onClick={toggle}>Hủy bỏ</Button>
								<Button
									color="primary"
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

export default DialogUpdateSewMore;
