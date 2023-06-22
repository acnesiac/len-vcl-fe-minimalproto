import axios from "axios";
import { envConfig } from "../../config";

export interface IFinancialCommunitySummaryByParams {
  communityId?: string;
  foldAnnualStatsAfterYears?: number;
  version?: string | number;
  isPublished?: boolean;
}

export async function financialCommunitySummaryByApiAsync<T>(params: IFinancialCommunitySummaryByParams): Promise<T> {
  const suffix = envConfig.apiSuffixBff;
  const segment = `${suffix}/financial/community/summary`;
  const url = `${envConfig.apiBaseURL}${segment}`;
  const response = await axios.get<T>(url, { params });
  return response.data;
}
