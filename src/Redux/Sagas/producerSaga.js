import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getProducers(data) {
  const url = ServiceURL.producers + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PRODUCERS_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_PRODUCERS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PRODUCERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getProducerById(data) {
  const url = ServiceURL.producers + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_PRODUCER_BY_ID_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_PRODUCER_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_PRODUCER_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createProducer(data) {
  const url = ServiceURL.producers;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_PRODUCER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.CREATE_PRODUCER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_PRODUCER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateProducer(data) {
  const url = ServiceURL.producers + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_PRODUCER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_PRODUCER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_PRODUCER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteProducer(data) {
  const url = ServiceURL.producers + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_PRODUCER_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.DELETE_PRODUCER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_PRODUCER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* producerSaga() {
  yield takeLatest(TypeActions.GET_PRODUCERS_REQUEST, getProducers);
  yield takeLatest(TypeActions.GET_PRODUCER_BY_ID_REQUEST, getProducerById);
  yield takeLatest(TypeActions.CREATE_PRODUCER_REQUEST, createProducer);
  yield takeLatest(TypeActions.UPDATE_PRODUCER_REQUEST, updateProducer);
  yield takeLatest(TypeActions.DELETE_PRODUCER_REQUEST, deleteProducer);
}
