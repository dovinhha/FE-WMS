import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE, GET, PUT, POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";
import TypeActions from "../TypeActions";

export function* getOrders(data) {
  const url = ServiceURL.orders + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ORDERS_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_ORDERS_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ORDERS_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getOrderById(data) {
  const url = ServiceURL.orders + "/" + data.id + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ORDER_BY_ID_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_ORDER_BY_ID_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ORDER_BY_ID_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* createOrder(data) {
  const url = ServiceURL.orders;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CREATE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CREATE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.CREATE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* updateOrder(data) {
  const url = ServiceURL.orders + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* deleteOrder(data) {
  const url = ServiceURL.orders + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(DELETE, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.DELETE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.DELETE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.DELETE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getCustomerInOrders(data) {
  const url = ServiceURL.customerInOrders + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_CUSTOMERS_IN_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_CUSTOMERS_IN_ORDER_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_CUSTOMERS_IN_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getCustomerInOrder(data) {
  const url = ServiceURL.customerInOrders + "/" + data.id + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_CUSTOMER_IN_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_CUSTOMER_IN_ORDER_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_CUSTOMER_IN_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* convertMeasureSize(data) {
  const url = ServiceURL.customerInOrders + "/Convert/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CONVERT_MEASURE_SIZE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CONVERT_MEASURE_SIZE_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.CONVERT_MEASURE_SIZE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* uploadCustomerOrder(data) {
  const formData = new FormData();
  formData.append("fileUpload", data.file);
  const url = ServiceURL.customerInOrders + "/uploads/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, formData);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPLOAD_CUSTOMER_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPLOAD_CUSTOMER_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPLOAD_CUSTOMER_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* approveOrder(data) {
  const url = ServiceURL.orders + "/orderPlan/approve/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      console.log("failed: ", res.message);
      yield put({
        type: TypeActions.APPROVE_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.APPROVE_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    console.log("failed: ", error);
    yield put({
      type: TypeActions.APPROVE_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* addSewMeasureSize(data) {
  const url = ServiceURL.customerInOrders + "/Addition/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.ADD_SEW_MEASURE_SIZE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.ADD_SEW_MEASURE_SIZE_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.ADD_SEW_MEASURE_SIZE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* updateCustomerInOrder(data) {
  const url = ServiceURL.customerInOrders + "/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(PUT, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.UPDATE_CUSTOMER_IN_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.UPDATE_CUSTOMER_IN_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.UPDATE_CUSTOMER_IN_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* getOrdersConvert(data) {
  const url = ServiceURL.customerInOrders + "/ne_contract" + "?" + data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ORDERS_CONVERT_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_ORDERS_CONVERT_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_ORDERS_CONVERT_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* approveAllCustomerInOrder(data) {
  const url = ServiceURL.customerInOrders + "/sendToApprove/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    // console.log(res);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export function* approveManyCustomerInOrder(data) {
  const url =
    ServiceURL.customerInOrders + "/approve/customerInOrder/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* getUnusualList(data) {
  const url = ServiceURL.customerInOrders + "?" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_UNUSUAL_LIST_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.GET_UNUSUAL_LIST_SUCCESS,
        data: res.data.data,
      });
      !!callback?.success && callback.success(res.data.data);
    }
  } catch (error) {
    yield put({
      type: TypeActions.GET_UNUSUAL_LIST_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}
export function* getAllProductsInOrder(data) {
  const url =
    ServiceURL.customerInOrders +
    "/getAllProductInOrder/" +
    data.id +
    "?" +
    data.query;
  const callback = data.callback;
  try {
    const res = yield call(GET, url);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.GET_ALL_PRODUCT_IN_ORDER_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
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

export function* checkUnusualList(data) {
  const url = ServiceURL.customerInOrders + "/sizeCheck/" + data.params;
  const callback = data.callback;
  try {
    const res = yield call(POST, url, data.body);
    if (res.message && !_.isEmpty(res.message)) {
      yield put({
        type: TypeActions.CHECK_UNUSUAL_SIZE_FAILED,
        error: res?.data?.message,
      });
      !!callback?.failed && callback.failed(res?.data?.message);
    } else {
      yield put({
        type: TypeActions.CHECK_UNUSUAL_SIZE_SUCCESS,
      });
      !!callback?.success && callback.success();
    }
  } catch (error) {
    yield put({
      type: TypeActions.CHECK_UNUSUAL_SIZE_FAILED,
      error: error?.response?.data?.message,
    });
    !!callback?.failed && callback.failed(error?.response?.data?.message);
  }
}

export default function* orderSaga() {
  yield takeLatest(TypeActions.GET_ORDERS_REQUEST, getOrders);
  yield takeLatest(TypeActions.GET_ORDER_BY_ID_REQUEST, getOrderById);
  yield takeLatest(TypeActions.CREATE_ORDER_REQUEST, createOrder);
  yield takeLatest(TypeActions.UPDATE_ORDER_REQUEST, updateOrder);
  yield takeLatest(TypeActions.DELETE_ORDER_REQUEST, deleteOrder);
  yield takeLatest(
    TypeActions.GET_CUSTOMERS_IN_ORDER_REQUEST,
    getCustomerInOrders
  );
  yield takeLatest(
    TypeActions.GET_CUSTOMER_IN_ORDER_REQUEST,
    getCustomerInOrder
  );
  yield takeLatest(
    TypeActions.UPLOAD_CUSTOMER_ORDER_REQUEST,
    uploadCustomerOrder
  );
  yield takeLatest(
    TypeActions.CONVERT_MEASURE_SIZE_REQUEST,
    convertMeasureSize
  );
  yield takeLatest(TypeActions.APPROVE_ORDER_REQUEST, approveOrder);
  yield takeLatest(TypeActions.ADD_SEW_MEASURE_SIZE_REQUEST, addSewMeasureSize);
  yield takeLatest(
    TypeActions.UPDATE_CUSTOMER_IN_ORDER_REQUEST,
    updateCustomerInOrder
  );
  yield takeLatest(TypeActions.GET_ORDERS_CONVERT_REQUEST, getOrdersConvert);
  yield takeLatest(
    TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_REQUEST,
    approveAllCustomerInOrder
  );
  yield takeLatest(
    TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_REQUEST,
    approveManyCustomerInOrder
  );
  yield takeLatest(TypeActions.GET_UNUSUAL_LIST_REQUEST, getUnusualList);
  yield takeLatest(
    TypeActions.GET_ALL_PRODUCT_IN_ORDER_REQUEST,
    getAllProductsInOrder
  );
  yield takeLatest(TypeActions.CHECK_UNUSUAL_SIZE_REQUEST, checkUnusualList);
}
