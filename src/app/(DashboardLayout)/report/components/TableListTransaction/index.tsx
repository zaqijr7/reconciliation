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

const TableTransactions = ({}: {}) => {
  return (
    <TableContainer sx={{ width: "100%", maxHeight: 500 }}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <RowTblHeadTransaction />
        </TableHead>
        <TableBody>
          {[...Array(20)].map((item) => {
            item;
            return (
              <RowTblDataTransaction
              // data={{
              //   ...item.paymentSources[0],
              //   paymentType: item.paymentType,
              // }}
              // handleUpload={handleUpload}
              // key={item.paymentType}
              // isLoading={isLoading}
              // paymentSelected={paymentSelected}
              // transactionHistoryData={transactionHistoryData}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={9}
              count={50}
              rowsPerPage={100}
              page={1}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              sx={{ backgroundColor: "#F5F5F5" }}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableTransactions;
