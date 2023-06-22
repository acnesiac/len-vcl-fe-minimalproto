import { OktaAuth } from "@okta/okta-auth-js";
import { envConfig } from ".";

export const oktaConfig = new OktaAuth({
  clientId: envConfig.oktaClientId,
  issuer: envConfig.oktaOrgUrl,
  redirectUri: `${window.location.origin}/login/callback`,
  logoutUrl: window.location.origin,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  storageManager: {
    token: {
      storageTypes: ["sessionStorage"],
    },
  },
});
