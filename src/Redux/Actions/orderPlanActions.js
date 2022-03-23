import TypeActions from "../TypeActions";

export const getOrderPlans = (params, callback) => {
  return {
    type: TypeActions.GET_ORDER_PLANS_REQUEST,
    params,
    callback,
  };
};
export const getOrderPlanById = (id, params, callback) => {
  return {
    type: TypeActions.GET_ORDER_PLAN_BY_ID_REQUEST,
    id,
    params,
    callback,
  };
};

export const createOrderPlan = (body, callback) => {
  return {
    type: TypeActions.CREATE_ORDER_PLAN_REQUEST,
    body,
    callback,
  };
};
export const updateOrderPlan = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_ORDER_PLAN_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteOrderPlan = (params, callback) => {
  return {
    type: TypeActions.DELETE_ORDER_PLAN_REQUEST,
    params,
    callback,
  };
};

export default {
  getOrderPlans,
  createOrderPlan,
  updateOrderPlan,
  deleteOrderPlan,
  getOrderPlanById,
};
