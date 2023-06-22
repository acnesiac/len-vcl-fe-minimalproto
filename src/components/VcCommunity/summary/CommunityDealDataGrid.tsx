import { Box, type SxProps, type Theme } from "@mui/material";
import { type GridValidRowModel, type GridColDef, DataGridPro } from "@mui/x-data-grid-pro";
import { useRef } from "react";
import { DataGridRenderCell } from "../../Common/data-grid/DataGridRenderCell";
import { DataGridRenderCellAvatar } from "../../Common/data-grid/DataGridRenderCellAvatar";
import { DataGridRenderCellDocumentStatus } from "../../Common/data-grid/DataGridRenderCellDocumentStatus";
import { DataGridRenderHeader } from "../../Common/data-grid/DataGridRenderHeader";
import { Link } from "react-router-dom";
import UpdloadAction from "./UpdloadAction";

function buldColumns<T extends GridValidRowModel>() {
  const columns: GridColDef<T>[] = [
    {
      field: "CommunityName",
      headerName: "Community Name | Deal",
      flex: 2,
      renderCell: ({ value }) => <DataGridRenderCell variant="h5" value={value} />,
    },
    {
      field: "DivisionName",
      headerName: "Division",
      flex: 1,
      renderCell: DataGridRenderCell,
    },
    {
      field: "Documents",
      headerName: "Documents",
      flex: 1,
      renderCell: DataGridRenderCell,
    },
    {
      field: "LastCollaborator",
      headerName: "Last Collaborator",
      flex: 2,
      renderCell: DataGridRenderCellAvatar,
    },
    {
      field: "LastUpdatedAt",
      headerName: "Last Updated",
      flex: 1,
      renderCell: DataGridRenderCell,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: UpdloadAction,
    },
  ];
  return columns;
}

interface IConsolidatedDealDataGridProps<T extends GridValidRowModel> {
  dataSource?: T[];
  loading?: boolean;
  sx?: SxProps<Theme>;
  onRowClick?: (row: any) => void;
}

export function CommunityDealDataGrid<T extends GridValidRowModel>({
  dataSource = [],
  loading,
  sx,
  onRowClick,
}: IConsolidatedDealDataGridProps<T>): JSX.Element {
  const columns = useRef(buldColumns<T>());

  return (
    <Box component="div" sx={sx}>
      <DataGridPro
        disableRowSelectionOnClick
        autoHeight
        rows={dataSource}
        columns={columns.current}
        filterMode="server"
        loading={loading}
        onRowClick={({ row }) => onRowClick?.(row)}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
}
