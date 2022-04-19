export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const BASE_URL = "http://192.168.30.106:5000/api";

export const logIn = "auth/login";
export const logOut = "auth/logout";
export const forgotPassword = "auth/forgot-password";
export const resetPassword = "auth/reset-password";
export const accounts = "users";
export const changePassword = "change-password";
export const configPasswordAccount = "set-password";
export const roles = "roles";
export const customers = "customerOrganizations";
export const producers = "producers";
export const npls = "materials";
export const nplGroups = "materialTypes";
export const orders = "orders";
export const permissions = "permissions";
export const provinces = "provinces";
export const productTypes = "item-type";
export const product = "item";
export const standardSizes = "standardSizes";
export const productParameters = "productParameters";
export const orderPlans = "orderPlans";
export const customerInOrders = "customerInOrders";
export const measureSizes = "customerSizes";
export const units = "units";
export const materialNorms = "materialNorms";
export const getAllProductInOrder = "getAllProductInOrder";
export const materialSuggests = "materialSuggests";
export const itemUnit = "item-unit";
export const warehouse = "warehouse";
export default {
  BASE_URL,
  logIn,
  logOut,
  forgotPassword,
  resetPassword,
  accounts,
  changePassword,
  configPasswordAccount,
  roles,
  customers,
  producers,
  npls,
  nplGroups,
  orders,
  permissions,
  provinces,
  productTypes,
  product,
  standardSizes,
  productParameters,
  orderPlans,
  customerInOrders,
  measureSizes,
  units,
  materialNorms,
  getAllProductInOrder,
  materialSuggests,
  itemUnit,
  warehouse,
};
