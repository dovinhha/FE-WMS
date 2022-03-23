import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PATCH, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getCustomers(data) {
  const url = ServiceURL.customers + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_CUSTOMERS_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_CUSTOMERS_SUCCESS,
        data: res.data,
      });
      !!callback?.success && callback.success(res.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_CUSTOMERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getCustomerById(data) {
  const url = ServiceURL.customers + "/" + data.params + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_CUSTOMER_BY_ID_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_CUSTOMER_BY_ID_SUCCESS,
        data: res.data,
      });
      !!callback?.success && callback.success(res.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_CUSTOMER_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createCustomer(data) {
  const url = ServiceURL.customers;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_CUSTOMER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.CREATE_CUSTOMER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_CUSTOMER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateCustomer(data) {
  const url = ServiceURL.customers + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PATCH, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_CUSTOMER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_CUSTOMER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_CUSTOMER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteCustomer(data) {
  const url = ServiceURL.customers + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_CUSTOMER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.DELETE_CUSTOMER_SUCCESS,
      });

      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_CUSTOMER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* customerSaga() {
  yield takeLatest(TypeActions.GET_CUSTOMERS_REQUEST, getCustomers);
  yield takeLatest(TypeActions.GET_CUSTOMER_BY_ID_REQUEST, getCustomerById);
  yield takeLatest(TypeActions.CREATE_CUSTOMER_REQUEST, createCustomer);
  yield takeLatest(TypeActions.UPDATE_CUSTOMER_REQUEST, updateCustomer);
  yield takeLatest(TypeActions.DELETE_CUSTOMER_REQUEST, deleteCustomer);
}
