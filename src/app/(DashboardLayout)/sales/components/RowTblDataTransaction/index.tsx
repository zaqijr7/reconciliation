import {
  Popover,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CellAction from "../CellAction";
import { PaymentSource, PaymentTransactionPayload } from "@/types/apiTypes";
import { CancelTwoTone, CheckCircleTwoTone } from "@mui/icons-material";

const RowTblDataTransaction = ({
  data,
  handleUpload,
  isLoading,
  paymentSelected,
  transactionHistoryData,
}: {
  data: PaymentSource & { paymentType: string };
  handleUpload: (payload: PaymentSource & { paymentType: string }) => void;
  isLoading: boolean;
  paymentSelected: string;
  transactionHistoryData: PaymentTransactionPayload | null;
}) => {
  const theme = useTheme();
  const getDetailTransaction = () => {
    if (transactionHistoryData) {
      return transactionHistoryData.transactionList.filter(
        (item) => item.paymentId === data.paymentMethodId,
      )[0];
    }
    return null;
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
      <TableCell>
        <Typography
          noWrap
          width={300}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {getDetailTransaction()?.fileName || "-"}
        </Typography>
        {getDetailTransaction()?.fileName && (
          <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: "none" }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>
              {getDetailTransaction()?.fileName || "-"}
            </Typography>
          </Popover>
        )}
      </TableCell>
      <TableCell align="right">
        <Typography variant="subtitle2" fontWeight={600}>
          {getDetailTransaction()?.amount
            ? `Rp. ${getDetailTransaction()?.amount.toLocaleString("id-ID")}`
            : "-"}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="subtitle2" fontWeight={600}>
          {getDetailTransaction()?.statusRecon ? (
            <CheckCircleTwoTone color="success" />
          ) : (
            <CancelTwoTone color="error" />
          )}
        </Typography>
      </TableCell>
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
