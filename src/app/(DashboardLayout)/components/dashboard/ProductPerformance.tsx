import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Stack,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import * as React from "react";
import { DashboardTransaction } from "../../../../types/apiTypes";

function Row(props: { row: DashboardTransaction }) {
  const { row } = props;
  // const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th">
          <Stack direction={"row"} alignItems={"center"}>
            {/* <IconButton
              sx={{ marginRight: 2 }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              accessKey=""
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton> */}
            <Typography variant="subtitle2" fontWeight={600}>
              {row.transactionSource}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2" fontWeight={600}>
            Rp. {row.amount.toLocaleString()}
          </Typography>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight={600}>Source</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600}>Amount</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.source}>
                      <TableCell>{historyRow.source}</TableCell>
                      <TableCell align="right">
                        Rp. {historyRow.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

const DetailTransaction = ({
  data,
  loading,
}: {
  data: DashboardTransaction[];
  loading: boolean;
}) => {
  return (
    <DashboardCard title="Amount Transaction">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Transaction From
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Amount
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {data.map((row) => (
                  <Row key={row.paymentId} row={row} />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default DetailTransaction;
