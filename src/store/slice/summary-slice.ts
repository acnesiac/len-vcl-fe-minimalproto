import { type AnnualStatistic, type InvestmentOverview } from "@len-schemas/len-vestacalc-schema";
import { createAsyncThunk, createListenerMiddleware, createSelector, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "..";
import {
  financialCommunitySummaryByApiAsync,
  type IFinancialCommunitySummaryByParams,
} from "../../api/financial/financial-community-summary.api";
import { type ITrackingStatus } from "../../models/tracking-status";

export interface IFinnancialCommunitySummaryDto {
  AnnualStatistics: AnnualStatistic[];
  InvestmentOverview: InvestmentOverview;
}

export interface ISummaryState {
  financialCommunity: ITrackingStatus<IFinnancialCommunitySummaryDto | null>;
}

const initialState: ISummaryState = {
  financialCommunity: { data: null },
};

// #region Thunks
export const summaryFinnancialCommunityAsync = createAsyncThunk(
  "summary/finnancialCommunity",
  async (params: IFinancialCommunitySummaryByParams): Promise<IFinnancialCommunitySummaryDto> => {
    return await financialCommunitySummaryByApiAsync(params);
  },
);
// #endregion

// #region Listeners
export const summaryListenerMiddleware = createListenerMiddleware();
// #endregion

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    clearFinnancialCommunity: state => {
      state.financialCommunity = { data: null };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(summaryFinnancialCommunityAsync.pending, state => {
        state.financialCommunity = {
          loading: true,
        };
      })
      .addCase(summaryFinnancialCommunityAsync.fulfilled, (state, action) => {
        state.financialCommunity = {
          loading: false,
          data: action.payload,
          success: true,
        };
      })
      .addCase(summaryFinnancialCommunityAsync.rejected, (state, action) => {
        state.financialCommunity = {
          loading: false,
          error: action.error,
          success: false,
        };
      });
  },
});
export const { clearFinnancialCommunity } = summarySlice.actions;

// #region Selectors
export const selectSummary = (state: RootState) => state.summary;
export const selectSummaryFinnancialCommunity = createSelector([selectSummary], summary => summary.financialCommunity);
// #endregion

export default summarySlice.reducer;
