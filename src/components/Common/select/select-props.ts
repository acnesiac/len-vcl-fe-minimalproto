import { type SxProps, type Theme } from "@mui/material";
import { type IDataItemLabel } from "../../../models/data-item";

export interface ISelectProps<T> {
  data: IDataItemLabel<T>[];
  disabled?: boolean;
  placeholder?: string;
  selectedId?: T;
  showEmptyOption?: boolean;
  sx?: SxProps<Theme>;
  onChange?: (selected: T | string) => void;
}
