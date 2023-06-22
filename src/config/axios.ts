import axios, { type AxiosInstance } from "axios";
import { envConfig } from ".";

const instance: AxiosInstance = axios.create({
  baseURL: envConfig.avatarBaseUrl,
  headers: {
    "content-type": "application/json",
  },
});
// "ocp-apim-subscription-key": envConfig.ocp_apim_subscription_key
export default instance;
