import React, { useCallback, useMemo, useState } from "react";
import { Box, Checkbox, Stack, Typography, type SxProps, type Theme } from "@mui/material";
import { type IDataItem } from "../../../models/data-item";

export interface ICheckBoxesProps<T> {
  dataSource: IDataItem<T>[];
  selectedIds?: T[];
  onChange?: (selected: T[]) => void;
}

export function CheckBoxes<T>(props: ICheckBoxesProps<T>): JSX.Element {
  const { dataSource = [], selectedIds = [], onChange = _ => {} } = props;

  const onCheck = useCallback(
    (id: T, value: boolean) => {
      const next = selectedIds.concat();
      if (value) next.push(id);
      else {
        const index = next.findIndex(item => item === id);
        if (index >= 0) next.splice(index, 1);
      }
      onChange(next);
    },
    [selectedIds],
  );

  const items = useMemo(() => {
    return dataSource.map((item: IDataItem<any>) => {
      const value = selectedIds.includes(item.id);

      return (
        <Stack
          flexDirection="row"
          alignItems="center"
          key={item.id}
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
          }}
          onClick={() => {
            onCheck(item.id, !value);
          }}
        >
          <Checkbox value={item.id} checked={value} />

          <Typography variant="bodyM" sx={{ pr: 2 }}>
            {item.name}
          </Typography>
        </Stack>
      );
    });
  }, [selectedIds]);

  return <>{items}</>;
}
