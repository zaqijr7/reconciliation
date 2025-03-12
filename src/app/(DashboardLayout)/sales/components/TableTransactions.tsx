import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RowTblHeadTransaction from "./RowTblHeadTransaction";
import RowTblDataTransaction from "./RowTblDataTransaction";
import RowSubTblTransaction from "./RowSubTblTransaction";

const TableTransactions = ({
  dataTable,
  handleUpload,
}: {
  dataTable: {
    transactionForm: string;
    idSourceCategory: string;
    subTransaction: {
      idSourceCategory: string;
      paymentSource: string;
      paymentId: string;
    }[];
  }[];
  handleUpload: (key: string) => void;
}) => {
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <RowTblHeadTransaction />
      </TableHead>
      <TableBody>
        {dataTable.map((item) => {
          if (item.subTransaction?.length > 0) {
            return (
              <>
                <TableRow key={item.idSourceCategory}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.transactionForm}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" />
                  <TableCell align="right" />
                </TableRow>
                {item.subTransaction.map((item) => (
                  <RowSubTblTransaction
                    data={item}
                    handleUpload={handleUpload}
                    key={item.idSourceCategory}
                  />
                ))}
              </>
            );
          }

          return (
            <RowTblDataTransaction
              data={item}
              handleUpload={handleUpload}
              key={item.idSourceCategory}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableTransactions;
