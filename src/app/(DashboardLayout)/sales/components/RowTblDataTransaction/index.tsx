import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import CellAction from "../CellAction";

type DataItem = {
  transactionForm: string;
  idSourceCategory: string;
  subTransaction: {
    idSourceCategory: string;
    paymentSource: string;
    paymentId: string;
  }[];
};

const RowTblDataTransaction = ({
  data,
  handleUpload,
}: {
  data: DataItem;
  handleUpload: (sourceTransaction: string) => void;
}) => {
  const theme = useTheme();

  return (
    <TableRow
      key={data.idSourceCategory}
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.grey[50],
          color: "white",
        },
      }}
    >
      <TableCell>
        <Typography variant="subtitle2" fontWeight={600}>
          {data.transactionForm}
        </Typography>
      </TableCell>
      <TableCell align="right" />
      <TableCell align="center">
        <CellAction
          handleUpload={() => handleUpload(data.transactionForm)}
          categoryPayment={data.idSourceCategory}
        />
      </TableCell>
    </TableRow>
  );
};

export default RowTblDataTransaction;
