import {
  type Action,
  AnyAction,
  createListenerMiddleware,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type AppStartListening, type RootState } from "..";
import { envConfig } from "../../config";
import { securitySessionStorage } from "../../utils/session-storage";

const STATE_KEY_COMMUNITY = "community";

export interface ICommunityState {
  CommunityID?: string;
  CommunityName?: string;
  Company?: string;
  DealID?: string;
  DealName?: string;
  DivisionID?: string;
  DivisionName?: string;
  Location?: string;
  Region?: string;
  TerritoryCode?: string;
}

const defaultState: ICommunityState = {
  CommunityID: envConfig.defaultCommunityId ?? "TC0001",
  CommunityName: "Wellborne Village",
  DealID: envConfig.defaultDealId ?? "DEAL0001",
  DealName: "Wellborne Village",
  DivisionID: "DFW",
  DivisionName: "Dallas-Fort Worth",
  Location: "Dallas-Fort Worth",
  TerritoryCode: "DFW",
};

// #region Listeners
export const communityListenerMiddleware = createListenerMiddleware();
const startListeningCommunity = communityListenerMiddleware.startListening as AppStartListening;

startListeningCommunity({
  predicate: (action: Action<string>) => {
    const validContext = action.type.indexOf(STATE_KEY_COMMUNITY) === 0;
    return validContext;
  },
  effect: (_, listenerApi) => {
    const currentState: ICommunityState = listenerApi.getState().community;
    securitySessionStorage.setItemJson(STATE_KEY_COMMUNITY, currentState);
  },
});
// #endregion

// Restore saved state from storage
const initialState = Object.assign({}, defaultState, securitySessionStorage.getItemJson(STATE_KEY_COMMUNITY));

export const communitySlice = createSlice({
  name: STATE_KEY_COMMUNITY,
  initialState,
  reducers: {
    clearDeal: state => {
      state.DealID = undefined;
      state.DealName = undefined;
    },
    clearDivision: state => {
      state.DivisionID = undefined;
      state.DivisionName = undefined;
    },
    clearLocation: state => {
      state.Location = undefined;
    },
    clearRegion: state => {
      state.Region = undefined;
    },
    updateCommunityState: (state, action: PayloadAction<ICommunityState>) => {
      Object.assign(state, action.payload || {});
    },
    updateCommunity: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload || {};
      state.CommunityID = id;
      state.CommunityName = name;
    },
    updateDeal: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload || {};
      state.DealID = id;
      state.DealName = name;
    },
    updateDivision: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload || {};
      state.DivisionID = id;
      state.DivisionName = name;
    },
    updateLocation: (state, action: PayloadAction<string>) => {
      state.Location = action.payload;
    },
    updateRegion: (state, action: PayloadAction<string>) => {
      state.Region = action.payload;
    },
    updateTerritoryCode: (state, action: PayloadAction<string>) => {
      state.TerritoryCode = action.payload;
    },
  },
});

export const {
  updateCommunity,
  updateCommunityState,
  updateDeal,
  updateDivision,
  updateLocation,
  updateRegion,
  updateTerritoryCode,
} = communitySlice.actions;

// #region Selectors
export const selectCommunity = (state: RootState) => state.community;
export const selectCommunityID = createSelector([selectCommunity], community => community?.CommunityID);
export const selectDealID = createSelector([selectCommunity], community => community?.DealID);
// #endregion

export default communitySlice.reducer;
