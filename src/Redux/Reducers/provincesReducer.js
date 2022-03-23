import TypeActions from "../TypeActions";

const initialState = {
	provinces: {
		results: [],
	},
	provinceById: {},
	isGetProvinces: false,
	isGetProvinceById: false,
	errors: {
		getProvinces: "",
		getProvinceById: "",
	},
};

export const provincesReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_PROVINCES_REQUEST:
			return {
				...state,
				isGetProvinces: true,
				provinces: { results: [] },
				errors: {
					...state.errors,
					getProvinces: "",
				},
			};
		case TypeActions.GET_PROVINCES_SUCCESS:
			return {
				...state,
				isGetProvinces: false,
				provinces: actions.data || { results: [] },
				errors: {
					...state.errors,
					getProvinces: "",
				},
			};
		case TypeActions.GET_PROVINCES_FAILED:
			return {
				...state,
				isGetProvinces: true,
				provinces: { results: [] },
				errors: {
					...state.errors,
					getProvinces: actions.error,
				},
			};
		case TypeActions.GET_PROVINCES_REQUEST:
			return {
				...state,
				provinceById: {},
				isGetProvinceById: true,
				errors: {
					...state.errors,
					getProvinceById: "",
				},
			};
		case TypeActions.GET_PROVINCES_SUCCESS:
			return {
				...state,
				provinceById: actions.data || {},
				isGetProvinceById: false,
				errors: {
					...state.errors,
					getProvinceById: "",
				},
			};
		case TypeActions.GET_PROVINCES_FAILED:
			return {
				...state,
				provinceById: {},
				isGetProvinceById: false,
				errors: {
					...state.errors,
					getProvinceById: actions.error,
				},
			};
		default:
			return { ...state };
	}
};

export default provincesReducer;
