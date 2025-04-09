"use client";
import { styled, Container, Box, Button } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useRootState, useRootStateDispatch } from "../RootContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import fetchApi from "../../utils/fetchApi";
import moment from "moment";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isSalesPage = usePathname().includes("sales");
  const dispatch = useRootStateDispatch();
  const rootState = useRootState();

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
              onClick={handleSubmitTransaction}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </MainWrapper>
  );
}
