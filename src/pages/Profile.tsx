import React, { lazy, Suspense } from "react";
import Container from '@mui/material/Container';
import Loading from "../components/Loading";

const UserFavorites = lazy(() => import("../components/Profile/UserFavorites"));
const UserComments = lazy(() => import("../components/Profile/UserComments"));

export default function Profile() {
  return (
    <Container maxWidth="lg">
      <Suspense fallback={<Loading/>}><UserFavorites /></Suspense>
      <Suspense fallback={<Loading/>}><UserComments /></Suspense>
    </Container>
  );
}
