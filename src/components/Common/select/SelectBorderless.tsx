import { Box, InputBase, MenuItem, Select, type SelectChangeEvent, Typography } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { type ISelectProps } from "./select-props";

export function SelectBorderless<T extends number | string>(props: ISelectProps<T>): JSX.Element {
  const { data = [], disabled, placeholder, selectedId, sx, onChange } = props;
  const value: T | string = selectedId || "";

  const onChangeValue = (event: SelectChangeEvent<T | string>): void => {
    const nextValue = event.target.value;
    onChange?.(nextValue);
  };

  const selectRenderValue = (selected: string | T) => {
    if (placeholder && selected === "") {
      return (
        <Typography variant="bodyL" color={Colors.grey6}>
          {placeholder}
        </Typography>
      );
    }

    const item = data.find(item => item.id === selected) || {};
    return (
      <Typography variant="h5" color={Colors.lennarBlue}>
        {item.label ?? item.name ?? item.id}
      </Typography>
    );
  };

  return (
    <Box component="div" sx={sx}>
      <Select
        displayEmpty
        disabled={disabled}
        input={<InputBase />}
        onChange={onChangeValue}
        sx={{ boxShadow: "none", ".MuiOutlinedInput-notchedOutline": { border: 0 }, minWidth: "250px" }}
        value={value}
        renderValue={selectRenderValue}
      >
        {data.map(item => (
          <MenuItem key={item.id} value={item.id}>
            <Typography variant="bodyL" color={Colors.grey7}>
              {item.name ?? item.id}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
