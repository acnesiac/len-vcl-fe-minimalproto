import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IDataState {
  UploadHistory: any;
  loading: boolean;
  error: string | null;
}

const initialState: IDataState = {
  UploadHistory: {},
  loading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchData: state => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<any[]>) => {
      state.UploadHistory = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchData, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;
export default dataSlice.reducer;
