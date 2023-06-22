import { combineReducers } from "@reduxjs/toolkit";
import { appRtkQueryApi } from "./rtk-query-api";
import appStateSlice from "./saga/appStateSaga";
import communitySlice from "./slice/community-slice";
import documentsReducer from "./slice/documents-slice";
import notificationsReducer from "./slice/notifications-slice";
import summarySlice from "./slice/summary-slice";
import dataSlice from "./slice/uploadDataStateSlice";
import uploadSlice from "./slice/uploadSlice";
import globalDataSlice from "./slice/CommonSlice";

const rootReducer = combineReducers({
  appState: appStateSlice,
  community: communitySlice,
  documents: documentsReducer,
  notifications: notificationsReducer,
  summary: summarySlice,
  uploadData: dataSlice,
  uploadSlice,
  appGlobal: globalDataSlice,
  [appRtkQueryApi.reducerPath]: appRtkQueryApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
