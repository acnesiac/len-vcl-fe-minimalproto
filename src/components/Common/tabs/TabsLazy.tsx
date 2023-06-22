import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { type ReactNode, type SyntheticEvent, useState } from "react";
import { findChildrenByType } from "../../../lib/react.utils";

export function TabLabel(props: any & { label: string }): JSX.Element {
  const { label, children, ...other } = props;
  return <Tab label={children || label} {...other} />;
}

export function TabPanelLazy(props: any): JSX.Element {
  return <>{props.children}</>;
}

export function TabsLazy({
  defaultIndexSelected = 0,
  children,
}: {
  children: ReactNode;
  defaultIndexSelected?: number;
}): JSX.Element {
  // Setup
  const [indexSelected, setIndexSelected] = useState<number>(defaultIndexSelected);
  // Handlers
  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setIndexSelected(newValue);
  };
  // Children
  const labels = findChildrenByType(children, TabLabel);
  const panels = findChildrenByType(children, TabPanelLazy);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={indexSelected} onChange={handleChange}>
          {labels}
        </Tabs>
      </Box>
      {panels[indexSelected]}
    </Box>
  );
}
