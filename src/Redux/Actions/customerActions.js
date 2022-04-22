import TypeActions from "../TypeActions";

export const getCustomers = (query, callback) => {
  return {
    type: TypeActions.GET_CUSTOMERS_REQUEST,
    query,
    callback,
  };
};
export const getCustomerById = (params, query, callback) => {
  return {
    type: TypeActions.GET_CUSTOMER_BY_ID_REQUEST,
    params,
    query,
    callback,
  };
};

export const createCustomer = (body, callback) => {
  return {
    type: TypeActions.CREATE_CUSTOMER_REQUEST,
    body,
    callback,
  };
};
export const updateCustomer = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_CUSTOMER_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteCustomer = (params, callback) => {
  return {
    type: TypeActions.DELETE_CUSTOMER_REQUEST,
    params,
    callback,
  };
};

export default {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};
