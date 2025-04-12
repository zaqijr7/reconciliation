import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

const RowTblHeadTransaction = ({
  isLoading,
  rightWidth,
}: {
  isLoading: boolean;
  rightWidth: number;
}) => {
  const stickyHeader = {
    position: "sticky",
    right: 0,
    zIndex: "9999 !important",
    backgroundColor: "white",
  };
  const theme = useTheme();

  const styleHeader = {
    borderColor: theme.palette.grey[300],
    borderBottomWidth: 1,
    borderStyle: "solid",
  };

  return (
    <TableRow
      sx={{ borderColor: "orange", borderWidth: 1, borderStyle: "solid" }}
    >
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Branch
        </Typography>
      </TableCell>
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Date
        </Typography>
      </TableCell>
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Transaction Time
        </Typography>
      </TableCell>
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Transaction Id
        </Typography>
      </TableCell>
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Payment Method
        </Typography>
      </TableCell>
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Amount POS
        </Typography>
      </TableCell>
      <TableCell sx={styleHeader}>
        <Typography variant="h6" noWrap fontWeight={600}>
          Transaction From
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          position: "sticky",
          right: `${rightWidth}px`,
          zIndex: "9999 !important",
          backgroundColor: "white",
          ...styleHeader,
        }}
        className="sticky-header"
      >
        <Typography variant="h6" noWrap fontWeight={600}>
          Status in Agregator Report
        </Typography>
      </TableCell>
      <TableCell
        sx={{ ...stickyHeader, ...styleHeader }}
        className="sticky-header"
      >
        <Typography variant="h6" noWrap fontWeight={600}>
          Status in Bank
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default RowTblHeadTransaction;
