import {
  Stack,
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
  // isLoading,
  rightWidth,
  index,
  data,
}: {
  // isLoading: boolean;
  rightWidth: number;
  index: number;
  data: {
    branch: string;
    date: string;
    transTime: string;
    transId: string;
    paymMethod: string;
    amountPOS: number;
    statusAggregator: string;
    statusBank: string;
  };
}) => {
  const theme = useTheme();

  const stickyHeader = {
    position: "sticky",
    right: 0,
    zIndex: "48 !important",
    backgroundColor:
      (index + 1) % 2 === 0 ? "white" : theme.palette.action.hover,
  };

  return (
    <StyledTableRow>
      <TableCell>
        <Typography noWrap variant="body1">
          {data.branch}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          {data.date}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          {data.transTime}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          {data.transId}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          {data.paymMethod}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          Rp. {data.amountPOS.toLocaleString("id-ID")}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          position: "sticky",
          right: `${rightWidth}px`,
          zIndex: "48 !important",
          backgroundColor:
            (index + 1) % 2 === 0 ? "white" : theme.palette.action.hover,
        }}
      >
        <Stack
          sx={{
            display: data.statusAggregator ? "inline-flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 15px",
            backgroundColor: theme.palette.success.main,
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.success.contrastText}
            textAlign={"center"}
          >
            {data.statusAggregator}
          </Typography>
        </Stack>
        {!data.statusAggregator ? "-" : null}
      </TableCell>
      <TableCell sx={stickyHeader}>
        <Stack
          sx={{
            display: data.statusBank ? "inline-flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 15px",
            backgroundColor: theme.palette.success.main,
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.success.contrastText}
            textAlign={"center"}
          >
            {data.statusBank}
          </Typography>
        </Stack>
        {!data.statusBank ? "-" : null}
      </TableCell>
    </StyledTableRow>
  );
};

export default RowTblHeadTransaction;
