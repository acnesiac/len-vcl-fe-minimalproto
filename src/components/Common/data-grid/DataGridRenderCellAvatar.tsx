import { Avatar, Stack, Typography, type TypographyPropsVariantOverrides } from "@mui/material";
import { type Variant } from "@mui/material/styles/createTypography";
import { type OverridableStringUnion } from "@mui/types";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import { emailInitials } from "../../../utils/AppUtil";

export const DataGridRenderCellAvatar: React.FC<{
  variant?: OverridableStringUnion<Variant | "inherit", TypographyPropsVariantOverrides>;
  value?: any;
}> = ({ variant = "bodyM", value }): JSX.Element => {
  return (
    <Stack direction="row" columnGap={Spacing.spacing2} alignItems="center" sx={{ py: Spacing.spacing2_5 }}>
      {value && <Avatar style={{ backgroundColor: Colors.lennarBlue }}>{emailInitials(value)}</Avatar>}

      <Typography variant={variant}>{value}</Typography>
    </Stack>
  );
};
