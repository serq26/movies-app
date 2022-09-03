import { Box, Container } from "@mui/material";
import React from "react";
import CategorySlider from "../components/CategorySlider";
import TrendingMoviesSlider from "../components/TrendingMoviesSlider";
import Movies from "../components/Movies";

export default function Home() {
  return (
    <div>
      <TrendingMoviesSlider />
      <Container component="main" maxWidth="xl">
        <Box my={10}>
          <CategorySlider />
        </Box>
        <Movies />
      </Container>
    </div>
  );
}
