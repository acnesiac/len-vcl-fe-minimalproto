import ButtonBase from "@mui/material/ButtonBase";
import { Colors } from "../../../styles/colors";
import { type IButtonProps } from "./button-props";

export const ButtonOutlined: React.FC<IButtonProps> = ({ children, disabled, onClick, sx }): JSX.Element => {
  return (
    <ButtonBase
      component="div"
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          backgroundColor: Colors.white,
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: "1.5px",
          paddingX: 3,
          paddingY: 1.5,
        },
        disabled
          ? { borderColor: Colors.grey6, color: Colors.grey6 }
          : { borderColor: Colors.lennarBlue, color: Colors.lennarBlue },
      ]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};
