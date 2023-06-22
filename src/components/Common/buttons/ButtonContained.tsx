/* eslint-disable react/prop-types */
import ButtonBase from "@mui/material/ButtonBase";
import { Colors } from "../../../styles/colors";
import { type IButtonProps } from "./button-props";

export const ButtonContained: React.FC<IButtonProps> = ({ children, disabled, onClick, sx }): JSX.Element => {
  return (
    <ButtonBase
      component="div"
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          borderRadius: "4px",
          paddingX: 3,
          paddingY: 1.5,
        },
        disabled
          ? { backgroundColor: Colors.grey4, color: Colors.grey6 }
          : { backgroundColor: Colors.lennarBlue, color: Colors.white },
      ]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};
