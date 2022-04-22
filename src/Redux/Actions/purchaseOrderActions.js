import TypeActions from "../TypeActions";

export const getPurchaseOrders = (query, callback) => {
  return {
    type: TypeActions.GET_PURCHASE_ORDERS_REQUEST,
    query,
    callback,
  };
};
export const getPurchaseOrderById = (params, query, callback) => {
  return {
    type: TypeActions.GET_PURCHASE_ORDER_BY_ID_REQUEST,
    params,
    query,
    callback,
  };
};

export const createPurchaseOrder = (body, callback) => {
  return {
    type: TypeActions.CREATE_PURCHASE_ORDER_REQUEST,
    body,
    callback,
  };
};
export const updatePurchaseOrder = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_PURCHASE_ORDER_REQUEST,
    body,
    params,
    callback,
  };
};
export const deletePurchaseOrder = (params, callback) => {
  return {
    type: TypeActions.DELETE_PURCHASE_ORDER_REQUEST,
    params,
    callback,
  };
};

export default {
  getPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrderById,
};
