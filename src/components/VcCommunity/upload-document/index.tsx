import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PATH_COMMUNITY_DASHBOARD } from "../../../routes/appRoutes";
import { useAppDispatch } from "../../../store/index";

export const UploadDocument: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(PATH_COMMUNITY_DASHBOARD);
  };
  return <div></div>;
};

export default UploadDocument;
