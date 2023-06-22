import { configureStore, type TypedStartListening } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { appRtkQueryApi } from "./rtk-query-api";
import { communityListenerMiddleware } from "./slice/community-slice";
import { documentsListenerMiddleware } from "./slice/documents-slice";
import { notificationsListenerMiddleware } from "./slice/notifications-slice";
import { summaryListenerMiddleware } from "./slice/summary-slice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      communityListenerMiddleware.middleware,
      documentsListenerMiddleware.middleware,
      notificationsListenerMiddleware.middleware,
      sagaMiddleware,
      summaryListenerMiddleware.middleware,
      appRtkQueryApi.middleware,
    );
  },
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const appState = (): RootState => store.getState();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
