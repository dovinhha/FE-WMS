import TypeActions from "../TypeActions";

export const getNpls = (params, callback) => {
  return {
    type: TypeActions.GET_NPLS_REQUEST,
    params,
    callback,
  };
};

export const getNplById = (params, callback) => {
  return {
    type: TypeActions.GET_NPL_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createNpl = (body, callback) => {
  return {
    type: TypeActions.CREATE_NPL_REQUEST,
    body,
    callback,
  };
};
export const updateNpl = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_NPL_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteNpl = (params, callback) => {
  return {
    type: TypeActions.DELETE_NPL_REQUEST,
    params,
    callback,
  };
};

export const getNplGroups = (params, callback) => {
  return {
    type: TypeActions.GET_NPL_GROUPS_REQUEST,
    params,
    callback,
  };
};

export const getNplGroupById = (params, callback) => {
  return {
    type: TypeActions.GET_NPL_GROUP_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createNplGroup = (body, callback) => {
  return {
    type: TypeActions.CREATE_NPL_GROUP_REQUEST,
    body,
    callback,
  };
};
export const updateNplGroup = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_NPL_GROUP_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteNplGroup = (params, callback) => {
  return {
    type: TypeActions.DELETE_NPL_GROUP_REQUEST,
    params,
    callback,
  };
};

export default {
  getNpls,
  createNpl,
  updateNpl,
  deleteNpl,
  getNplById,
  getNplGroups,
  getNplGroupById,
  createNplGroup,
  updateNplGroup,
  deleteNplGroup,
};
