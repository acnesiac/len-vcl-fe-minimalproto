import { ThemeProvider } from "@mui/material";
import { toRelativeUrl, type OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { SnackbarToastsProvider } from "./components/Common/toasts/SnackbarToastsProvider";
import { envConfig } from "./config";
import { oktaConfig } from "./config/oktaConfig";
import { AppRoutes } from "./routes/appRoutes";
import { theme } from "./styles/theme";

export const App: React.FC = () => {
  /**
   * Authentication with OKTA implements here
   */
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <ThemeProvider theme={theme}>
      <SnackbarToastsProvider />
      {envConfig.oktaAuth ? (
        <Security oktaAuth={oktaConfig} restoreOriginalUri={restoreOriginalUri}>
          <AppRoutes />
        </Security>
      ) : (
        <AppRoutes />
      )}
    </ThemeProvider>
  );
};

export default App;
