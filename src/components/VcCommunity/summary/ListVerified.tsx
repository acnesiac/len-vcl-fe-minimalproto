import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/index";
import { selectCommunityID } from "../../../store/slice/community-slice";
import { selectSummaryFinnancialCommunity, summaryFinnancialCommunityAsync } from "../../../store/slice/summary-slice";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import { TabLabel, TabPanelLazy, TabsLazy } from "../../Common/tabs/TabsLazy";
import VcUploadDataView from "../view/VcUploadDataView";
import { AnnualStatistics } from "./AnnualStatistics";
import { Overview } from "./Overview";

export const ListVerified: React.FC = () => {
  const {
    data: summary,
    loading: loadingSummary,
    success: summaryFetched,
  } = useAppSelector(state => selectSummaryFinnancialCommunity(state));
  const { DocumentMetaData } = useSelector((state: any) => ({
    DocumentMetaData: state.summary.financialCommunity?.data?.DocumentMetaData,
  }));

  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(1);
  const communityId = useAppSelector(state => selectCommunityID(state));

  useEffect(() => {
    dispatch(
      summaryFinnancialCommunityAsync({
        communityId,
        foldAnnualStatsAfterYears: 6,
        version: DocumentMetaData?.VersionID,
        isPublished: false,
      }),
    );
  }, [communityId, dispatch]);

  return (
    <Box sx={{ m: Spacing.spacing8, backgroundColor: Colors.white }}>
      <TabsLazy defaultIndexSelected={value}>
        <TabLabel>Summary</TabLabel>
        <TabLabel>Upload Data</TabLabel>

        <TabPanelLazy>
          <Box sx={{ p: Spacing.spacing6 }}>
            <TabsLazy>
              <TabLabel>Overview</TabLabel>
              <TabLabel>Annual Statistics</TabLabel>

              <TabPanelLazy>
                <Overview source={summary?.InvestmentOverview} />
              </TabPanelLazy>

              <TabPanelLazy>
                <AnnualStatistics source={summary?.AnnualStatistics} />
              </TabPanelLazy>
            </TabsLazy>
          </Box>
        </TabPanelLazy>

        <TabPanelLazy>
          <VcUploadDataView />
        </TabPanelLazy>
      </TabsLazy>
    </Box>
  );
};
export default ListVerified;
