import TypeActions from "../TypeActions";

export const getOrders = (params, callback) => {
	return {
		type: TypeActions.GET_ORDERS_REQUEST,
		params,
		callback,
	};
};
export const getOrderById = (id, query, callback) => {
	return {
		type: TypeActions.GET_ORDER_BY_ID_REQUEST,
		id,
		query,
		callback,
	};
};

export const createOrder = (body, callback) => {
	return {
		type: TypeActions.CREATE_ORDER_REQUEST,
		body,
		callback,
	};
};
export const updateOrder = (body, params, callback) => {
	return {
		type: TypeActions.UPDATE_ORDER_REQUEST,
		body,
		params,
		callback,
	};
};
export const deleteOrder = (params, callback) => {
	return {
		type: TypeActions.DELETE_ORDER_REQUEST,
		params,
		callback,
	};
};

export const getCustomersInOrder = (query, callback) => {
	return {
		type: TypeActions.GET_CUSTOMERS_IN_ORDER_REQUEST,
		query,
		callback,
	};
};
export const getCustomerInOrder = (id, query, callback) => {
	return {
		type: TypeActions.GET_CUSTOMER_IN_ORDER_REQUEST,
		id,
		query,
		callback,
	};
};

export const uploadCustomerOrder = (file, params, callback) => {
	return {
		type: TypeActions.UPLOAD_CUSTOMER_ORDER_REQUEST,
		file,
		params,
		callback,
	};
};

export const convertMeasureSize = (body, params, callback) => {
	return {
		type: TypeActions.CONVERT_MEASURE_SIZE_REQUEST,
		body,
		params,
		callback,
	};
};

export const approveOrder = (body, params, callback) => {
	return {
		type: TypeActions.APPROVE_ORDER_REQUEST,
		body,
		params,
		callback,
	};
};
export const addSewMeasureSize = (body, params, callback) => {
	return {
		type: TypeActions.ADD_SEW_MEASURE_SIZE_REQUEST,
		body,
		params,
		callback,
	};
};
export const updateCustomerInOrder = (body, params, callback) => {
	return {
		type: TypeActions.UPDATE_CUSTOMER_IN_ORDER_REQUEST,
		body,
		params,
		callback,
	};
};
export const getOrdersConvert = (query, callback) => {
	return {
		type: TypeActions.GET_ORDERS_CONVERT_REQUEST,
		query,
		callback,
	};
};
export const approveAllCustomerInOrder = (body, params, callback) => {
	return {
		type: TypeActions.APPROVE_ALL_CUSTOMER_IN_ORDER_REQUEST,
		body,
		params,
		callback,
	};
};
export const approveManyCustomerInOrder = (body, params, callback) => {
	return {
		type: TypeActions.APPROVE_MANY_CUSTOMER_IN_ORDER_REQUEST,
		body,
		params,
		callback,
	};
};
export const getUnusualList = (params, callback) => {
	return {
		type: TypeActions.GET_UNUSUAL_LIST_REQUEST,
		params,
		callback,
	};
};
export const getAllProductInOrder = (id, query, callback) => {
	return {
		type: TypeActions.GET_ALL_PRODUCT_IN_ORDER_REQUEST,
		id,
		query,
		callback,
	};
};
export const checkUnusualSize = (body, params, callback) => {
	return {
		type: TypeActions.CHECK_UNUSUAL_SIZE_REQUEST,
		body,
		params,
		callback,
	};
};

export default {
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
	getOrderById,
	getCustomersInOrder,
	getCustomerInOrder,
	uploadCustomerOrder,
	approveOrder,
	convertMeasureSize,
	addSewMeasureSize,
	updateCustomerInOrder,
	getOrdersConvert,
	approveAllCustomerInOrder,
	approveManyCustomerInOrder,
	getUnusualList,
	getAllProductInOrder,
	checkUnusualSize,
};
