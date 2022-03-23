import TypeActions from "../TypeActions";

const initialState = {
  producers: {
    results: [],
  },
  producerById: {},
  isGetProducers: false,
  isGetProducerById: false,
  isCreateProducer: false,
  isUpdateProducer: false,
  isDeleteProducer: false,
  errors: {
    getProducer: "",
    getProducerById: "",
    createProducer: "",
    updateProducer: "",
    deleteProducer: "",
  },
};

export const producerReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_PRODUCERS_REQUEST:
      return {
        ...state,
        isGetProducers: true,
        producers: { results: [] },
        errors: {
          ...state.errors,
          isGetProducers: "",
        },
      };
    case TypeActions.GET_PRODUCERS_SUCCESS:
      return {
        ...state,
        producers: actions.data || { results: [] },
        isGetProducers: false,
        errors: {
          ...state.errors,
          getProducer: "",
        },
      };
    case TypeActions.GET_PRODUCERS_FAILED:
      return {
        ...state,
        isGetProducers: false,
        producers: { results: [] },
        errors: {
          ...state.errors,
          getProducer: actions.error,
        },
      };

    case TypeActions.GET_PRODUCER_BY_ID_REQUEST:
      return {
        ...state,
        isGetProducerById: true,
        producerById: {},
        errors: {
          ...state.errors,
          getProducerById: "",
        },
      };
    case TypeActions.GET_PRODUCER_BY_ID_SUCCESS:
      return {
        ...state,
        producerById: actions.data || {},
        isGetProducerById: false,
        errors: {
          ...state.errors,
          getProducerById: "",
        },
      };
    case TypeActions.GET_PRODUCER_BY_ID_FAILED:
      return {
        ...state,
        isGetProducerById: false,
        producerById: {},
        errors: {
          ...state.errors,
          getProducerById: actions.error,
        },
      };

    case TypeActions.CREATE_PRODUCER_REQUEST:
      return {
        ...state,
        isCreateProducer: true,
        errors: {
          ...state.errors,
          createProducer: "",
        },
      };
    case TypeActions.CREATE_PRODUCER_SUCCESS:
      return {
        ...state,
        isCreateProducer: false,
        errors: {
          ...state.errors,
          createProducer: "",
        },
      };
    case TypeActions.CREATE_PRODUCER_FAILED:
      return {
        ...state,
        isCreateProducer: false,
        errors: {
          ...state.errors,
          createProducer: actions.error,
        },
      };

    case TypeActions.UPDATE_PRODUCER_REQUEST:
      return {
        ...state,
        isUpdateProducer: true,
        errors: {
          ...state.errors,
          updateProducer: "",
        },
      };
    case TypeActions.UPDATE_PRODUCER_SUCCESS:
      return {
        ...state,
        isUpdateProducer: false,
        errors: {
          ...state.errors,
          updateProducer: "",
        },
      };
    case TypeActions.UPDATE_PRODUCER_FAILED:
      return {
        ...state,
        isUpdateProducer: false,
        errors: {
          ...state.errors,
          updateProducer: actions.error,
        },
      };

    case TypeActions.DELETE_PRODUCER_REQUEST:
      return {
        ...state,
        isDeleteProducer: true,
        errors: {
          ...state.errors,
          deleteProducer: "",
        },
      };
    case TypeActions.DELETE_PRODUCER_SUCCESS:
      return {
        ...state,
        isDeleteProducer: false,
        errors: {
          ...state.errors,
          deleteProducer: "",
        },
      };
    case TypeActions.DELETE_PRODUCER_FAILED:
      return {
        ...state,
        isDeleteProducer: false,
        errors: {
          ...state.errors,
          deleteProducer: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default producerReducer;
