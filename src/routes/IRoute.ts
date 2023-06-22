import { type ReactNode } from "react";

export interface IRouteType {
  element: ReactNode;
  state: string;
  index?: boolean;
  path?: string;
  child?: IRouteType[];
  sidebarProps?: {
    displayText: string;
    icon?: ReactNode;
  };
}
