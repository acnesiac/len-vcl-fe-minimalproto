import { Typography, type TypographyPropsVariantOverrides } from "@mui/material";
import { type Variant } from "@mui/material/styles/createTypography";
import { type OverridableStringUnion } from "@mui/types";
import { type GridColDef } from "@mui/x-data-grid";
import { Colors } from "../../../styles/colors";

export const DataGridRenderHeader: React.FC<{
  variant?: OverridableStringUnion<Variant | "inherit", TypographyPropsVariantOverrides>;
  colDef: GridColDef<any>;
}> = ({ variant = "labelL", colDef }): JSX.Element => {
  return (
    <Typography variant={variant} sx={{ color: Colors.grey7 }}>
      {colDef?.headerName}
    </Typography>
  );
};
