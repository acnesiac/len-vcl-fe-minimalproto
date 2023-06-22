import { type FunctionComponent } from "react";

export interface ISideBarItemNavigation {
  order: number;
  icon: FunctionComponent;
  route: string;
}
