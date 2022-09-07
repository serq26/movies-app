import React, { lazy, Suspense } from "react";
import Container from "@mui/material/Container";
import Loading from "../components/Loading";

const SigninForm = lazy(() => import("../components/Signin/SigninForm"));

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <Suspense fallback={<Loading/>}>
        <SigninForm />
      </Suspense>
    </Container>
  );
}
