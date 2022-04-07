import TypeActions from "../TypeActions";

const initialState = {
  measurementStandards: {
    items: [],
  },
  measurementStandardById: {},
  isGetMeasurementStandards: false,
  isGetMeasurementStandardById: false,
  isCreateMeasurementStandard: false,
  isUpdateMeasurementStandard: false,
  isDeleteMeasurementStandard: false,
  errors: {
    getMeasurementStandards: "",
    getMeasurementStandardsById: "",
    createMeasurementStandard: "",
    updateMeasurementStandard: "",
    deleteMeasurementStandard: "",
  },
};

export const measurementStandardsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_MEASUREMENT_STANDARDS_REQUEST:
      return {
        ...state,
        isGetMeasurementStandards: true,
        measurementStandards: { items: [] },
        errors: {
          ...state.errors,
          getMeasurementStandards: "",
        },
      };
    case TypeActions.GET_MEASUREMENT_STANDARDS_SUCCESS:
      return {
        ...state,
        measurementStandards: actions.data || { items: [] },
        isGetMeasurementStandards: false,
        errors: {
          ...state.errors,
          getMeasurementStandards: "",
        },
      };
    case TypeActions.GET_MEASUREMENT_STANDARDS_FAILED:
      return {
        ...state,
        measurementStandards: { items: [] },
        isGetMeasurementStandards: false,
        errors: {
          ...state.errors,
          getMeasurementStandards: actions.error,
        },
      };

    case TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_REQUEST:
      return {
        ...state,
        isGetMeasurementStandardById: true,
        measurementStandardById: {},
        errors: {
          ...state.errors,
          getMeasurementStandardsById: "",
        },
      };
    case TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_SUCCESS:
      return {
        ...state,
        isGetMeasurementStandardById: false,
        measurementStandardById: actions.data || { items: [] },
        errors: {
          ...state.errors,
          getMeasurementStandardsById: "",
        },
      };
    case TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_FAILED:
      return {
        ...state,
        isGetMeasurementStandardById: false,
        measurementStandardById: {},
        errors: {
          ...state.errors,
          getMeasurementStandardsById: actions.error,
        },
      };

    case TypeActions.CREATE_MEASUREMENT_STANDARD_REQUEST:
      return {
        ...state,
        isCreateMeasurementStandard: true,
        errors: {
          ...state.errors,
          createMeasurementStandard: "",
        },
      };
    case TypeActions.CREATE_MEASUREMENT_STANDARD_SUCCESS:
      return {
        ...state,
        isCreateMeasurementStandard: false,
        errors: {
          ...state.errors,
          createMeasurementStandard: "",
        },
      };
    case TypeActions.CREATE_MEASUREMENT_STANDARD_FAILED:
      return {
        ...state,
        isCreateMeasurementStandard: false,
        errors: {
          ...state.errors,
          createMeasurementStandard: actions.error,
        },
      };

    case TypeActions.UPDATE_MEASUREMENT_STANDARD_REQUEST:
      return {
        ...state,
        isUpdateMeasurementStandard: true,
        errors: {
          ...state.errors,
          updateMeasurementStandard: "",
        },
      };
    case TypeActions.UPDATE_MEASUREMENT_STANDARD_SUCCESS:
      return {
        ...state,
        isUpdateMeasurementStandard: false,
        errors: {
          ...state.errors,
          updateMeasurementStandard: "",
        },
      };
    case TypeActions.UPDATE_MEASUREMENT_STANDARD_FAILED:
      return {
        ...state,
        isUpdateMeasurementStandard: false,
        errors: {
          ...state.errors,
          updateMeasurementStandard: actions.error,
        },
      };

    case TypeActions.DELETE_MEASUREMENT_STANDARD_REQUEST:
      return {
        ...state,
        isDeleteMeasurementStandard: true,
        errors: {
          ...state.errors,
          isDeleteMeasurementStandard: "",
        },
      };
    case TypeActions.DELETE_MEASUREMENT_STANDARD_SUCCESS:
      return {
        ...state,
        isDeleteMeasurementStandard: false,
        errors: {
          ...state.errors,
          isDeleteMeasurementStandard: "",
        },
      };
    case TypeActions.DELETE_MEASUREMENT_STANDARD_FAILED:
      return {
        ...state,
        isDeleteMeasurementStandard: false,
        errors: {
          ...state.errors,
          isDeleteMeasurementStandard: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default measurementStandardsReducer;
