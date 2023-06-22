import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { type IDataItem } from "../../../models/data-item";
import { fetchData } from "../../../store/slice/uploadDataStateSlice";
import { Spacing } from "../../../styles/spacing";
import { ButtonContained } from "../../Common/buttons/ButtonContained";
import { SearchFilterControl } from "../../Common/search/SearchFilterControl";
import { SearchInput } from "../../Common/search/SearchInput";
import VcGridViewForUploadDocs from "./VcGridViewForUploadDocs";

const filters: IDataItem<string>[] = [{ id: "FileName", name: "File Name" }];
const defaultFilters: string[] = filters.map(item => item.id ?? "");

export const VcUploadDataView: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, searchValueDelayed, setSearchValue, loading] = useDebounce<string>("");
  const { UploadHistory, loadingData } = useSelector((state: any) => ({
    UploadHistory: state.uploadData.UploadHistory?.DocumentVersions,
    loadingData: state.uploadData.loading,
  }));
  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>(defaultFilters);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const dataSource = useMemo(() => {
    const items =
      searchValueDelayed && selectedFilterIds.length
        ? UploadHistory.filter((row: Record<string, any>) => {
            const query = searchValueDelayed.toLowerCase();
            const item = selectedFilterIds.find(key => {
              const valid = String(row[key] ?? "")
                .toLowerCase()
                .includes(query);
              return valid;
            });
            return !!item;
          })
        : UploadHistory;
    return items;
  }, [UploadHistory, searchValueDelayed, selectedFilterIds]);

  if (loadingData) {
    return <CircularProgress />;
  }

  return (
    <Stack flex={1} flexDirection="column" id="VcUploadDataView">
      {UploadHistory && (
        <Stack
          sx={{ px: Spacing.spacing4, py: Spacing.spacing3_5 }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3">Upload History ({UploadHistory.length} Documents)</Typography>

          <ButtonContained
            onClick={() => {
              navigate("/vcComm/dashboard");
            }}
          >
            <Typography variant="bodyLBold">Upload Document</Typography>
          </ButtonContained>
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        columnGap={Spacing.spacing4}
        sx={{ p: Spacing.spacing6 }}
      >
        <Box sx={{ minWidth: "300px" }}>
          <SearchInput onChange={setSearchValue} value={searchValue} disabled={!selectedFilterIds.length} />
        </Box>

        <SearchFilterControl dataSource={filters} selectedIds={selectedFilterIds} onChange={setSelectedFilterIds} />
      </Stack>

      <VcGridViewForUploadDocs documents={dataSource} loading={loading} />
    </Stack>
  );
};

export default VcUploadDataView;
