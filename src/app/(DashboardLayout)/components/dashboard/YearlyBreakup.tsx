import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { DashboardTransaction } from "../../../../types/apiTypes";

const YearlyBreakup = ({
  allGros,
  allTransaction,
}: {
  allGros: number;
  allTransaction: DashboardTransaction[] | [];
}) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const renang = theme.palette.error.dark;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD", renang],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    labels: allTransaction.map((item) => item.transactionSource) || [],
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <DashboardCard title="Total Sales">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={12} sm={12} justifyContent={"center"}>
          <Chart
            options={optionscolumnchart}
            series={allTransaction.map((item) => item.amount) || []}
            type="donut"
            height={150}
            width={"100%"}
          />
        </Grid>
        {/* column */}
        <Grid item xs={12} sm={12}>
          <Typography variant="h3" fontWeight="700">
            Rp. {allGros.toLocaleString()}
          </Typography>
          {/* <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +9%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              yesterday
            </Typography>
          </Stack> */}
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
