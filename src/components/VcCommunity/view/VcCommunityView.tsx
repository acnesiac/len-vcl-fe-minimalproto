import Box from "@mui/material/Box/Box";
import React from "react";
import Filter from "../../Common/Filter";
import VcGridView from "./VcGridView";

export const VcCommunityView: React.FC = () => {
  return (
    <Box component="div" id={"vcView"}>
      <Filter />
      <VcGridView />
    </Box>
  );
};
export default VcCommunityView;
