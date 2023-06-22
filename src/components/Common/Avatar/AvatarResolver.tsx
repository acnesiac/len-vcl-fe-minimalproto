import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { stringAvatar } from "../../../utils/AppUtil";
import { getAvatar, type IUserOktaData } from "../../../store/slice/CommonSlice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../../store/rootReducer";

interface IAvProps {
  userData?: IUserOktaData;
}
export const AvatarResolver: React.FC<IAvProps> = ({ userData }) => {
  const dispatch = useDispatch();
  const commonData = useSelector((state: RootState) => state.appGlobal);
  const [avatar, setavatar] = useState<string>();
  useEffect(() => {
    if (userData?.email) {
      dispatch(getAvatar(userData));
    }
  }, [dispatch, userData]);
  useEffect(() => {
    setavatar(commonData.avatar);
  }, [commonData]);
  if (!avatar) {
    return <Avatar {...stringAvatar(commonData.userOktaData.name)} />;
  } else {
    return (
      <>
        <Avatar alt="user Image" src={`data:image/jpeg;base64,${avatar}`} sx={{ width: 30, height: 30 }} />
      </>
    );
  }
};

export default AvatarResolver;
