import { FilterList as FilterListIcon } from "@mui/icons-material";
import { Box, ButtonBase, Popover, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";
import { CheckBoxes, type ICheckBoxesProps } from "../checkbox/CheckBoxes";

export function SearchFilterControl<T>(props: ICheckBoxesProps<T>): JSX.Element {
  const anchorEl = useRef<HTMLDivElement | null>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <ButtonBase
        ref={(instance: HTMLDivElement | null) => (anchorEl.current = instance)}
        component="div"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Stack direction="row" alignItems="center" columnGap={Spacing.spacing2} padding={Spacing.spacing2}>
          <FilterListIcon sx={{ color: Colors.lennarBlue }} />

          <Typography variant="bodyMBold" sx={{ color: Colors.lennarBlue }}>
            Filter
          </Typography>
        </Stack>
      </ButtonBase>

      <Popover
        anchorEl={anchorEl.current}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <CheckBoxes {...props} />
      </Popover>
    </Box>
  );
}
