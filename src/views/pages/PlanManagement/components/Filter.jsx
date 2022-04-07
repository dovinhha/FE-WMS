import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  CardFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { provincesActions } from "Redux/Actions";
import queryString from "query-string";
import { orderActions } from "Redux/Actions";
import Select from "react-select";
import _ from "lodash";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const Filter = ({
  handleClose,
  handleFilter,
  filterValues,
  setFilterValues,
}) => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState({ items: [] });
  const [queryOrders, setQueryOrders] = useState({
    page: 1,
    limit: 10,
  });
  const [orderSearch, setOrderSearch] = useState("");
  const [orderValues, setOrderValues] = useState([]);
  const { provinces } = useSelector((state) => state.provincesReducer);
  const changeOptionFilter = (e) => {
    setFilterValues({ ...filterValues, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(
      provincesActions.getProvinces(queryString.stringify({ limit: 100 }))
    );
  }, []);
  const createArray = (start, step) => {
    const now = new Date();
    const stop = now.getFullYear();

    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  };
  const resetFilter = () => {
    // if (_.isEmpty(ordersDefault.items)) return;
    setOrderValues([]);
    setFilterValues({ orderIds: [], provinceId: "", year: "" });
  };

  const handleGetOrders = () => {
    if (orderSearch === "") {
      dispatch(
        orderActions.getOrders(queryString.stringify(queryOrders), {
          success: (data) => {
            setOrders(data);
          },
        })
      );
    } else {
      dispatch(
        orderActions.getOrders(
          queryString.stringify({ ...queryOrders, name: orderSearch }),
          {
            success: (data) => {
              setOrders(data);
            },
          }
        )
      );
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, [queryOrders]);

  console.log("filterValues: ", filterValues);

  return (
    <>
      <Card className={`filter ${false} && "show"}`}>
        <CardHeader>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger font-weight-bold"
            onClick={handleClose}
          >
            Đóng
          </span>
        </CardHeader>
        {/* <hr className="my-3"/> */}
        <CardBody>
          <FormGroup className="col p-0">
            <Label
              className="form-control-label text-sm"
              htmlFor="example-text-input"
            >
              Chọn đơn hàng
            </Label>
            <Select
              isClearable={false}
              value={orderValues}
              placeholder="Chọn đơn hàng"
              className="select-muti"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={(e, remove) => {
                if (_.isEmpty(remove?.removedValue)) {
                  setOrderValues([...e]);
                  setFilterValues({
                    ...filterValues,
                    orderIds: [...e.map((item) => item.value)],
                  });
                } else {
                  const tempOrderValues = orderValues.filter(
                    (item) => item.value !== remove.removedValue.value
                  );
                  setOrderValues(tempOrderValues);
                  const tempOrderIds = filterValues.orderIds.filter(
                    (item) => item !== remove.removedValue.value
                  );
                  setFilterValues({
                    ...filterValues,
                    orderIds: tempOrderIds,
                  });
                }
              }}
              options={orders.items.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onInputChange={(value) => {
                setOrderSearch(value);
              }}
            />
          </FormGroup>

          <FormGroup className="row">
            <Label
              className="form-control-label text-sm"
              htmlFor="example-text-input"
              md="5"
            >
              Lọc theo năm
            </Label>
            <Col md="7">
              <Input
                defaultValue="John Snow"
                id="example-text-input"
                type="select"
                name="year"
                value={filterValues.year}
                onChange={changeOptionFilter}
              >
                <option value="" hidden>
                  Chọn năm
                </option>
                {createArray(1990, 1).map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </Input>
            </Col>
          </FormGroup>

          <FormGroup className="row">
            <Label
              className="form-control-label text-sm"
              htmlFor="example-email-input"
              md="5"
            >
              Lọc theo tỉnh thành
            </Label>
            <Col md="7">
              <Input
                defaultValue="argon@example.com"
                id="example-email-input"
                type="select"
                name="provinceId"
                value={filterValues.provinceId}
                onChange={changeOptionFilter}
              >
                <option value="" hidden>
                  Chọn tỉnh
                </option>
                {provinces?.items.map((item) => {
                  return <option value={item.id}>{item.provinceName}</option>;
                })}
              </Input>
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <button
            className="btn btn-secondary btn-md text-sm btn-block"
            onClick={resetFilter}
          >
            Xóa bộ lọc
          </button>
          <button
            className="btn btn-primary btn-md text-sm btn-block"
            onClick={() => {
              handleFilter();
            }}
          >
            Áp dụng bộ lọc
          </button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Filter;
