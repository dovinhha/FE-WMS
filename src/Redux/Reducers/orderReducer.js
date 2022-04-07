import TypeActions from "../TypeActions";

const initialState = {
  orders: {
    items: [],
  },
  orderById: {},
  customersInOrder: {
    items: [],
  },
  ordersConvert: {
    items: [],
  },
  unusualList: {
    items: [],
  },
  customerInOrder: {},
  productsInOrder: { items: [] },
  isGetOrders: false,
  isGetOrderById: false,
  isGetCustomersInOrder: false,
  isGetCustomerInOrder: false,
  isCreateOrder: false,
  isUpdateOrder: false,
  isDeleteOrder: false,
  isAddSewMeasureSize: false,
  isUploadCustomerOrder: false,
  isApproveOrder: false,
  isUpdateCustomerInOrder: false,
  isGetOrdersConvert: false,
  isApproveAllCustomersInOrder: false,
  isApproveManyCustomersInOrder: false,
  isGetUnusualList: false,
  isGetProductsInOrder: false,
  isCheckUnusualList: false,
  errors: {
    getOrders: "",
    getOrderById: "",
    getCustomersInOrder: "",
    getCustomerInOrder: "",
    createOrder: "",
    updateOrder: "",
    deleteOrder: "",
    uploadCustomerOrder: "",
    approveOrder: "",
    addSewMeasureSize: "",
    updateCustomerInOrder: "",
    getOrdersConvert: "",
    approveAllCustomerInOrder: "",
    approveManyCustomersInOrder: "",
    getUnusualList: "",
    getProductsInOrder: "",
    checkUnusualList: "",
  },
};

export const orderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_ORDERS_REQUEST:
      return {
        ...state,
        isGetOrders: true,
        orders: { items: [] },
        errors: { ...state.errors, isGetOrders: "" },
      };
    case TypeActions.GET_ORDERS_SUCCESS:
      return {
        ...state,
        isGetOrders: false,
        orders: actions.data || { items: [] },
        errors: { ...state.errors, getOrders: "" },
      };
    case TypeActions.GET_ORDERS_FAILED:
      return {
        ...state,
        isGetOrders: false,
        orders: { items: [] },
        errors: { ...state.errors, getOrders: actions.error },
      };

    //Get order by id
    case TypeActions.GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        isGetOrderById: true,
        orderById: {},
        errors: { ...state.errors, getOrderById: "" },
      };
    case TypeActions.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        isGetOrderById: false,
        orderById: actions.data || {},
        errors: { ...state.errors, getOrderById: "" },
      };
    case TypeActions.GET_ORDER_BY_ID_FAILED:
      return {
        ...state,
        isGetOrderById: false,
        orderById: {},
        errors: { ...state.errors, getOrderById: actions.error },
      };

    //create order:
    case TypeActions.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isCreateOrder: true,
        errors: {
          ...state.errors,
          createOrder: "",
        },
      };
    case TypeActions.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isCreateOrder: false,
        errors: {
          ...state.errors,
          createOrder: "",
        },
      };
    case TypeActions.CREATE_ORDER_FAILED:
      return {
        ...state,
        isCreateOrder: false,
        errors: {
          ...state.errors,
          createOrder: actions.error,
        },
      };

    //update order
    case TypeActions.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        isUpdateOrder: true,
        errors: {
          ...state.errors,
          updateOrder: "",
        },
      };
    case TypeActions.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isUpdateOrder: false,
        errors: {
          ...state.errors,
          updateOrder: "",
        },
      };
    case TypeActions.UPDATE_ORDER_FAILED:
      return {
        ...state,
        isUpdateOrder: false,
        errors: {
          ...state.errors,
          updateOrder: actions.error,
        },
      };
    //delete order
    case TypeActions.DELETE_ORDER_REQUEST:
      return {
        ...state,
        isDeleteOrder: true,
        errors: {
          ...state.errors,
          deleteOrder: "",
        },
      };
    case TypeActions.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isDeleteOrder: false,
        errors: {
          ...state.errors,
          deleteOrder: "",
        },
      };

    case TypeActions.DELETE_ORDER_FAILED:
      return {
        ...state,
        isDeleteOrder: false,
        errors: {
          ...state.errors,
          deleteOrder: actions.error,
        },
      };

    case TypeActions.GET_CUSTOMERS_IN_ORDER_REQUEST:
      return {
        ...state,
        isGetCustomersInOrder: true,
        customersInOrder: { items: [] },
        errors: { ...state.errors, getCustomersInOrder: "" },
      };
    case TypeActions.GET_CUSTOMERS_IN_ORDER_SUCCESS:
      return {
        ...state,
        isGetCustomersInOrder: false,
        customersInOrder: actions.data || { items: [] },
        errors: { ...state.errors, getCustomersInOrder: "" },
      };
    case TypeActions.GET_CUSTOMERS_IN_ORDER_FAILED:
      return {
        ...state,
        isGetCustomersInOrder: false,
        customersInOrder: { items: [] },
        errors: { ...state.errors, getCustomersInOrder: actions.error },
      };

    //Get order by id
    case TypeActions.GET_CUSTOMER_IN_ORDER_REQUEST:
      return {
        ...state,
        isGetCustomerInOrder: true,
        customerInOrder: {},
        errors: { ...state.errors, getCustomerInOrder: "" },
      };
    case TypeActions.GET_CUSTOMER_IN_ORDER_SUCCESS:
      return {
        ...state,
        isGetCustomerInOrder: false,
        customerInOrder: actions.data || {},
        errors: { ...state.errors, getCustomerInOrder: "" },
      };
    case TypeActions.GET_CUSTOMER_IN_ORDER_FAILED:
      return {
        ...state,
        isGetCustomerInOrder: false,
        customerInOrder: {},
        errors: { ...state.errors, getCustomerInOrder: actions.error },
      };

    case TypeActions.UPLOAD_CUSTOMER_ORDER_REQUEST:
      return {
        ...state,
        isUploadCustomerOrder: true,
        errors: {
          ...state.errors,
          uploadCustomerOrder: "",
        },
      };
    case TypeActions.UPLOAD_CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        isUploadCustomerOrder: false,
        errors: {
          ...state.errors,
          uploadCustomerOrder: "",
        },
      };
    case TypeActions.UPLOAD_CUSTOMER_ORDER_FAILED:
      return {
        ...state,
        isUploadCustomerOrder: false,
        errors: {
          ...state.errors,
          uploadCustomerOrder: actions.error,
        },
      };
    case TypeActions.CONVERT_MEASURE_SIZE_REQUEST:
      return {
        ...state,
        isConvertMeasureSize: true,
        errors: {
          ...state.errors,
          convertMeasureSize: "",
        },
      };
    case TypeActions.CONVERT_MEASURE_SIZE_FAILED:
      return {
        ...state,
        isConvertMeasureSize: false,
        errors: {
          ...state.errors,
          convertMeasureSize: "",
        },
      };
    case TypeActions.CONVERT_MEASURE_SIZE_FAILED:
      return {
        ...state,
        isConvertMeasureSize: false,
        errors: {
          ...state.errors,
          convertMeasureSize: actions.error,
        },
      };

    case TypeActions.APPROVE_ORDER_REQUEST:
      return {
        ...state,
        isApproveOrder: true,
        errors: {
          ...state.errors,
          approveOrder: "",
        },
      };
    case TypeActions.APPROVE_ORDER_SUCCESS:
      return {
        ...state,
        isApproveOrder: false,
        errors: {
          ...state.errors,
          approveOrder: "",
        },
      };
    case TypeActions.APPROVE_ORDER_FAILED:
      return {
        ...state,
        isApproveOrder: false,
        errors: {
          ...state.errors,
          approveOrder: actions.error,
        },
      };

    case TypeActions.ADD_SEW_MEASURE_SIZE_REQUEST:
      return {
        ...state,
        isAddSewMeasureSize: true,
        errors: {
          ...state.errors,
          addSewMeasureSize: "",
        },
      };
    case TypeActions.ADD_SEW_MEASURE_SIZE_SUCCESS:
      return {
        ...state,
        isAddSewMeasureSize: false,
        errors: {
          ...state.errors,
          addSewMeasureSize: "",
        },
      };
    case TypeActions.ADD_SEW_MEASURE_SIZE_FAILED:
      return {
        ...state,
        isAddSewMeasureSize: false,
        errors: {
          ...state.errors,
          addSewMeasureSize: actions.error,
        },
      };

    case TypeActions.UPDATE_CUSTOMER_IN_ORDER_REQUEST:
      return {
        ...state,
        isUpdateCustomerInOrder: true,
        errors: {
          ...state.errors,
          updateCustomerInOrder: "",
        },
      };
    case TypeActions.UPDATE_CUSTOMER_IN_ORDER_SUCCESS:
      return {
        ...state,
        isUpdateCustomerInOrder: false,
        errors: {
          ...state.errors,
          updateCustomerInOrder: "",
        },
      };
    case TypeActions.UPDATE_CUSTOMER_IN_ORDER_FAILED:
      return {
        ...state,
        isUpdateCustomerInOrder: false,
        errors: {
          ...state.errors,
          updateCustomerInOrder: actions.error,
        },
      };

    case TypeActions.GET_ORDERS_CONVERT_REQUEST:
      return {
        ...state,
        ordersConvert: { items: [] },
        isGetOrdersConvert: true,
        errors: {
          ...state.errors,
          getOrdersConvert: "",
        },
      };
    case TypeActions.GET_ORDERS_CONVERT_SUCCESS:
      return {
        ...state,
        ordersConvert: actions.data || { items: [] },
        isGetOrdersConvert: false,
        errors: {
          ...state.errors,
          getOrdersConvert: "",
        },
      };
    case TypeActions.GET_ORDERS_CONVERT_FAILED:
      return {
        ...state,
        ordersConvert: { items: [] },
        isGetOrdersConvert: false,
        errors: {
          ...state.errors,
          getOrdersConvert: actions.error,
        },
      };

    case TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_REQUEST:
      return {
        ...state,
        isApproveAllCustomersInOrder: true,
        errors: { ...state.errors, approveAllCustomerInOrder: "" },
      };
    case TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_SUCCESS:
      return {
        ...state,
        isApproveAllCustomersInOrder: false,
        errors: { ...state.errors, approveAllCustomerInOrder: "" },
      };
    case TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_FAILED:
      return {
        ...state,
        isApproveAllCustomersInOrder: false,
        errors: { ...state.errors, approveAllCustomerInOrder: actions.error },
      };

    case TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_REQUEST:
      return {
        ...state,
        isApproveManyCustomersInOrder: true,
        errors: { ...state.errors, approveManyCustomerInOrder: "" },
      };
    case TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_SUCCESS:
      return {
        ...state,
        isApproveManyCustomersInOrder: false,
        errors: { ...state.errors, approveManyCustomerInOrder: "" },
      };
    case TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_FAILED:
      return {
        ...state,
        isApproveManyCustomersInOrder: false,
        errors: { ...state.errors, approveManyCustomerInOrder: actions.error },
      };

    case TypeActions.GET_UNUSUAL_LIST_REQUEST:
      return {
        ...state,
        unusualList: { items: [] },
        isGetUnusualList: true,
        errors: { ...state.errors, getUnusualList: "" },
      };
    case TypeActions.GET_UNUSUAL_LIST_SUCCESS:
      return {
        ...state,
        unusualList: actions.data || { items: [] },
        isGetUnusualList: false,
        errors: { ...state.errors, getUnusualList: "" },
      };
    case TypeActions.GET_UNUSUAL_LIST_FAILED:
      return {
        ...state,
        unusualList: { items: [] },
        isGetUnusualList: false,
        errors: { ...state.errors, getUnusualList: actions.error },
      };

    case TypeActions.GET_ALL_PRODUCT_IN_ORDER_REQUEST:
      return {
        ...state,
        productsInOrder: { items: [] },
        isGetProductsInOrder: true,
        errors: { ...state.errors, getProductsInOrder: "" },
      };
    case TypeActions.GET_ALL_PRODUCT_IN_ORDER_SUCCESS:
      return {
        ...state,
        productsInOrder: actions.data || { items: [] },
        isGetProductsInOrder: false,
        errors: { ...state.errors, getProductsInOrder: "" },
      };
    case TypeActions.GET_ALL_PRODUCT_IN_ORDER_FAILED:
      return {
        ...state,
        productsInOrder: { items: [] },
        isGetProductsInOrder: false,
        errors: { ...state.errors, getProductsInOrder: actions.error },
      };

    case TypeActions.CHECK_UNUSUAL_SIZE_REQUEST:
      return {
        ...state,
        isCheckUnusualList: true,
        errors: { ...state.errors, checkUnusualList: "" },
      };
    case TypeActions.CHECK_UNUSUAL_SIZE_SUCCESS:
      return {
        ...state,
        isCheckUnusualList: false,
        errors: { ...state.errors, checkUnusualList: "" },
      };
    case TypeActions.CHECK_UNUSUAL_SIZE_FAILED:
      return {
        ...state,
        isCheckUnusualList: false,
        errors: { ...state.errors, checkUnusualList: actions.error },
      };
    default: {
      return { ...state };
    }
  }
};
export default orderReducer;
