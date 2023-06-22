import { Stack, Typography } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import { ReactComponent as BadgeCircleIcon } from "../../../icons/badge_circle.svg";

type DocumentStatusType = "Full" | "Partial" | "Default";

const lookup: Record<DocumentStatusType, { description: string; color: string }> = {
  Full: {
    description: "VC Available",
    color: Colors.successDark,
  },
  Partial: {
    description: "Needs Data",
    color: Colors.warningDark,
  },
  Default: {
    description: "No Data Available",
    color: Colors.errorDark,
  },
};

export const DataGridRenderCellDocumentStatus: React.FC<{ value?: any }> = ({ value }): JSX.Element => {
  const status = value as DocumentStatusType;
  const { description, color } = lookup[status] || lookup.Default;

  return (
    <Stack direction="row" columnGap={Spacing.spacing1_5} alignItems="center">
      <BadgeCircleIcon fill={color} />
      <Typography variant="bodySBold" sx={{ color }}>
        {description}
      </Typography>
    </Stack>
  );
};
