import TypeActions from "../TypeActions";

export const getWarehouses = (query, callback) => {
  return {
    type: TypeActions.GET_WAREHOUSES_REQUEST,
    query,
    callback,
  };
};
export const getWarehouseById = (params, callback) => {
  return {
    type: TypeActions.GET_WAREHOUSE_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createWarehouse = (body, callback) => {
  return {
    type: TypeActions.CREATE_WAREHOUSE_REQUEST,
    body,
    callback,
  };
};
export const updateWarehouse = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_WAREHOUSE_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteWarehouse = (params, callback) => {
  return {
    type: TypeActions.DELETE_WAREHOUSE_REQUEST,
    params,
    callback,
  };
};

export default {
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseById,
};
