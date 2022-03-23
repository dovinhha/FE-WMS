import TypeActions from "../TypeActions";

export const getNplOrders = (query, callback) => {
  return {
    type: TypeActions.GET_NPL_ORDERS_REQUEST,
    query,
    callback,
  };
};
export const getNplOrderById = (params, query, callback) => {
  return {
    type: TypeActions.GET_NPL_ORDER_BY_ID_REQUEST,
    params,
    query,
    callback,
  };
};

export const createNplOrder = (body, callback) => {
  return {
    type: TypeActions.CREATE_NPL_ORDER_REQUEST,
    body,
    callback,
  };
};
export const updateNplOrder = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_NPL_ORDER_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteNplOrder = (params, callback) => {
  return {
    type: TypeActions.DELETE_NPL_ORDER_REQUEST,
    params,
    callback,
  };
};

export default {
  getNplOrders,
  createNplOrder,
  updateNplOrder,
  deleteNplOrder,
  getNplOrderById,
};
