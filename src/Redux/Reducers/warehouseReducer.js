import TypeActions from "../TypeActions";

const initialState = {
  warehouses: {
    items: [],
  },
  warehouseById: {},
  isGetWarehouses: false,
  isGetWarehouseById: false,
  isCreateWarehouse: false,
  isUpdateWarehouse: false,
  isDeleteWarehouse: false,
  errors: {
    getWarehouse: "",
    getWarehouseById: "",
    createWarehouse: "",
    updateWarehouse: "",
    deleteWarehouse: "",
  },
};

export const warehouseReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_WAREHOUSES_REQUEST:
      return {
        ...state,
        isGetWarehouses: true,
        warehouses: { items: [] },
        errors: {
          ...state.errors,
          isGetWarehouses: "",
        },
      };
    case TypeActions.GET_WAREHOUSES_SUCCESS:
      return {
        ...state,
        warehouses: actions.data || { items: [] },
        isGetWarehouses: false,
        errors: {
          ...state.errors,
          getWarehouse: "",
        },
      };
    case TypeActions.GET_WAREHOUSES_FAILED:
      return {
        ...state,
        isGetWarehouses: false,
        warehouses: { items: [] },
        errors: {
          ...state.errors,
          getWarehouse: actions.error,
        },
      };

    case TypeActions.GET_WAREHOUSE_BY_ID_REQUEST:
      return {
        ...state,
        isGetWarehouseById: true,
        warehouseById: {},
        errors: {
          ...state.errors,
          getWarehouseById: "",
        },
      };
    case TypeActions.GET_WAREHOUSE_BY_ID_SUCCESS:
      return {
        ...state,
        warehouseById: actions.data || {},
        isGetWarehouseById: false,
        errors: {
          ...state.errors,
          getWarehouseById: "",
        },
      };
    case TypeActions.GET_WAREHOUSE_BY_ID_FAILED:
      return {
        ...state,
        isGetWarehouseById: false,
        warehouseById: {},
        errors: {
          ...state.errors,
          getWarehouseById: actions.error,
        },
      };

    case TypeActions.CREATE_WAREHOUSE_REQUEST:
      return {
        ...state,
        isCreateWarehouse: true,
        errors: {
          ...state.errors,
          createWarehouse: "",
        },
      };
    case TypeActions.CREATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        isCreateWarehouse: false,
        errors: {
          ...state.errors,
          createWarehouse: "",
        },
      };
    case TypeActions.CREATE_WAREHOUSE_FAILED:
      return {
        ...state,
        isCreateWarehouse: false,
        errors: {
          ...state.errors,
          createWarehouse: actions.error,
        },
      };

    case TypeActions.UPDATE_WAREHOUSE_REQUEST:
      return {
        ...state,
        isUpdateWarehouse: true,
        errors: {
          ...state.errors,
          updateWarehouse: "",
        },
      };
    case TypeActions.UPDATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        isUpdateWarehouse: false,
        errors: {
          ...state.errors,
          updateWarehouse: "",
        },
      };
    case TypeActions.UPDATE_WAREHOUSE_FAILED:
      return {
        ...state,
        isUpdateWarehouse: false,
        errors: {
          ...state.errors,
          updateWarehouse: actions.error,
        },
      };

    case TypeActions.DELETE_WAREHOUSE_REQUEST:
      return {
        ...state,
        isDeleteWarehouse: true,
        errors: {
          ...state.errors,
          deleteWarehouse: "",
        },
      };
    case TypeActions.DELETE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        isDeleteWarehouse: false,
        errors: {
          ...state.errors,
          deleteWarehouse: "",
        },
      };
    case TypeActions.DELETE_WAREHOUSE_FAILED:
      return {
        ...state,
        isDeleteWarehouse: false,
        errors: {
          ...state.errors,
          deleteWarehouse: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default warehouseReducer;
