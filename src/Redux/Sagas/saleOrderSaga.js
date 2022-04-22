import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getSaleOrders(data) {
  const url = ServiceURL.saleOrder + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_SALE_ORDERS_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_SALE_ORDERS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_SALE_ORDERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getSaleOrderById(data) {
  const url = ServiceURL.saleOrder + "/" + data.params + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_SALE_ORDER_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_SALE_ORDER_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_SALE_ORDER_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createSaleOrder(data) {
  const url = ServiceURL.saleOrder;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_SALE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_SALE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_SALE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateSaleOrder(data) {
  const url = ServiceURL.saleOrder + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_SALE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_SALE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_SALE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteSaleOrder(data) {
  const url = ServiceURL.saleOrder + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_SALE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_SALE_ORDER_SUCCESS,
      });

      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_SALE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* saleOrderSaga() {
  yield takeLatest(TypeActions.GET_SALE_ORDERS_REQUEST, getSaleOrders);
  yield takeLatest(TypeActions.GET_SALE_ORDER_BY_ID_REQUEST, getSaleOrderById);
  yield takeLatest(TypeActions.CREATE_SALE_ORDER_REQUEST, createSaleOrder);
  yield takeLatest(TypeActions.UPDATE_SALE_ORDER_REQUEST, updateSaleOrder);
  yield takeLatest(TypeActions.DELETE_SALE_ORDER_REQUEST, deleteSaleOrder);
}
