import {
  styled,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { PostReportDto } from "../../../../../types/apiTypes";

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
  listBranch,
}: {
  // isLoading: boolean;
  rightWidth: number;
  index: number;
  data: PostReportDto;
  listBranch:
    | []
    | {
        branchId: string;
        branchName: string;
      }[];
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
          {listBranch.find((item) => item.branchId === data.branch)?.branchName}{" "}
          {"-"} {data.branch}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          {data.transDate}
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
          {data.paymentMethod}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography noWrap variant="body1">
          Rp. {data.amountPos.toLocaleString("id-ID")}
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
        {!data.inAggregator ? (
          "-"
        ) : (
          <Typography
            sx={{
              padding: "8px 15px",
              backgroundColor: colorBadge(
                data.inAggregator.toLocaleUpperCase(),
              ),
              borderRadius: "5px",
            }}
            variant="caption"
            fontWeight={700}
            color={theme.palette.success.contrastText}
            textAlign={"center"}
          >
            {data.inAggregator.toLocaleUpperCase()}
          </Typography>
        )}
      </TableCell>
      <TableCell sx={{ ...stickyHeader, textAlign: "center" }}>
        {!data.statusInBank ? (
          "-"
        ) : (
          <Typography
            sx={{
              padding: "8px 15px",
              backgroundColor: colorBadge(data.statusInBank.toUpperCase()),
              borderRadius: "5px",
            }}
            variant="caption"
            fontWeight={700}
            color={theme.palette.success.contrastText}
            textAlign={"center"}
          >
            {data.statusInBank.toUpperCase()}
          </Typography>
        )}
      </TableCell>
    </StyledTableRow>
  );
};

export default RowTblHeadTransaction;
