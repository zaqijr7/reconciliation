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
import { useRootState, useRootStateDispatch } from "../RootContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import fetchApi from "../../utils/fetchApi";
import { useEffect, useState } from "react";
import { GetListBranchType } from "../../types/apiTypes";

const Dashboard = () => {
  const rootState = useRootState();
  const dispatch = useRootStateDispatch();
  const { getInformationRecon } = useRootState();
  const [listBranch, setListBranch] = useState<
    { branchId: string; branchName: string }[] | []
  >([]);
  const [branchSelected, setBranchSelected] = useState("");
  const [dateSelected, setDateSelected] = useState<moment.Moment | null>(null);

  const getDataTable = useMutation({
    mutationFn: async ({
      branchId,
      startDate,
      endDate,
    }: {
      branchId: string;
      startDate: string;
      endDate: string;
    }): Promise<AxiosResponse<any, any>> => {
      const api = await fetchApi({
        headers: {
          Authorization: `Bearer ${rootState.session.token}`,
        },
        dispatch,
      });
      return api.post("/branch/dashboard", {
        branchId,
        startDate,
        endDate,
        user: rootState.session.user,
      });
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        return;
      } else throw new Error();
    },
    onError: () => {
      return;
    },
  });

  const getListBranch = useMutation({
    mutationFn: async (): Promise<AxiosResponse<GetListBranchType, any>> => {
      const api = await fetchApi({
        headers: {
          Authorization: `Bearer ${rootState.session.token}`,
        },
        dispatch,
      });
      return api.post("/branch/list", { user: rootState.session.user });
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        setListBranch(response.data.payload);
        if (!getInformationRecon.branch) {
          dispatch({
            type: "changed",
            payload: {
              key: "branch",
              value: response.data.payload[0].branchId,
            },
          });
        }

        return;
      }
      throw new Error();
    },
    onError: () => {
      setListBranch([]);
    },
  });

  useEffect(() => {
    getListBranch.mutate();
    if (!getInformationRecon.dateTransaction) {
      dispatch({
        type: "changed",
        payload: {
          key: "dateTransaction",
          value: moment(Date.now()),
        },
      });
    }
  }, []);

  useEffect(() => {
    if (branchSelected || dateSelected) {
      getDataTable.mutate({
        branchId: branchSelected,
        startDate: moment(dateSelected).format("YYYY-MM-DD"),
        endDate: moment(dateSelected).subtract(7, "days").format("YYYY-MM-DD"),
      });
    }
  }, [branchSelected, dateSelected]);

  useEffect(() => {
    console.log(getInformationRecon.dateTransaction, "<<< test");

    setDateSelected(moment(getInformationRecon.dateTransaction));
  }, [getInformationRecon.dateTransaction]);

  useEffect(() => {
    setBranchSelected(getInformationRecon.branch as string);
  }, [getInformationRecon.branch]);

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
                  value={branchSelected}
                  label="Branch"
                  onChange={() => ""}
                >
                  {listBranch?.map((item) => {
                    return (
                      <MenuItem key={item.branchId} value={item.branchId}>
                        {item.branchName}
                      </MenuItem>
                    );
                  })}
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
