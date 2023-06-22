import { GetApp, Visibility } from "@mui/icons-material";
import { Box, IconButton, Link, Typography } from "@mui/material";
import { DataGridPro, type GridColDef, type GridSortModel } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router";
import { Spacing } from "../../../styles/spacing";
import { DataGridRenderCellAvatar } from "../../Common/data-grid/DataGridRenderCellAvatar";
import { DataGridRenderHeader } from "../../Common/data-grid/DataGridRenderHeader";
import ExcelIcon from "./assets/excelIcon";

export interface IDocumentVersion {
  id?: string;
  DocumentID: string;
  BlobID?: string;
  DocumentCreateTS: string;
  UploadBlobID?: string;
  VersionID: number;
  Comments: string;
  FileSize: string;
  UploadedBy: string;
  FileName?: string;
  BlobURL?: string;
  DocumentState?: string;
  ProfileImageBase64?: string;
}

const defaultSortModel: GridSortModel = [
  {
    field: "VersionID",
    sort: "desc",
  },
];

const bytesToMB = (bytes: number): string => {
  if (bytes === undefined) {
    return "";
  }
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2) + "MB";
};

const FilenameCell = (params: any): JSX.Element => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "10px", alignSelf: "center" }}>
        <ExcelIcon />
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <strong>
            <Link href={params.row.BlobURL} underline="none" color="textPrimary">
              {params.row.FileName}
            </Link>
          </strong>
        </div>
      </div>
    </div>
  );
};

const DownloadAndViewButton = (params: any): JSX.Element => {
  const navigate = useNavigate();
  const onView = () => {
    navigate("/vcom/detail-summary", {
      state: {
        fileName: params.row.FileName,
        uploadedOn: params.row.DocumentCreateTS,
        versionId: params.row.VersionID,
      },
    });
  };

  return (
    <div>
      <IconButton onClick={onView} color="primary" aria-label="view document" style={{ color: "black" }}>
        <Visibility fontSize="small" />
      </IconButton>
      <Link href={params.row.BlobURL} underline="none" color="textPrimary">
        <IconButton color="primary" aria-label="view document" style={{ color: "black" }}>
          <GetApp fontSize="small" />
        </IconButton>
      </Link>
    </div>
  );
};

const columns: GridColDef<IDocumentVersion>[] = [
  {
    field: "DocumentID",
    headerName: "File Name",
    flex: 2,
    renderHeader: params => (
      <Box sx={{ pl: Spacing.spacing4 }}>
        <DataGridRenderHeader {...params} />
      </Box>
    ),
    renderCell: params => (
      <Box sx={{ pl: Spacing.spacing4 }}>
        <FilenameCell {...params} />
      </Box>
    ),
  },
  {
    field: "FileSize",
    headerName: "File Size",
    renderHeader: DataGridRenderHeader,
    renderCell: (params: any) => <Typography>{bytesToMB(params.row.FileSize)}</Typography>,
  },
  {
    field: "DocumentCreateTS",
    headerName: "Uploaded On",
    flex: 1,
    renderHeader: DataGridRenderHeader,
  },
  {
    field: "UploadedBy",
    headerName: "Uploaded By",
    flex: 1,
    renderHeader: DataGridRenderHeader,
    renderCell: params => <DataGridRenderCellAvatar variant="bodyMBold" {...params} />,
  },
  { field: "Comments", headerName: "Comments", flex: 1, renderHeader: DataGridRenderHeader },
  {
    field: "action",
    headerName: "",
    sortable: false,
    filterable: false,
    renderHeader: DataGridRenderHeader,
    renderCell: params => <DownloadAndViewButton {...params} />,
  },
];

interface IDocsProps {
  documents: IDocumentVersion[];
  loading: boolean;
}
export const VcGridViewForUploadDocs = ({ documents, loading }: IDocsProps) => {
  return (
    <Box>
      <DataGridPro
        autoHeight
        columns={columns}
        rows={documents ?? []}
        disableColumnFilter
        disableRowSelectionOnClick
        filterMode="server"
        getRowId={(row: { DocumentID: any }): any => row.DocumentID}
        loading={loading}
        pagination
      />
    </Box>
  );
};
export default VcGridViewForUploadDocs;
