import {
  styled,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RowTblHeadTransaction = ({
  isLoading,
  rightWidth,
  index,
}: {
  isLoading: boolean;
  rightWidth: number;
  index: number;
}) => {
  const theme = useTheme();

  const stickyHeader = {
    position: "sticky",
    right: 0,
    zIndex: "9990 !important",
    backgroundColor:
      (index + 1) % 2 === 0 ? "white" : theme.palette.action.hover,
  };

  return (
    <StyledTableRow>
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
      <TableCell
        sx={{
          position: "sticky",
          right: `${rightWidth}px`,
          zIndex: "9990 !important",
          backgroundColor:
            (index + 1) % 2 === 0 ? "white" : theme.palette.action.hover,
        }}
      >
        <Typography variant="body1">Status in Agregator Report</Typography>
      </TableCell>
      <TableCell sx={stickyHeader}>
        <Typography variant="body1">Status in Bank</Typography>
      </TableCell>
    </StyledTableRow>
  );
};

export default RowTblHeadTransaction;
