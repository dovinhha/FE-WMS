import TypeActions from "../TypeActions";

const initialState = {
  units: {
    results: [],
  },
  unitById: {},
  isGetUnits: false,
  isGetUnitById: false,
  isCreateUnit: false,
  isUpdateUnit: false,
  isDeleteUnit: false,
  errors: {
    getUnit: "",
    getUnitById: "",
    createUnit: "",
    updateUnit: "",
    deleteUnit: "",
  },
};

export const unitReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_UNITS_REQUEST:
      return {
        ...state,
        isGetUnits: true,
        units: { results: [] },
        errors: {
          ...state.errors,
          isGetUnits: "",
        },
      };
    case TypeActions.GET_UNITS_SUCCESS:
      return {
        ...state,
        units: actions.data || { results: [] },
        isGetUnits: false,
        errors: {
          ...state.errors,
          getUnit: "",
        },
      };
    case TypeActions.GET_UNITS_FAILED:
      return {
        ...state,
        isGetUnits: false,
        units: { results: [] },
        errors: {
          ...state.errors,
          getUnit: actions.error,
        },
      };

    case TypeActions.GET_UNIT_BY_ID_REQUEST:
      return {
        ...state,
        isGetUnitById: true,
        unitById: {},
        errors: {
          ...state.errors,
          getUnitById: "",
        },
      };
    case TypeActions.GET_UNIT_BY_ID_SUCCESS:
      return {
        ...state,
        unitById: actions.data || {},
        isGetUnitById: false,
        errors: {
          ...state.errors,
          getUnitById: "",
        },
      };
    case TypeActions.GET_UNIT_BY_ID_FAILED:
      return {
        ...state,
        isGetUnitById: false,
        unitById: {},
        errors: {
          ...state.errors,
          getUnitById: actions.error,
        },
      };

    case TypeActions.CREATE_UNIT_REQUEST:
      return {
        ...state,
        isCreateUnit: true,
        errors: {
          ...state.errors,
          createUnit: "",
        },
      };
    case TypeActions.CREATE_UNIT_SUCCESS:
      return {
        ...state,
        isCreateUnit: false,
        errors: {
          ...state.errors,
          createUnit: "",
        },
      };
    case TypeActions.CREATE_UNIT_FAILED:
      return {
        ...state,
        isCreateUnit: false,
        errors: {
          ...state.errors,
          createUnit: actions.error,
        },
      };

    case TypeActions.UPDATE_UNIT_REQUEST:
      return {
        ...state,
        isUpdateUnit: true,
        errors: {
          ...state.errors,
          updateUnit: "",
        },
      };
    case TypeActions.UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        isUpdateUnit: false,
        errors: {
          ...state.errors,
          updateUnit: "",
        },
      };
    case TypeActions.UPDATE_UNIT_FAILED:
      return {
        ...state,
        isUpdateUnit: false,
        errors: {
          ...state.errors,
          updateUnit: actions.error,
        },
      };

    case TypeActions.DELETE_UNIT_REQUEST:
      return {
        ...state,
        isDeleteUnit: true,
        errors: {
          ...state.errors,
          deleteUnit: "",
        },
      };
    case TypeActions.DELETE_UNIT_SUCCESS:
      return {
        ...state,
        isDeleteUnit: false,
        errors: {
          ...state.errors,
          deleteUnit: "",
        },
      };
    case TypeActions.DELETE_UNIT_FAILED:
      return {
        ...state,
        isDeleteUnit: false,
        errors: {
          ...state.errors,
          deleteUnit: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default unitReducer;
