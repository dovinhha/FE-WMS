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
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
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
import ReactNotificationAlert from "react-notification-alert";
import { notify } from "common";
import * as yup from "yup";
import { Formik } from "formik";
import Error from "views/pages/components/Error";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { useHistory } from "react-router-dom";
const animatedComponents = makeAnimated();

const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productTypes } = useSelector((state) => state.productTypesReducer);
  const { productParameters, isCreateProduct, isUpdateProduct } = useSelector(
    (state) => state.productReducer
  );

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

  const notificationAlertRef = useRef(null);
  const [changed, setChanged] = useState({
    parentId: false,
    productParameterIds: false,
  });
  const [listProductParameters, setListProductParameters] = useState([]);
  const [productTypesValue, setProductTypesValue] = useState({});
  const [productTypesSearch, setProductTypesSearch] = useState("");
  const [productParametersSearch, setProductParameterSearch] = useState("");
  const [productInfo, setProductInfo] = useState({
    code: "",
    name: "",
    parentId: "",
    gender: "Nữ",
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

  const handleGetImage = (file) => {
    setProductInfo({
      ...productInfo,
      image: file,
    });
  };

  const onSubmit = (values, actions) => {
    dispatch(
      productActions.createProduct(values, {
        success: () => {
          actions.resetForm();
          clearData();
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Thêm sản phẩm thành công!`
          );
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Thêm sản phẩm thất bại. Lỗi ${mess}!`
          );
        },
      })
    );
  };

  const clearData = () => {
    setProductInfo({
      code: "",
      name: "",
      parentId: "",
      gender: "Nữ",
      productTagIds: [],
      productParameterIds: [],
      image: "",
      notes: "",
    });
    setListProductParameters([]);
    setProductTypesValue({});
    setChanged({
      parentId: false,
      productParameterIds: false,
    });
  };
  return (
    <Style>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <SimpleHeader name="Thêm mới sản phẩm"></SimpleHeader>
      <Container fluid className="mt--6 d-flex justify-content-center">
        <Card style={{ width: "1048px" }}>
          <CardHeader>
            <p className="h3">Nhập thông tin sản phẩm</p>
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
                <>
                  <CardBody>
                    <Row>
                      <Col xs={7}>
                        <Row className="align-items-center mb-3">
                          <Col xs={3} className="h3 text-sm font-weight-500">
                            Mã sản phẩm
                          </Col>
                          <Col xs={9}>
                            <InputCustom
                              placeholder="Nhập mã sản phẩm"
                              type="text"
                              invalid={errors.code && touched.code}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("code", e.target.value);
                              }}
                              messageInvalid={errors.code}
                              value={values.code}
                              name="code"
                            />
                          </Col>
                        </Row>
                        <Row className="align-items-center mb-3">
                          <Col xs={3} className="h3 text-sm font-weight-500">
                            Tên sản phẩm
                          </Col>
                          <Col xs={9}>
                            <InputCustom
                              name="name"
                              onBlur={handleBlur}
                              placeholder="Nhập tên nhà sản xuất"
                              type="text"
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
                                  e.target.value.trim() === ""
                                    ? ""
                                    : e.target.value
                                );
                              }}
                              messageInvalid={errors.price}
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
                              isClearable={true}
                              value={productTypesValue}
                              id="parentId"
                              name="parentId"
                              onChange={(e) => {
                                setProductTypesValue({ ...e });
                                setFieldValue("parentId", e ? e.value : "");
                              }}
                              options={productTypes.results.map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))}
                              onInputChange={(value) => {
                                setProductTypesSearch(value);
                              }}
                              onFocus={() => {
                                setChanged({
                                  ...changed,
                                  parentId: true,
                                });
                              }}
                            />
                            {errors.parentId !== "" && changed.parentId && (
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
                              onChange={(e) => {
                                setFieldValue("gender", e.target.value);
                              }}
                              value={values.gender}
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
                              isClearable={false}
                              value={listProductParameters}
                              placeholder="Chọn vị trí đo"
                              className="select-muti"
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              onChange={(e, remove) => {
                                if (_.isEmpty(remove?.removedValue)) {
                                  setListProductParameters([...e]);
                                  setFieldValue("productParameterIds", [
                                    ...e.map((item) => item.value),
                                  ]);
                                } else {
                                  const tempListProductParameters =
                                    listProductParameters.filter(
                                      (item) =>
                                        item.value !== remove.removedValue.value
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
                              options={productParameters.results.map(
                                (item) => ({
                                  value: item.id,
                                  label: item.name,
                                })
                              )}
                              onInputChange={(value) => {
                                setProductParameterSearch(value);
                              }}
                              onFocus={() => {
                                setChanged({
                                  ...changed,
                                  productParameterIds: true,
                                });
                              }}
                            />
                            {values.productParameterIds.length === 0 &&
                              changed.productParameterIds && (
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
                              name="notes"
                              onBlur={handleBlur}
                              type="textarea"
                              invalid={errors.notes && touched.notes}
                              onChange={(e) => {
                                setFieldValue("notes", e.target.value);
                              }}
                              messageInvalid={errors.notes}
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
                            <UploadFileCustom handleGetImage={handleGetImage} />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="d-flex justify-content-center">
                    <Button
                      onClick={() => {
                        clearData();
                        resetForm();
                        history.push("/list-product");
                      }}
                    >
                      Hủy bỏ
                    </Button>
                    <LoadingButtonCustom
                      loading={isCreateProduct || isUpdateProduct}
                      onClick={() => {
                        setChanged({
                          parentId: true,
                          productParameterIds: true,
                        });
                        if (values.productParameterIds.length === 0) return;
                        handleSubmit();
                      }}
                      color="primary"
                      size="md"
                      type="button"
                    >
                      Lưu và tiếp tục
                    </LoadingButtonCustom>
                  </CardFooter>
                </>
              );
            }}
          </Formik>
        </Card>
      </Container>
    </Style>
  );
};

export default AddProduct;
