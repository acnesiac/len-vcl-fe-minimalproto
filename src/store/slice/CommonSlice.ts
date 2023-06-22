import { type PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";

export interface IUserOktaData {
  name?: string;
  email?: string;
  avatarurl?: string;
  groups?: string[];
  division: string[];
  region: string[];
}
const userOktaDetail: IUserOktaData = {
  name: "",
  email: "",
  avatarurl: "",
  groups: [],
  division: [],
  region: [],
};
export interface IInitialState {
  userOktaData: IUserOktaData;
  error: string;
  isUserDataloading: boolean;
  hasAvatar: boolean;
  avatar: string;
}
export const setPostuserLoginData = createAction("vc/setPostuserLoginData", (data: IUserOktaData) => {
  return {
    payload: {
      data,
    },
  };
});
export const setUserAvatar = createAction("vc/setUserAvatar", (response: string) => {
  return {
    payload: {
      response,
    },
  };
});

const initialState: IInitialState = {
  userOktaData: userOktaDetail,
  error: "",
  isUserDataloading: false,
  avatar: "",
  hasAvatar: false,
};
const globalDataSlice = createSlice({
  name: "globalDataSlice",
  initialState,
  reducers: {
    getUserData(state: IInitialState) {
      state.isUserDataloading = true;
    },
    getAvatar(state: IInitialState, action: PayloadAction<IUserOktaData>) {
      state.hasAvatar = false;
    },
    requestError(state: IInitialState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setPostuserLoginData, (state, action) => {
        state.isUserDataloading = false;
        state.userOktaData = action.payload.data;
      })
      .addCase(setUserAvatar, (state, action) => {
        state.hasAvatar = true;
        state.avatar = action.payload.response;
      });
  },
});

export const { getUserData, getAvatar, requestError } = globalDataSlice.actions;
export default globalDataSlice.reducer;
