import { Typography, type TypographyPropsVariantOverrides } from "@mui/material";
import { type Variant } from "@mui/material/styles/createTypography";
import { type OverridableStringUnion } from "@mui/types";

export const DataGridRenderCell: React.FC<{
  variant?: OverridableStringUnion<Variant | "inherit", TypographyPropsVariantOverrides>;
  value?: any;
}> = ({ variant = "bodyL", value }): JSX.Element => {
  return <Typography variant={variant}>{value}</Typography>;
};
