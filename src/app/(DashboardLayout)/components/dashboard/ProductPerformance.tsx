import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  TableContainer,
  Stack,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name: string, amount: number) {
  return {
    name,
    amount,
    history: [
      {
        source: "Bank Central Asia (BCA)",
        amount: 600000,
      },
      {
        source: "Bank Rakyat Indonesia",
        amount: 500000,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th">
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton
              sx={{ marginRight: 2 }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              accessKey=""
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography variant="subtitle2" fontWeight={600}>
              {row.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2" fontWeight={600}>
            Rp. {row.amount.toLocaleString()}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
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
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData("Debit Card", 4500000),
  createData("Credit Card", 4300000),
  createData("E- commerce", 3000000),
];

const DetailTransaction = () => {
  return (
    <DashboardCard title="Amount Transaction">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <TableContainer>
          <Table aria-label="collapsible table">
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
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default DetailTransaction;
