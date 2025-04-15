import {
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowTblHeadTransaction from "../RowTblHeadTransaction";
import RowTblDataTransaction from "../RowTblDataTransaction";
import TablePaginationActions from "../TablePaginationAction";
import { useEffect, useState } from "react";
import dummy from "./dummyFile.json";

const TableTransactions = ({}: {}) => {
  const [rightWidth, setRightWidth] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    const lastCol = document.getElementsByClassName(
      "sticky-header",
    ) as HTMLCollectionOf<HTMLElement>;
    if (lastCol) {
      setRightWidth(lastCol[lastCol.length - 1].offsetWidth);
    }
  }, []);

  return (
    <>
      <TableContainer sx={{ width: "100%", maxHeight: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <RowTblHeadTransaction rightWidth={rightWidth} />
          </TableHead>
          <TableBody>
            {dummy.map((item, index) => {
              return (
                <RowTblDataTransaction
                  rightWidth={rightWidth}
                  index={index}
                  data={item}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[50, 100]}
              colSpan={8}
              count={rowsPerPage}
              rowsPerPage={rowsPerPage}
              page={0}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={() => {}}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TableTransactions;
