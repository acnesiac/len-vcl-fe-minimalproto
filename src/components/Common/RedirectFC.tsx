/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, CardActionArea, CardContent, CardMedia, Link, Typography } from "@mui/material";
import Shield from "../../../src/assets/unauth.gif";

export const RedirectFC: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card sx={{ maxWidth: "40%" }}>
        <CardActionArea>
          <CardMedia component="img" height="30%" image={Shield} alt="vesta cal" />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              Please click
              <Link href="/"> here </Link> to Login
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default RedirectFC;
