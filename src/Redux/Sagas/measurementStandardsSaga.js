import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getMeasurementStandards(data) {
  const url = ServiceURL.standardSizes + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_MEASUREMENT_STANDARDS_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_MEASUREMENT_STANDARDS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_MEASUREMENT_STANDARDS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getMeasurementStandardsById(data) {
  const url = ServiceURL.standardSizes + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createMeasurementStandard(data) {
  const url = ServiceURL.standardSizes;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_MEASUREMENT_STANDARD_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_MEASUREMENT_STANDARD_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_MEASUREMENT_STANDARD_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateMeasurementStandard(data) {
  const url = ServiceURL.standardSizes + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_MEASUREMENT_STANDARD_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_MEASUREMENT_STANDARD_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_MEASUREMENT_STANDARD_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteMeasurementStandard(data) {
  const url = ServiceURL.standardSizes + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_MEASUREMENT_STANDARD_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_MEASUREMENT_STANDARD_SUCCESS,
      });

      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_MEASUREMENT_STANDARD_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* measurementStandardsSaga() {
  yield takeLatest(
    TypeActions.GET_MEASUREMENT_STANDARDS_REQUEST,
    getMeasurementStandards
  );
  yield takeLatest(
    TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_REQUEST,
    getMeasurementStandardsById
  );
  yield takeLatest(
    TypeActions.CREATE_MEASUREMENT_STANDARD_REQUEST,
    createMeasurementStandard
  );
  yield takeLatest(
    TypeActions.UPDATE_MEASUREMENT_STANDARD_REQUEST,
    updateMeasurementStandard
  );
  yield takeLatest(
    TypeActions.DELETE_MEASUREMENT_STANDARD_REQUEST,
    deleteMeasurementStandard
  );
}
