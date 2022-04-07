import TypeActions from "../TypeActions";

const initialState = {
  productTypes: {
    items: [],
  },
  products: {
    items: [],
  },
  productById: {},
  isGetProducts: false,
  isGetProductById: false,
  isCreateProduct: false,
  isUpdateProduct: false,
  isDeleteProduct: false,

  isGetProductTypes: false,
  isCreateProductType: false,
  isUpdateProductType: false,
  isDeleteProductType: false,
  errors: {
    getProducts: "",
    getProductById: "",
    createProduct: "",
    updateProduct: "",
    deleteProduct: "",

    getProductTypes: "",
    createProductType: "",
    updateProductType: "",
    deleteProductType: "",
  },
};

export const productTypesReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_PRODUCT_TYPES_REQUEST:
      return {
        ...state,
        isGetProductTypes: true,
        productTypes: { items: [] },
        errors: { ...state.errors, getProductTypes: "" },
      };
    case TypeActions.GET_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        isGetProductTypes: false,
        productTypes: actions.data || { items: [] },
        errors: { ...state.errors, getProductTypes: "" },
      };
    case TypeActions.GET_PRODUCT_TYPES_FAILED:
      return {
        ...state,
        isGetProductTypes: false,
        productTypes: { items: [] },
        errors: { ...state.errors, getProductTypes: actions.error },
      };

    //Update product type
    case TypeActions.UPDATE_PRODUCT_TYPE_REQUEST:
      return {
        ...state,
        isUpdateProductType: true,

        errors: { ...state.errors, updateProductTypes: "" },
      };
    case TypeActions.UPDATE_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        isUpdateProductType: false,

        errors: { ...state.errors, updateProductTypes: "" },
      };
    case TypeActions.UPDATE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        isUpdateProductType: false,

        errors: { ...state.errors, updateProductTypes: actions.error },
      };

    case TypeActions.DELETE_PRODUCT_TYPE_REQUEST:
      return {
        ...state,
        isDeleteProductType: true,

        errors: { ...state.errors, updateProductTypes: "" },
      };
    case TypeActions.DELETE_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        isDeleteProductType: false,

        errors: { ...state.errors, updateProductTypes: "" },
      };
    case TypeActions.DELETE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        isDeleteProductType: false,

        errors: { ...state.errors, updateProductTypes: actions.error },
      };
    //create product types

    case TypeActions.CREATE_PRODUCT_TYPE_REQUEST:
      return {
        ...state,
        isCreateProductType: true,

        errors: { ...state.errors, createProductTypes: "" },
      };
    case TypeActions.CREATE_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        isCreateProductType: false,
        errors: { ...state.errors, createProductTypes: "" },
      };
    case TypeActions.CREATE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        isCreateProductType: false,
        errors: { ...state.errors, createProductTypes: actions.error },
      };

    //get products
    case TypeActions.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isGetProducts: true,
        products: { items: [] },
        errors: { ...state.errors, getProducts: "" },
      };
    case TypeActions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isGetProducts: false,
        products: actions.data || { items: [] },
        errors: { ...state.errors, getProducts: "" },
      };
    case TypeActions.GET_PRODUCTS_FAILED:
      return {
        ...state,
        isGetProducts: false,
        products: { items: [] },
        errors: { ...state.errors, getProducts: actions.error },
      };

    //update product

    case TypeActions.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isUpdateProduct: true,

        errors: { ...state.errors, updateProduct: "" },
      };
    case TypeActions.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdateProduct: false,

        errors: { ...state.errors, updateProduct: "" },
      };
    case TypeActions.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        isUpdateProduct: false,
        errors: { ...state.errors, updateProduct: actions.error },
      };

    //create product
    case TypeActions.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isCreateProduct: true,

        errors: { ...state.errors, createProduct: "" },
      };
    case TypeActions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isCreateProduct: false,
        errors: { ...state.errors, createProduct: "" },
      };
    case TypeActions.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        isCreateProduct: false,
        errors: { ...state.errors, createProduct: actions.error },
      };
    default: {
      return { ...state };
    }
  }
};
export default productTypesReducer;
