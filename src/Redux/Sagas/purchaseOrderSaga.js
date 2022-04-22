import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getPurchaseOrders(data) {
  const url = ServiceURL.purchaseOrder + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PURCHASE_ORDERS_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_PURCHASE_ORDERS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PURCHASE_ORDERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getPurchaseOrderById(data) {
  const url = ServiceURL.purchaseOrder + "/" + data.params + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PURCHASE_ORDER_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_PURCHASE_ORDER_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PURCHASE_ORDER_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createPurchaseOrder(data) {
  const url = ServiceURL.purchaseOrder;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_PURCHASE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_PURCHASE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_PURCHASE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updatePurchaseOrder(data) {
  const url = ServiceURL.purchaseOrder + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_PURCHASE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_PURCHASE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_PURCHASE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deletePurchaseOrder(data) {
  const url = ServiceURL.purchaseOrder + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_PURCHASE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_PURCHASE_ORDER_SUCCESS,
      });

      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_PURCHASE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* purchaseOrderSaga() {
  yield takeLatest(TypeActions.GET_PURCHASE_ORDERS_REQUEST, getPurchaseOrders);
  yield takeLatest(
    TypeActions.GET_PURCHASE_ORDER_BY_ID_REQUEST,
    getPurchaseOrderById
  );
  yield takeLatest(
    TypeActions.CREATE_PURCHASE_ORDER_REQUEST,
    createPurchaseOrder
  );
  yield takeLatest(
    TypeActions.UPDATE_PURCHASE_ORDER_REQUEST,
    updatePurchaseOrder
  );
  yield takeLatest(
    TypeActions.DELETE_PURCHASE_ORDER_REQUEST,
    deletePurchaseOrder
  );
}
