import { Link } from "@mui/material";
import React from "react";

// interface IAction
export const UpdloadAction: React.FC = () => {
  return (
    <Link sx={{ textDecorationLine: "none", cursor: "pointer" }} onClick={() => {}}>
      + Upload VC
    </Link>
  );
};
export default UpdloadAction;
