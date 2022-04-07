import TypeActions from "../TypeActions";

const initialState = {
  materialNorms: {
    items: [],
  },
  materialNormById: {},
  allProductInOrder: {
    items: [],
  },
  isGetMaterialNorms: false,
  isGetMaterialNormById: false,
  isGetAllProductInOrder: false,
  isCreateMaterialNorm: false,
  isUpdateMaterialNorm: false,
  isDeleteMaterialNorm: false,
  errors: {
    getMaterialNorm: "",
    getMaterialNormById: "",
    getAllProductInOrder: "",
    createMaterialNorm: "",
    updateMaterialNorm: "",
    deleteMaterialNorm: "",
  },
};

export const materialNormReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_MATERIAL_NORMS_REQUEST:
      return {
        ...state,
        isGetMaterialNorms: true,
        materialNorms: { items: [] },
        errors: {
          ...state.errors,
          isGetMaterialNorms: "",
        },
      };
    case TypeActions.GET_MATERIAL_NORMS_SUCCESS:
      return {
        ...state,
        materialNorms: actions.data || { items: [] },
        isGetMaterialNorms: false,
        errors: {
          ...state.errors,
          getMaterialNorm: "",
        },
      };
    case TypeActions.GET_MATERIAL_NORMS_FAILED:
      return {
        ...state,
        isGetMaterialNorms: false,
        materialNorms: { items: [] },
        errors: {
          ...state.errors,
          getMaterialNorm: actions.error,
        },
      };

    case TypeActions.GET_MATERIAL_NORM_BY_ID_REQUEST:
      return {
        ...state,
        isGetMaterialNormById: true,
        materialNormById: {},
        errors: {
          ...state.errors,
          getMaterialNormById: "",
        },
      };
    case TypeActions.GET_MATERIAL_NORM_BY_ID_SUCCESS:
      return {
        ...state,
        materialNormById: actions.data || {},
        isGetMaterialNormById: false,
        errors: {
          ...state.errors,
          getMaterialNormById: "",
        },
      };
    case TypeActions.GET_MATERIAL_NORM_BY_ID_FAILED:
      return {
        ...state,
        isGetMaterialNormById: false,
        materialNormById: {},
        errors: {
          ...state.errors,
          getMaterialNormById: actions.error,
        },
      };

    case TypeActions.CREATE_MATERIAL_NORM_REQUEST:
      return {
        ...state,
        isCreateMaterialNorm: true,
        errors: {
          ...state.errors,
          createMaterialNorm: "",
        },
      };
    case TypeActions.CREATE_MATERIAL_NORM_SUCCESS:
      return {
        ...state,
        isCreateMaterialNorm: false,
        errors: {
          ...state.errors,
          createMaterialNorm: "",
        },
      };
    case TypeActions.CREATE_MATERIAL_NORM_FAILED:
      return {
        ...state,
        isCreateMaterialNorm: false,
        errors: {
          ...state.errors,
          createMaterialNorm: actions.error,
        },
      };

    case TypeActions.UPDATE_MATERIAL_NORM_REQUEST:
      return {
        ...state,
        isUpdateMaterialNorm: true,
        errors: {
          ...state.errors,
          updateMaterialNorm: "",
        },
      };
    case TypeActions.UPDATE_MATERIAL_NORM_SUCCESS:
      return {
        ...state,
        isUpdateMaterialNorm: false,
        errors: {
          ...state.errors,
          updateMaterialNorm: "",
        },
      };
    case TypeActions.UPDATE_MATERIAL_NORM_FAILED:
      return {
        ...state,
        isUpdateMaterialNorm: false,
        errors: {
          ...state.errors,
          updateMaterialNorm: actions.error,
        },
      };

    case TypeActions.DELETE_MATERIAL_NORM_REQUEST:
      return {
        ...state,
        isDeleteMaterialNorm: true,
        errors: {
          ...state.errors,
          deleteMaterialNorm: "",
        },
      };
    case TypeActions.DELETE_MATERIAL_NORM_SUCCESS:
      return {
        ...state,
        isDeleteMaterialNorm: false,
        errors: {
          ...state.errors,
          deleteMaterialNorm: "",
        },
      };
    case TypeActions.DELETE_MATERIAL_NORM_FAILED:
      return {
        ...state,
        isDeleteMaterialNorm: false,
        errors: {
          ...state.errors,
          deleteMaterialNorm: actions.error,
        },
      };

    case TypeActions.GET_ALL_PRODUCT_IN_ORDER_REQUEST:
      return {
        ...state,
        isGetAllProductInOrder: true,
        allProductInOrder: { items: [] },
        errors: {
          ...state.errors,
          getAllProductInOrder: "",
        },
      };
    case TypeActions.GET_ALL_PRODUCT_IN_ORDER_SUCCESS:
      return {
        ...state,
        allProductInOrder: actions.data || { items: [] },
        isGetAllProductInOrder: false,
        errors: {
          ...state.errors,
          getAllProductInOrder: "",
        },
      };
    case TypeActions.GET_ALL_PRODUCT_IN_ORDER_FAILED:
      return {
        ...state,
        isGetAllProductInOrder: false,
        allProductInOrder: { items: [] },
        errors: {
          ...state.errors,
          getAllProductInOrder: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default materialNormReducer;
