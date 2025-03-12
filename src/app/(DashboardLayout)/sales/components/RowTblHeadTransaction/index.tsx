import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const RowTblHeadTransaction = () => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="h6" fontWeight={600}>
          Transaction From
        </Typography>
      </TableCell>
      <TableCell align="right" />
      <TableCell align="center">
        <Typography variant="h6" fontWeight={600}>
          Action
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default RowTblHeadTransaction;
