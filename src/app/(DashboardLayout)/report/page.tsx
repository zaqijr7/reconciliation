"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import BranchAndDateInput from "../sales/components/BranchAndDateInput";
import moment, { Moment } from "moment";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  GetListBranchType,
  GetListPaymentMehtodType,
  PaymentType,
} from "../../../types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "../../../utils/fetchApi";
import TableListTransaction from "./components/TableListTransaction";
const Sales = () => {
  const [branchSelected, setBranchSelected] = useState("");
  const [dateSelected, setDateSelected] = useState<moment.Moment | null>(null);
  const [listBranch, setListBranch] = useState<
    { branchId: string; branchName: string }[] | []
  >([]);
  const [listPaymentMethod, setListPaymentMethod] = useState<
    PaymentType[] | []
  >([]);

  const getListBranch = useMutation({
    mutationFn: async (): Promise<AxiosResponse<GetListBranchType, any>> => {
      const api = await fetchApi();
      return api.post("/branch/list", {});
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        setListBranch(response.data.payload);
        setBranchSelected(response.data.payload[0].branchId);
        return;
      }
      throw new Error();
    },
    onError: () => {
      setListBranch([]);
    },
  });

  const getListPaymentMethod = useMutation({
    mutationFn: async (): Promise<
      AxiosResponse<GetListPaymentMehtodType, any>
    > => {
      const api = await fetchApi();
      return api.post("/payment/list", {});
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        setListPaymentMethod(response.data.payload.listPayment);
        return;
      }
      throw new Error();
    },
    onError: () => {
      setListPaymentMethod([]);
    },
  });

  const handleDateSelected = (value: Moment | null) => {
    setDateSelected(value);
  };

  const handleSelectedBranch = (value: SelectChangeEvent<string>) => {
    setBranchSelected(value.target.value);
  };

  useEffect(() => {
    getListBranch.mutate();
    getListPaymentMethod.mutate();
    setDateSelected(moment(Date.now()));
  }, []);
  return (
    <PageContainer
      title="Report POS vs E-commerce"
      description="this is Sample page"
    >
      <DashboardCard title="Report Recon POS vs E-commerce">
        <>
          <BranchAndDateInput
            listBranch={listBranch}
            branchSelected={branchSelected}
            handleSelectBranch={handleSelectedBranch}
            dateSelected={dateSelected}
            handleSetDate={handleDateSelected}
          />
          <TableListTransaction />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default Sales;
