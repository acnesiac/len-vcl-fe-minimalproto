import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { Colors } from "../../../styles/colors";
import { type ICardProps } from "./card-props";

export const CardSimple: React.FC<ICardProps> = ({ highlight, title }): JSX.Element => {
  return (
    <Box
      component="div"
      sx={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: Colors.shade12p,
        borderRadius: "4px",
      }}
    >
      <Stack direction="column" gap="4px" justifyContent="center" paddingX="16px" paddingY="12px">
        <Typography sx={{ fontSize: "14px" }}>{title ?? ""}</Typography>

        <Typography sx={{ fontSize: "24px" }}>{highlight ?? ""}</Typography>
      </Stack>
    </Box>
  );
};
