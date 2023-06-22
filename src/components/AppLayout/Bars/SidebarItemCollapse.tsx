import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import colorConfigs from "../../../config/colorConfigs";
import { type IRouteType } from "../../../routes/IRoute";
import { useAppSelector, type RootState } from "../../../store";
import SidebarItem from "./SidebarItem";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

interface IProps {
  item: IRouteType;
}

const SidebarItemCollapse: React.FC<IProps> = ({ item }: IProps) => {
  const [open, setOpen] = useState(false);

  const { appState } = useAppSelector((state: RootState) => state.appState);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return item && item.sidebarProps != null ? (
    <>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
          },
          paddingY: "12px",
          paddingX: "24px",
        }}
      >
        <ListItemIcon
          sx={{
            color: colorConfigs.sidebar.color,
          }}
        >
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        <ListItemText disableTypography primary={<Typography>{item.sidebarProps.displayText}</Typography>} />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item &&
            item.child?.map((route, index) =>
              route.sidebarProps != null ? (
                route.child != null ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null,
            )}
        </List>
      </Collapse>
    </>
  ) : null;
};

export default SidebarItemCollapse;
