import { Box, CircularProgress, type CircularProgressProps, Typography } from "@mui/material";
import { percentFormatter } from "../../../utils/AppUtil";

export const CircularProgressPercent: React.FC<CircularProgressProps & { value: number }> = ({
  value,
  ...props
}): JSX.Element => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="bodyM">{percentFormatter.format(value)}</Typography>
      </Box>
    </Box>
  );
};
