import { Delete, Edit, Search, Upload } from "@mui/icons-material";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const CellAction = ({
  handleUpload,
  handleDelete,
  handleDetail,
  handleEdit,
  categoryPayment,
}: {
  handleUpload: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleDetail: () => void;
  categoryPayment: string;
}) => {
  const conditionalActionBasedOnCategoryPayment = () => {
    if (
      categoryPayment !== "cash" &&
      categoryPayment !== "credit_card" &&
      categoryPayment !== "debit_card"
    ) {
      return (
        <Button onClick={handleUpload}>
          <Upload color="primary" />
        </Button>
      );
    }

    return (
      <Button onClick={handleEdit}>
        <Edit color="primary" />
      </Button>
    );
  };
  return (
    <Stack alignItems={"center"} justifyContent={"center"} direction="row">
      {conditionalActionBasedOnCategoryPayment()}

      <Button onClick={handleDetail}>
        <Search color="info" />
      </Button>
      <Button onClick={handleDelete}>
        <Delete color="error" />
      </Button>
    </Stack>
  );
};

const TableTransactions = ({
  dataTable,
  handleUpload,
  handleDelete,
  handleDetail,
  handleEdit,
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
  handleDelete: () => void;
  handleDetail: () => void;
  handleEdit: ({ key, source }: { key: string; source: string }) => void;
}) => {
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6" fontWeight={600}>
              Transaction From
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="h6" fontWeight={600}>
              Amount
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="h6" fontWeight={600}>
              Action
            </Typography>
          </TableCell>
        </TableRow>
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
                  <TableRow key={item.paymentId}>
                    <TableCell sx={{ paddingLeft: 10 }}>
                      <Typography variant="body1">
                        {item.paymentSource}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">5000</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <CellAction
                        handleDelete={handleDelete}
                        handleDetail={handleDetail}
                        handleEdit={() =>
                          handleEdit({
                            key: item.idSourceCategory,
                            source: item.paymentId,
                          })
                        }
                        handleUpload={() => handleUpload(item.paymentId)}
                        categoryPayment={item.idSourceCategory}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            );
          }

          return (
            <TableRow key={item.idSourceCategory}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {item.transactionForm}
                </Typography>
              </TableCell>
              <TableCell align="right">500000</TableCell>
              <TableCell align="center">
                <CellAction
                  handleDelete={handleDelete}
                  handleDetail={handleDetail}
                  handleEdit={() =>
                    handleEdit({
                      key: item.idSourceCategory,
                      source: item.transactionForm,
                    })
                  }
                  handleUpload={() => handleUpload(item.transactionForm)}
                  categoryPayment={item.idSourceCategory}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableTransactions;
