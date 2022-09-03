import { Box, Container } from "@mui/material";
import React, { useRef } from "react";
import CategorySlider from "../components/CategorySlider";
import TrendingMoviesSlider from "../components/TrendingMoviesSlider";
import Movies from "../components/Movies";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  const ref = useRef();
  return (
    <div ref={ref}>
      <TrendingMoviesSlider />
      <Container component="main" maxWidth="xl">
        <Box my={10}>
          <CategorySlider />
        </Box>
        <Movies />
      </Container>
      <ScrollToTop showBelow={250} />
    </div>
  );
}
