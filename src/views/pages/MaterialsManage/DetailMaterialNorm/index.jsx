import React, { useState, useEffect, useRef } from "react";
import SimpleHeader from "../components/Header";
import { AddSVG, EditSVG, BinSVG } from "assets/svg";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import ReactNotificationAlert from "react-notification-alert";
import { Formik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { nplActions } from "Redux/Actions";
import { useParams, useHistory } from "react-router-dom";
import { materialNormActions, orderActions } from "Redux/Actions";
import _ from "lodash";

const FormMaterialNorm = () => {
  const { npls } = useSelector((state) => state.nplReducer);
  const { orderById } = useSelector((state) => state.orderReducer);
  const { allProductInOrder } = useSelector(
    (state) => state.materialNormReducer
  );

  const [selectProduct, setSelectProduct] = useState(-1);
  const [arrConfigNorm, setArrConfigNorm] = useState([]);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const history = useHistory();
  const notificationAlertRef = useRef(null);
  const handleGetOrderById = () => {
    dispatch(
      orderActions.getOrderById(orderId, {
        success: (data) => {},
        failed: () => {},
      })
    );
  };

  const handleGetAllProductInOrder = () => {
    if (!_.isEmpty(orderId)) {
      dispatch(
        materialNormActions.getAllProductInOrder(
          orderId,
          queryString.stringify({})
        )
      );
    }
  };

  const handleGetMaterialNormByProductId = () => {
    if (selectProduct !== -1) {
      dispatch(
        materialNormActions.getMaterialNorms(
          queryString.stringify({
            productId: selectProduct,
            populate: "materialId.unitId",
          }),
          {
            success: (data) => {
              setArrConfigNorm(data.results || { results: [] });
            },
            failed: () => {},
          }
        )
      );
    }
  };

  useEffect(() => {
    handleGetOrderById();
    handleGetAllProductInOrder();
  }, [orderId]);

  useEffect(() => {
    if (!_.isEmpty(allProductInOrder.results)) {
      setSelectProduct(allProductInOrder.results[0]._id);
    }
  }, [allProductInOrder]);

  useEffect(() => {
    handleGetMaterialNormByProductId();
  }, [selectProduct]);

  return (
    <>
      <SimpleHeader orderId={orderById} name="Quản lý nguyên phụ liệu" />
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Row>
                  <Col style={{ borderRight: "1px solid gray" }} md="2">
                    <h3>Danh mục sản phẩm</h3>
                    {allProductInOrder.results.map((item, index) => (
                      <h5
                        key={index}
                        style={{
                          borderBottom:
                            selectProduct === item._id
                              ? "1px solid #11cdef"
                              : "1px solid #8898aa",
                          cursor: "pointer",
                        }}
                        className={`font-weight-bold ${
                          selectProduct === item._id
                            ? "text-info"
                            : "text-muted"
                        }`}
                        onClick={() => {
                          setSelectProduct(item._id);
                        }}
                      >
                        {item.name}
                        {/* (SLSP: {item.totalQuota}) */}
                      </h5>
                    ))}
                  </Col>
                  <Col md="10">
                    <h3>Thiết lập định mức tiêu chuẩn cho một sản phẩm</h3>
                    <Table>
                      <thead>
                        <th
                          className="h3 font-weight-500 p-2"
                          style={{ paddingRight: 16, minWidth: 200 }}
                        >
                          Tên vật tư(NPL)/ mã
                        </th>
                        <th
                          style={{ minWidth: 80 }}
                          className="h3 font-weight-500 p-2 text-center"
                        >
                          Màu
                        </th>
                        <th className="h3 font-weight-500 p-2">Đơn vị tính</th>
                        <th className="h3 font-weight-500 p-2">Số lượng SP</th>
                        <th className="h3 font-weight-500 p-2">Định mức</th>
                        <th className="h3 font-weight-500 p-2 text-center">
                          Tổng
                        </th>
                        <th className="h3 font-weight-500 p-2 text-center">
                          % dư
                        </th>
                        <th className="h3 font-weight-500 p-2 text-center">
                          Tổng xuất
                        </th>
                        <th className="h3 font-weight-500 p-2 text-center">
                          Ghi chú
                        </th>
                      </thead>
                      <tbody>
                        {arrConfigNorm.map((item, index) => {
                          return (
                            <RowTable
                              key={index}
                              item={item}
                              selectProduct={selectProduct}
                              allProductInOrder={allProductInOrder}
                            />
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row className="justify-content-center">
          <Button
            onClick={() => {
              history.push("/norm-materials");
            }}
          >
            Quay lại
          </Button>
        </Row>
      </Container>
    </>
  );
};

const RowTable = ({ item, allProductInOrder, selectProduct }) => {
  const [nplValue, setNplValue] = useState({});
  const [quota, setQuota] = useState("");
  const [redundant, setRedundant] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("");
  const [totalQuota, setTotalQuota] = useState("");
  const [totalExport, setTotalExport] = useState("");
  const [blur, setBlur] = useState({
    quota: false,
    redundant: false,
    npl: false,
  });

  useEffect(() => {
    if (!_.isEmpty(item)) {
      setNplValue({
        label: item.materialId.name,
        value: item.materialId.id,
        color: item.materialId.color,
        unitId: item.materialId.unitId,
      });
      setQuota(item.quota);
      setRedundant(item.redundant);
      setNotes(item.notes);
    }
  }, [item]);

  useEffect(() => {
    allProductInOrder.results.every((val) => {
      if (val._id === selectProduct) {
        setTotalQuota(val.totalQuota);
        return false;
      }
      return true;
    });
  }, [selectProduct]);

  useEffect(() => {
    try {
      let tempTotal = "";
      if (quota !== "" && totalQuota !== "") {
        tempTotal = quota * totalQuota;
        setTotal(tempTotal);
      }
      if (tempTotal !== "" && redundant !== "") {
        setTotalExport(tempTotal + tempTotal * redundant);
      }
    } catch (error) {
      setTotal("");
      setTotalExport("");
    }
  }, [quota, redundant, totalQuota]);

  return (
    <tr>
      <td style={{ maxWidth: 200 }} className="px-2 py-2">
        {nplValue.label}
      </td>
      <td className="px-0 py-2 text-center">{nplValue?.color}</td>
      <td className="px-0 py-2 text-center">{nplValue?.unitId?.name}</td>
      <td className="px-0 py-2 text-center">{totalQuota}</td>
      <td className="px-2 py-2 text-center">{quota}</td>
      <td className="px-2 py-2 text-center">{total}</td>
      <td className="px-2 py-2 text-center">{redundant}</td>
      <td className="px-0 py-2 text-center">{totalExport}</td>
      <td className="px-2 py-2 text-center">{notes}</td>
    </tr>
  );
};

export default FormMaterialNorm;
