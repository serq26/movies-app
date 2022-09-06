import React from "react";
import { Container } from "@mui/system";
import UserFavorites from "../components/Profile/UserFavorites";
import UserComments from "../components/Profile/UserComments";

export default function Profile() {
  return (
    <Container maxWidth="lg">
      <UserFavorites />
      <UserComments />
    </Container>
  );
}
