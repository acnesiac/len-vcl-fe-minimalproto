export type UploadDocumentStepType = "upload" | "verify";

export interface IUploadDocumentStepDetails {
  type: UploadDocumentStepType;
  title: string;
  subtitle?: string;
  order: number;
}

export const uploadDocumentSteps: IUploadDocumentStepDetails[] = [
  {
    type: "upload",
    order: 0,
    title: "Upload Document",
    subtitle: "Select VC Excel",
  },
  {
    type: "verify",
    order: 1,
    title: "Verify Summary",
    subtitle: "Verify Summary & Save",
  },
];
