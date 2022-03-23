import TypeActions from "../TypeActions";

export const getMeasureSizes = (query, callback) => {
  return {
    type: TypeActions.GET_MEASURE_SIZES_REQUEST,
    query,
    callback,
  };
};
export const getMeasureSizeById = (params, query, callback) => {
  return {
    type: TypeActions.GET_MEASURE_SIZE_BY_ID_REQUEST,
    params,
    query,
    callback,
  };
};

export const createMeasureSize = (body, callback) => {
  return {
    type: TypeActions.CREATE_MEASURE_SIZE_REQUEST,
    body,
    callback,
  };
};
export const updateMeasureSize = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_MEASURE_SIZE_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteMeasureSize = (params, callback) => {
  return {
    type: TypeActions.DELETE_MEASURE_SIZE_REQUEST,
    params,
    callback,
  };
};

export default {
  getMeasureSizes,
  createMeasureSize,
  updateMeasureSize,
  deleteMeasureSize,
  getMeasureSizeById,
};
