import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  Alert,
  Box,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Theme,
  useTheme,
} from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

// Define the state type
interface SnackbarState extends SnackbarOrigin {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

// Define the methods that will be accessible via ref
export interface SnackbarBoxRef {
  showSnackbar: (options: Partial<SnackbarState>) => void;
  hideSnackbar: () => void;
}

const SnackbarBox = forwardRef<SnackbarBoxRef, {}>((_, ref) => {
  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });
  const theme = useTheme();

  // Expose methods to the parent via ref
  useImperativeHandle(ref, () => ({
    showSnackbar: ({
      message = "",
      vertical = "top",
      horizontal = "right",
      severity = "success",
    }) => {
      setState({
        open: true,
        message,
        vertical,
        horizontal,
        severity,
      });
    },
    hideSnackbar: () => {
      setState((prev) => ({ ...prev, open: false }));
    },
  }));

  const checkBackgroundColor = (
    severity: "success" | "error" | "info" | "warning",
    theme: Theme,
  ) => {
    switch (severity) {
      case "success":
        return theme.palette.primary.main;
      case "error":
        return theme.palette.error.dark;
      case "info":
        return theme.palette.info.main;
      case "warning":
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{
          vertical: state.vertical,
          horizontal: state.horizontal,
        }}
        autoHideDuration={3000}
        open={state.open}
        onClose={() => setState((prev) => ({ ...prev, open: false }))}
        key={state.vertical + state.horizontal}
      >
        <Paper elevation={3}>
          <Alert
            icon={
              state.severity === "error" ? (
                <Error
                  sx={{
                    color: theme.palette.error.contrastText,
                    fontSize: 20,
                  }}
                />
              ) : (
                <span role="img" aria-label="success">
                  <CheckCircle
                    sx={{
                      color: theme.palette.success.contrastText,
                      fontSize: 20,
                    }}
                  />
                </span>
              )
            }
            variant="filled"
            sx={{
              width: "100%",
              backgroundColor: checkBackgroundColor(state.severity, theme),
              color: "white",
            }}
          >
            {state.message}
          </Alert>
        </Paper>
      </Snackbar>
    </Box>
  );
});

export default SnackbarBox;
