import { type PayloadAction } from "@reduxjs/toolkit";
import { setUserAvatar, type IUserOktaData, requestError, getAvatar } from "../slice/CommonSlice";
import { put, takeLatest } from "redux-saga/effects";
import { type AxiosResponse } from "axios";
import apiClient from "../../config/axios";
import { envConfig } from "../../config";

const avatarData: Record<string, string> = {};

function* fetchAvatar(action: PayloadAction<IUserOktaData>) {
  const { email } = action.payload;
  if (email && avatarData[email]) {
    yield put(setUserAvatar(avatarData[email]));
  }
  try {
    const response: AxiosResponse<string> = yield apiClient.get(`${envConfig.avatarEndPoint}?emailId=${email}`);
    if (response.data) {
      if (email) {
        avatarData[email] = response.data;
      }
      yield put(setUserAvatar(response.data));
    }
  } catch (error: any) {
    yield put(requestError(error.response));
  }
}
export default function* commonSaga() {
  yield takeLatest(getAvatar.type, fetchAvatar);
}
