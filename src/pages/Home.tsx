import { Box, Container } from "@mui/material";
import React from "react";
import CategorySlider from "../components/CategorySlider";
import ImageSlider from "../components/ImageSlider";
import Movies from "../components/Movies";

export default function Home() {
  return (
    <Container maxWidth="xl">
      <ImageSlider />
      <Box my={10}>
        <CategorySlider />
      </Box>
      <Movies />
    </Container>
  );
}
