import { all, fork } from "redux-saga/effects";

import accountSaga from "./accountSaga";
import roleSaga from "./roleSaga";
import customerSaga from "./customerSaga";
import producerSaga from "./producerSaga";
import nplSaga from "./nplSaga";
import orderSaga from "./orderSaga";
import productTypesSaga from "./productTypesSaga";
import productSaga from "./productSaga";
import measurementStandardsSaga from "./measurementStandardsSaga";
import orderPlanSaga from "./orderPlanSaga";
import provincesSaga from "./provincesSaga";
import measureSizeSaga from "./measureSizeSaga";
import unitSaga from "./unitSaga";
import materialNormSaga from "./materialNormSaga";
import nplOrderSaga from "./nplOrderSaga";
export function* rootSagas() {
  yield all([fork(accountSaga)]);
  yield all([fork(roleSaga)]);
  yield all([fork(customerSaga)]);
  yield all([fork(producerSaga)]);
  yield all([fork(nplSaga)]);
  yield all([fork(orderSaga)]);
  yield all([fork(productTypesSaga)]);
  yield all([fork(productSaga)]);
  yield all([fork(measurementStandardsSaga)]);
  yield all([fork(orderPlanSaga)]);
  yield all([fork(provincesSaga)]);
  yield all([fork(measureSizeSaga)]);
  yield all([fork(unitSaga)]);
  yield all([fork(materialNormSaga)]);
  yield all([fork(nplOrderSaga)]);
}
export default rootSagas;
