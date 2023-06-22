import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Colors } from "../../../styles/colors";
import Sidebar from "../Bars/Sidebar";
import Topbar from "./Topbar";

export const AppLayout: React.FC = (): JSX.Element => {
  return (
    <Stack flex={1} sx={{ flexGrow: 1 }}>
      <Topbar />

      <Stack flexDirection="row" flexGrow={1}>
        <Sidebar />

        <Stack flexGrow={1} sx={{ backgroundColor: Colors.grey2 }}>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AppLayout;
