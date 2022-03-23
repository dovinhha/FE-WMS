import TypeActions from "Redux/TypeActions";

export const getProvinces = (params, callback) => {
	return {
		type: TypeActions.GET_PROVINCES_REQUEST,
		params,
		callback,
	};
};
export const getProvinceById = (id, params, callback) => {
	return {
		type: TypeActions.GET_PROVINCE_BY_ID_REQUEST,
		id,
		params,
		callback,
	};
};
