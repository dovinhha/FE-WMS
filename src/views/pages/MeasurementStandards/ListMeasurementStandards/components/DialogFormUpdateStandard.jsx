import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import { Formik } from "formik";
import * as yup from "yup";
import { productActions } from "Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import _ from "lodash";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import Error from "views/pages/components/Error";

const DialogFormUpdateStandard = ({ open, toggle, data, handleUpdate }) => {
  const { products } = useSelector((state) => state.productReducer);
  const { isUpdateMeasurementStandard } = useSelector(
    (state) => state.measurementStandardsReducer
  );
  const dispatch = useDispatch();
  const [productSearch, setProductSearch] = useState("");
  const [product, setProduct] = useState({});
  const [productIdDefault, setProductIdDefault] = useState("");
  const [checkErrorStandardSize, setCheckErrorStandardSize] = useState(false);
  const [queryProduct, setQueryProduct] = useState({
    limit: 10,
    page: 1,
    populate: "productParameterIds",
  });

  const standardSchema = yup.object().shape({
    code: yup.string().required("Mã tiêu chuẩn không được để trống!"),
    name: yup.string().required("Tên tiêu chuẩn không được để trống!"),
    height: yup.string().required("Chiều cao không được để trống!"),
    weight: yup.string().required("Cân nặng không được để trống!"),
    productTypeId: yup.string().required("Vui lòng chọn sản phẩm!"),
  });

  const [standardSizeInfo, setStandardSizeInfo] = useState({
    code: "",
    name: "",
    height: "",
    weight: "",
    productTypeId: "",
  });
  const [standardSizes, setStandardSizes] = useState([]);

  const handleGetProducts = () => {
    if (productSearch === "") {
      dispatch(productActions.getProducts(queryString.stringify(queryProduct)));
    } else {
      dispatch(
        productActions.getProducts(
          queryString.stringify({ ...queryProduct, name: productSearch })
        )
      );
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [queryProduct]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      // console.log("data: ", data);
      setStandardSizeInfo({
        ...data,
        productTypeId: data.productTypeId.id,
        standardSizes: data.standardSizes.map((item) => ({
          ...item,
          id: item.productParameterId?.id,
        })),
      });

      setProductIdDefault(data.productTypeId.id);
      setProduct({
        value: data.productTypeId.id,
        label: data.productTypeId.name,
      });
      setStandardSizes(
        data.standardSizes.map((item) => ({
          ...item,
          id: item.productParameterId?.id,
        }))
      );
    }
  }, [data]);

  const onSubmit = (values, actions) => {
    handleUpdate(values, standardSizes, actions, clearData);
  };

  const clearData = () => {
    setStandardSizeInfo({
      code: "",
      name: "",
      height: "",
      weight: "",
      productTypeId: "",
    });
    setStandardSizes([]);
    setProduct({});
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="lg">
        <CardHeader>
          <p className="h3 font-weight-500">Thông tin size tiêu chuẩn</p>
        </CardHeader>
        <Formik
          initialValues={standardSizeInfo}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={standardSchema}
        >
          {({
            values,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
            resetForm,
            handleBlur,
            setFieldTouched,
          }) => {
            return (
              <>
                <CardBody>
                  <Row>
                    <Col xs={9}>
                      <Row>
                        <Col xs={4}>
                          <p className="font-weight-500 text-sm">
                            Mã tiêu chuẩn
                          </p>
                        </Col>
                        <Col xs={8}>
                          <FormGroup>
                            <InputCustom
                              placeholder="Nhập mã tiêu chuẩn"
                              type="text"
                              invalid={errors.code && touched.code}
                              name="code"
                              id="code"
                              value={values.code}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("code", e.target.value);
                              }}
                              messageInvalid={errors.code}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={3}></Col>
                  </Row>
                  <Row>
                    <Col xs={9}>
                      <Row>
                        <Col xs={4}>
                          <p className="font-weight-500 text-sm">Tên </p>
                        </Col>
                        <Col xs={8}>
                          <FormGroup>
                            <InputCustom
                              placeholder="Nhập tên tiêu chuẩn"
                              type="text"
                              invalid={errors.name && touched.name}
                              name="name"
                              id="name"
                              value={values.name}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("name", e.target.value);
                              }}
                              messageInvalid={errors.name}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={3}></Col>
                  </Row>
                  <Row className="mb-4">
                    <Col xs={9}>
                      <Row>
                        <Col xs={4} className="font-weight-500 text-sm">
                          Nhập sản phẩm
                        </Col>
                        <Col xs={8}>
                          <ReactSelect
                            placeholder="Nhập sản phẩm"
                            value={product}
                            isClearable={true}
                            onChange={(e) => {
                              setProduct({ ...e });
                              setFieldValue("productTypeId", e ? e.value : "");
                              if (e.value === productIdDefault) {
                                setStandardSizes(values.standardSizes);
                              } else {
                                const temp = [];
                                !_.isEmpty(e.productParameterIds) &&
                                  e.productParameterIds.forEach((item) =>
                                    temp.push({
                                      bias: 0,
                                      priority: 0,
                                      productParameterId: {
                                        name: item.name,
                                        id: item.id,
                                      },
                                      size: 0,
                                      id: item.id,
                                    })
                                  );
                                setStandardSizes(temp);
                              }
                            }}
                            options={products.items.map((item) => ({
                              label: item.name,
                              value: item.id,
                              productParameterIds: item.productParameterIds,
                            }))}
                            onInputChange={(value) => {
                              setProductSearch(value);
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col xs={9}>
                      <Row>
                        <Col xs={4}>
                          <p className="font-weight-500 text-sm">Chiều cao</p>
                        </Col>
                        <Col xs={8}>
                          <InputCustom
                            placeholder="Nhập chiều cao"
                            type="number"
                            valid={false}
                            invalid={errors.height && touched.height}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue(
                                "height",
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value)
                              );
                            }}
                            name="height"
                            id="height"
                            value={values.height}
                            messageInvalid={errors.height}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col xs={9}>
                      <Row>
                        <Col xs={4}>
                          <p className="font-weight-500 text-sm">Cân nặng</p>
                        </Col>
                        <Col xs={8}>
                          <InputCustom
                            placeholder="Nhập cân nặng"
                            type="number"
                            valid={false}
                            invalid={errors.weight && touched.weight}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue(
                                "weight",
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value)
                              );
                            }}
                            name="weight"
                            id="weight"
                            value={values.weight}
                            messageInvalid={errors.weight}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {standardSizes.map((item, index) => {
                    return (
                      <>
                        <Row>
                          <Col key={item.id} xs={4}>
                            <InputCustom
                              className="form-control"
                              label={item?.productParameterId?.name}
                              type="number"
                              data-id={item.id}
                              name={`productParamater-${index}`}
                              onChange={(e) => {
                                setStandardSizes([
                                  ...standardSizes.slice(0, index),
                                  {
                                    ...standardSizes[index],
                                    size:
                                      e.target.value !== ""
                                        ? Number(e.target.value)
                                        : "",
                                  },
                                  ...standardSizes.slice(index + 1),
                                ]);
                              }}
                              value={item.size}
                            />
                          </Col>
                          <Col xs={4}>
                            {/* <p className="h3 text-sm font-weight-500 col-6 mb-0">
                              Biên độ
                            </p> */}
                            <InputCustom
                              label="Biên độ"
                              className="form-control"
                              type="number"
                              data-id={item.id}
                              name={`bias-${index}`}
                              onChange={(e) => {
                                setStandardSizes([
                                  ...standardSizes.slice(0, index),
                                  {
                                    ...standardSizes[index],
                                    bias:
                                      e.target.value !== ""
                                        ? Number(e.target.value)
                                        : "",
                                  },
                                  ...standardSizes.slice(index + 1),
                                ]);
                              }}
                              value={item.bias}
                            />
                          </Col>
                          <Col xs={4}>
                            <InputCustom
                              label="Trọng số"
                              className="form-control"
                              type="number"
                              data-id={item.id}
                              name={`priority-${index}`}
                              onChange={(e) => {
                                setStandardSizes([
                                  ...standardSizes.slice(0, index),
                                  {
                                    ...standardSizes[index],
                                    priority:
                                      e.target.value !== ""
                                        ? Number(e.target.value)
                                        : "",
                                  },
                                  ...standardSizes.slice(index + 1),
                                ]);
                              }}
                              value={item.priority}
                            />
                          </Col>
                        </Row>
                        <hr className="my-2" />
                      </>
                    );
                  })}
                  {checkErrorStandardSize && (
                    <Error messageInvalid="Chú ý các trường dữ liệu của vị trí đo không được để trống!" />
                  )}
                </CardBody>
                <CardFooter className="d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      if (isUpdateMeasurementStandard) return;
                      resetForm();
                      clearData();
                      toggle();
                    }}
                  >
                    Hủy bỏ
                  </Button>
                  <LoadingButtonCustom
                    loading={isUpdateMeasurementStandard}
                    onClick={() => {
                      let checkError = false;
                      standardSizes.forEach((item) => {
                        if (
                          item.bias === "" ||
                          item.size === "" ||
                          item.priority === ""
                        ) {
                          checkError = true;
                        }
                      });
                      if (checkError) {
                        setCheckErrorStandardSize(true);
                        return;
                      } else {
                        setCheckErrorStandardSize(false);
                      }
                      handleSubmit();
                    }}
                    color="primary"
                    size="md"
                    type="button"
                  >
                    Lưu
                  </LoadingButtonCustom>
                  {/* <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Cập nhật
                  </Button> */}
                </CardFooter>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default DialogFormUpdateStandard;
