import TypeActions from "../TypeActions";

export const getProducts = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCTS_REQUEST,
    params,
    callback,
  };
};

export const getProductParameters = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCT_PARAMETERS_REQUEST,
    params,
    callback,
  };
};
export const getProductById = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCT_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createProduct = (body, callback) => {
  return {
    type: TypeActions.CREATE_PRODUCT_REQUEST,
    body,
    callback,
  };
};
export const updateProduct = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_PRODUCT_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteProduct = (params, callback) => {
  return {
    type: TypeActions.DELETE_PRODUCT_REQUEST,
    params,
    callback,
  };
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductParameters,
};
