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
import { notify } from "common";

const FormMaterialNorm = () => {
  const materialNormSchema = yup.object().shape({});
  const { npls } = useSelector((state) => state.nplReducer);
  const { orderById } = useSelector((state) => state.orderReducer);
  const { allProductInOrder } = useSelector(
    (state) => state.materialNormReducer
  );

  const [materialNormById, setMaterialNormById] = useState({});
  const [materialNormByIdProduct, setMaterialNormByIdProduct] = useState({
    results: [],
  });
  const [selectProduct, setSelectProduct] = useState(-1);
  const [allProductInOrderCustom, setAllProductInOrderCustom] = useState([]);
  const [arrConfigNorm, setArrConfigNorm] = useState([]);
  const dispatch = useDispatch();
  const { materialNormId, orderId } = useParams();
  const history = useHistory();
  const [nplValue, setNplValue] = useState({});
  const notificationAlertRef = useRef(null);
  const [nplSearch, setNplSearch] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    populate: "unitId",
  });
  const [queryMaterialNormId, setQueryMaterialNormId] = useState({
    populate: "orderId.products.productTypeId, productId, materialId",
  });

  const handleGetNpls = () => {
    if (nplSearch === "") {
      dispatch(nplActions.getNpls(queryString.stringify(query)));
    } else {
      dispatch(
        nplActions.getNpls(queryString.stringify({ ...query, name: nplSearch }))
      );
    }
  };

  const handleGetMaterialNormById = () => {
    dispatch(
      materialNormActions.getMaterialNormById(
        materialNormId,
        queryString.stringify(queryMaterialNormId),
        {
          success: (data) => {
            setMaterialNormById(data);
          },
          failed: () => {},
        }
      )
    );
  };
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
              setMaterialNormByIdProduct(data);
              console.log("data: ", data);
              // setArrNplValue(
              //   data.results.map((item) => ({
              //     label: item.materialId.name,
              //     value: item.materialId.id,
              //   }))
              // );
              setArrConfigNorm(data.results || { results: [] });
            },
            failed: () => {},
          }
        )
      );
    }
  };

  const handleCreateMaterialNorm = (body) => {
    if (selectProduct === -1) return;
    dispatch(
      materialNormActions.createMaterialNorm(
        {
          ...body,
          productId: selectProduct,
          orderId: orderId,
        },
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Thêm định mức sản phẩm thành công!`
            );
            handleGetMaterialNormByProductId();
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Thêm định mức sản phẩm thất bại. Lỗi: ${mess}!`
            );
          },
        }
      )
    );
  };

  const handleUpdateMaterialNorm = (id, body) => {
    if (selectProduct === -1) return;
    dispatch(
      materialNormActions.updateMaterialNorm(
        {
          ...body,
          productId: selectProduct,
          orderId: orderId,
        },
        id,
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Cập nhật định mức sản phẩm thành công!`
            );
            handleGetMaterialNormByProductId();
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Cập nhật định mức sản phẩm thất bại. Lỗi: ${mess}!`
            );
          },
        }
      )
    );
  };

  const handleDeleteMaterialNorm = (id) => {
    if (selectProduct === -1) return;
    dispatch(
      materialNormActions.deleteMaterialNorm(id, {
        success: () => {
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa định mức sản phẩm thành công!`
          );
          handleGetMaterialNormByProductId();
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa định mức sản phẩm thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetNpls();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, nplSearch]);

  useEffect(() => {
    // handleGetMaterialNormById();
  }, [materialNormId]);

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
  // console.log("allProductInOrder: ", allProductInOrder);

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
                        <th className="h3 font-weight-500 p-2 text-center">
                          Hành động
                        </th>
                      </thead>
                      <tbody>
                        {arrConfigNorm.map((item, index) => {
                          return (
                            <RowTable
                              key={index}
                              item={item}
                              npls={npls}
                              setNplSearch={setNplSearch}
                              handleCreateMaterialNorm={
                                handleCreateMaterialNorm
                              }
                              notificationAlertRef={notificationAlertRef}
                              handleUpdateMaterialNorm={
                                handleUpdateMaterialNorm
                              }
                              handleDeleteMaterialNorm={
                                handleDeleteMaterialNorm
                              }
                              allProductInOrder={allProductInOrder}
                              selectProduct={selectProduct}
                            />
                          );
                        })}
                      </tbody>
                    </Table>
                    <Row
                      className="pr-3"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <span
                        onClick={() => {
                          setArrConfigNorm([...arrConfigNorm, {}]);
                        }}
                        className="mr-4"
                        style={{ cursor: "pointer" }}
                      >
                        <AddSVG />
                      </span>
                    </Row>
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
          {/* <Button color="primary">Hoàn tất</Button> */}
        </Row>
      </Container>
    </>
  );
};

const RowTable = ({
  item,
  npls,
  setNplSearch,
  handleCreateMaterialNorm,
  notificationAlertRef,
  handleUpdateMaterialNorm,
  handleDeleteMaterialNorm,
  allProductInOrder,
  selectProduct,
}) => {
  const [nplValue, setNplValue] = useState({});
  const [quota, setQuota] = useState("");
  const [redundant, setRedundant] = useState("");
  const [notes, setNotes] = useState("");
  const [totalQuota, setTotalQuota] = useState("");
  const [total, setTotal] = useState("");
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
      <td style={{ maxWidth: 200 }} className="px-0 py-2">
        <Select
          placeholder="Chọn NPL"
          value={nplValue}
          isClearable={true}
          className={blur.npl && _.isEmpty(nplValue) ? "nplError" : ""}
          onChange={(e) => {
            setNplValue({ ...e });
          }}
          options={npls.results.map((item) => ({
            label: item.name,
            value: item.id,
            color: item.color,
            unitId: item.unitId,
          }))}
          onInputChange={(value) => {
            setNplSearch(value);
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          onBlur={() => {
            setBlur({
              ...blur,
              npl: true,
            });
          }}
        />
      </td>
      <td className="px-0 py-2 text-center">{nplValue?.color}</td>
      <td className="px-0 py-2 text-center">{nplValue?.unitId?.name}</td>
      <td className="px-0 py-2 text-center">{totalQuota}</td>
      <td className="px-2 py-2 text-center">
        <InputCustom
          value={quota}
          type="number"
          invalid={quota === "" && blur.quota}
          onChange={(e) => {
            setQuota(e.target.value === "" ? "" : Number(e.target.value));
          }}
          onBlur={() => {
            setBlur({
              ...blur,
              quota: true,
            });
          }}
        />
      </td>
      <td className="px-0 py-2 text-center">{total}</td>
      <td className="px-2 py-2 text-center">
        <InputCustom
          value={redundant}
          type="number"
          onChange={(e) => {
            setRedundant(e.target.value === "" ? "" : Number(e.target.value));
          }}
          invalid={redundant === "" && blur.redundant}
          onBlur={() => {
            setBlur({
              ...blur,
              redundant: true,
            });
          }}
        />
      </td>
      <td className="px-0 py-2 text-center">{totalExport}</td>
      <td className="px-2 py-2 text-center">
        <InputCustom
          value={notes}
          type="text"
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
      </td>
      <td className="px-0 py-2 text-center">
        <Row className="justify-content-center">
          {!_.isEmpty(item) ? (
            <>
              <button
                onClick={() => {
                  setBlur({ quota: true, redundant: true, npl: true });

                  if (_.isEmpty(nplValue) || quota === "" || redundant === "") {
                    notify(
                      notificationAlertRef,
                      "danger",
                      "Thông báo",
                      `Vui lòng nhập đầy đủ thông tin để cập định mức cho sản phẩm!`
                    );
                    return;
                  }
                  const body = {
                    materialId: nplValue.value,
                    quota,
                    redundant,
                    notes,
                  };
                  handleUpdateMaterialNorm(item.id, body);
                  // update
                }}
                className="btn-none"
              >
                <EditSVG />
              </button>
              <button
                onClick={() => {
                  // console.log("item: ", item);
                  handleDeleteMaterialNorm(item.id);
                }}
                className="btn-none"
              >
                <BinSVG />
              </button>
            </>
          ) : (
            <Button
              color="primary"
              onClick={() => {
                setBlur({ quota: true, redundant: true, npl: true });
                // create
                if (_.isEmpty(nplValue) || quota === "" || redundant === "") {
                  notify(
                    notificationAlertRef,
                    "danger",
                    "Thông báo",
                    `Vui lòng nhập đầy đủ thông tin để tạo định mức cho sản phẩm!`
                  );
                  return;
                }
                const body = {
                  materialId: nplValue.value,
                  quota,
                  redundant,
                  notes,
                };
                handleCreateMaterialNorm(body);
              }}
              size="sm"
            >
              Tạo
            </Button>
          )}
        </Row>
      </td>
    </tr>
  );
};

export default FormMaterialNorm;
