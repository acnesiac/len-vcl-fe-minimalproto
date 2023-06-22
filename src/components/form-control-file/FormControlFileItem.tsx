import { ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../../styles/colors";
import { fontRegular } from "../../styles/typography";
import { sizeLabelMb } from "../../utils/AppUtil";
import { BorderLinearProgress } from "../Common/BorderLinearProgress";
import { ReactComponent as ActionCloseIcon } from "../../icons/action_close.svg";
import { ReactComponent as MicrosoftExcelIcon } from "../../icons/microsoft_excel.svg";

export interface IFormControlFileItemProps {
  file?: File | undefined;
  uploading?: boolean;
  onRemove?: () => void;
}

export const FormControlFileItem: React.FC<IFormControlFileItemProps> = ({
  file,
  uploading,
  onRemove,
}): JSX.Element => {
  return (
    <Box
      sx={{
        backgroundColor: Colors.grey2,
        p: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MicrosoftExcelIcon />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          ml: 1.5,
        }}
      >
        <Box sx={{ display: "flex", columnGap: 1 }}>
          <Box component="span" sx={fontRegular}>
            {file?.name}
          </Box>
          <Box component="span" sx={{ ...fontRegular, color: Colors.grey7 }}>
            {sizeLabelMb(file?.size)}
          </Box>
        </Box>
        {uploading && <BorderLinearProgress />}
      </Box>

      {!uploading && (
        <ButtonBase component="div" sx={{ p: 1 }} onClick={onRemove}>
          <ActionCloseIcon />
        </ButtonBase>
      )}
    </Box>
  );
};
