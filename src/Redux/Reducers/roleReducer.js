import TypeActions from "../TypeActions";

const initialState = {
  roles: {
    results: [],
  },
  roleById: {},
  rolePermission: { results: [] },
  isGetRoles: false,
  isGetRoleById: false,
  isCreateRole: false,
  isUpdateRole: false,
  isDeleteRole: false,
  isGetRolePermission: false,
  errors: {
    getRoles: "",
    getRoleById: "",
    createRole: "",
    updateRole: "",
    deleteRole: "",
    getRolePermission: "",
  },
};

export const roleReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_ROLES_REQUEST:
      return {
        ...state,
        isGetRoles: true,
        roles: { results: [] },
        errors: {
          ...state.errors,
          isGetRoles: "",
        },
      };
    case TypeActions.GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: actions.data || { results: [] },
        isGetRoles: false,
        errors: {
          ...state.errors,
          getRoles: "",
        },
      };
    case TypeActions.GET_ROLES_FAILED:
      return {
        ...state,
        isGetRoles: false,
        roles: { results: [] },
        errors: {
          ...state.errors,
          getRoles: actions.error,
        },
      };

    case TypeActions.GET_ROLE_BY_ID_REQUEST:
      return {
        ...state,
        isGetRoleById: true,
        roleById: {},
        errors: {
          ...state.errors,
          getRoleById: "",
        },
      };
    case TypeActions.GET_ROLE_BY_ID_SUCCESS:
      return {
        ...state,
        roleById: actions.data || {},
        isGetRoleById: false,
        errors: {
          ...state.errors,
          getRoleById: "",
        },
      };
    case TypeActions.GET_ROLE_BY_ID_FAILED:
      return {
        ...state,
        isGetRoleById: false,
        roleById: {},
        errors: {
          ...state.errors,
          getRoleById: actions.error,
        },
      };

    case TypeActions.CREATE_ROLE_REQUEST:
      return {
        ...state,
        isCreateRole: true,
        errors: {
          ...state.errors,
          createRole: "",
        },
      };
    case TypeActions.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        isCreateRole: false,
        errors: {
          ...state.errors,
          createRole: "",
        },
      };
    case TypeActions.CREATE_ROLE_FAILED:
      return {
        ...state,
        isCreateRole: false,
        errors: {
          ...state.errors,
          createRole: actions.error,
        },
      };

    case TypeActions.UPDATE_ROLE_REQUEST:
      return {
        ...state,
        isUpdateRole: true,
        errors: {
          ...state.errors,
          updateRole: "",
        },
      };
    case TypeActions.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        isUpdateRole: false,
        errors: {
          ...state.errors,
          updateRole: "",
        },
      };
    case TypeActions.UPDATE_ROLE_FAILED:
      return {
        ...state,
        isUpdateRole: false,
        errors: {
          ...state.errors,
          updateRole: actions.error,
        },
      };

    case TypeActions.DELETE_ROLE_REQUEST:
      return {
        ...state,
        isDeleteRole: true,
        errors: {
          ...state.errors,
          deleteRole: "",
        },
      };
    case TypeActions.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        isDeleteRole: false,
        errors: {
          ...state.errors,
          deleteRole: "",
        },
      };
    case TypeActions.DELETE_ROLE_FAILED:
      return {
        ...state,
        isDeleteRole: false,
        errors: {
          ...state.errors,
          deleteRole: actions.error,
        },
      };

    case TypeActions.GET_ROLE_PERMISSION_REQUEST:
      return {
        ...state,
        rolePermission: { results: [] },
        isGetRolePermission: true,
        errors: {
          ...state.errors,
          getRolePermission: actions.error,
        },
      };
    case TypeActions.GET_ROLE_PERMISSION_SUCCESS:
      return {
        ...state,
        rolePermission: actions.data || { results: [] },
        isGetRolePermission: false,
        errors: {
          ...state.errors,
          getRolePermission: actions.error,
        },
      };
    case TypeActions.GET_ROLE_PERMISSION_FAILED:
      return {
        ...state,
        rolePermission: { results: [] },
        isGetRolePermission: false,
        errors: {
          ...state.errors,
          getRolePermission: actions.error,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default roleReducer;
