import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  DropdownItem,
  Modal,
  Form,
} from "reactstrap";
import { Style } from "../style";
import UploadFileCustom from "views/pages/components/UploadFileCustom";
import InputCustom from "views/pages/components/InputCustom";
import { productTypesActions } from "Redux/Actions";
import { productActions } from "Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import Select from "react-select";
import _ from "lodash";
import makeAnimated from "react-select/animated";
import { notify } from "common";
import * as yup from "yup";
import { Formik } from "formik";
import Error from "views/pages/components/Error";

const animatedComponents = makeAnimated();

const EditProduct = ({
  formModal,
  setFormModal,
  product,
  handleUpdateProduct,
}) => {
  const dispatch = useDispatch();
  const productSchema = yup.object().shape({
    code: yup.string().required("Vui lòng nhập mã sản phẩm!"),
    name: yup.string().required("Vui lòng nhập tên sản phẩm!"),
    parentId: yup.string().required("Vui lòng chọn dòng sản phẩm!"),
    price: yup.string().required("Vui lòng nhập giá sản phẩm!"),

    // productTagIds: yup.array().length(1),
    // productParameterIds: yup.array().length(1),
    // image: yup.string().required('Vui lòng nhập tên người dùng!'),
    // notes: yup.string().required("Vui lòng ghi chú!"),
  });
  const { productTypes } = useSelector((state) => state.productTypesReducer);
  const { productParameters } = useSelector((state) => state.productReducer);
  const [focused, setFocused] = useState({
    parentId: false,
    productParameterIds: false,
  });
  const [productTypesSearch, setProductTypesSearch] = useState("");
  const [listProductParameters, setListProductParameters] = useState([]);
  const [productTypesValue, setProductTypesValue] = useState({});
  const [productParametersSearch, setProductParameterSearch] = useState("");
  const [productInfo, setProductInfo] = useState({
    code: "",
    name: "",
    parentId: "",
    gender: "",
    productTagIds: [],
    productParameterIds: [],
    image: "",
    notes: "",
    price: "",
  });
  const [queryProductTypes, setQueryProductTypes] = useState({
    limit: 10,
    page: 1,
    status: "active",
  });
  const [queryProductParameters, setQueryProductParameter] = useState({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (productTypesSearch === "") {
        dispatch(
          productTypesActions.getProductTypes(
            queryString.stringify(queryProductTypes)
          )
        );
      } else {
        dispatch(
          productTypesActions.getProductTypes(
            queryString.stringify({
              ...queryProductTypes,
              name: productTypesSearch,
            })
          )
        );
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [productTypesSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (productParametersSearch === "") {
        dispatch(
          productActions.getProductParameters(
            queryString.stringify(queryProductParameters)
          )
        );
      } else {
        dispatch(
          productActions.getProductParameters(
            queryString.stringify({
              ...queryProductParameters,
              name: productParametersSearch,
            })
          )
        );
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [productParametersSearch]);

  useEffect(() => {
    if (!_.isEmpty(product)) {
      setProductInfo({
        code: product.code,
        name: product.name,
        parentId: product.parentId.id,
        gender: product.gender,
        productTagIds: product.productTagIds || [],
        productParameterIds:
          product.productParameterIds.map((item) => item.id) || [],
        image: product.image,
        notes: product.notes,
        price: product.price,
      });
      setProductTypesValue({
        label: product.parentId.name,
        value: product.parentId.name,
      });
      setListProductParameters(
        product.productParameterIds.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  }, [product, productTypes]);

  const handleGetImage = (file) => {
    setProductInfo({
      ...productInfo,
      image: file,
    });
  };

  const onSubmit = (values) => {
    handleUpdateProduct(values, product.id, callback);
  };

  const callback = () => {
    setListProductParameters([]);
    setProductTypesValue({});
    setFormModal(false);
  };

  const handleSelectGender = (e) => {
    setProductInfo({
      ...productInfo,
      gender: e.target.value,
    });
  };

  console.log("listProductParameters: ", listProductParameters);

  return (
    <Style>
      <Modal
        className="modal-dialog-centered"
        // size="lg"
        style={{ minWidth: 1248 }}
        isOpen={formModal}
        toggle={() => {
          setFormModal(false);
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0">
            <CardHeader className="bg-transparent pb-2">
              <h2 className="mb-0">Cập nhật thông tin sản phẩm</h2>
            </CardHeader>
            <Formik
              initialValues={productInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={productSchema}
            >
              {({
                values,
                setFieldValue,
                handleSubmit,
                errors,
                touched,
                resetForm,
                handleBlur,
              }) => {
                return (
                  <CardBody className="px-lg-5 py-lg-3">
                    <Form className="needs-validation" noValidate>
                      <Row>
                        <Col xs={7}>
                          <Row className="align-items-center mb-3">
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Mã sản phẩm
                            </Col>
                            <Col xs={9}>
                              <InputCustom
                                disabled={true}
                                placeholder="Nhập mã sản phẩm"
                                type="text"
                                name="code"
                                onBlur={handleBlur}
                                invalid={errors.code && touched.code}
                                onChange={(e) => {
                                  setFieldValue("code", e.target.value);
                                }}
                                messageInvalid={errors.code}
                                value={values.code}
                              />
                            </Col>
                          </Row>
                          <Row className="align-items-center mb-3">
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Tên sản phẩm
                            </Col>
                            <Col xs={9}>
                              <InputCustom
                                defaultValue=""
                                placeholder="Nhập tên nhà sản xuất"
                                type="text"
                                name="name"
                                onBlur={handleBlur}
                                invalid={errors.name && touched.name}
                                onChange={(e) => {
                                  setFieldValue("name", e.target.value);
                                }}
                                messageInvalid={errors.name}
                                value={values.name}
                              />
                            </Col>
                          </Row>
                          <Row className="align-items-center mb-3">
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Giá sản phẩm
                            </Col>
                            <Col xs={9}>
                              <InputCustom
                                name="price"
                                onBlur={handleBlur}
                                placeholder="Nhập giá"
                                type="number"
                                invalid={errors.price && touched.price}
                                onChange={(e) => {
                                  setFieldValue(
                                    "price",
                                    e.target.value === "" ? "" : e.target.value
                                  );
                                }}
                                messageInvalid={""}
                                value={values.price}
                              />
                            </Col>
                          </Row>
                          <Row className="align-items-center mb-3">
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Dòng sản phẩm
                            </Col>
                            <Col xs={9}>
                              <Select
                                placeholder="Chọn dòng sản phẩm"
                                value={productTypesValue}
                                isClearable={true}
                                onChange={(e) => {
                                  setProductTypesValue({ ...e });
                                  // setProductInfo({
                                  //   ...productInfo,
                                  //   parentId: e ? e.value : "",
                                  // });
                                  setFieldValue("parentId", e ? e.value : "");
                                }}
                                options={productTypes.items.map((item) => ({
                                  value: item.id,
                                  label: item.name,
                                }))}
                                onInputChange={(value) => {
                                  setProductTypesSearch(value);
                                }}
                                onFocus={() => {
                                  setFocused({
                                    parentId: true,
                                  });
                                }}
                              />
                              {errors.parentId && focused.parentId && (
                                <Error messageInvalid={errors.parentId} />
                              )}
                            </Col>
                          </Row>
                          <Row className="align-items-center mb-3">
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Giới tính
                            </Col>
                            <Col xs={9}>
                              <Input
                                onChange={handleSelectGender}
                                value={productInfo.gender}
                                type="select"
                              >
                                <option value="" hidden>
                                  Lựa chọn
                                </option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                {/* <option value="khác">Khác</option> */}
                              </Input>
                            </Col>
                          </Row>
                          <Row className="align-items-center mb-3">
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Liệt kê các vị trí đo
                            </Col>
                            <Col xs={9}>
                              <Select
                                value={listProductParameters}
                                placeholder="Chọn vị trí đo"
                                className="select-muti"
                                closeMenuOnSelect={false}
                                isClearable={false}
                                components={animatedComponents}
                                isMulti
                                onChange={(e, remove) => {
                                  console.log(e, remove);

                                  if (_.isEmpty(remove?.removedValue)) {
                                    setListProductParameters([...e]);
                                    setFieldValue("productParameterIds", [
                                      ...e.map((item) => item.value),
                                    ]);
                                  } else {
                                    const tempListProductParameters =
                                      listProductParameters.filter(
                                        (item) =>
                                          item.value !==
                                          remove.removedValue.value
                                      );
                                    setListProductParameters(
                                      tempListProductParameters
                                    );
                                    const tempProductParameterIds =
                                      values.productParameterIds.filter(
                                        (item) =>
                                          item !== remove.removedValue.value
                                      );

                                    setFieldValue(
                                      "productParameterIds",
                                      tempProductParameterIds
                                    );
                                  }
                                }}
                                options={productParameters.items.map(
                                  (item) => ({
                                    value: item.id,
                                    label: item.name,
                                  })
                                )}
                                onInputChange={(value) => {
                                  setProductParameterSearch(value);
                                }}
                                onFocus={() => {
                                  setFocused({
                                    ...focused,
                                    productParameterIds: true,
                                  });
                                }}
                              />
                              {values.productParameterIds.length === 0 &&
                                focused.productParameterIds && (
                                  <Error
                                    messageInvalid={"Vui lòng chọn vị trí đo!"}
                                  />
                                )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={3} className="h3 text-sm font-weight-500">
                              Mô tả
                            </Col>
                            <Col xs={9}>
                              <InputCustom
                                placeholder="Nhập mô tả"
                                type="textarea"
                                onChange={(e) => {
                                  setFieldValue("notes", e.target.value);
                                }}
                                messageValid={""}
                                messageInvalid={""}
                                value={values.notes}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={5}>
                          <Card>
                            <CardBody>
                              <p className="h3 text-sm font-weight-500">
                                Ảnh mô tả
                              </p>
                              <DropdownItem divider />
                              <UploadFileCustom
                                handleGetImage={handleGetImage}
                              />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row className="justify-content-end mr-2">
                        <Button
                          onClick={() => {
                            setFormModal(false);
                          }}
                        >
                          Hủy bỏ
                        </Button>
                        <Button
                          onClick={() => {
                            setFocused({
                              parentId: true,
                              productParameterIds: true,
                            });
                            if (values.productParameterIds.length === 0) return;
                            handleSubmit();
                          }}
                          color="primary"
                        >
                          Lưu
                        </Button>
                      </Row>
                    </Form>
                  </CardBody>
                );
              }}
            </Formik>
          </Card>
        </div>
      </Modal>
    </Style>
  );
};

export default EditProduct;
