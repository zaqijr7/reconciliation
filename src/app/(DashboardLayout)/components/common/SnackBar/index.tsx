import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  Alert,
  Box,
  Paper,
  Snackbar,
  SnackbarOrigin,
  useTheme,
} from "@mui/material";

// Define the state type
interface SnackbarState extends SnackbarOrigin {
  open: boolean;
  message: string;
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
    }) => {
      setState({ open: true, message, vertical, horizontal });
    },
    hideSnackbar: () => {
      setState((prev) => ({ ...prev, open: false }));
    },
  }));

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
            variant="filled"
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
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
