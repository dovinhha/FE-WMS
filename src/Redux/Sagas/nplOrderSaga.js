import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getNplOrders(data) {
  const url = ServiceURL.materialSuggests + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_NPL_ORDERS_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_NPL_ORDERS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_NPL_ORDERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getNplOrderById(data) {
  const url =
    ServiceURL.materialSuggests + "/" + data.params + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_NPL_ORDER_BY_ID_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_NPL_ORDER_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_NPL_ORDER_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createNplOrder(data) {
  const url = ServiceURL.materialSuggests;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_NPL_ORDER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.CREATE_NPL_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_NPL_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateNplOrder(data) {
  const url = ServiceURL.materialSuggests + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_NPL_ORDER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_NPL_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_NPL_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteNplOrder(data) {
  const url = ServiceURL.materialSuggests + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_NPL_ORDER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.DELETE_NPL_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_NPL_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* nplOrderSaga() {
  yield takeLatest(TypeActions.GET_NPL_ORDERS_REQUEST, getNplOrders);
  yield takeLatest(TypeActions.GET_NPL_ORDER_BY_ID_REQUEST, getNplOrderById);
  yield takeLatest(TypeActions.CREATE_NPL_ORDER_REQUEST, createNplOrder);
  yield takeLatest(TypeActions.UPDATE_NPL_ORDER_REQUEST, updateNplOrder);
  yield takeLatest(TypeActions.DELETE_NPL_ORDER_REQUEST, deleteNplOrder);
}
