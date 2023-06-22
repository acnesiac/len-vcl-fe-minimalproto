/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardContent } from "@mui/material";
import { DataGridPro, GridColumnHeaders, GridRow } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import React from "react";

export const VcGridView: React.FC = () => {
  const MemoizedRow = React.memo(GridRow);

  const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
  const { data } = useDemoData({
    dataSet: "Employee",
    rowLength: 100,
    editable: true,
  });
  return (
    <Box sx={{ mt: "3em", height: 520, width: "100%" }}>
      <DataGridPro
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
      />
    </Box>
  );
};
export default VcGridView;
