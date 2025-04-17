"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import BranchAndDateInput from "../sales/components/BranchAndDateInput";
import moment, { Moment } from "moment";
import {
  Button,
  CircularProgress,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  GetListBranchType,
  PostReportDtoPayload,
  ReportResponseType,
} from "../../../types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "../../../utils/fetchApi";
import TableListTransaction from "./components/TableListTransaction";
import { useRootState, useRootStateDispatch } from "../../RootContext";
const Sales = () => {
  const [branchSelected, setBranchSelected] = useState("");
  const [dateSelected, setDateSelected] = useState<moment.Moment | null>(null);
  const [listBranch, setListBranch] = useState<
    { branchId: string; branchName: string }[] | []
  >([]);
  const { getInformationReport } = useRootState();
  const dispatch = useRootStateDispatch();
  const [resultReport, setResultReport] = useState<PostReportDtoPayload | null>(
    null,
  );

  const getListBranch = useMutation({
    mutationFn: async (): Promise<AxiosResponse<GetListBranchType, any>> => {
      const api = await fetchApi();
      return api.post("/branch/list", {});
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        setListBranch(response.data.payload);
        if (!getInformationReport.branch) {
          dispatch({
            type: "changedStateReport",
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

  const getListReportReconPosVsEcom = useMutation({
    mutationFn: async (data: {
      transDate: string;
      branchId: string;
      offset: number;
      limit: number;
    }): Promise<AxiosResponse<ReportResponseType, any>> => {
      const api = await fetchApi();
      return api.post("/recon/report/recon-pos-ecom", data);
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        setResultReport(response.data.payload);
        return;
      }
      throw new Error();
    },
    onError: (err) => {
      console.log("Error fetching report", err);
      setResultReport(null);
    },
  });

  const handleDateSelected = (value: Moment | null) => {
    dispatch({
      type: "changedStateReport",
      payload: {
        key: "date",
        value: value as Moment,
      },
    });
    setResultReport(null);
  };

  const handleSelectedBranch = (value: SelectChangeEvent<string>) => {
    dispatch({
      type: "changedStateReport",
      payload: {
        key: "branch",
        value: value.target.value,
      },
    });
    setResultReport(null);
  };

  useEffect(() => {
    getListBranch.mutate();
    if (!getInformationReport.date) {
      dispatch({
        type: "changedStateReport",
        payload: {
          key: "date",
          value: moment(Date.now()),
        },
      });
    }
  }, []);

  const getDataReport = () => {
    getListReportReconPosVsEcom.mutate({
      transDate: moment(dateSelected).format("YYYY-MM-DD"),
      branchId: branchSelected,
      offset: 0,
      limit: 100,
    });
  };

  useEffect(() => {
    setDateSelected(moment(getInformationReport.date));
  }, [getInformationReport.date]);

  useEffect(() => {
    setBranchSelected(getInformationReport.branch as string);
  }, [getInformationReport.branch]);

  return (
    <PageContainer
      title="Report POS vs E-commerce"
      description="this is Sample page"
    >
      <DashboardCard title="Report Reconciliation POS">
        <>
          <BranchAndDateInput
            listBranch={listBranch}
            branchSelected={branchSelected}
            handleSelectBranch={handleSelectedBranch}
            dateSelected={dateSelected}
            handleSetDate={handleDateSelected}
          />

          <Stack
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Stack>
              <Typography fontWeight={700}>
                Total Sales POS: Rp.{" "}
                {(resultReport?.totalPos || 0).toLocaleString("id-ID")}
              </Typography>
            </Stack>
            <Stack>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  color: "white",
                }}
                onClick={getDataReport}
                disabled={
                  getListReportReconPosVsEcom.isPending ||
                  !branchSelected ||
                  !dateSelected
                }
              >
                Generate Report{" "}
                {getListReportReconPosVsEcom.isPending && (
                  <CircularProgress
                    sx={{ marginLeft: 1, color: "GrayText" }}
                    size={15}
                  />
                )}
              </Button>
            </Stack>
          </Stack>
          <TableListTransaction
            isLoading={getListReportReconPosVsEcom.isPending}
            postReportDtos={resultReport}
            listBranch={listBranch}
          />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default Sales;
