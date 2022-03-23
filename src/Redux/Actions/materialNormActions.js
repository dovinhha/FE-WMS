import TypeActions from "../TypeActions";

export const getMaterialNorms = (query, callback) => {
  return {
    type: TypeActions.GET_MATERIAL_NORMS_REQUEST,
    query,
    callback,
  };
};
export const getMaterialNormById = (params, query, callback) => {
  return {
    type: TypeActions.GET_MATERIAL_NORM_BY_ID_REQUEST,
    params,
    query,
    callback,
  };
};

export const createMaterialNorm = (body, callback) => {
  return {
    type: TypeActions.CREATE_MATERIAL_NORM_REQUEST,
    body,
    callback,
  };
};
export const updateMaterialNorm = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_MATERIAL_NORM_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteMaterialNorm = (params, callback) => {
  return {
    type: TypeActions.DELETE_MATERIAL_NORM_REQUEST,
    params,
    callback,
  };
};

export const getAllProductInOrder = (params, query, callback) => {
  return {
    type: TypeActions.GET_ALL_PRODUCT_IN_ORDER_REQUEST,
    params,
    query,
    callback,
  };
};

export default {
  getMaterialNorms,
  createMaterialNorm,
  updateMaterialNorm,
  deleteMaterialNorm,
  getMaterialNormById,
  getAllProductInOrder,
};
