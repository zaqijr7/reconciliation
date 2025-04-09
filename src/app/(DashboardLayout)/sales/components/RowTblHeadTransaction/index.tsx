import {
  CircularProgress,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const RowTblHeadTransaction = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="h6" fontWeight={600}>
          Transaction From
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" alignItems="center" justifyContent="start">
          <Typography variant="h6" fontWeight={600}>
            File Name
          </Typography>
          {isLoading ? (
            <CircularProgress sx={{ marginLeft: 1 }} size={15} />
          ) : null}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" alignItems="center" justifyContent="end">
          <Typography variant="h6" fontWeight={600}>
            Amount
          </Typography>
          {isLoading ? (
            <CircularProgress sx={{ marginLeft: 1 }} size={15} />
          ) : null}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" alignItems="center" justifyContent="end">
          <Typography variant="h6" fontWeight={600}>
            Status Rekon
          </Typography>
          {isLoading ? (
            <CircularProgress sx={{ marginLeft: 1 }} size={15} />
          ) : null}
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h6" fontWeight={600}>
          Action
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default RowTblHeadTransaction;
