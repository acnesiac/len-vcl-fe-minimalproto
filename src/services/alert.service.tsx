import { type AlertColor } from "@mui/material";
import { enqueueSnackbarToast } from "../components/Common/toasts/SnackbarToastsProvider";

export function showToast(color: AlertColor, message: string) {
  enqueueSnackbarToast({ color, message });
}
