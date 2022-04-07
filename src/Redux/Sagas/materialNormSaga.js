import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getMaterialNorms(data) {
  const url = ServiceURL.materialNorms + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_MATERIAL_NORMS_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_MATERIAL_NORMS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_MATERIAL_NORMS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getMaterialNormById(data) {
  const url = ServiceURL.materialNorms + "/" + data.params + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_MATERIAL_NORM_BY_ID_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_MATERIAL_NORM_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_MATERIAL_NORM_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createMaterialNorm(data) {
  const url = ServiceURL.materialNorms;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_MATERIAL_NORM_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.CREATE_MATERIAL_NORM_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_MATERIAL_NORM_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateMaterialNorm(data) {
  const url = ServiceURL.materialNorms + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_MATERIAL_NORM_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_MATERIAL_NORM_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_MATERIAL_NORM_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteMaterialNorm(data) {
  const url = ServiceURL.materialNorms + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_MATERIAL_NORM_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.DELETE_MATERIAL_NORM_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_MATERIAL_NORM_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getAllProductInOrder(data) {
  const url =
    ServiceURL.customerInOrders +
    "/" +
    ServiceURL.getAllProductInOrder +
    "/" +
    data.params +
    "?" +
    data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ALL_PRODUCT_IN_ORDER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_ALL_PRODUCT_IN_ORDER_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ALL_PRODUCT_IN_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* materialNormsSaga() {
  yield takeLatest(TypeActions.GET_MATERIAL_NORMS_REQUEST, getMaterialNorms);
  yield takeLatest(
    TypeActions.GET_MATERIAL_NORM_BY_ID_REQUEST,
    getMaterialNormById
  );
  yield takeLatest(
    TypeActions.CREATE_MATERIAL_NORM_REQUEST,
    createMaterialNorm
  );
  yield takeLatest(
    TypeActions.UPDATE_MATERIAL_NORM_REQUEST,
    updateMaterialNorm
  );
  yield takeLatest(
    TypeActions.DELETE_MATERIAL_NORM_REQUEST,
    deleteMaterialNorm
  );
  yield takeLatest(
    TypeActions.GET_ALL_PRODUCT_IN_ORDER_REQUEST,
    getAllProductInOrder
  );
}
