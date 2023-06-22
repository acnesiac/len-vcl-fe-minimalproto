import { type SxProps, type Theme } from "@mui/system";
import { Colors } from "./colors";

export const fontRegular: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: "0.875rem" /* 14px */,
  lineHeight: "1.5rem" /* 24px */,
};

export const textUnderline: SxProps<Theme> = {
  color: Colors.lightBlue4,
  textDecoration: "underline",
};
