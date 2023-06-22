import { all } from "redux-saga/effects";
import { watchFetchData } from "./slice/uploadDataSaga";
import commonSaga from "./saga/CommonSaga";

export default function* rootSaga() {
  yield all([watchFetchData(), commonSaga()]);
}
