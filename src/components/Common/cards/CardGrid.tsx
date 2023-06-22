import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { type ReactNode } from "react";

export const CardGrid: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return (
    <Box component="div" display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gap={2}>
      {children}
    </Box>
  );
};
