import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAppState {
  appState: string;
}

const initialState: IAppState = {
  appState: "",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state: { appState: any }, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appStateSlice.actions;

export default appStateSlice.reducer;
