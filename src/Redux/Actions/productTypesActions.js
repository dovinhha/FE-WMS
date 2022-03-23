import TypeActions from "../TypeActions";

export const getProductTypes = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCT_TYPES_REQUEST,
    params,
    callback,
  };
};
export const getProductTypeById = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCT_TYPE_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createProductType = (body, callback) => {
  return {
    type: TypeActions.CREATE_PRODUCT_TYPE_REQUEST,
    body,
    callback,
  };
};
export const updateProductType = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_PRODUCT_TYPE_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteProductType = (params, callback) => {
  return {
    type: TypeActions.DELETE_PRODUCT_TYPE_REQUEST,
    params,
    callback,
  };
};

export default {
  getProductTypes,
  createProductType,
  updateProductType,
  deleteProductType,
  getProductTypeById,
};
