/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState, type ChangeEvent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { TabLabel, TabPanelLazy, TabsLazy } from "../../Common/tabs/TabsLazy";
import { Overview } from "./Overview";
import { AnnualStatistics } from "./AnnualStatistics";
import { selectSummaryFinnancialCommunity, summaryFinnancialCommunityAsync } from "../../../store/slice/summary-slice";
import { appState, useAppDispatch, useAppSelector } from "../../../store/index";
import { selectCommunityID } from "../../../store/slice/community-slice";

export const DetailSummary: React.FC = () => {
  const { data: summary } = useAppSelector(state => selectSummaryFinnancialCommunity(state));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fileData = location.state;
  return <div></div>;
};
