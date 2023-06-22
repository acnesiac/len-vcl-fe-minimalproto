import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { envConfig } from "../../../config";
import { showToast } from "../../../services/alert.service";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import { sizeMb } from "../../../utils/AppUtil";
import { acceptMimeTypes as fileMimeTypes, FormControlFile } from "../../form-control-file/FormControlFile";
import { FormControlFileItem } from "../../form-control-file/FormControlFileItem";
import { FormControlFileItemError } from "../../form-control-file/FormControlFileItemError";

export interface IFileUploadProps {
  error?: boolean;
  file?: File | null;
  loadingTitle?: string;
  parsing?: boolean;
  uploading?: boolean;
  progress?: number | null;
  onChange: (file: File) => void;
  onRemove: () => void;
  onRetry: () => void;
}

function validateFile(file: File): boolean {
  // Validate file extension
  const mimeType = fileMimeTypes.find(({ extension }) => {
    const index = file.name.indexOf(extension);
    return index === file.name.length - extension.length;
  });
  if (!mimeType) {
    showToast("error", `Select a file with a supported format`);
    return false;
  }
  // Validate file size
  const fileSizeMb = sizeMb(file.size);
  const limitSize = envConfig.importMaxFileSize;
  if (fileSizeMb > limitSize) {
    showToast("error", `Select a file less than ${limitSize}MB`);
    return false;
  }
  //
  return true;
}

export const FileUpload: React.FC<IFileUploadProps> = ({
  error,
  file,
  loadingTitle,
  parsing,
  progress,
  uploading,
  onChange,
  onRemove,
  onRetry,
}): JSX.Element => {
  const [removingFile, setRemovingFile] = useState<boolean>(false);

  const onChangeFiles = (files: FileList | null): void => {
    const file = files?.item(0);
    if (!file) return;
    if (!validateFile(file)) {
      onRemoveFile();
      return;
    }
    onChange(file);
  };

  const onRetryFile = () => {
    onRetry();
  };

  const onRemoveFile = () => {
    setRemovingFile(true);
    setTimeout(() => {
      setRemovingFile(false);
    }, 0);
    onRemove();
  };

  const disableInputFile = !!file;

  return (
    <Stack direction="column" rowGap={Spacing.spacing3} sx={{ p: 4, backgroundColor: Colors.white }}>
      {removingFile ? (
        <CircularProgress />
      ) : (
        <FormControlFile
          onChange={onChangeFiles}
          disabled={disableInputFile}
          loading={parsing || uploading}
          loadingTitle={loadingTitle}
          progress={progress}
        />
      )}

      {file &&
        (error ? (
          <FormControlFileItemError file={file} onRemove={onRemoveFile} onRetry={onRetryFile} />
        ) : (
          <FormControlFileItem file={file} uploading={uploading} onRemove={onRemoveFile} />
        ))}
    </Stack>
  );
};
