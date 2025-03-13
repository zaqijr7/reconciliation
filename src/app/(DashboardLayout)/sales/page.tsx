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
import moment from "moment";
import SnackbarBox, { SnackbarBoxRef } from "../components/common/SnackBar";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   maxHeight: "80vh",
//   overflowY: "auto",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const Sales = () => {
  const [listBranch, setListBranch] = useState<
    { branchId: string; branchName: string }[] | []
  >([]);
  const [listPaymentMethod, setListPaymentMethod] = useState<
    PaymentType[] | []
  >([]);
  const snackBarRef = useRef<SnackbarBoxRef>();

  const [transactionHistory, setTransactionHistory] =
    useState<PaymentTransactionPayload | null>(null);
  const [branchSelected, setBranchSelected] = useState("");
  const [dateSelected, setDateSelected] = useState<moment.Moment | null>(null);

  const handleUploadFile = (
    payload: PaymentSource & { paymentType: string },
  ) => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".xlsx";
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
    onSuccess: (response) => {
      console.log(response, "<<< yeay berhasil upload");
      snackBarRef.current?.showSnackbar({
        open: true,
        message: "Berhasil Upload File !",
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

  const handleSelectedBranch = (value: SelectChangeEvent<string>) => {
    setBranchSelected(value.target.value);
  };

  useEffect(() => {
    getListBranch.mutate();
    getListPaymentMethod.mutate();
    setDateSelected(moment(Date.now()));
  }, []);

  useEffect(() => {
    if (dateSelected && branchSelected) {
      getTransactionHistory.mutate({
        transDate: moment(dateSelected).format("YYYY-MM-DD"),
        branchId: branchSelected,
      });
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
            handleSetDate={setDateSelected}
          />
          <TableTransactions
            dataTable={listPaymentMethod}
            handleUpload={handleUploadFile}
            paymentSelected={uploadFile.variables?.payload.paymentMethodId}
            isLoading={uploadFile.isPending || getTransactionHistory.variables}
          />
        </>
      </DashboardCard>
      <SnackbarBox ref={snackBarRef as Ref<SnackbarBoxRef>} />
      {/* <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="modal-cash"
          aria-describedby="transition-modal-cash"
          open={openModalCash}
          onClose={() => {
            setOpenModalCash(false);
            setSourceSelected({ key: "", source: "" });
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModalCash}>
            <Box sx={style}>
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Typography id="modal-cash" variant="h6" component="h2">
                  Input Cash
                </Typography>
                |
                <Typography id="modal-cash" variant="subtitle2" component="h2">
                  {moment().format("DD MMM YYYY")}
                </Typography>
              </Stack>
              <Typography id="transition-modal-cash" sx={{ mt: 2 }}>
                <Table aria-label="collapsible table">
                  <TableBody>
                    {totalCash.map((item) => {
                      return (
                        <TableRow>
                          <TableCell
                            sx={{
                              paddingX: 0,
                              paddingY: 1,
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              {item.nominalCash}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              paddingX: 0,
                              paddingY: 1,
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              X
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              paddingX: 0,
                              paddingY: 1,
                            }}
                          >
                            <Typography variant="h6" fontWeight={600}>
                              <TextField
                                variant="outlined"
                                size="small"
                                sx={{ width: 100 }}
                                type="number"
                              />
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell
                        sx={{
                          paddingX: 0,
                          paddingY: 1,
                        }}
                      />
                      <TableCell
                        align="right"
                        sx={{
                          paddingX: 0,
                          paddingY: 1,
                        }}
                      />
                      <TableCell
                        align="right"
                        sx={{
                          paddingX: 0,
                          paddingY: 1,
                          borderTopWidth: 2,
                          borderTopColor: "black",
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Rp. 3.300.000
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="modal-bank"
          aria-describedby="transition-modal-bank"
          open={openModalDebitCard}
          onClose={() => {
            setOpenModalDebitCard(false);
            setSourceSelected({ key: "", source: "" });
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModalDebitCard}>
            <Box sx={style}>
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Typography id="modal-bank" variant="h6" component="h2">
                  {sourceSelected.key === "credit_card"
                    ? "Credit Card"
                    : "Debit Card"}{" "}
                  {sourceSelected.source}
                </Typography>
                |
                <Typography variant="subtitle2" component="h2">
                  {moment().format("DD MMM YYYY")}
                </Typography>
              </Stack>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                gap={3}
                marginTop={5}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Settlement Amount
                </Typography>
                <TextField size="small" />
              </Stack>
              <Stack marginTop={5}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Receipt Amount
                </Typography>
              </Stack>
              <Typography id="transition-modal-bank" sx={{ mt: 2 }}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          paddingX: 0,
                          paddingY: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          No.
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          paddingX: 0,
                          paddingY: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Receipt Amount
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(3)].map((item, index) => (
                      <TableRow>
                        <TableCell
                          sx={{
                            paddingX: 0,
                            paddingY: 1,
                          }}
                        >
                          <Typography variant="h6" fontWeight={600}>
                            {index + 1}.
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            paddingX: 0,
                            paddingY: 1,
                          }}
                        >
                          <TextField
                            variant="outlined"
                            size="small"
                            sx={{ width: 250 }}
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div> */}
    </PageContainer>
  );
};

export default Sales;
