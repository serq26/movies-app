import React, { FormEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createAccount, signIn } from "../firebase";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("register");

  const handleCreateAccount = async (): Promise<void> => {
    await createAccount(email, password);
    setOpenToast(true);
  };

  const handleLogin = async (): Promise<void> => {
    await signIn(email, password);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfull!
        </Alert>
      </Snackbar>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ color: "#fff", background: `${activePage === "register" ? "#42a5f5" : "#a56508"}` }}
          onClick={() => setActivePage("register")}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ color: "#fff", background: `${activePage === "login" ? "#42a5f5" : "#a56508"}` }}
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
        <Typography component="h1" variant="h5" sx={{textTransform: "capitalize"}}>
          {activePage}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
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
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack sx={{mt:2}}>
            <Button
              fullWidth
              variant="contained"
              sx={{ color: "#fff", background: "#ffa726" }}
              onClick={() => activePage === "register" ?  handleCreateAccount() : handleLogin()}
            >
              {activePage.toUpperCase()}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
