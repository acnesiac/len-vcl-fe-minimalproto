import { Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as DataDashboardIcon } from "../../../icons/data_dashboard.svg";
import { ReactComponent as FileInventoryIcon } from "../../../icons/file_inventory.svg";
import { PATH_COMMUNITY_DASHBOARD, PATH_CONSOLIDATED_DEALS } from "../../../routes/appRoutes";
import { Spacing } from "../../../styles/spacing";
import { LOCAL_STORAGE_NAVIGATION_TAB } from "../../../utils/constants";
import { TabVertical } from "../../Common/tabs/TabVertical";
import { type ISideBarItemNavigation } from "./side-bar-item-navigation";

export const Sidebar: React.FC = () => {
  const appSidebarNavigation = useRef<ISideBarItemNavigation[]>([
    { order: 1, icon: DataDashboardIcon, route: PATH_COMMUNITY_DASHBOARD },
    { order: 2, icon: FileInventoryIcon, route: PATH_CONSOLIDATED_DEALS },
  ]);
  const persistedSelected = useRef(localStorage.getItem(LOCAL_STORAGE_NAVIGATION_TAB) ?? null);
  const location = useLocation();
  const navigate = useNavigate();

  const [tabSelected, setTabSelected] = useState<number | null>(() => {
    const value = Number.parseInt(persistedSelected.current ?? "", 10);
    return value || null;
  });

  useEffect(() => {
    const item = appSidebarNavigation.current.find(item => item.order === tabSelected);
    if (location.pathname === "/" && !!item) {
      navigate(item.route);
    }
  }, [location, tabSelected]);

  const onTabSelected = (order: number, route: string) => {
    localStorage.setItem(LOCAL_STORAGE_NAVIGATION_TAB, `${order}`);
    setTabSelected(order);
    navigate(route);
  };

  return (
    <Stack component="div" flexDirection="column" sx={{ width: Spacing.spacing11, py: Spacing.spacing3 }}>
      {appSidebarNavigation.current.map(({ order, icon: Icon, route }) => (
        <TabVertical
          key={order}
          selected={tabSelected === order}
          onClick={() => {
            onTabSelected(order, route);
          }}
        >
          <Icon />
        </TabVertical>
      ))}
    </Stack>
  );
};

export default Sidebar;
