import TypeActions from "../TypeActions";

export const getUnits = (query, callback) => {
  return {
    type: TypeActions.GET_UNITS_REQUEST,
    query,
    callback,
  };
};
export const getUnitById = (params, callback) => {
  return {
    type: TypeActions.GET_UNIT_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createUnit = (body, callback) => {
  return {
    type: TypeActions.CREATE_UNIT_REQUEST,
    body,
    callback,
  };
};
export const updateUnit = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_UNIT_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteUnit = (params, callback) => {
  return {
    type: TypeActions.DELETE_UNIT_REQUEST,
    params,
    callback,
  };
};

export default {
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
  getUnitById,
};
