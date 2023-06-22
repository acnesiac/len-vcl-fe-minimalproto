/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type VcRegionDivision, type VcDealCommunity } from "@len-schemas/len-vestacalc-schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../config";

export const appRtkQueryApi = createApi({
  reducerPath: "cache",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.apiBaseURL,
  }),
  endpoints: builder => ({
    getDealCommunities: builder.query<VcDealCommunity[], void>({
      query: () => `${envConfig.apiSuffixBff}/deal-communites`,
    }),
    getDealCommunitiesById: builder.query<VcDealCommunity, string>({
      query: (id: string) => `${envConfig.apiSuffixBff}/deal-communites/${id}`,
    }),
    getDealCommunitiesConsolidated: builder.query<any[], { divisionId?: string }>({
      query: params => ({
        url: `${envConfig.apiSuffixBff}/deal-communites/consolidated`,
        params,
      }),
    }),
    getCommunitiesDeal: builder.query<any[], { divisionId?: string }>({
      query: params => ({
        url: `${envConfig.apiSuffixBff}/deal-communites/communityDeal`,
        params,
      }),
    }),
    getDealCommunitiesConsolidatedSummary: builder.query<any, { dealId?: string; version?: number }>({
      query: params => ({
        url: `${envConfig.apiSuffixBff}/deal-communites/consolidated/summary`,
        params,
      }),
    }),
    getRegions: builder.query<VcRegionDivision[], void>({
      query: () => `${envConfig.apiSuffixBff}/regions`,
    }),
  }),
});

export const {
  useGetDealCommunitiesByIdQuery,
  useGetDealCommunitiesQuery,
  useGetDealCommunitiesConsolidatedQuery,
  useGetDealCommunitiesConsolidatedSummaryQuery,
  useGetCommunitiesDealQuery,
  useGetRegionsQuery,
  useLazyGetRegionsQuery,
} = appRtkQueryApi;
