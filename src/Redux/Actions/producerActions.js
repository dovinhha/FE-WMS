import TypeActions from "../TypeActions";

export const getProducers = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCERS_REQUEST,
    params,
    callback,
  };
};
export const getProducerById = (params, callback) => {
  return {
    type: TypeActions.GET_PRODUCER_BY_ID_REQUEST,
    params,
    callback,
  };
};

export const createProducer = (body, callback) => {
  return {
    type: TypeActions.CREATE_PRODUCER_REQUEST,
    body,
    callback,
  };
};
export const updateProducer = (body, params, callback) => {
  return {
    type: TypeActions.UPDATE_PRODUCER_REQUEST,
    body,
    params,
    callback,
  };
};
export const deleteProducer = (params, callback) => {
  return {
    type: TypeActions.DELETE_PRODUCER_REQUEST,
    params,
    callback,
  };
};

export default {
  getProducers,
  createProducer,
  updateProducer,
  deleteProducer,
  getProducerById,
};
