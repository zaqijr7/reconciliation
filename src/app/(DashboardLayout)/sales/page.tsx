"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TableTransactions from "./components/TableTransactions";
import BranchAndDateInput from "./components/BranchAndDateInput";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/utils/fetchApi";
import {
  GetListBranchType,
  GetListPaymentMehtodType,
  PaymentSource,
  PaymentTransactionPayload,
  PaymentTransactionResponse,
  PaymentType,
} from "@/types/apiTypes";
import { AxiosResponse } from "axios";
import { Ref, useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import moment, { Moment } from "moment";
import SnackbarBox, { SnackbarBoxRef } from "../components/common/SnackBar";
import { useRootState, useRootStateDispatch } from "@/app/RootContext";

const Sales = () => {
  const [listBranch, setListBranch] = useState<
    { branchId: string; branchName: string }[] | []
  >([]);
  const [listPaymentMethod, setListPaymentMethod] = useState<
    PaymentType[] | []
  >([]);
  const snackBarRef = useRef<SnackbarBoxRef>();
  const dispatch = useRootStateDispatch();
  const [transactionHistory, setTransactionHistory] =
    useState<PaymentTransactionPayload | null>(null);
  const [branchSelected, setBranchSelected] = useState("");
  const [dateSelected, setDateSelected] = useState<moment.Moment | null>(null);
  const { getInformationRecon } = useRootState();

  const handleUploadFile = (
    payload: PaymentSource & { paymentType: string },
  ) => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".xlsx, .csv";
    input.style.display = "none";

    input.addEventListener("change", () => {
      const file = input.files?.length ? input.files[0] : null;
      if (!file) return;
      uploadFile.mutate({ payload, file });
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const uploadFile = useMutation({
    mutationFn: async ({
      payload,
      file,
    }: {
      payload: PaymentSource & { paymentType: string };
      file: File;
    }): Promise<AxiosResponse<GetListBranchType, any>> => {
      const api = await fetchApi();
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "jsonData",
        JSON.stringify({
          pmId: payload.paymentMethodId,
          branchId: branchSelected,
          transDate: moment(dateSelected).format("YYYY-MM-DD"),
          paymentType: payload.paymentType,
        }),
      );

      return api.post("/upload/file", formData);
    },
    onSuccess: () => {
      snackBarRef.current?.showSnackbar({
        open: true,
        message: "Upload success!",
      });
    },
    onError: (error) => {
      console.log(error, "<< ini error upload file");
    },
    onSettled: () => {
      getTransactionHistory.mutate({
        transDate: moment(dateSelected).format("YYYY-MM-DD"),
        branchId: branchSelected,
      });
    },
  });

  const getListBranch = useMutation({
    mutationFn: async (): Promise<AxiosResponse<GetListBranchType, any>> => {
      const api = await fetchApi();
      return api.post("/branch/list", {});
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

  const getTransactionHistory = useMutation({
    mutationFn: async ({
      transDate,
      branchId,
    }: {
      transDate: string;
      branchId: string;
    }): Promise<AxiosResponse<PaymentTransactionResponse, any>> => {
      const api = await fetchApi();
      return api.post("/branch/transactions", { transDate, branchId });
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        setTransactionHistory(response.data.payload);
      } else throw new Error();
    },
    onError: () => {
      setTransactionHistory(null);
    },
  });

  const handleDateSelected = (value: Moment | null) => {
    dispatch({
      type: "changed",
      payload: {
        key: "dateTransaction",
        value: value as Moment,
      },
    });
  };

  const handleSelectedBranch = (value: SelectChangeEvent<string>) => {
    dispatch({
      type: "changed",
      payload: {
        key: "branch",
        value: value.target.value,
      },
    });
  };

  useEffect(() => {
    getListBranch.mutate();
    getListPaymentMethod.mutate();
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
    setDateSelected(moment(getInformationRecon.dateTransaction));
  }, [getInformationRecon.dateTransaction]);

  useEffect(() => {
    setBranchSelected(getInformationRecon.branch as string);
  }, [getInformationRecon.branch]);

  useEffect(() => {
    if (dateSelected && branchSelected) {
      getTransactionHistory.mutate({
        transDate: moment(dateSelected).format("YYYY-MM-DD"),
        branchId: branchSelected,
      });

      const getHistoryTransactionInterval = setInterval(() => {
        getTransactionHistory.mutate({
          transDate: moment(dateSelected).format("YYYY-MM-DD"),
          branchId: branchSelected,
        });
      }, 3000);

      return () => {
        clearInterval(getHistoryTransactionInterval);
      };
    }
  }, [dateSelected, branchSelected]);

  return (
    <PageContainer title="Sales" description="this is Sample page">
      <DashboardCard title="Sales">
        <>
          <BranchAndDateInput
            listBranch={listBranch}
            branchSelected={branchSelected}
            handleSelectBranch={handleSelectedBranch}
            dateSelected={dateSelected}
            handleSetDate={handleDateSelected}
          />
          <TableTransactions
            dataTable={listPaymentMethod}
            handleUpload={handleUploadFile}
            paymentSelected={
              uploadFile.variables?.payload?.paymentMethodId as string
            }
            isLoading={uploadFile.isPending || getTransactionHistory.isPending}
            transactionHistoryData={transactionHistory}
          />
        </>
      </DashboardCard>
      <SnackbarBox ref={snackBarRef as Ref<SnackbarBoxRef>} />
    </PageContainer>
  );
};

export default Sales;
