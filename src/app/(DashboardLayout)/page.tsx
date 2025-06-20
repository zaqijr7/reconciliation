"use client";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import TotalIncome from "@/app/(DashboardLayout)/components/dashboard/TotalIncome";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useRootState, useRootStateDispatch } from "../RootContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import fetchApi from "../../utils/fetchApi";
import { useEffect, useState } from "react";
import { DashboardResponseApi, GetListBranchType } from "../../types/apiTypes";

const Dashboard = () => {
  const rootState = useRootState();
  const dispatch = useRootStateDispatch();
  const { getDashboadReport } = useRootState();
  const [listBranch, setListBranch] = useState<
    { branchId: string; branchName: string }[] | []
  >([]);
  const [branchSelected, setBranchSelected] = useState("");
  const [dateSelectedStart, setDateSelectedStart] =
    useState<moment.Moment | null>(null);
  const [dateSelectedEnd, setDateSelectedEnd] = useState<moment.Moment | null>(
    null,
  );

  const getDataTable = useMutation({
    mutationFn: async ({
      branchId,
      startDate,
      endDate,
    }: {
      branchId: string;
      startDate: string;
      endDate: string;
    }): Promise<AxiosResponse<DashboardResponseApi, any>> => {
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
        if (!getDashboadReport.branch) {
          dispatch({
            type: "changedStateDasboard",
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
    if (!getDashboadReport.dateStart) {
      dispatch({
        type: "changedStateDasboard",
        payload: {
          key: "dateStart",
          value: moment(Date.now()),
        },
      });
    }
    if (!getDashboadReport.dateEnd) {
      dispatch({
        type: "changedStateDasboard",
        payload: {
          key: "dateEnd",
          value: moment(Date.now()),
        },
      });
    }
  }, []);

  const handleDateSelected = (
    value: Moment | null,
    key: "dateStart" | "dateEnd",
  ) => {
    dispatch({
      type: "changedStateDasboard",
      payload: {
        key,
        value: value as Moment,
      },
    });
  };

  const handleSelectedBranch = (value: SelectChangeEvent<string>) => {
    dispatch({
      type: "changedStateDasboard",
      payload: {
        key: "branch",
        value: value.target.value,
      },
    });
  };

  useEffect(() => {
    if (branchSelected || dateSelectedStart || dateSelectedEnd) {
      getDataTable.mutate({
        branchId: branchSelected,
        startDate: moment(dateSelectedStart).format("YYYY-MM-DD"),
        endDate: moment(dateSelectedEnd).format("YYYY-MM-DD"),
      });
    }
  }, [branchSelected, dateSelectedStart, dateSelectedEnd]);

  useEffect(() => {
    setDateSelectedStart(moment(getDashboadReport.dateStart));
    setDateSelectedEnd(moment(getDashboadReport.dateEnd));
  }, [getDashboadReport.dateStart, getDashboadReport.dateEnd]);

  useEffect(() => {
    setBranchSelected(getDashboadReport.branch as string);
  }, [getDashboadReport.branch]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Stack flexDirection={"row"}>
              <DatePicker
                label="Start Date"
                value={moment(dateSelectedStart)}
                sx={{
                  borderColor: "divider",
                  marginBottom: 3,
                  width: 250,
                  marginRight: 3,
                }}
                onChange={(e) => handleDateSelected(e, "dateStart")}
                format="DD/MM/YYYY"
              />
              <DatePicker
                label="To Date"
                value={moment(dateSelectedEnd)}
                sx={{
                  borderColor: "divider",
                  marginBottom: 3,
                  width: 250,
                  marginRight: 3,
                }}
                onChange={(e) => handleDateSelected(e, "dateEnd")}
                format="DD/MM/YYYY"
              />
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={branchSelected}
                  label="Branch"
                  onChange={(e) => handleSelectedBranch(e)}
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
            <ProductPerformance
              loading={getDataTable.isPending}
              data={getDataTable.data?.data?.payload?.transactionList || []}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup
                  allGros={getDataTable.data?.data?.payload?.allGross || 0}
                  allTransaction={
                    getDataTable.data?.data?.payload?.transactionList || []
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TotalIncome
                  allNet={getDataTable.data?.data?.payload?.allNet || 0}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
