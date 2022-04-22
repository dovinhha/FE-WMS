import TypeActions from "../TypeActions";

const initialState = {
  saleOrders: {
    items: [],
  },
  saleOrderById: {},
  isGetSaleOrders: false,
  isGetSaleOrderById: false,
  isCreateSaleOrder: false,
  isUpdateSaleOrder: false,
  isDeleteSaleOrder: false,
  errors: {
    getSaleOrder: "",
    getSaleOrderById: "",
    createSaleOrder: "",
    updateSaleOrder: "",
    deleteSaleOrder: "",
  },
};

export const saleOrderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_SALE_ORDERS_REQUEST:
      return {
        ...state,
        isGetSaleOrders: true,
        saleOrders: { items: [] },
        errors: {
          ...state.errors,
          getSaleOrders: "",
        },
      };
    case TypeActions.GET_SALE_ORDERS_SUCCESS:
      return {
        ...state,
        saleOrders: actions.data || { items: [] },
        isGetSaleOrders: false,
        errors: {
          ...state.errors,
          getSaleOrder: "",
        },
      };
    case TypeActions.GET_SALE_ORDERS_FAILED:
      return {
        ...state,
        isGetSaleOrders: false,
        saleOrders: { items: [] },
        errors: {
          ...state.errors,
          getSaleOrder: actions.error,
        },
      };

    case TypeActions.GET_SALE_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        isGetSaleOrderById: true,
        saleOrderById: {},
        errors: {
          ...state.errors,
          getSaleOrderById: "",
        },
      };
    case TypeActions.GET_SALE_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        saleOrderById: actions.data || {},
        isGetSaleOrderById: false,
        errors: {
          ...state.errors,
          getSaleOrderById: "",
        },
      };
    case TypeActions.GET_SALE_ORDER_BY_ID_FAILED:
      return {
        ...state,
        isGetSaleOrderById: false,
        saleOrderById: {},
        errors: {
          ...state.errors,
          getSaleOrderById: actions.error,
        },
      };

    case TypeActions.CREATE_SALE_ORDER_REQUEST:
      return {
        ...state,
        isCreateSaleOrder: true,
        errors: {
          ...state.errors,
          createSaleOrder: "",
        },
      };
    case TypeActions.CREATE_SALE_ORDER_SUCCESS:
      return {
        ...state,
        isCreateSaleOrder: false,
        errors: {
          ...state.errors,
          createSaleOrder: "",
        },
      };
    case TypeActions.CREATE_SALE_ORDER_FAILED:
      return {
        ...state,
        isCreateSaleOrder: false,
        errors: {
          ...state.errors,
          createSaleOrder: actions.error,
        },
      };

    case TypeActions.UPDATE_SALE_ORDER_REQUEST:
      return {
        ...state,
        isUpdateSaleOrder: true,
        errors: {
          ...state.errors,
          updateSaleOrder: "",
        },
      };
    case TypeActions.UPDATE_SALE_ORDER_SUCCESS:
      return {
        ...state,
        isUpdateSaleOrder: false,
        errors: {
          ...state.errors,
          updateSaleOrder: "",
        },
      };
    case TypeActions.UPDATE_SALE_ORDER_FAILED:
      return {
        ...state,
        isUpdateSaleOrder: false,
        errors: {
          ...state.errors,
          updateSaleOrder: actions.error,
        },
      };

    case TypeActions.DELETE_SALE_ORDER_REQUEST:
      return {
        ...state,
        isDeleteSaleOrder: true,
        errors: {
          ...state.errors,
          deleteSaleOrder: "",
        },
      };
    case TypeActions.DELETE_SALE_ORDER_SUCCESS:
      return {
        ...state,
        isDeleteSaleOrder: false,
        errors: {
          ...state.errors,
          deleteSaleOrder: "",
        },
      };
    case TypeActions.DELETE_SALE_ORDER_FAILED:
      return {
        ...state,
        isDeleteSaleOrder: false,
        errors: {
          ...state.errors,
          deleteSaleOrder: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default saleOrderReducer;
