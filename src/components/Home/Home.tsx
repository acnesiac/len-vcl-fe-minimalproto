/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Shield from "../../../src/assets/shield.gif";
import { envConfig } from "../../config";
import Loading from "../Common/Loading";
import { useDispatch } from "react-redux";
import { type IUserOktaData, getUserData, setPostuserLoginData } from "../../store/slice/CommonSlice";
import _ from "lodash";
import { type UserClaims } from "@okta/okta-auth-js/lib/types/UserClaims";
import { tokenHandler } from "../../utils/AppUtil";

export interface IClaims extends UserClaims {
  Groups?: string[];
}
/**
 * Home component to be rendered first
 * @returns Home component
 */
export const Home: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth() || {};
  const dispatch = useDispatch();
  oktaAuth?.tokenManager?.on("expired", function () {
    oktaAuth.tokenManager.renew("accessToken");
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState || !authState?.isAuthenticated) {
      dispatch(getUserData());
      try {
        oktaAuth?.signInWithRedirect();
      } catch (error) {
        // to be discussed error handling amd log management
        console.log(error);
      }
    } else {
      if (authState.isAuthenticated) {
        navigate("/vcComm/dashboard");
      }
    }
  }, [authState, oktaAuth]);

  useEffect(() => {
    if (authState && authState?.isAuthenticated) {
      const claim: IClaims | undefined = authState.idToken?.claims ? authState.idToken?.claims : undefined;
      const userGlobalData = tokenHandler(claim);
      userGlobalData && dispatch(setPostuserLoginData(userGlobalData));
    }
  }, [authState, oktaAuth]);

  const authLoading = envConfig.oktaAuth && (!authState || !authState.isAuthenticated);

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
              Vesta Cal
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {authLoading && <Loading />}
    </Box>
  );
};

export default Home;
