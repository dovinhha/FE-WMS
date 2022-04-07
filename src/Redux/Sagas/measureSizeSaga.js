import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getMeasureSizes(data) {
  const url = ServiceURL.measureSizes + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_MEASURE_SIZES_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_MEASURE_SIZES_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_MEASURE_SIZES_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getMeasureSizeById(data) {
  const url = ServiceURL.measureSizes + "/" + data.params + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_MEASURE_SIZE_BY_ID_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.GET_MEASURE_SIZE_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_MEASURE_SIZE_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createMeasureSize(data) {
  const url = ServiceURL.measureSizes;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_MEASURE_SIZE_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.CREATE_MEASURE_SIZE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_MEASURE_SIZE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateMeasureSize(data) {
  const url = ServiceURL.measureSizes + "/" + data.body.id;
  const callback = data.callback;
  let payload = { ...data.body };
  delete payload["id"];
  try {
    const res = yield call(PUT, url, payload);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_MEASURE_SIZE_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_MEASURE_SIZE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_MEASURE_SIZE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteMeasureSize(data) {
  const url = ServiceURL.measureSizes + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_MEASURE_SIZE_FAILED,
        error: res.error.response.data.message,
      });
      !!callback?.failed && callback.failed(res.error.response.data.message);
    } else {
      yield put({
        type: TypeActions.DELETE_MEASURE_SIZE_SUCCESS,
      });

      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_MEASURE_SIZE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* measureSizeSaga() {
  yield takeLatest(TypeActions.GET_MEASURE_SIZES_REQUEST, getMeasureSizes);
  yield takeLatest(
    TypeActions.GET_MEASURE_SIZE_BY_ID_REQUEST,
    getMeasureSizeById
  );
  yield takeLatest(TypeActions.CREATE_MEASURE_SIZE_REQUEST, createMeasureSize);
  yield takeLatest(TypeActions.UPDATE_MEASURE_SIZE_REQUEST, updateMeasureSize);
  yield takeLatest(TypeActions.DELETE_MEASURE_SIZE_REQUEST, deleteMeasureSize);
}
