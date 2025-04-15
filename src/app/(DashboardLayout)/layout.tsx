"use client";
import {
  styled,
  Container,
  Box,
  Button,
  Modal,
  Fade,
  Typography,
  Backdrop,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { Ref, useRef, useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useRootState } from "../RootContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import fetchApi from "../../utils/fetchApi";
import { QuestionMark } from "@mui/icons-material";
import moment from "moment";
import SnackbarBox, { SnackbarBoxRef } from "./components/common/SnackBar";
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isSalesPage = usePathname().includes("sales");
  const rootState = useRootState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const snackBarRef = useRef<SnackbarBoxRef>();

  const submitTransaction = useMutation({
    mutationFn: async ({
      transDate,
      branchId,
    }: {
      transDate: string;
      branchId: string;
    }): Promise<AxiosResponse<any, any>> => {
      const api = await fetchApi();
      return api.post("/rekon/batch", { transDate, branchId });
    },
    onSuccess: (response) => {
      if (response.data.result === 200) {
        console.log("Transaction submitted successfully", response);
        snackBarRef.current?.showSnackbar({
          open: true,
          message: "Reconciliation is being processed",
        });
        handleClose();
      } else throw new Error();
    },
    onError: () => {
      console.log("Error submitting transaction");
    },
  });

  const handleSubmitTransaction = () => {
    submitTransaction.mutate({
      transDate: moment(rootState.getInformationRecon.dateTransaction).format(
        "YYYY-MM-DD",
      ),
      branchId: rootState.getInformationRecon.branch,
    });
  };

  return (
    <>
      <MainWrapper className="mainwrapper">
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper className="page-wrapper tw-relative">
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Container
            sx={{
              paddingTop: "20px",
              maxWidth: "1200px",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Page Route */}
            {/* ------------------------------------------- */}
            <Box sx={{ minHeight: "calc(100vh - 170px)", paddingBottom: 7 }}>
              {children}
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
        </PageWrapper>
        {isSalesPage && (
          <div className="tw-fixed tw-w-full tw-bottom-0 tw-p-5 tw-bg-white tw-shadow-2xl tw-border-t tw-z-20">
            <div className="tw-flex tw-items-center tw-justify-end">
              <Button
                color="primary"
                variant="contained"
                sx={{ color: "white" }}
                onClick={handleOpen}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        <div>
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
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                  mb={5}
                >
                  <Stack
                    display={"flex"}
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"80px"}
                    height={"80px"}
                    borderRadius={"50%"}
                    bgcolor={"#E8F0FE"}
                  >
                    <QuestionMark color={"info"} fontSize="large" />
                  </Stack>
                </Stack>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  textAlign={"center"}
                  sx={{ textTransform: "uppercase" }}
                >
                  Are you sure, you want to reconcile for this date and branch?
                </Typography>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  gap={2}
                  mt={5}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      color: "white",
                    }}
                    onClick={handleSubmitTransaction}
                    disabled={submitTransaction.isPending}
                  >
                    YES{" "}
                    {submitTransaction.isPending && (
                      <CircularProgress sx={{ marginLeft: 1 }} size={15} />
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                      color: "primary",
                      borderWidth: 1.5,
                    }}
                    onClick={handleClose}
                  >
                    CANCEL
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </div>
      </MainWrapper>
      <SnackbarBox ref={snackBarRef as Ref<SnackbarBoxRef>} />
    </>
  );
}
