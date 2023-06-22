import { ButtonBase, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Colors } from "../../../styles/colors";
import { ButtonContained } from "../../Common/buttons/ButtonContained";
import { ButtonOutlined } from "../../Common/buttons/ButttonOutlined";
import { ReactComponent as ActionCloseIcon } from "../../../icons/action_close.svg";
import { useRef } from "react";

export interface IVerifyAndSaveModalProps {
  onCancel: () => void;
  onSave: (value?: string | null) => void;
}

export const VerifyAndSaveModal: React.FC<IVerifyAndSaveModalProps> = ({ onCancel, onSave }): JSX.Element => {
  const inputValueRef = useRef<HTMLInputElement>();
  const onClickSave = () => {
    const element = inputValueRef.current;
    onSave(element?.value);
  };

  return (
    <Modal open={true} onClose={onCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "410px",
          backgroundColor: Colors.white,
          borderRadius: "4px",
          p: "20px",
        }}
      >
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700, fontSize: "20px", lineHeight: "28px" }}>Verify & Save</Typography>

            <ButtonBase sx={{ p: "10px" }} onClick={onCancel}>
              <ActionCloseIcon />
            </ButtonBase>
          </Stack>

          <Stack direction="column" rowGap="4px" sx={{ mt: "24px" }}>
            <Typography sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px" }}>Add A Comment</Typography>

            <TextField fullWidth={true} label="Type your text" variant="filled" inputRef={inputValueRef} />

            <Typography
              sx={{
                color: Colors.grey10,
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "20px",
              }}
            >
              *Please add a comment for the uploaded file
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" justifyContent="flex-end" columnGap="8px" sx={{ mt: "12px", pb: "4px", pt: "12px" }}>
          <ButtonOutlined sx={{ height: "40px" }} onClick={onCancel}>
            <Typography sx={{ px: "8px" }}>Cancel</Typography>
          </ButtonOutlined>

          <ButtonContained sx={{ height: "40px" }} onClick={onClickSave}>
            <Typography sx={{ px: "14px" }}>Save</Typography>
          </ButtonContained>
        </Stack>
      </Box>
    </Modal>
  );
};
