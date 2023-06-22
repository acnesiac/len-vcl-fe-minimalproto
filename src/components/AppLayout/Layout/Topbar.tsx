/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, ButtonBase, Stack } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { ReactComponent as DataGridIcon } from "../../../icons/data_grid.svg";
import { ReactComponent as MenuLogoIcon } from "../../../icons/menu_logo.svg";
import { ReactComponent as NotificationBellIcon } from "../../../icons/notification_bell.svg";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import AvatarResolver from "../../Common/Avatar/AvatarResolver";
import { useDispatch } from "react-redux";
import { setPostuserLoginData } from "../../../store/slice/CommonSlice";
import { tokenHandler } from "../../../utils/AppUtil";

const Topbar: React.FC = () => {
  const dispatch = useDispatch();
  const userGlobalData = useMemo(() => tokenHandler(), []);
  useEffect(() => {
    userGlobalData && dispatch(setPostuserLoginData(userGlobalData));
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: Colors.darkBlue, height: Spacing.spacing10 }}>
      <Stack flex={1} flexDirection="row" alignItems="stretch" columnGap={Spacing.spacing4}>
        <ButtonBase component="div" sx={{ width: Spacing.spacing10 }}></ButtonBase>
        <Box flexGrow={1} display="flex" alignItems="center"></Box>
        <Stack flexDirection="row">
          <ButtonBase component="div" sx={{ width: Spacing.spacing10 }}>
            <NotificationBellIcon fill={Colors.white} />
          </ButtonBase>

          <Box display="flex" alignItems="center" sx={{ p: Spacing.spacing2 }}>
            {userGlobalData && <AvatarResolver userData={userGlobalData} />}
          </Box>

          <ButtonBase component="div" sx={{ width: Spacing.spacing10 }}>
            <DataGridIcon fill={Colors.white} />
          </ButtonBase>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Topbar;
