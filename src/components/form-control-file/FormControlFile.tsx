import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, type ReactNode } from "react";
import { ReactComponent as FileCloudUploadIcon } from "../../icons/file_cloud_upload.svg";
import { Colors } from "../../styles/colors";
import { fontRegular, textUnderline } from "../../styles/typography";
import { CircularProgressPercent } from "../Common/progress/CircularProgressPercent";

interface IUploadFileExcelMimeType {
  extension: string;
  mimeType: string;
}

/** Accept the following mime types */
export const acceptMimeTypes: IUploadFileExcelMimeType[] = [
  {
    extension: ".xls",
    mimeType: "application/vnd.ms-excel",
  },
  {
    extension: ".xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    extension: ".xlsb",
    mimeType: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  },
];
const acceptFiles = acceptMimeTypes.map(i => i.mimeType).join();
const filesExtensionSupported = acceptMimeTypes.map(i => i.extension).join();

export interface IFormControlFileProps {
  disabled?: boolean;
  loading?: boolean;
  loadingTitle?: string;
  progress?: number | null;
  onChange: (files: FileList | null) => void;
}

export const FormControlFile: React.FC<IFormControlFileProps> = ({
  disabled,
  loading,
  loadingTitle,
  progress,
  onChange,
}): JSX.Element => {
  const [draggingOverInput, setDraggingOverInput] = useState<boolean>(false);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = event.target.files;
    setDraggingOverInput(false);
    onChange(files);
  };

  const onDragEnter = (): void => {
    if (draggingOverInput) return;
    setDraggingOverInput(true);
  };

  const onDragLeave = (): void => {
    if (!draggingOverInput) return;
    setDraggingOverInput(false);
  };

  return (
    <Box
      sx={{
        ...styles.container,
        border: draggingOverInput ? `3px solid ${Colors.lightBlue4}` : `1px dashed ${Colors.grey5}`,
      }}
    >
      <Box sx={styles.containerLabel} htmlFor="upload-file" component="label">
        {loading ? (
          <>
            {progress ? <CircularProgressPercent value={progress} /> : <CircularProgress />}

            <Box component="span" sx={fontRegular}>
              {loadingTitle}
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                ...styles.containerIcon,
                backgroundColor: disabled ? Colors.grey2 : Colors.lightBlue2,
              }}
            >
              <FileCloudUploadIcon fill={disabled ? Colors.grey5 : Colors.lennarBlue} />
            </Box>

            <Typography variant="bodyM" sx={{ color: disabled ? Colors.grey6 : Colors.grey11 }}>
              Drag and drop or &nbsp;
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  color: disabled ? Colors.grey6 : Colors.lightBlue4,
                }}
              >
                select a file
              </Box>
              &nbsp; to upload.
            </Typography>

            <Typography variant="bodyM" sx={{ color: disabled ? Colors.grey6 : Colors.grey7 }}>
              File types supported: {filesExtensionSupported}
            </Typography>
          </>
        )}
      </Box>

      {draggingOverInput && <Box sx={styles.dragginOverlay} />}

      <Box sx={styles.containerInput}>
        <input
          accept={acceptFiles}
          disabled={disabled}
          type="file"
          id="upload-file"
          style={{ flex: 1, cursor: "pointer" }}
          onChange={onChangeFile}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        />
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    borderRadius: "4px",
  },
  containerIcon: {
    width: "3rem",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "64px",
  },
  containerInput: {
    display: "flex",
    height: "100%",
    left: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  containerLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    height: "100%",
    minHeight: "132px",
    paddingBottom: "1.5rem",
    paddingTop: "1.5rem",
    rowGap: "0.75rem",
    width: "100%",
  },
  dragginOverlay: {
    display: "flex",
    backgroundColor: Colors.lightBlue2,
    height: "100%",
    left: 0,
    opacity: 0.85,
    position: "absolute",
    top: 0,
    width: "100%",
  },
};
