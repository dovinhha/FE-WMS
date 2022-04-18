import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getNpls(data) {
  const url = ServiceURL.npls + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_NPLS_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_NPLS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_NPLS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getNplById(data) {
  const url = ServiceURL.npls + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_NPL_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_NPL_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_NPL_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createNpl(data) {
  const url = ServiceURL.npls;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_NPL_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_NPL_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_NPL_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateNpl(data) {
  const url = ServiceURL.npls + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_NPL_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_NPL_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_NPL_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteNpl(data) {
  const url = ServiceURL.npls + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_NPL_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_NPL_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_NPL_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

// npl groups
export function* getNplGroups(data) {
  const url = ServiceURL.nplGroups + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_NPL_GROUPS_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_NPL_GROUPS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_NPL_GROUPS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getNplGroupById(data) {
  const url = ServiceURL.nplGroups + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_NPL_GROUP_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_NPL_GROUP_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_NPL_GROUP_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createNplGroup(data) {
  const url = ServiceURL.nplGroups;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_NPL_GROUP_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_NPL_GROUP_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_NPL_GROUP_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateNplGroup(data) {
  const url = ServiceURL.nplGroups + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_NPL_GROUP_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_NPL_GROUP_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_NPL_GROUP_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteNplGroup(data) {
  const url = ServiceURL.nplGroups + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_NPL_GROUP_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_NPL_GROUP_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_NPL_GROUP_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* nplSaga() {
  yield takeLatest(TypeActions.GET_NPLS_REQUEST, getNpls);
  yield takeLatest(TypeActions.GET_NPL_BY_ID_REQUEST, getNplById);
  yield takeLatest(TypeActions.CREATE_NPL_REQUEST, createNpl);
  yield takeLatest(TypeActions.UPDATE_NPL_REQUEST, updateNpl);
  yield takeLatest(TypeActions.DELETE_NPL_REQUEST, deleteNpl);

  yield takeLatest(TypeActions.GET_NPL_GROUPS_REQUEST, getNplGroups);
  yield takeLatest(TypeActions.GET_NPL_GROUP_BY_ID_REQUEST, getNplGroupById);
  yield takeLatest(TypeActions.CREATE_NPL_GROUP_REQUEST, createNplGroup);
  yield takeLatest(TypeActions.UPDATE_NPL_GROUP_REQUEST, updateNplGroup);
  yield takeLatest(TypeActions.DELETE_NPL_GROUP_REQUEST, deleteNplGroup);
}
