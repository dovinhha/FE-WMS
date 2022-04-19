import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, POST, PUT } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getWarehouses(data) {
  const url = ServiceURL.warehouse + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res?.data?.statusCode !== 200) {
      yield put({
        type: TypeActions.GET_WAREHOUSES_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_WAREHOUSES_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_WAREHOUSES_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getWarehouseById(data) {
  const url = ServiceURL.warehouse + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res?.data?.statusCode !== 200) {
      yield put({
        type: TypeActions.GET_WAREHOUSE_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_WAREHOUSE_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_WAREHOUSE_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createWarehouse(data) {
  const url = ServiceURL.warehouse;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res?.data?.statusCode !== 201) {
      yield put({
        type: TypeActions.CREATE_WAREHOUSE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_WAREHOUSE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_WAREHOUSE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateWarehouse(data) {
  const url = ServiceURL.warehouse + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res?.data?.statusCode !== 200) {
      yield put({
        type: TypeActions.UPDATE_WAREHOUSE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_WAREHOUSE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_WAREHOUSE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteWarehouse(data) {
  const url = ServiceURL.warehouse + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res?.data?.statusCode !== 200) {
      yield put({
        type: TypeActions.DELETE_WAREHOUSE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_WAREHOUSE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_WAREHOUSE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* unitSaga() {
  yield takeLatest(TypeActions.GET_WAREHOUSES_REQUEST, getWarehouses);
  yield takeLatest(TypeActions.GET_WAREHOUSE_BY_ID_REQUEST, getWarehouseById);
  yield takeLatest(TypeActions.CREATE_WAREHOUSE_REQUEST, createWarehouse);
  yield takeLatest(TypeActions.UPDATE_WAREHOUSE_REQUEST, updateWarehouse);
  yield takeLatest(TypeActions.DELETE_WAREHOUSE_REQUEST, deleteWarehouse);
}
