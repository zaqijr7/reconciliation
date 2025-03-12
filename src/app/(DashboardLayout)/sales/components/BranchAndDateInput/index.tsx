import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { ReactNode } from "react";

const BranchAndDateInput = ({
  listBranch,
  branchSelected,
  handleSelectBranch,
}: {
  listBranch: {
    branchId: string;
    branchName: string;
  }[];
  branchSelected: string;
  handleSelectBranch: (
    value: SelectChangeEvent<string>,
    child: ReactNode,
  ) => void;
}) => {
  return (
    <Stack sx={{ display: "block" }}>
      <DatePicker
        label="Pilih Tanggal"
        value={moment(Date.now())}
        sx={{
          borderColor: "divider",
          marginBottom: 3,
          width: {
            xs: "100%",
            md: 300,
          },
          marginRight: 2,
        }}
        slotProps={{
          popper: {
            sx: {
              ...{
                "& .MuiPickersDay-root.Mui-selected": {
                  color: "white",
                },
              },
            },
          },
        }}
      />
      <FormControl
        sx={{
          width: {
            xs: "100%",
            md: 300,
          },
        }}
      >
        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={branchSelected}
          label="Branch"
          onChange={handleSelectBranch}
        >
          {listBranch?.map((item) => {
            return (
              <MenuItem key={item.branchId} value={item.branchId}>
                {item.branchName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default BranchAndDateInput;
