import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import CellAction from "../CellAction";

const RowSubTblTransaction = ({
  data,
  handleUpload,
}: {
  data: {
    idSourceCategory: string;
    paymentSource: string;
    paymentId: string;
  };
  handleUpload: (key: string) => void;
}) => {
  const theme = useTheme();

  return (
    <TableRow
      key={data.paymentId}
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.grey[50],
          color: "white",
        },
      }}
    >
      <TableCell sx={{ paddingLeft: 10 }}>
        <Typography variant="body1">{data.paymentSource}</Typography>
      </TableCell>
      <TableCell align="right" />
      <TableCell align="center">
        <CellAction
          handleUpload={() => handleUpload(data.paymentId)}
          categoryPayment={data.idSourceCategory}
        />
      </TableCell>
    </TableRow>
  );
};

export default RowSubTblTransaction;
