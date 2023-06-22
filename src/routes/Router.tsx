// import React from "react";
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import VcCommunity from "../components/VcCommunity/view/VcCommunityView";
// import VcUploadDataView from "../components/VcCommunity/view/VcUploadDataView";
// import { LoginCallback, Security } from "@okta/okta-react";
// import type OktaAuth from "@okta/okta-auth-js";
// import { toRelativeUrl } from "@okta/okta-auth-js";
// import { oktaConfig } from "../config/oktaConfig";

// export const Router: React.FC = () => {
//   const navigate = useNavigate();

//   const restoreOriginalUri = async (
//     _oktaAuth: OktaAuth,
//     originalUri: string,
//   ) => {
//     navigate(toRelativeUrl(originalUri || "/", window.location.origin));
//   };
//   return (
//     <Security oktaAuth={oktaConfig} restoreOriginalUri={restoreOriginalUri}>
//       <Route path="/vcom/views" element={<VcCommunity />} />
//       <Route path="/vcom/upload_data" element={<VcUploadDataView />} />
//       <Route path="login/callback" element={<LoginCallback />} />
//     </Security>
//   );
// };
// export default Router;
