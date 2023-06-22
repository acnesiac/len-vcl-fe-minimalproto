import { css } from "@emotion/react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React, { type CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export interface ILoaderProps {
  loaderText?: string;
}
export const Loading: React.FC<ILoaderProps> = (props: ILoaderProps) => {
  return (
    <Box>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "nowrap",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h6" gutterBottom>
            Please Wait ....
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};
export default Loading;
