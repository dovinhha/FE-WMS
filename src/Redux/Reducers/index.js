import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import roleReducer from "./roleReducer";
import customerReducer from "./customerReducer";
import producerReducer from "./producerReducer";
import nplReducer from "./nplReducer";
import orderReducer from "./orderReducer";
import productTypesReducer from "./productTypesReducer";
import productReducer from "./productReducer";
import measurementStandardsReducer from "./measurementStandardsReducer";
import orderPlanReducer from "./orderPlanReducer";
import provincesReducer from "./provincesReducer";
import measureSizeReducer from "./measureSizeReducer";
import unitReducer from "./unitReducer";
import materialNormReducer from "./materialNormReducer";
import nplOrderReducer from "./nplOrderReducer";
const rootReducers = combineReducers({
  accountReducer,
  roleReducer,
  customerReducer,
  producerReducer,
  nplReducer,
  orderReducer,
  productTypesReducer,
  productReducer,
  measurementStandardsReducer,
  orderPlanReducer,
  provincesReducer,
  measureSizeReducer,
  unitReducer,
  materialNormReducer,
  nplOrderReducer,
});
export default rootReducers;
