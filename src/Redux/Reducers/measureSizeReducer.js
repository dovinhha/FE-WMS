import TypeActions from "../TypeActions";

const initialState = {
  measureSizes: {
    items: [],
  },
  measureSizeById: {},
  isGetMeasureSizes: false,
  isGetMeasureSizeById: false,
  isCreateMeasureSize: false,
  isUpdateMeasureSize: false,
  isDeleteMeasureSize: false,
  errors: {
    getMeasureSizes: "",
    getMeasureSizeById: "",
    createMeasureSize: "",
    updateMeasureSize: "",
    deleteMeasureSize: "",
  },
};

export const measureSizeReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_MEASURE_SIZES_REQUEST:
      return {
        ...state,
        isGetMeasureSizes: true,
        measureSizes: { items: [] },
        errors: {
          ...state.errors,
          getMeasureSizes: "",
        },
      };
    case TypeActions.GET_MEASURE_SIZES_SUCCESS:
      return {
        ...state,
        measureSizes: actions.data || { items: [] },
        isGetMeasureSizes: false,
        errors: {
          ...state.errors,
          getMeasureSizes: "",
        },
      };
    case TypeActions.GET_MEASURE_SIZES_FAILED:
      return {
        ...state,
        isGetMeasureSizes: false,
        measureSizes: { items: [] },
        errors: {
          ...state.errors,
          getMeasureSizes: actions.error,
        },
      };

    case TypeActions.GET_MEASURE_SIZE_BY_ID_REQUEST:
      return {
        ...state,
        isGetMeasureSizeById: true,
        measureSizeById: {},
        errors: {
          ...state.errors,
          getMeasureSizeById: "",
        },
      };
    case TypeActions.GET_MEASURE_SIZE_BY_ID_SUCCESS:
      return {
        ...state,
        measureSizeById: actions.data || {},
        isGetMeasureSizeById: false,
        errors: {
          ...state.errors,
          getMeasureSizeById: "",
        },
      };
    case TypeActions.GET_MEASURE_SIZE_BY_ID_FAILED:
      return {
        ...state,
        isGetMeasureSizeById: false,
        measureSizeById: {},
        errors: {
          ...state.errors,
          getMeasureSizeById: actions.error,
        },
      };

    case TypeActions.CREATE_MEASURE_SIZE_REQUEST:
      return {
        ...state,
        isCreateMeasureSize: true,
        errors: {
          ...state.errors,
          createMeasureSize: "",
        },
      };
    case TypeActions.CREATE_MEASURE_SIZE_SUCCESS:
      return {
        ...state,
        isCreateMeasureSize: false,
        errors: {
          ...state.errors,
          createMeasureSize: "",
        },
      };
    case TypeActions.CREATE_MEASURE_SIZE_FAILED:
      return {
        ...state,
        isCreateMeasureSize: false,
        errors: {
          ...state.errors,
          createMeasureSize: actions.error,
        },
      };

    case TypeActions.UPDATE_MEASURE_SIZE_REQUEST:
      return {
        ...state,
        isUpdateMeasureSize: true,
        errors: {
          ...state.errors,
          updateMeasureSize: "",
        },
      };
    case TypeActions.UPDATE_MEASURE_SIZE_SUCCESS:
      return {
        ...state,
        isUpdateMeasureSize: false,
        errors: {
          ...state.errors,
          updateMeasureSize: "",
        },
      };
    case TypeActions.UPDATE_MEASURE_SIZE_FAILED:
      return {
        ...state,
        isUpdateMeasureSize: false,
        errors: {
          ...state.errors,
          updateMeasureSize: actions.error,
        },
      };

    case TypeActions.DELETE_MEASURE_SIZE_REQUEST:
      return {
        ...state,
        isDeleteMeasureSize: true,
        errors: {
          ...state.errors,
          deleteMeasureSize: "",
        },
      };
    case TypeActions.DELETE_MEASURE_SIZE_SUCCESS:
      return {
        ...state,
        isDeleteMeasureSize: false,
        errors: {
          ...state.errors,
          deleteMeasureSize: "",
        },
      };
    case TypeActions.DELETE_MEASURE_SIZE_FAILED:
      return {
        ...state,
        isDeleteMeasureSize: false,
        errors: {
          ...state.errors,
          deleteMeasureSize: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default measureSizeReducer;
