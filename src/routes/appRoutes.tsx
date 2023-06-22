import { LoginCallback } from "@okta/okta-react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout/Layout/AppLayout";
import Home from "../components/Home/Home";
import { ConsolidatedDeal } from "../components/vc-consolidated-deal";
import { DetailSummary } from "../components/VcCommunity/summary/DetailSummary";
import ListVerified from "../components/VcCommunity/summary/ListVerified";
import Vcdashboard from "../components/VcCommunity/summary/Vcdashboard";
import UploadDcoument from "../components/VcCommunity/upload-document";

export const PATH_COMMUNITY = "/vcComm";
export const PATH_COMMUNITY_VIEW = "/vcComm/view";
export const PATH_COMMUNITY_UPLOAD_DOCUMENT = "/vcComm/upload-document";
export const PATH_COMMUNITY_DASHBOARD = "/vcComm/dashboard";
export const PATH_COMMUNITY_DETAIL_SUMMARY = "/vcom/detail-summary";
export const PATH_COMMUNITY_VERIFIED = "/vcComm/verified";
//
export const PATH_CONSOLIDATED = "/consolidated";
export const PATH_CONSOLIDATED_DEALS = PATH_CONSOLIDATED + "/deals";
export const PATH_CONSOLIDATED_DEALS_VERSIONS = PATH_CONSOLIDATED + "/deals/versions";

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" Component={AppLayout}>
        <Route index Component={Home} />

        <Route path={PATH_COMMUNITY}>
          <Route index path={PATH_COMMUNITY_DASHBOARD} Component={Vcdashboard} />
          <Route path={PATH_COMMUNITY_UPLOAD_DOCUMENT} Component={UploadDcoument} />
          <Route path={PATH_COMMUNITY_VERIFIED} Component={ListVerified} />
        </Route>

        <Route path={PATH_CONSOLIDATED}>
          <Route index path={PATH_CONSOLIDATED_DEALS} Component={ConsolidatedDeal} />
        </Route>

        <Route path={PATH_COMMUNITY_DETAIL_SUMMARY}>
          <Route index Component={DetailSummary} />
        </Route>
      </Route>

      <Route path="/login/callback" Component={LoginCallback} />
    </Routes>
  );
}
