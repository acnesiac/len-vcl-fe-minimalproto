import { ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../../styles/colors";
import { fontRegular } from "../../styles/typography";
import { sizeLabelMb } from "../../utils/AppUtil";
import { ReactComponent as ActionCloseIcon } from "../../icons/action_close.svg";
import { ReactComponent as ActionRefreshIcon } from "../../icons/action_refresh.svg";
import { ReactComponent as NotificationWarningIcon } from "../../icons/notification_warning_filled.svg";

export interface IFormControlFileItemErrorProps {
  file?: File | undefined;
  onRemove?: () => void;
  onRetry?: () => void;
}

export const FormControlFileItemError: React.FC<IFormControlFileItemErrorProps> = ({
  file,
  onRetry,
  onRemove,
}): JSX.Element => {
  return (
    <Box
      sx={{
        backgroundColor: Colors.errorLight,
        p: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <NotificationWarningIcon fill={Colors.errorDark} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          ml: 1.5,
        }}
      >
        <Box sx={{ display: "flex", columnGap: 1 }}>
          <Box component="span" sx={fontRegular}>
            {file?.name}
          </Box>
          <Box component="span" sx={{ ...fontRegular, color: Colors.grey7 }}>
            {sizeLabelMb(file?.size ?? 0)}
          </Box>
        </Box>

        <Box
          component="span"
          sx={{
            fontHeight: "1.25rem",
            fontSize: "0.75rem",
            fontWeight: 400,
          }}
        >
          There was an error uploading your file. Please try again.
        </Box>
      </Box>

      {file && file.type && (
        <ButtonBase component="div" sx={{ p: 1, mr: 2 }} onClick={onRetry}>
          <ActionRefreshIcon />
        </ButtonBase>
      )}

      <ButtonBase component="div" sx={{ p: 1 }} onClick={onRemove}>
        <ActionCloseIcon />
      </ButtonBase>
    </Box>
  );
};
