import TypeActions from "../TypeActions";

const initialState = {
  nplOrders: {
    items: [],
  },
  nplOrderById: {},
  isGetNplOrders: false,
  isGetNplOrderById: false,
  isCreateNplOrder: false,
  isUpdateNplOrder: false,
  isDeleteNplOrder: false,
  errors: {
    getNplOrder: "",
    getNplOrderById: "",
    createNplOrder: "",
    updateNplOrder: "",
    deleteNplOrder: "",
  },
};

export const nplOrderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_NPL_ORDERS_REQUEST:
      return {
        ...state,
        isGetNplOrders: true,
        nplOrders: { items: [] },
        errors: {
          ...state.errors,
          isGetNplOrders: "",
        },
      };
    case TypeActions.GET_NPL_ORDERS_SUCCESS:
      return {
        ...state,
        nplOrders: actions.data || { items: [] },
        isGetNplOrders: false,
        errors: {
          ...state.errors,
          getNplOrder: "",
        },
      };
    case TypeActions.GET_NPL_ORDERS_FAILED:
      return {
        ...state,
        isGetNplOrders: false,
        nplOrders: { items: [] },
        errors: {
          ...state.errors,
          getNplOrder: actions.error,
        },
      };

    case TypeActions.GET_NPL_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        isGetNplOrderById: true,
        nplOrderById: {},
        errors: {
          ...state.errors,
          getNplOrderById: "",
        },
      };
    case TypeActions.GET_NPL_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        nplOrderById: actions.data || {},
        isGetNplOrderById: false,
        errors: {
          ...state.errors,
          getNplOrderById: "",
        },
      };
    case TypeActions.GET_NPL_ORDER_BY_ID_FAILED:
      return {
        ...state,
        isGetNplOrderById: false,
        nplOrderById: {},
        errors: {
          ...state.errors,
          getNplOrderById: actions.error,
        },
      };

    case TypeActions.CREATE_NPL_ORDER_REQUEST:
      return {
        ...state,
        isCreateNplOrder: true,
        errors: {
          ...state.errors,
          createNplOrder: "",
        },
      };
    case TypeActions.CREATE_NPL_ORDER_SUCCESS:
      return {
        ...state,
        isCreateNplOrder: false,
        errors: {
          ...state.errors,
          createNplOrder: "",
        },
      };
    case TypeActions.CREATE_NPL_ORDER_FAILED:
      return {
        ...state,
        isCreateNplOrder: false,
        errors: {
          ...state.errors,
          createNplOrder: actions.error,
        },
      };

    case TypeActions.UPDATE_NPL_ORDER_REQUEST:
      return {
        ...state,
        isUpdateNplOrder: true,
        errors: {
          ...state.errors,
          updateNplOrder: "",
        },
      };
    case TypeActions.UPDATE_NPL_ORDER_SUCCESS:
      return {
        ...state,
        isUpdateNplOrder: false,
        errors: {
          ...state.errors,
          updateNplOrder: "",
        },
      };
    case TypeActions.UPDATE_NPL_ORDER_FAILED:
      return {
        ...state,
        isUpdateNplOrder: false,
        errors: {
          ...state.errors,
          updateNplOrder: actions.error,
        },
      };

    case TypeActions.DELETE_NPL_ORDER_REQUEST:
      return {
        ...state,
        isDeleteNplOrder: true,
        errors: {
          ...state.errors,
          deleteNplOrder: "",
        },
      };
    case TypeActions.DELETE_NPL_ORDER_SUCCESS:
      return {
        ...state,
        isDeleteNplOrder: false,
        errors: {
          ...state.errors,
          deleteNplOrder: "",
        },
      };
    case TypeActions.DELETE_NPL_ORDER_FAILED:
      return {
        ...state,
        isDeleteNplOrder: false,
        errors: {
          ...state.errors,
          deleteNplOrder: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default nplOrderReducer;
