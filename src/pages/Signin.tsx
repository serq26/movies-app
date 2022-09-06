import React from "react";
import Container from "@mui/material/Container";
import SigninForm from "../components/Signin/SigninForm";

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <SigninForm />
    </Container>
  );
}
