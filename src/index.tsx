import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LicenseInfo } from "@mui/x-license-pro";
import { envConfig } from "./config";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

/**
 * License for material UI
 */
LicenseInfo.setLicenseKey(envConfig.muiLicenceKey ?? "");
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  </React.StrictMode>,
);
