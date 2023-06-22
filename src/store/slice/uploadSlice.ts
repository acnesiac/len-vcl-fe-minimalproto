import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IUploadPageState {
  documentName: string;
}

const initialState: IUploadPageState = {
  documentName: "",
};

export const uploadSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    generateSummary: (state, action: PayloadAction<string>) => {
      state.documentName = action.payload;
    },
    uploadFile: (state, action: PayloadAction<string>) => {
      state.documentName = action.payload;
    },
  },
});
export default uploadSlice.reducer;
