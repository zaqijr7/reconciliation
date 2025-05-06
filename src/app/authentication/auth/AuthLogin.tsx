import React, { Ref, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useRootState, useRootStateDispatch } from "../../RootContext";
import SnackbarBox, {
  SnackbarBoxRef,
} from "../../(DashboardLayout)/components/common/SnackBar";
import { usePathname, useRouter } from "next/navigation";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const snackBarRef = useRef<SnackbarBoxRef>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useRootStateDispatch();

  interface CheckAccountEvent extends React.FormEvent<HTMLButtonElement> {}

  interface LoginPayload {
    token: string;
    userId: string;
  }

  const checkAccount = (e: CheckAccountEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      dispatch({
        type: "login",
        payload: {
          value: {
            token: "hjsdhjJBJBNKNZXJNJBJB8383pgfnaowyX",
            userId: "testUser",
          } as LoginPayload,
        },
      });
    } else {
      snackBarRef.current?.showSnackbar({
        open: true,
        message: "Incorrect username or password!",
      });
    }
  };

  const { session } = useRootState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.token) {
      router.push("/");
    }
  }, [session?.token, pathname]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={checkAccount}
          sx={{
            color: "white",
          }}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
      <SnackbarBox ref={snackBarRef as Ref<SnackbarBoxRef>} />
    </>
  );
};

export default AuthLogin;
