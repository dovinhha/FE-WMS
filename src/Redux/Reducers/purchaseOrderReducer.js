import TypeActions from "../TypeActions";

const initialState = {
  purchaseOrders: {
    items: [],
  },
  purchaseOrderById: {},
  isGetPurchaseOrders: false,
  isGetPurchaseOrderById: false,
  isCreatePurchaseOrder: false,
  isUpdatePurchaseOrder: false,
  isDeletePurchaseOrder: false,
  errors: {
    getPurchaseOrder: "",
    getPurchaseOrderById: "",
    createPurchaseOrder: "",
    updatePurchaseOrder: "",
    deletePurchaseOrder: "",
  },
};

export const purchaseOrderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_PURCHASE_ORDERS_REQUEST:
      return {
        ...state,
        isGetPurchaseOrders: true,
        purchaseOrders: { items: [] },
        errors: {
          ...state.errors,
          getPurchaseOrders: "",
        },
      };
    case TypeActions.GET_PURCHASE_ORDERS_SUCCESS:
      return {
        ...state,
        purchaseOrders: actions.data || { items: [] },
        isGetPurchaseOrders: false,
        errors: {
          ...state.errors,
          getPurchaseOrder: "",
        },
      };
    case TypeActions.GET_PURCHASE_ORDERS_FAILED:
      return {
        ...state,
        isGetPurchaseOrders: false,
        purchaseOrders: { items: [] },
        errors: {
          ...state.errors,
          getPurchaseOrder: actions.error,
        },
      };

    case TypeActions.GET_PURCHASE_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        isGetPurchaseOrderById: true,
        purchaseOrderById: {},
        errors: {
          ...state.errors,
          getPurchaseOrderById: "",
        },
      };
    case TypeActions.GET_PURCHASE_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        purchaseOrderById: actions.data || {},
        isGetPurchaseOrderById: false,
        errors: {
          ...state.errors,
          getPurchaseOrderById: "",
        },
      };
    case TypeActions.GET_PURCHASE_ORDER_BY_ID_FAILED:
      return {
        ...state,
        isGetPurchaseOrderById: false,
        purchaseOrderById: {},
        errors: {
          ...state.errors,
          getPurchaseOrderById: actions.error,
        },
      };

    case TypeActions.CREATE_PURCHASE_ORDER_REQUEST:
      return {
        ...state,
        isCreatePurchaseOrder: true,
        errors: {
          ...state.errors,
          createPurchaseOrder: "",
        },
      };
    case TypeActions.CREATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isCreatePurchaseOrder: false,
        errors: {
          ...state.errors,
          createPurchaseOrder: "",
        },
      };
    case TypeActions.CREATE_PURCHASE_ORDER_FAILED:
      return {
        ...state,
        isCreatePurchaseOrder: false,
        errors: {
          ...state.errors,
          createPurchaseOrder: actions.error,
        },
      };

    case TypeActions.UPDATE_PURCHASE_ORDER_REQUEST:
      return {
        ...state,
        isUpdatePurchaseOrder: true,
        errors: {
          ...state.errors,
          updatePurchaseOrder: "",
        },
      };
    case TypeActions.UPDATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isUpdatePurchaseOrder: false,
        errors: {
          ...state.errors,
          updatePurchaseOrder: "",
        },
      };
    case TypeActions.UPDATE_PURCHASE_ORDER_FAILED:
      return {
        ...state,
        isUpdatePurchaseOrder: false,
        errors: {
          ...state.errors,
          updatePurchaseOrder: actions.error,
        },
      };

    case TypeActions.DELETE_PURCHASE_ORDER_REQUEST:
      return {
        ...state,
        isDeletePurchaseOrder: true,
        errors: {
          ...state.errors,
          deletePurchaseOrder: "",
        },
      };
    case TypeActions.DELETE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isDeletePurchaseOrder: false,
        errors: {
          ...state.errors,
          deletePurchaseOrder: "",
        },
      };
    case TypeActions.DELETE_PURCHASE_ORDER_FAILED:
      return {
        ...state,
        isDeletePurchaseOrder: false,
        errors: {
          ...state.errors,
          deletePurchaseOrder: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default purchaseOrderReducer;
