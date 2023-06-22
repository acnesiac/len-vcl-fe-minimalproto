import { type AlertColor, Box, ButtonBase, Snackbar, Stack, Typography } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import { ReactComponent as ActionCircleCheckFilledIcon } from "../../../icons/action_circle_check_filled.svg";
import { ReactComponent as ActionCloseIcon } from "../../../icons/action_close.svg";
import { ReactComponent as NotificationWarningCircleFilled } from "../../../icons/notification_warning_circle_filled.svg";
import { ReactComponent as NotificationWarningFilled } from "../../../icons/notification_warning_filled.svg";

const toastLookup: Record<
  AlertColor,
  {
    color: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }
> = {
  error: { color: Colors.errorMedium, icon: NotificationWarningCircleFilled },
  info: { color: Colors.progressMedium, icon: NotificationWarningCircleFilled },
  success: { color: Colors.successMedium, icon: ActionCircleCheckFilledIcon },
  warning: { color: Colors.warningMedium, icon: NotificationWarningFilled },
};

export interface ISnackbarToastProps {
  message: string;
  open: boolean;
  variant: AlertColor;
  onClose?: () => void;
}

export const SnackbarToast: React.FC<ISnackbarToastProps> = ({ message, open, variant, onClose }): JSX.Element => {
  const { color, icon: Icon } = toastLookup[variant] ?? {
    color: Colors.black,
    icon: NotificationWarningFilled,
  };

  return (
    <Snackbar
      open={open}
      sx={{
        backgroundColor: Colors.grey9,
        borderLeftColor: color,
        borderLeftWidth: Spacing.spacing3,
        borderLeftStyle: "solid",
        borderRadius: Spacing.spacing1,
        color: Colors.white,
        paddingLeft: Spacing.spacing3,
        paddingBottom: Spacing.spacing2_5,
        paddingRight: Spacing.spacing4,
        paddingTop: Spacing.spacing2_5,
        width: "480px",
      }}
    >
      <Box
        component="div"
        flex={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" columnGap={Spacing.spacing2_5}>
          <Icon fill={color} />

          <Typography variant="labelL">{message}</Typography>
        </Stack>

        <ButtonBase component="div" sx={{ p: Spacing.spacing2 }} onClick={onClose}>
          <ActionCloseIcon height={12} width={12} fill={Colors.white} />
        </ButtonBase>
      </Box>
    </Snackbar>
  );
};
