import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH_COMMUNITY_UPLOAD_DOCUMENT } from "../../../routes/appRoutes";
import { useAppDispatch } from "../../../store";
import { updateCommunityState } from "../../../store/slice/community-slice";
import { type ICommunityDummy } from "../../../utils/constants";

interface IComm {
  communites: ICommunityDummy[];
}
export const RecentCommunity: React.FC<IComm> = props => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickUpload = (community: ICommunityDummy) => {
    dispatch(updateCommunityState(community));
    navigate(PATH_COMMUNITY_UPLOAD_DOCUMENT);
  };
  return (
    <Grid container spacing={2} rowSpacing={2} sx={{ p: 1 }}>
      {props.communites.map((community: ICommunityDummy, index: React.Key | null | undefined) => (
        <Grid key={index} item xs={4}>
          <Card>
            <CardContent>
              <Box component="span" sx={{ p: 10, border: "1px  black", maxWidth: "50" }}>
                <Typography component="p" variant="h4">
                  {community.CommunityName}
                </Typography>

                <Typography component="p" sx={{ flex: 1 }}>
                  {community.CommunityID}
                </Typography>

                <Typography color="text.secondary" sx={{ flex: 1 }}>
                  13 Documents Upload
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "space-around",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      onClickUpload(community);
                    }}
                  >
                    Upload VC
                  </Button>

                  <Link href="#">
                    <ArrowForwardIcon sx={{ fontSize: 12 }} />
                    View Community
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
