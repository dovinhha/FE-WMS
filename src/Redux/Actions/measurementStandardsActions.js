import TypeActions from "../TypeActions";

export const getMeasurementStandards = (params, callback) => {
	return {
		type: TypeActions.GET_MEASUREMENT_STANDARDS_REQUEST,
		params,
		callback,
	};
};
export const getMeasurementStandardsById = (params, callback) => {
	return {
		type: TypeActions.GET_MEASUREMENT_STANDARD_BY_ID_REQUEST,
		params,
		callback,
	};
};

export const createMeasurementStandard = (body, callback) => {
	return {
		type: TypeActions.CREATE_MEASUREMENT_STANDARD_REQUEST,
		body,
		callback,
	};
};
export const updateMeasurementStandard = (body, params, callback) => {
	return {
		type: TypeActions.UPDATE_MEASUREMENT_STANDARD_REQUEST,
		body,
		params,
		callback,
	};
};
export const deleteMeasurementStandard = (params, callback) => {
	return {
		type: TypeActions.DELETE_MEASUREMENT_STANDARD_REQUEST,
		params,
		callback,
	};
};

export default {
	getMeasurementStandards,
	createMeasurementStandard,
	updateMeasurementStandard,
	deleteMeasurementStandard,
	getMeasurementStandardsById,
};
