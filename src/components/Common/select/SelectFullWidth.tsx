import { Box, InputBase, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { Colors } from "../../../styles/colors";
import { type ISelectProps } from "./select-props";

export function SelectFullWidth<T extends number | string>(props: ISelectProps<T>): JSX.Element {
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
      <Typography variant="bodyL" color={Colors.grey7}>
        {item.name ?? item.id}
      </Typography>
    );
  };

  return (
    <Box component="div" sx={sx}>
      <FormControl fullWidth variant="standard">
        <Select
          displayEmpty
          disabled={disabled}
          input={<InputBase />}
          onChange={onChangeValue}
          value={value}
          renderValue={selectRenderValue}
        >
          {data.map(item => (
            <MenuItem key={item.id ?? item.name} value={item.id} disabled={item.disabledFlag}>
              <Typography variant="bodyL" color={Colors.grey7}>
                {item.name ?? item.id}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
