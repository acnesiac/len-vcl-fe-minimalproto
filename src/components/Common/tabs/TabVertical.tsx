import { Box, ButtonBase, Stack } from "@mui/material";
import { type ReactNode } from "react";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";

export const TabVertical: React.FC<{ selected: boolean; onClick?: () => void; children: ReactNode }> = ({
  selected,
  onClick,
  children,
}): JSX.Element => {
  return (
    <Stack flexDirection="row">
      <Box sx={{ backgroundColor: selected ? Colors.lennarBlue : "inherit", width: Spacing.spacing1 }} />
      <ButtonBase
        component="div"
        sx={[{ height: Spacing.spacing10, flex: 1 }, selected ? { backgroundColor: Colors.grey2 } : {}]}
        onClick={onClick}
      >
        {children}
      </ButtonBase>
    </Stack>
  );
};
