import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const RowTblHeadTransaction = ({ isLoading }: { isLoading: boolean }) => {
  const stickyHeader = {
    position: "sticky",
    right: 0,
    zIndex: "9990 !important",
    backgroundColor: "white",
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1">Branch</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Date</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Transaction Time</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Transaction Id</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Payment Method</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Amount POS</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Transaction From</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">Status in Agregator Report</Typography>
      </TableCell>
      <TableCell sx={stickyHeader}>
        <Typography variant="body1">Status in Bank</Typography>
      </TableCell>
    </TableRow>
  );
};

export default RowTblHeadTransaction;
