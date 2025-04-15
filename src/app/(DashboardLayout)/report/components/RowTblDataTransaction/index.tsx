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

  const colorBadge = (status: string) => {
    if (status === "OK WITH NOTES") {
      return theme.palette.warning.main;
    } else if (status === "OK") {
      return theme.palette.success.main;
    } else if (status === "NOT OK") {
      return theme.palette.error.main;
    }
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
          textAlign: "center",
          backgroundColor:
            (index + 1) % 2 === 0 ? "white" : theme.palette.action.hover,
        }}
      >
        {!data.statusAggregator ? (
          "-"
        ) : (
          <Typography
            sx={{
              padding: "8px 15px",
              backgroundColor: colorBadge(
                data.statusAggregator.toLocaleUpperCase(),
              ),
              borderRadius: "5px",
            }}
            variant="caption"
            fontWeight={700}
            color={theme.palette.success.contrastText}
            textAlign={"center"}
          >
            {data.statusAggregator.toLocaleUpperCase()}
          </Typography>
        )}
      </TableCell>
      <TableCell sx={{ ...stickyHeader, textAlign: "center" }}>
        {!data.statusBank ? (
          "-"
        ) : (
          <Typography
            sx={{
              padding: "8px 15px",
              backgroundColor: colorBadge(data.statusBank.toUpperCase()),
              borderRadius: "5px",
            }}
            variant="caption"
            fontWeight={700}
            color={theme.palette.success.contrastText}
            textAlign={"center"}
          >
            {data.statusBank.toUpperCase()}
          </Typography>
        )}
      </TableCell>
    </StyledTableRow>
  );
};

export default RowTblHeadTransaction;
