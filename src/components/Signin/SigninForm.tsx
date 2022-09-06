import React, { FormEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createAccount, signIn } from "../../firebase";
import Snackbar from "@mui/material/Snackbar";
import { Toast } from "../Toast";
import Loading from "../Loading";
import { ToastData } from "../../types";

export default function SigninForm() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("register");
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({} as ToastData);

  const validate = (): boolean => {
    if (email === "") {
      setEmailError(true);
      return false;
    } else if (password === "") {
      setPasswordError(true);
      return false;
    } else {
      return true;
    }
  };

  const handleToast = (response: boolean): void => {
    if (response) {
      setToastData({ type: "success", message: "Successfull!" });
    } else {
      setToastData({ type: "error", message: "Signin Failed" });
    }
    setOpenToast(true);
  };

  const handleCreateAccount = async (): Promise<void> => {
    if (validate()) {
      const response = await createAccount(email, password);
      handleToast(response);
    }
  };

  const handleLogin = async (): Promise<void> => {
    if (validate()) {
      const response = await signIn(email, password);
      handleToast(response);
    }
  };

  return (
    <>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Toast
          onClose={() => setOpenToast(false)}
          severity={toastData.type}
          sx={{ width: "100%" }}
        >
          {toastData.message}
        </Toast>
      </Snackbar>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            color: "#fff",
            background: `${activePage === "register" ? "#42a5f5" : "#a56508"}`,
          }}
          onClick={() => setActivePage("register")}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            color: "#fff",
            background: `${activePage === "login" ? "#42a5f5" : "#a56508"}`,
          }}
          onClick={() => setActivePage("login")}
        >
          Login
        </Button>
      </Stack>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#ffa726" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textTransform: "capitalize" }}
        >
          {activePage}
        </Typography>
        <Box sx={{ mt: 1 }} component="form" noValidate>
          <TextField
            margin="normal"
            error={emailError && email === ""}
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            error={passwordError && password === ""}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ color: "#fff", background: "#ffa726" }}
              onClick={() =>
                activePage === "register"
                  ? handleCreateAccount()
                  : handleLogin()
              }
            >
              {activePage.toUpperCase()}
            </Button>
          </Stack>
        </Box>
      </Box>
      {toastData.type === "success" && <Loading />}
    </>
  );
}
