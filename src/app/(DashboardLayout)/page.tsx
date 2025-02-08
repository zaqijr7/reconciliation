"use client";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import TotalIncome from "@/app/(DashboardLayout)/components/dashboard/TotalIncome";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Stack flexDirection={"row"}>
              <DatePicker
                label="Tanggal"
                value={moment(Date.now())}
                sx={{
                  borderColor: "divider",
                  marginBottom: 3,
                  width: 250,
                  marginRight: 3,
                }}
              />
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={null}
                  label="Branch"
                  onChange={() => ""}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <TotalIncome />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
