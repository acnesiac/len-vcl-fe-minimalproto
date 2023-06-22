import axios, { AxiosError } from "axios";
import { envConfig } from "../../config";
import { type DocumentUploadOkDto } from "./dto/document-upload-ok.dto";
import { type DocumentUploadDto } from "./dto/document-upload.dto";

const segment = `${envConfig.apiSuffixBff}/document`;

export const documentProcessedByApiAsync = async <T>(blobId: string): Promise<T | null> => {
  const url = `${envConfig.apiBaseURL}${segment}/processed`;
  try {
    return await axios.get<T>(url, { params: { blobId } }).then(res => res.data);
  } catch (error) {
    return null;
  }
};

export const documentUploadApiAsync = async (
  data: DocumentUploadDto,
  file: File,
  email?: string,
): Promise<DocumentUploadOkDto> => {
  const url = `${envConfig.apiBaseURL}${segment}`;
  const form = new FormData();
  const config = { headers: { email } };
  Object.keys(data).forEach(key => {
    form.append(key, (data as any)[key]);
  });
  form.append("File", file, file.name);
  const response = await axios.post<DocumentUploadOkDto>(url, form, config);
  return response.data;
};
