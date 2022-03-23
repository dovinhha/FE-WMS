// export default {
// 	ORDER_STATUS_INIT: 0,
// 	ORDER_STATUS_PROCESSING: 1,
// 	ORDER_STATUS_DONE: 2,
// 	ORDER_STATUS_CANCEL: 3,

// 	ORDER_PLAN_STATUS_CREATE: 0,
// 	ORDER_PLAN_STATUS_CONVERT: 1,
// 	ORDER_PLAN_STATUS_ADDITION: 2,

// 	CUSTOMER_IN_ORDER_TYPE_CONTRACT: 0,
// 	CUSTOMER_IN_ORDER_TYPE_CONVERT: 1,
// 	CUSTOMER_IN_ORDER_TYPE_ADDITION: 2,

// 	CUSTOMER_IN_ORDER_STATUS_INIT: 0,
// 	CUSTOMER_IN_ORDER_STATUS_PENDING_SEND: 1,
// 	CUSTOMER_IN_ORDER_STATUS_PENDING_ACCEPT: 2,
// 	CUSTOMER_IN_ORDER_STATUS_ACCEPT: 2,
// 	CUSTOMER_IN_ORDER_STATUS_REJECT: 3,

// 	CUSTOMER_IN_ORDER_SIZE_STATUS_INIT: 0,
// 	CUSTOMER_IN_ORDER_SIZE_STATUS_ABNORMAL: 1,
// 	CUSTOMER_IN_ORDER_SIZE_STATUS_SUCCESS: 2,
// 	CUSTOMER_IN_ORDER_SIZE_STATUS_OWN: 3,
// 	CUSTOMER_IN_ORDER_SIZE_STATUS_FAILED: 4,
// };

const GENDER = {
	Male: "Nam",
	Female: "Nữ",
};
const STATUS = {
	Init: "init",
	Active: "active",
	Lock: "lock",
	Delete: "delete",
};
const RoleName = {
	Admin: "admin",
	User: "user",
};
const CUSTOMER_ORGANIZATION_POPULATE = "childrentIds,parentId";
// Trạng thái kế hoạch đơn hàng
const ORDER_PLAN_STATUS = {
	Init: 0,
	PendingAcept: 1,
	Accept: 2,
	Reject: 3,
};
// Trạng thái đơn hàng
const ORDER_STATUS = {
	Init: 0,
	Processing: 1,
	Done: 2,
	Cancel: 3,
};
// Thể loại sản phảm của khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_TYPE = {
	Contract: 0, // hợp đồng
	Convert: 1, // chuyển đổi
	Addition: 2, // may thêm
};
// trạng  thái sản phẩm của khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_STATUS = {
	Init: 0, // khởi tạo - mặc định
	PendingToSennd: 1, // Chờ gửi duyệt
	PendingAcept: 2, // chờ duyệt
	Accept: 3, // chấp nhận
	Reject: 4, // từ chối
};
// các loại cập nhật sản phẩm khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_UPDATE_TYPE = {
	Import: 0,
	Convert: 1,
	AcceptConvert: 2,
	RejectConvert: 3,
	AcceptAddition: 4,
	RejectAddition: 5,
};
// Trạng thái xử lý size sản phẩm khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_SIZE_STATUS = {
	Init: 0, /// khởi tạo
	Abnormal: 1, // bất thường
	SuccessAssigned: 2, // đã quy size / gán size
	ownDesign: 3, // may riêng
	FailedAssigned: 4, // quy / gán size failed
};
export default {
	GENDER,
	STATUS,
	RoleName,
	CUSTOMER_ORGANIZATION_POPULATE,
	ORDER_PLAN_STATUS,
	ORDER_STATUS,
	CUSTOMER_IN_ORDER_TYPE,
	CUSTOMER_IN_ORDER_UPDATE_TYPE,
	CUSTOMER_IN_ORDER_STATUS,
	CUSTOMER_IN_ORDER_SIZE_STATUS,
};
