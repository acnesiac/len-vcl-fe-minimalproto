import { type SxProps, type Theme } from "@mui/material";
import { type ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}
