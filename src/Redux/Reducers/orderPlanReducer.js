import TypeActions from "../TypeActions";

const initialState = {
  orderPlans: {
    items: [],
  },
  orderPlanById: {},
  isGetOrderPlans: false,
  isGetOrderPlanById: false,
  isCreateOrderPlan: false,
  isUpdateOrderPlan: false,
  isDeleteOrderPlan: false,
  errors: {
    getOrderPlans: "",
    getOrderPlanById: "",
    createOrderPlan: "",
    updateOrderPlan: "",
    deleteOrderPlan: "",
  },
};

export const orderPlanReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_ORDER_PLANS_REQUEST:
      return {
        ...state,
        isGetOrderPlans: true,
        orderPlans: { items: [] },
        errors: { ...state.errors, isGetOrderPlans: "" },
      };
    case TypeActions.GET_ORDER_PLANS_SUCCESS:
      return {
        ...state,
        isGetOrderPlans: false,
        orderPlans: actions.data || { items: [] },
        errors: { ...state.errors, getOrderPlans: "" },
      };
    case TypeActions.GET_ORDER_PLANS_FAILED:
      return {
        ...state,
        isGetOrderPlans: false,
        orderPlans: { items: [] },
        errors: { ...state.errors, getOrderPlans: actions.error },
      };

    //Get orderPlan by id
    case TypeActions.GET_ORDER_PLAN_BY_ID_REQUEST:
      return {
        ...state,
        isGetOrderPlanById: true,
        orderPlanById: {},
        errors: { ...state.errors, getOrderPlanById: "" },
      };
    case TypeActions.GET_ORDER_PLAN_BY_ID_SUCCESS:
      return {
        ...state,
        isGetOrderPlanById: false,
        orderPlanById: actions.data || {},
        errors: { ...state.errors, getOrderPlanById: "" },
      };
    case TypeActions.GET_ORDER_PLAN_BY_ID_FAILED:
      return {
        ...state,
        isGetOrderPlanById: false,
        orderPlanById: {},
        errors: { ...state.errors, getOrderPlanById: actions.error },
      };

    //create orderPlan:
    case TypeActions.CREATE_ORDER_PLAN_REQUEST:
      return {
        ...state,
        isCreateOrderPlan: true,
        errors: {
          ...state.errors,
          createOrderPlan: "",
        },
      };
    case TypeActions.CREATE_ORDER_PLAN_SUCCESS:
      return {
        ...state,
        isCreateOrderPlan: false,
        errors: {
          ...state.errors,
          createOrderPlan: "",
        },
      };
    case TypeActions.CREATE_ORDER_PLAN_FAILED:
      return {
        ...state,
        isCreateOrderPlan: false,
        errors: {
          ...state.errors,
          createOrderPlan: actions.error,
        },
      };

    //update orderPlan
    case TypeActions.UPDATE_ORDER_PLAN_REQUEST:
      return {
        ...state,
        isUpdateOrderPlan: true,
        errors: {
          ...state.errors,
          updateOrderPlan: "",
        },
      };
    case TypeActions.UPDATE_ORDER_PLAN_SUCCESS:
      return {
        ...state,
        isUpdateOrderPlan: false,
        errors: {
          ...state.errors,
          updateOrderPlan: "",
        },
      };
    case TypeActions.UPDATE_ORDER_PLAN_FAILED:
      return {
        ...state,
        isUpdateOrderPlan: false,
        errors: {
          ...state.errors,
          updateOrderPlan: actions.error,
        },
      };
    //delete orderPlan
    case TypeActions.DELETE_ORDER_PLAN_REQUEST:
      return {
        ...state,
        isDeleteOrderPlan: true,
        errors: {
          ...state.errors,
          deleteOrderPlan: "",
        },
      };
    case TypeActions.DELETE_ORDER_PLAN_SUCCESS:
      return {
        ...state,
        isDeleteOrderPlan: false,
        errors: {
          ...state.errors,
          deleteOrderPlan: "",
        },
      };

    case TypeActions.DELETE_ORDER_PLAN_FAILED:
      return {
        ...state,
        isDeleteOrderPlan: false,
        errors: {
          ...state.errors,
          deleteOrderPlan: actions.error,
        },
      };

    default: {
      return { ...state };
    }
  }
};
export default orderPlanReducer;
