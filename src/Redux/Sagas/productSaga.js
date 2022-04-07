import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getProducts(data) {
  const url =
    ServiceURL.productTypes + "/" + ServiceURL.product + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PRODUCTS_FAILED,
        error: res?.error?.response?.data?.message,
      });
      !!callback?.failed &&
        callback.failed(res?.error?.response?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_PRODUCTS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PRODUCTS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getProductById(data) {
  const url =
    ServiceURL.productTypes + "/" + ServiceURL.product + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PRODUCT_BY_ID_FAILED,
        error: res?.error?.response?.data?.message,
      });
      !!callback?.failed &&
        callback.failed(res?.error?.response?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_PRODUCT_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PRODUCT_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createProduct(data) {
  const url = ServiceURL.productTypes + "/" + ServiceURL.product;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_PRODUCT_FAILED,
        error: res?.error?.response?.data?.message,
      });
      !!callback?.failed &&
        callback.failed(res?.error?.response?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_PRODUCT_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_PRODUCT_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateProduct(data) {
  const url =
    ServiceURL.productTypes + "/" + ServiceURL.product + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_PRODUCT_FAILED,
        error: res?.error?.response?.data?.message,
      });
      !!callback?.failed &&
        callback.failed(res?.error?.response?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_PRODUCT_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_PRODUCT_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteProduct(data) {
  const url =
    ServiceURL.productTypes + "/" + ServiceURL.product + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_PRODUCT_FAILED,
        error: res?.error?.response?.data?.message,
      });
      !!callback?.failed &&
        callback.failed(res?.error?.response?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_PRODUCT_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_PRODUCT_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getProductParameters(data) {
  const url = ServiceURL.productParameters + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PRODUCT_PARAMETERS_FAILED,
        error: res?.error?.response?.data?.message,
      });
      !!callback?.failed &&
        callback.failed(res?.error?.response?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_PRODUCT_PARAMETERS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PRODUCT_PARAMETERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* productSaga() {
  yield takeLatest(TypeActions.GET_PRODUCTS_REQUEST, getProducts);
  yield takeLatest(TypeActions.GET_PRODUCT_BY_ID_REQUEST, getProductById);
  yield takeLatest(TypeActions.CREATE_PRODUCT_REQUEST, createProduct);
  yield takeLatest(TypeActions.UPDATE_PRODUCT_REQUEST, updateProduct);
  yield takeLatest(TypeActions.DELETE_PRODUCT_REQUEST, deleteProduct);
  yield takeLatest(
    TypeActions.GET_PRODUCT_PARAMETERS_REQUEST,
    getProductParameters
  );
}
