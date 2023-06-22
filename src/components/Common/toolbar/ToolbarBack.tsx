import { ButtonBase, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as ArrowLeftIcon } from "../../../icons/action_arrow_left.svg";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";

export const ToolbarBack: React.FC<{ children: React.ReactNode; title?: string; onClickBack?: () => void }> = ({
  children,
  title,
  onClickBack,
}): JSX.Element => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      columnGap={Spacing.spacing3}
      sx={{ backgroundColor: Colors.white, p: Spacing.spacing5 }}
    >
      <Stack flexDirection="row" columnGap={Spacing.spacing6}>
        <ButtonBase component="div" sx={{ p: Spacing.spacing1 }} onClick={onClickBack}>
          <ArrowLeftIcon />
        </ButtonBase>

        {title && <Typography variant="h4">{title}</Typography>}
      </Stack>

      <Divider orientation="vertical" flexItem />

      {children}
    </Stack>
  );
};
