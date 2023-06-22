import { type AlertColor } from "@mui/material";
import { useEffect, useState } from "react";
import { BehaviorSubject, delay, map, tap } from "rxjs";
import { logger } from "../../../utils/logger";
import { SnackbarToast } from "./SnackbarToast";

export interface ISnackbarToast {
  color: AlertColor;
  message: string;
}

const subjectMessages = new BehaviorSubject<ISnackbarToast | null>(null);

export const enqueueSnackbarToast = (toast: ISnackbarToast) => {
  subjectMessages.next(toast);
};

export const SnackbarToastsProvider: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ISnackbarToast | null>();

  useEffect(() => {
    const subscription = subjectMessages
      .pipe(
        tap(() => {
          setOpen(false);
        }),
        delay(400),
        map(data => {
          if (!data) return;
          setToast(data);
          setOpen(true);
          logger.debug("Showing toast:", data.message);
        }),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const onClose = () => {
    logger.debug("Closing toast");
    setOpen(false);
  };

  return <>{toast && <SnackbarToast open={open} message={toast.message} variant={toast.color} onClose={onClose} />}</>;
};
