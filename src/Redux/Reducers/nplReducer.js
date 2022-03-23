import TypeActions from "../TypeActions";

const initialState = {
  npls: {
    results: [],
  },
  nplById: {},
  isGetNpls: false,
  isGetNplGroups: false,
  isGetNplById: false,
  isCreateNpl: false,
  isUpdateNpl: false,
  isDeleteNpl: false,
  nplGroups: {
    results: [],
  },
  nplGroupById: {},
  isGetNplGroups: false,
  isGetNplGroupById: false,
  isCreateNplGroup: false,
  isUpdateNplGroup: false,
  isDeleteNplGroup: false,
  errors: {
    getNpl: "",
    getNplById: "",
    createNpl: "",
    updateNpl: "",
    deleteNpl: "",
    getNplGroups: "",
    getNplGroupById: "",
    createNplGroup: "",
    updateNplGroup: "",
    deleteNplGroup: "",
  },
};

export const nplReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_NPLS_REQUEST:
      return {
        ...state,
        isGetNpls: true,
        npls: { results: [] },
        errors: {
          ...state.errors,
          isGetNpls: "",
        },
      };
    case TypeActions.GET_NPLS_SUCCESS:
      return {
        ...state,
        npls: actions.data || { results: [] },
        isGetNpls: false,
        errors: {
          ...state.errors,
          getNpl: "",
        },
      };
    case TypeActions.GET_NPLS_FAILED:
      return {
        ...state,
        isGetNpls: false,
        npls: { results: [] },
        errors: {
          ...state.errors,
          getNpl: actions.error,
        },
      };

    case TypeActions.GET_NPL_BY_ID_REQUEST:
      return {
        ...state,
        isGetNplById: true,
        nplById: {},
        errors: {
          ...state.errors,
          getNplById: "",
        },
      };
    case TypeActions.GET_NPL_BY_ID_SUCCESS:
      return {
        ...state,
        nplById: actions.data || {},
        isGetNplById: false,
        errors: {
          ...state.errors,
          getNplById: "",
        },
      };
    case TypeActions.GET_NPL_BY_ID_FAILED:
      return {
        ...state,
        isGetNplById: false,
        nplById: {},
        errors: {
          ...state.errors,
          getNplById: actions.error,
        },
      };

    case TypeActions.CREATE_NPL_REQUEST:
      return {
        ...state,
        isCreateNpl: true,
        errors: {
          ...state.errors,
          createNpl: "",
        },
      };
    case TypeActions.CREATE_NPL_SUCCESS:
      return {
        ...state,
        isCreateNpl: false,
        errors: {
          ...state.errors,
          createNpl: "",
        },
      };
    case TypeActions.CREATE_NPL_FAILED:
      return {
        ...state,
        isCreateNpl: false,
        errors: {
          ...state.errors,
          createNpl: actions.error,
        },
      };

    case TypeActions.UPDATE_NPL_REQUEST:
      return {
        ...state,
        isUpdateNpl: true,
        errors: {
          ...state.errors,
          updateNpl: "",
        },
      };
    case TypeActions.UPDATE_NPL_SUCCESS:
      return {
        ...state,
        isUpdateNpl: false,
        errors: {
          ...state.errors,
          updateNpl: "",
        },
      };
    case TypeActions.UPDATE_NPL_FAILED:
      return {
        ...state,
        isUpdateNpl: false,
        errors: {
          ...state.errors,
          updateNpl: actions.error,
        },
      };

    case TypeActions.DELETE_NPL_REQUEST:
      return {
        ...state,
        isDeleteNpl: true,
        errors: {
          ...state.errors,
          deleteNpl: "",
        },
      };
    case TypeActions.DELETE_NPL_SUCCESS:
      return {
        ...state,
        isDeleteNpl: false,
        errors: {
          ...state.errors,
          deleteNpl: "",
        },
      };
    case TypeActions.DELETE_NPL_FAILED:
      return {
        ...state,
        isDeleteNpl: false,
        errors: {
          ...state.errors,
          deleteNpl: actions.error,
        },
      };

    // npl groups
    case TypeActions.GET_NPL_GROUPS_REQUEST:
      return {
        ...state,
        isGetNplGroups: true,
        nplGroups: { results: [] },
        errors: {
          ...state.errors,
          isGetNplGroups: "",
        },
      };
    case TypeActions.GET_NPL_GROUPS_SUCCESS:
      return {
        ...state,
        nplGroups: actions.data || { results: [] },
        isGetNplGroups: false,
        errors: {
          ...state.errors,
          getNplGroup: "",
        },
      };
    case TypeActions.GET_NPL_GROUPS_FAILED:
      return {
        ...state,
        isGetNplGroups: false,
        nplGroups: { results: [] },
        errors: {
          ...state.errors,
          getNplGroup: actions.error,
        },
      };

    case TypeActions.GET_NPL_GROUP_BY_ID_REQUEST:
      return {
        ...state,
        isGetNplGroupById: true,
        nplById: {},
        errors: {
          ...state.errors,
          getNplGroupById: "",
        },
      };
    case TypeActions.GET_NPL_GROUP_BY_ID_SUCCESS:
      return {
        ...state,
        nplById: actions.data || {},
        isGetNplGroupById: false,
        errors: {
          ...state.errors,
          getNplGroupById: "",
        },
      };
    case TypeActions.GET_NPL_GROUP_BY_ID_FAILED:
      return {
        ...state,
        isGetNplGroupById: false,
        nplById: {},
        errors: {
          ...state.errors,
          getNplGroupById: actions.error,
        },
      };

    case TypeActions.CREATE_NPL_GROUP_REQUEST:
      return {
        ...state,
        isCreateNplGroup: true,
        errors: {
          ...state.errors,
          createNplGroup: "",
        },
      };
    case TypeActions.CREATE_NPL_GROUP_SUCCESS:
      return {
        ...state,
        isCreateNplGroup: false,
        errors: {
          ...state.errors,
          createNplGroup: "",
        },
      };
    case TypeActions.CREATE_NPL_GROUP_FAILED:
      return {
        ...state,
        isCreateNplGroup: false,
        errors: {
          ...state.errors,
          createNplGroup: actions.error,
        },
      };

    case TypeActions.UPDATE_NPL_GROUP_REQUEST:
      return {
        ...state,
        isUpdateNplGroup: true,
        errors: {
          ...state.errors,
          updateNplGroup: "",
        },
      };
    case TypeActions.UPDATE_NPL_GROUP_SUCCESS:
      return {
        ...state,
        isUpdateNplGroup: false,
        errors: {
          ...state.errors,
          updateNplGroup: "",
        },
      };
    case TypeActions.UPDATE_NPL_GROUP_FAILED:
      return {
        ...state,
        isUpdateNplGroup: false,
        errors: {
          ...state.errors,
          updateNplGroup: actions.error,
        },
      };

    case TypeActions.DELETE_NPL_GROUP_REQUEST:
      return {
        ...state,
        isDeleteNplGroup: true,
        errors: {
          ...state.errors,
          deleteNplGroup: "",
        },
      };
    case TypeActions.DELETE_NPL_GROUP_SUCCESS:
      return {
        ...state,
        isDeleteNplGroup: false,
        errors: {
          ...state.errors,
          deleteNplGroup: "",
        },
      };
    case TypeActions.DELETE_NPL_GROUP_FAILED:
      return {
        ...state,
        isDeleteNplGroup: false,
        errors: {
          ...state.errors,
          deleteNplGroup: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default nplReducer;
