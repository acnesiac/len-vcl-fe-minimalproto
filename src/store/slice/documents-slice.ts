import {
  type Action,
  createAsyncThunk,
  createListenerMiddleware,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type AppStartListening, type RootState } from "..";
import { documentUploadApiAsync } from "../../api/document/document-upload.api";
import { type DocumentUploadOkDto } from "../../api/document/dto/document-upload-ok.dto";
import { type DocumentUploadDto } from "../../api/document/dto/document-upload.dto";
import { type RecordTrackingStatus } from "../../models/tracking-status";
import { showToast } from "../../services/alert.service";
import { securitySessionStorage } from "../../utils/session-storage";
import { sseEventsAsync } from "./notifications-slice";

const STATE_KEY_DOCUMENTS = "documents";

export interface IDocumentsState {
  uploaded: RecordTrackingStatus<
    DocumentUploadOkDto,
    {
      fileName?: string;
      fileSize?: number;
      CommunityID?: string;
    }
  >;
}

const defaultState: IDocumentsState = {
  uploaded: {},
};

export interface IDocumentUploadPayload extends DocumentUploadDto {
  key: string;
  file: File;
}

// #region Thunks
export const documentUploadAsync = createAsyncThunk(
  "documents/upload",
  async ({ key, file, email, ...data }: IDocumentUploadPayload): Promise<DocumentUploadOkDto> => {
    return await documentUploadApiAsync(data, file, email);
  },
);
// #endregion

// #region Listeners
export const documentsListenerMiddleware = createListenerMiddleware();
const startListeningDocuments = documentsListenerMiddleware.startListening as AppStartListening;

startListeningDocuments({
  type: documentUploadAsync.fulfilled.type,
  effect: async (action, listenerApi) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const { meta, payload }: { meta: { arg: IDocumentUploadPayload }; payload: DocumentUploadOkDto } = action as any;
    const fileName = meta.arg.file.name;

    showToast("success", `${fileName} uploaded successfully!`);
    const key = payload.BlobId;
    if (!key) return;

    listenerApi.dispatch(
      sseEventsAsync({
        key,
        fileName,
        subscriberId: key,
      }),
    );
  },
});

startListeningDocuments({
  predicate: (action: Action<string>) => {
    const validContext = action.type.indexOf(STATE_KEY_DOCUMENTS) === 0;
    return validContext;
  },
  effect: (_, listenerApi) => {
    const currentState: IDocumentsState = listenerApi.getState().documents;
    securitySessionStorage.setItemJson(STATE_KEY_DOCUMENTS, currentState);
  },
});
// #endregion

// Restore saved state from storage
const initialState = Object.assign({}, defaultState, securitySessionStorage.getItemJson(STATE_KEY_DOCUMENTS));

export const documentsStateSlice = createSlice({
  name: STATE_KEY_DOCUMENTS,
  initialState,
  reducers: {
    clearUploaded: state => {
      state.uploaded = {};
    },
    removeUploaded: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const current = state.uploaded[key];
      /* eslint-disable @typescript-eslint/no-dynamic-delete */
      if (current) delete state.uploaded[key];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(documentUploadAsync.pending, (state, action) => {
        const { key, file, CommunityID } = action.meta.arg;
        state.uploaded[key] = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          CommunityID,
        };
      })
      .addCase(documentUploadAsync.fulfilled, (state, action) => {
        const key = action.meta.arg.key;
        const current = state.uploaded[key];
        state.uploaded[key] = {
          ...current,
          loading: false,
          data: action.payload,
          success: true,
        };
      })
      .addCase(documentUploadAsync.rejected, (state, action) => {
        const key = action.meta.arg.key;
        const current = state.uploaded[key];
        state.uploaded[key] = {
          ...current,
          loading: false,
          error: action.error,
          success: false,
        };
      });
  },
});
export const { clearUploaded, removeUploaded } = documentsStateSlice.actions;

// #region Selectors
const selectKey = (_: RootState, key: string) => key;
const selectId = (_: RootState, id: string | undefined) => id;

export const selectDocumentsUploaded = (state: RootState) => state.documents.uploaded;
export const selectDocumentUploadedByKey = createSelector(
  [selectDocumentsUploaded, selectKey],
  (uploaded, key) => uploaded[key] || {},
);
export const selectDocumentUploadedLastKey = createSelector(
  [selectDocumentsUploaded, selectId],
  (uploaded, communityId): string | null => {
    const keys = Object.keys(uploaded);
    const key = keys[keys.length - 1];
    const value = uploaded[key];
    if (value && communityId && value.CommunityID === communityId) return key;
    return null;
  },
);
export const selectDocumentUploadedLastFile = createSelector(
  [selectDocumentsUploaded, selectDocumentUploadedLastKey],
  (uploaded, lastKey): { name: string; size: number } | null => {
    if (!lastKey) return null;
    const data = uploaded[lastKey];
    if (!data) return null;
    const { fileName: name, fileSize: size } = data;
    if (!name || !size) return null;
    return { name, size };
  },
);
export const selectDocumentUploadedBlobIdByKey = createSelector(
  [selectDocumentUploadedByKey],
  uploaded => uploaded?.data?.BlobId ?? "",
);
// #endregion

export default documentsStateSlice.reducer;
