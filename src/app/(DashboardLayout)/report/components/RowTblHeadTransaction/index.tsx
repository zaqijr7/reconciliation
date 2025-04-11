import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const RowTblHeadTransaction = ({ isLoading }: { isLoading: boolean }) => {
  const stickyHeader = {
    position: "sticky",
    right: 0,
    zIndex: "9999 !important",
    backgroundColor: "white",
  };

  return (
    <TableRow>
      <TableCell sx={stickyHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Branch
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" noWrap fontWeight={600}>
          Date
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" noWrap fontWeight={600}>
          Transaction Time
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" noWrap fontWeight={600}>
          Transaction Id
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" noWrap fontWeight={600}>
          Payment Method
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" noWrap fontWeight={600}>
          Amount POS
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" noWrap fontWeight={600}>
          Transaction From
        </Typography>
      </TableCell>
      <TableCell sx={stickyHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Status in Agregator Report
        </Typography>
      </TableCell>
      <TableCell sx={stickyHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Status in Bank
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default RowTblHeadTransaction;
