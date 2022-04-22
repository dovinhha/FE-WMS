import TypeActions from "../TypeActions";

export const getSaleOrders = (query, callback) => {
  return {
    type: TypeActions.GET_SALE_ORDERS_REQUEST,
    query,
    callback,
  };
};
export const getSaleOrderById = (params, query, callback) => {
  return {
    type: TypeActions.GET_SALE_ORDER_BY_ID_REQUEST,
    params,
    query,
    callback,
  };
};

export const createSaleOrder = (body, callback) => {
  return {
    type: TypeActions.CREATE_SALE_ORDER_REQUEST,
    body,
    callback,
  };
};
export const updateSaleOrder = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_SALE_ORDER_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteSaleOrder = (params, callback) => {
  return {
    type: TypeActions.DELETE_SALE_ORDER_REQUEST,
    params,
    callback,
  };
};

export default {
  getSaleOrders,
  createSaleOrder,
  updateSaleOrder,
  deleteSaleOrder,
  getSaleOrderById,
};
