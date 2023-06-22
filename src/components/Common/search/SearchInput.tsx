import { Search as SearchIcon } from "@mui/icons-material";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { Spacing } from "../../../styles/spacing";

export const SearchInput: React.FC<{
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
}> = ({ disabled, value, onChange }): JSX.Element => {
  return (
    <FormControl fullWidth variant="standard" sx={{ backgroundColor: Colors.grey1 }}>
      <Input
        disabled={disabled}
        sx={{ px: Spacing.spacing3_5, py: Spacing.spacing2 }}
        onChange={event => {
          onChange(event.target.value);
        }}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: Colors.grey8 }} />
          </InputAdornment>
        }
        value={value}
        type="search"
      />
    </FormControl>
  );
};
