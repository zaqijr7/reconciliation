import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { ReactNode } from "react";

const BranchAndDateInput = ({
  listBranch,
  branchSelected,
  handleSelectBranch,
  handleSetDate,
  dateSelected,
  withTotalSales = false,
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
  handleSetDate: (date: moment.Moment | null) => void;
  dateSelected: moment.Moment | null;
  withTotalSales?: boolean;
}) => {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
      }}
    >
      <Stack sx={{ display: "block" }}>
        <DatePicker
          label="Pilih Tanggal"
          onChange={(e) => handleSetDate(e)}
          format="DD/MM/YYYY"
          value={dateSelected}
          sx={{
            borderColor: "divider",
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
      {withTotalSales && (
        <Stack>
          <Typography fontWeight={700}>
            Total Sales POS: Rp. {(4050040).toLocaleString("id-ID")}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default BranchAndDateInput;
