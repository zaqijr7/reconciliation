"use client";

import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootProvider } from "./RootContext";
import PrivateRoute from "../utils/PrivateRoute";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <QueryClientProvider client={queryClient}>
              <RootProvider>
                <PrivateRoute>{children}</PrivateRoute>
              </RootProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
