import axios from "axios";
import { call, put, select, takeEvery, type CallEffect, type PutEffect, type SelectEffect } from "redux-saga/effects";
import { type RootState } from "..";
import { envConfig } from "../../config";
import { fetchData, fetchDataFailure, fetchDataSuccess } from "./uploadDataStateSlice";

interface IFetchDataSuccessAction {
  type: string;
  payload: any;
}
interface IFetchDataFailureAction {
  type: string;
  payload: any;
}

type FtechDataSagaEffect =
  | SelectEffect
  | CallEffect
  | PutEffect<IFetchDataSuccessAction>
  | PutEffect<IFetchDataFailureAction>;
function* fetchDataSaga(): Generator<FtechDataSagaEffect> {
  const communityId: any = yield select((state: RootState) => state.community.CommunityID);
  try {
    const segment = `${envConfig.apiSuffixBff}/document/vcSummary/${communityId}`;
    const url = `${envConfig.apiBaseURL}${segment}`;

    const response: any = yield call(axios.get, url);
    yield put(fetchDataSuccess(response.data));
  } catch (error: any) {
    console.log(error, "error");
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchData() {
  yield takeEvery(fetchData.type, fetchDataSaga);
}
