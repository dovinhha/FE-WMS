import TypeActions from "../TypeActions";

export const getRoles = (query, callback) => {
  return {
    type: TypeActions.GET_ROLES_REQUEST,
    query,
    callback,
  };
};
export const getRoleById = (params, callback) => {
  return {
    type: TypeActions.GET_ROLE_BY_ID_REQUEST,
    params,
    callback,
  };
};
export const getRolePermission = (callback) => {
  return {
    type: TypeActions.GET_ROLE_PERMISSION_REQUEST,
    callback,
  };
};
export const createRole = (body, callback) => {
  return {
    type: TypeActions.CREATE_ROLE_REQUEST,
    body,
    callback,
  };
};
export const updateRole = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_ROLE_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteRole = (params, callback) => {
  return {
    type: TypeActions.DELETE_ROLE_REQUEST,
    params,
    callback,
  };
};

export default {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRolePermission,
  getRoleById,
};
