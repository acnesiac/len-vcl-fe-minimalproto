/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const Filter: React.FC = () => {
  const [community, setCommunity] = useState<string>("10");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (event: SelectChangeEvent) => {
    setCommunity(event.target?.value);
  };
  return (
    <Box component={"div"}>
      <Card>
        <CardContent>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "baseline",
              p: 0,
            }}
          >
            <Typography color="text.primary" sx={{ mt: "1em" }}>
              Division: Atlanta
            </Typography>
            <FormControl sx={{ mr: 4, ml: 4, minWidth: 250 }} size="small">
              <InputLabel id="demo-select-small">Community</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={community}
                label="Community"
                onChange={handleChange}
              >
                <MenuItem value={10}>Alley Tract</MenuItem>
                <MenuItem value={40}>Community1</MenuItem>
                <MenuItem value={20}>Community2</MenuItem>
                <MenuItem value={30}>Community3</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" size="medium">
              Filter
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Filter;
