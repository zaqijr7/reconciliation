import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import CellAction from "../CellAction";
import { PaymentSource } from "@/types/apiTypes";

const RowTblDataTransaction = ({
  data,
  handleUpload,
  isLoading,
  paymentSelected,
}: {
  data: PaymentSource & { paymentType: string };
  handleUpload: (payload: PaymentSource & { paymentType: string }) => void;
  isLoading: boolean;
  paymentSelected: string;
}) => {
  const theme = useTheme();

  return (
    <TableRow
      key={data.paymentMethodId}
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.grey[50],
          color: "white",
        },
      }}
    >
      <TableCell>
        <Typography variant="subtitle2" fontWeight={600}>
          {data.paymentName}
        </Typography>
      </TableCell>
      <TableCell align="right" />
      <TableCell align="center">
        <CellAction
          handleUpload={() => handleUpload(data)}
          categoryPayment={data.paymentMethodId}
          isLoading={isLoading}
          paymentSelected={paymentSelected}
        />
      </TableCell>
    </TableRow>
  );
};

export default RowTblDataTransaction;
