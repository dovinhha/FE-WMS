import React, { useEffect, useRef, useState } from "react";
import { Style } from "../style";
import { GET } from "Services/ServiceBase";
import SimpleHeader from "components/Headers/SimpleHeader";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  Row,
  CardFooter,
  Button,
  Table,
  FormGroup,
} from "reactstrap";
import _ from "lodash";
import InputCustom from "views/pages/components/InputCustom";
import Select from "react-select";
import ServiceURL from "Services/ServiceURL";
import { notify } from "common";
import measurementStandardsActions from "Redux/Actions/measurementStandardsActions";
import ReactNotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { productActions } from "Redux/Actions";
import queryString from "query-string";
import Error from "views/pages/components/Error";

const AddMeasurementStandard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector((state) => state.productTypesReducer);

  const measurementStandardSchema = yup.object().shape({
    code: yup.string().required("Mã tiêu chuẩn không được để trống!"),
    name: yup.string().required("Tên size không được để trống!"),
    height: yup.string().required("Chiều cao không được để trống!"),
    weight: yup.string().required("Cân nặng không được để trống!"),
    productTypeId: yup.string().required("Vui lòng chọn sản phẩm!"),
  });
  const notificationAlertRef = useRef(null);
  const [dataForm, setDataForm] = useState({
    code: "",
    name: "",
    height: "",
    weight: "",
    productTypeId: "",
  });
  const [focused, setFocused] = useState({
    productTypeId: false,
  });
  const [standardSizes, setStandardSizes] = useState([]);
  const [errorStandardSizes, setErrorStandardSize] = useState(false);
  const [productTypeIdValue, setProductTypeIdValue] = useState({});
  const [productTypeIdSearch, setProductTypeIdSearch] = useState({});
  const [productQuery, setProductQuery] = useState({
    limit: 10,
    page: 1,
    populate: "productParameterIds",
  });

  const handleGetProducts = () => {
    if (productTypeIdSearch === "") {
      dispatch(productActions.getProducts(queryString.stringify(productQuery)));
    } else {
      dispatch(
        productActions.getProducts(
          queryString.stringify({
            ...productQuery,
            name: productTypeIdSearch,
          })
        )
      );
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [productTypeIdSearch]);

  const handleAddMeasurementStandard = (values, actions) => {
    // console.log(standardSizes);
    // const arrInputSize = document.querySelectorAll(
    //   `input[name^=standardSizes]`
    // );
    // const arrInputBias = document.querySelectorAll(`input[name^=bias]`);
    // const arrInputPriority = document.querySelectorAll(`input[name^=priority]`);
    // let standardSizes = [];
    // for (let i = 0; i < arrInputSize.length; i++) {
    //   standardSizes.push({
    //     productParameterId: arrInputSize[i].getAttribute("data-id"),
    //     size: arrInputSize[i].value,
    //     bias: arrInputBias[i].value,
    //     priority: arrInputPriority[i].value,
    //   });
    // }
    const payload = {
      ...values,
      standardSizes: standardSizes.map((item) => ({
        productParameterId: item.productParameterId,
        size: item.size,
        bias: item.bias,
        priority: item.priority,
      })),
    };
    dispatch(
      measurementStandardsActions.createMeasurementStandard(payload, {
        success: () => {
          actions.resetForm();
          setDataForm({
            code: "",
            name: "",
            height: "",
            weight: "",
            productTypeId: "",
          });
          setProductTypeIdValue({});
          setStandardSizes([]);
          setErrorStandardSize(false);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Thêm tiêu chuẩn số đo thành công!`
          );
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Thêm tiêu chuẩn số đo thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  return (
    <Style>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <SimpleHeader name="Tiêu chuẩn số đo" />
      <Container fluid className="mt--6 d-flex justify-content-center">
        <Card style={{ width: "719px" }}>
          <CardHeader>
            <p className="h3 font-weight-500">Nhập thông tin size tiêu chuẩn</p>
          </CardHeader>
          <Formik
            initialValues={dataForm}
            enableReinitialize
            onSubmit={handleAddMeasurementStandard}
            validationSchema={measurementStandardSchema}
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
              console.log("errors: ", errors);
              return (
                <>
                  <CardBody>
                    <Row>
                      <Col xs={6}>
                        <Row className="align-items-center">
                          <Col xs={4}>
                            <p className="font-weight-500 text-sm mb-0">
                              Mã tiêu chuẩn
                            </p>
                          </Col>
                          <Col xs={8}>
                            <FormGroup className="mb-2">
                              <InputCustom
                                placeholder="Nhập mã"
                                type="text"
                                name="code"
                                invalid={errors.code && touched.code}
                                onBlur={handleBlur}
                                value={values.code}
                                onChange={(e) => {
                                  setFieldValue("code", e.target.value);
                                }}
                                messageInvalid={errors.code}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={6}></Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Row className="align-items-center">
                          <Col xs={4}>
                            <p className="font-weight-500 text-sm mb-0">
                              Tên size
                            </p>
                          </Col>
                          <Col xs={8}>
                            <FormGroup className="mb-2">
                              <InputCustom
                                placeholder="Nhập tên"
                                type="text"
                                name="name"
                                onBlur={handleBlur}
                                invalid={errors.name && touched.name}
                                value={values.name}
                                onChange={(e) => {
                                  setFieldValue("name", e.target.value);
                                }}
                                messageInvalid={errors.name}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={6}>
                        <Row className="align-items-center">
                          <Col xs={4} className="font-weight-500 text-sm mb-0">
                            Sản phẩm
                          </Col>
                          <Col xs={8}>
                            <Select
                              placeholder="Lựa chọn"
                              isClearable={true}
                              value={productTypeIdValue}
                              onChange={(e) => {
                                setProductTypeIdValue({ ...e });
                                // setDataForm({
                                //   ...dataForm,
                                //   productTypeId: e ? e.value : "",
                                // });
                                setFieldValue(
                                  "productTypeId",
                                  e ? e.value : ""
                                );
                                if (!_.isEmpty(e?.standardSizes)) {
                                  const tempStandardSize = [];
                                  e.standardSizes.forEach((item) => {
                                    tempStandardSize.push({
                                      productParameterId: item.id,
                                      name: item.name,
                                      size: "",
                                      bias: "",
                                      priority: "",
                                    });
                                  });
                                  setStandardSizes(tempStandardSize);
                                }
                              }}
                              options={products.results.map((item) => ({
                                label: item.name,
                                value: item.id,
                                standardSizes: item.productParameterIds,
                              }))}
                              onInputChange={(value) => {
                                setProductTypeIdSearch(value);
                              }}
                              onFocus={() => {
                                setFocused({
                                  ...focused,
                                  productTypeId: true,
                                });
                              }}
                            />
                            {errors.productTypeId && focused.productTypeId && (
                              <Error messageInvalid={errors.productTypeId} />
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col xs={6}>
                        <Row className="align-items-center">
                          <Col xs={4}>
                            <p className="font-weight-500 text-sm mb-0">
                              Chiều cao
                            </p>
                          </Col>
                          <Col xs={8}>
                            <InputCustom
                              placeholder="Nhập"
                              type="number"
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
                              value={values.height}
                              messageInvalid={errors.height}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={6}>
                        <Row className="align-items-center">
                          <Col xs={4}>
                            <p className="font-weight-500 text-sm mb-0">
                              Cân nặng
                            </p>
                          </Col>
                          <Col xs={8}>
                            <InputCustom
                              placeholder="Nhập"
                              type="number"
                              onBlur={handleBlur}
                              invalid={errors.weight && touched.weight}
                              onChange={(e) => {
                                setFieldValue(
                                  "weight",
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                                );
                              }}
                              name="weight"
                              value={values.weight}
                              messageInvalid={errors.weight}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {values.productTypeId && (
                      <p className="h3 text-sm font-weight-500">
                        Nhập vị trí đo
                      </p>
                    )}

                    {standardSizes.map((item, index) => {
                      return (
                        <div className="mx-3">
                          <Row>
                            <Col xs={4} className="d-flex align-items-center">
                              <p className="h3 text-sm font-weight-500 col-6 mb-0">
                                {item.name}
                              </p>
                              <Input
                                type="number"
                                name="size"
                                value={item.size}
                                onChange={(e) => {
                                  setStandardSizes([
                                    ...standardSizes.slice(0, index),
                                    {
                                      ...standardSizes[index],
                                      size:
                                        e.target.value === ""
                                          ? ""
                                          : Number(e.target.value),
                                    },
                                    ...standardSizes.slice(index + 1),
                                  ]);
                                }}
                              />
                            </Col>
                            <Col xs={4} className="d-flex align-items-center">
                              <p className="h3 text-sm font-weight-500 col-6 mb-0">
                                Biên độ
                              </p>
                              <Input
                                type="number"
                                value={item.bias}
                                name="bias"
                                onChange={(e) => {
                                  setStandardSizes([
                                    ...standardSizes.slice(0, index),
                                    {
                                      ...standardSizes[index],
                                      bias:
                                        e.target.value === ""
                                          ? ""
                                          : Number(e.target.value),
                                    },
                                    ...standardSizes.slice(index + 1),
                                  ]);
                                }}
                              />
                            </Col>
                            <Col xs={4} className="d-flex align-items-center">
                              <p className="h3 text-sm font-weight-500 col-6 mb-0">
                                Trọng số
                              </p>
                              <Input
                                type="number"
                                onChange={(e) => {
                                  setStandardSizes([
                                    ...standardSizes.slice(0, index),
                                    {
                                      ...standardSizes[index],
                                      priority:
                                        e.target.value === ""
                                          ? ""
                                          : Number(e.target.value),
                                    },
                                    ...standardSizes.slice(index + 1),
                                  ]);
                                }}
                                value={item.priority}
                                name="priority"
                              />
                            </Col>
                          </Row>
                          <hr className="my-2" />
                        </div>
                      );
                    })}
                    <Row>
                      <Col md={12}>
                        {errorStandardSizes && (
                          <Error messageInvalid="Chú ý các trường dữ liệu của vị trí đo không được để trống!" />
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="d-flex justify-content-center">
                    <Button
                      onClick={() => {
                        history.push("/list-standards");
                      }}
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        setFocused({
                          ...focused,
                          productTypeId: true,
                        });
                        let check = false;
                        standardSizes.forEach((item) => {
                          if (
                            item.size === "" ||
                            item.bias === "" ||
                            item.priority === ""
                          ) {
                            check = true;
                          }
                        });
                        if (check) {
                          setErrorStandardSize(true);
                          return;
                        } else {
                          setErrorStandardSize(false);
                        }
                        handleSubmit();
                      }}
                    >
                      Thêm mới
                    </Button>
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

export default AddMeasurementStandard;
