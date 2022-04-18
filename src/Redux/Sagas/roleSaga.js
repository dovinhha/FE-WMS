import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getRoles(data) {
  const url = ServiceURL.roles + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ROLES_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_ROLES_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ROLES_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getRoleById(data) {
  const url = ServiceURL.roles + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ROLE_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_ROLE_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ROLE_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createRole(data) {
  const url = ServiceURL.roles;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_ROLE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_ROLE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_ROLE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateRole(data) {
  const url = ServiceURL.roles + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_ROLE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_ROLE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_ROLE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* deleteRole(data) {
  const url = ServiceURL.roles + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_ROLE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_ROLE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_ROLE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getRolePermission(data) {
  const url = ServiceURL.permissions;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ROLE_PERMISSION_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_ROLE_PERMISSION_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ROLE_PERMISSION_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* roleSaga() {
  yield takeLatest(TypeActions.GET_ROLES_REQUEST, getRoles);
  yield takeLatest(TypeActions.GET_ROLE_BY_ID_REQUEST, getRoleById);
  yield takeLatest(TypeActions.CREATE_ROLE_REQUEST, createRole);
  yield takeLatest(TypeActions.UPDATE_ROLE_REQUEST, updateRole);
  yield takeLatest(TypeActions.DELETE_ROLE_REQUEST, deleteRole);
  yield takeLatest(TypeActions.GET_ROLE_PERMISSION_REQUEST, getRolePermission);
}
