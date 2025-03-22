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
import {
  PaymentSource,
  PaymentTransactionPayload,
  PaymentType,
} from "@/types/apiTypes";

const TableTransactions = ({
  dataTable,
  handleUpload,
  isLoading,
  paymentSelected,
  transactionHistoryData,
}: {
  dataTable: PaymentType[];
  handleUpload: (payload: PaymentSource & { paymentType: string }) => void;
  isLoading: boolean;
  paymentSelected: string;
  transactionHistoryData: PaymentTransactionPayload | null;
}) => {
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <RowTblHeadTransaction isLoading={isLoading} />
      </TableHead>
      <TableBody>
        {dataTable.map((item) => {
          if (item.paymentType === "POS") {
            return (
              <RowTblDataTransaction
                data={{
                  ...item.paymentSources[0],
                  paymentType: item.paymentType,
                }}
                handleUpload={handleUpload}
                key={item.paymentType}
                isLoading={isLoading}
                paymentSelected={paymentSelected}
                transactionHistoryData={transactionHistoryData}
              />
            );
          }

          if (item.paymentSources?.length > 0) {
            return (
              <>
                <TableRow key={item.paymentType}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.paymentType}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" />
                  <TableCell align="right" />
                </TableRow>
                {item.paymentSources.map((payment) => (
                  <RowSubTblTransaction
                    data={{ ...payment, paymentType: item.paymentType }}
                    handleUpload={handleUpload}
                    key={payment.paymentMethodId}
                    isLoading={isLoading}
                    paymentSelected={paymentSelected}
                    transactionHistoryData={transactionHistoryData}
                  />
                ))}
              </>
            );
          }
        })}
      </TableBody>
    </Table>
  );
};

export default TableTransactions;
