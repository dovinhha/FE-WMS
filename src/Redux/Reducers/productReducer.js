import TypeActions from "../TypeActions";

const initialState = {
  products: {
    results: [],
  },
  productParameters: {
    results: [],
  },
  productById: {},
  isGetProducts: false,
  isGetProductParameters: false,
  isGetProductById: false,
  isCreateProduct: false,
  isUpdateProduct: false,
  isDeleteProduct: false,
  errors: {
    getProducts: "",
    getProductParameters: "",
    getProductById: "",
    createProduct: "",
    updateProduct: "",
    deleteProduct: "",
  },
};

export const productReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isGetProducts: true,
        products: { results: [] },
        errors: {
          ...state.errors,
          getProducts: "",
        },
      };
    case TypeActions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: actions.data || { results: [] },
        isGetProducts: false,
        errors: {
          ...state.errors,
          getProducts: "",
        },
      };
    case TypeActions.GET_PRODUCTS_FAILED:
      return {
        ...state,
        isGetProducts: false,
        products: { results: [] },
        errors: {
          ...state.errors,
          getProducts: actions.error,
        },
      };

    case TypeActions.GET_PRODUCT_PARAMETERS_REQUEST:
      return {
        ...state,
        isGetProductParameters: true,
        productParameters: { results: [] },
        errors: {
          ...state.errors,
          getProductParameters: "",
        },
      };
    case TypeActions.GET_PRODUCT_PARAMETERS_SUCCESS:
      return {
        ...state,
        productParameters: actions.data || { results: [] },
        isGetProductParameters: false,
        errors: {
          ...state.errors,
          getProductParameters: "",
        },
      };
    case TypeActions.GET_PRODUCT_PARAMETERS_FAILED:
      return {
        ...state,
        isGetProductParameters: false,
        productParameters: { results: [] },
        errors: {
          ...state.errors,
          getProductParameters: actions.error,
        },
      };

    case TypeActions.GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        isGetProductById: true,
        productById: {},
        errors: {
          ...state.errors,
          getProductById: "",
        },
      };
    case TypeActions.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productById: actions.data || {},
        isGetProductById: false,
        errors: {
          ...state.errors,
          getProductById: "",
        },
      };
    case TypeActions.GET_PRODUCT_BY_ID_FAILED:
      return {
        ...state,
        isGetProductById: false,
        productById: {},
        errors: {
          ...state.errors,
          getProductById: actions.error,
        },
      };

    case TypeActions.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isCreateProduct: true,
        errors: {
          ...state.errors,
          createProduct: "",
        },
      };
    case TypeActions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isCreateProduct: false,
        errors: {
          ...state.errors,
          createProduct: "",
        },
      };
    case TypeActions.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        isCreateProduct: false,
        errors: {
          ...state.errors,
          createProduct: actions.error,
        },
      };

    case TypeActions.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isUpdateProduct: true,
        errors: {
          ...state.errors,
          updateProduct: "",
        },
      };
    case TypeActions.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdateProduct: false,
        errors: {
          ...state.errors,
          updateProduct: "",
        },
      };
    case TypeActions.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        isUpdateProduct: false,
        errors: {
          ...state.errors,
          updateProduct: actions.error,
        },
      };

    case TypeActions.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isDeleteProduct: true,
        errors: {
          ...state.errors,
          deleteProduct: "",
        },
      };
    case TypeActions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isDeleteProduct: false,
        errors: {
          ...state.errors,
          deleteProduct: "",
        },
      };
    case TypeActions.DELETE_PRODUCT_FAILED:
      return {
        ...state,
        isDeleteProduct: false,
        errors: {
          ...state.errors,
          deleteProduct: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
