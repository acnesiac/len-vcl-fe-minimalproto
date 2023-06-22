import { type ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../../store/saga/appStateSaga";
import React from "react";

interface IProps {
  state?: string;
  children: ReactNode;
}

const PageWrapper: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  return <>{props.children}</>;
};

export default PageWrapper;
