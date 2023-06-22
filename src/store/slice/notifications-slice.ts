import { type Action, createAsyncThunk, createListenerMiddleware, createSelector, createSlice } from "@reduxjs/toolkit";
import { type SseMessageEventData } from "../../api/sse/models/sse-message-event-data";
import { sseEventsApiAsync } from "../../api/sse/sse-events.api";
import { showToast } from "../../services/alert.service";
import { type RecordTrackingStatus } from "../../models/tracking-status";
import { type AppStartListening, type RootState } from "..";
import { securitySessionStorage } from "../../utils/session-storage";

const STATE_KEY_NOTIFICATIONS = "notifications";

export interface INotificationsState {
  sseEventMessages: RecordTrackingStatus<SseMessageEventData, { fileName: string }>;
}

const defaultState: INotificationsState = {
  sseEventMessages: {},
};

export interface ISseEventsPayload {
  key: string;
  fileName: string;
  subscriberId: string;
}

// #region Thunks
export const sseEventsAsync = createAsyncThunk(
  "notifications/sse/events",
  async ({ subscriberId }: ISseEventsPayload): Promise<SseMessageEventData> => {
    return await sseEventsApiAsync(subscriberId);
  },
);
// #endregion

// #region Listeners
export const notificationsListenerMiddleware = createListenerMiddleware();
const startListeningNotifications = notificationsListenerMiddleware.startListening as AppStartListening;

startListeningNotifications({
  type: sseEventsAsync.fulfilled.type,
  effect: (action, listenerApi) => {
    const { meta, payload }: { meta: { arg: ISseEventsPayload }; payload: SseMessageEventData } = action as any;
    const message = `${meta.arg.fileName} ${payload.Message}`;
    showToast("success", message);
  },
});

startListeningNotifications({
  type: sseEventsAsync.rejected.type,
  effect: (action, listenerApi) => {
    const { meta }: { meta: { arg: ISseEventsPayload } } = action as any;
    const message = `Parsing no longer being tracked for document: ${meta.arg.fileName}`;
    showToast("warning", message);
  },
});

startListeningNotifications({
  predicate: (action: Action<string>) => {
    const validContext = action.type.indexOf(STATE_KEY_NOTIFICATIONS) === 0;
    return validContext;
  },
  effect: (_, listenerApi) => {
    const currentState: INotificationsState = listenerApi.getState().notifications;
    securitySessionStorage.setItemJson(STATE_KEY_NOTIFICATIONS, currentState);
  },
});
// #endregion

const initialState = Object.assign({}, defaultState, securitySessionStorage.getItemJson(STATE_KEY_NOTIFICATIONS));

export const notificationsStateSlice = createSlice({
  name: STATE_KEY_NOTIFICATIONS,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sseEventsAsync.pending, (state, action) => {
        const { key, fileName } = action.meta.arg;
        state.sseEventMessages[key] = {
          loading: true,
          fileName,
        };
      })
      .addCase(sseEventsAsync.fulfilled, (state, action) => {
        const { key, fileName } = action.meta.arg;
        state.sseEventMessages[key] = {
          loading: false,
          fileName,
          data: action.payload,
          success: true,
        };
      })
      .addCase(sseEventsAsync.rejected, (state, action) => {
        const { key, fileName } = action.meta.arg;
        state.sseEventMessages[key] = {
          loading: false,
          error: action.error,
          fileName,
          success: false,
        };
      });
  },
});

// #region Selectors
const selectKey = (_: RootState, key: string) => key;

export const selectNotifications = (state: RootState) => state.notifications;
export const selectSseEventMessages = createSelector(
  [selectNotifications],
  notifications => notifications.sseEventMessages,
);
export const selectSseEventMessageByKey = createSelector(
  [selectSseEventMessages, selectKey],
  (lookup, key) => lookup[key] || {},
);
// #endregion

export default notificationsStateSlice.reducer;
