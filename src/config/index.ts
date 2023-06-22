export interface IEnvConfig {
  apiBaseURL?: string;
  apiSuffixBff?: string;
  avatarBaseUrl?: string;
  avatarEndPoint?: string;
  cryptoPassphrase: string;
  defaultCommunityId?: string;
  defaultDealId?: string;
  env?: string;
  importMaxFileSize: number;
  logLevel?: string;
  muiLicenceKey?: string;
  oktaClientId?: string;
  oktaOrgUrl?: string;
  oktaAuth: boolean;
  pollingAttempts: number;
  pollingInterval: number;
  production: boolean;
  roleGroupMapping?: {
    /*
     * Will have to keep the role with max permissions on top,
     * followed by decreasing order of permissions in case
     * we define roles with overlapping permissions.
     * This is so that order of the menu remains same in all cases.
     */
    admin: string[];
    user: string[];
    reader: string[];
  };
  instrumentationKey?: string;
  ocp_apim_subscription_key?: string;
}

const importMaxFileSizeDefault = 5; // 5 MB
/**
 * Setting the environment config
 */
export const envConfig: IEnvConfig = {
  apiBaseURL: process.env.REACT_APP_API_BASE_URL ?? "",
  apiSuffixBff: process.env.REACT_APP_API_SUFFIX_BFF ?? "",
  cryptoPassphrase: process.env.REACT_APP_CRYPTO_PASSPHRASE ?? "",
  defaultCommunityId: process.env.REACT_APP_DEFAULT_COMMUNITY_ID,
  defaultDealId: process.env.REACT_APP_DEFAULT_DEAL_ID,
  env: process.env.REACT_APP_BASE_URL,
  importMaxFileSize: Number.parseFloat(process.env.REACT_APP_IMPORT_MAX_FILE_SIZE ?? "") || importMaxFileSizeDefault,
  logLevel: process.env.REACT_APP_LOG_LEVEL,
  // 0: false, 1: true
  oktaAuth: process.env.REACT_APP_OKTA_AUTH === "1",
  // default: 5 attempts
  pollingAttempts: Number.parseInt(process.env.REACT_APP_POLLING_ATTEMPTS ?? "", 10) || 5,
  // default: 20 seconds
  pollingInterval: Number.parseInt(process.env.REACT_APP_POLLING_INTERVAL ?? "", 10) || 20000,
  production: process.env.NODE_ENV === "production",
  roleGroupMapping: {
    /*
     * Will have to keep the role with max permissions on top,
     * followed by decreasing order of permissions in case
     * we define roles with overlapping permissions.
     * This is so that order of the menu remains same in all cases.
     */
    admin: ["VESTA_CAL_PLUS_ADMIN"],
    user: ["VESTA_CAL_PLUS_USER"],
    reader: ["VESTA_CAL_PLUS_READER"],
  },
  instrumentationKey: "instrumentation key here",
  ocp_apim_subscription_key: "Subscription keye here",
  muiLicenceKey: process.env.REACT_APP_MUI_LICENSE_KEY,
  avatarBaseUrl: process.env.REACT_APP_AVATAR_BASE_URL,
  avatarEndPoint: process.env.REACT_APP_AVATAR_END_POINT,
  oktaClientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  oktaOrgUrl: process.env.REACT_APP_OKTA_ORG_URL,
};
