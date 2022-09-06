import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import CategorySlider from "../components/CategorySlider";
import TrendingMoviesSlider from "../components/TrendingMoviesSlider";
import Movies from "../components/Movies";
import ScrollToTop from "../components/ScrollToTop";
import { useMovies } from "../contexts/MoviesContext";
import { fetchPopularMovies } from "../api";

export default function Home() {
  const { setMovies } = useMovies();

  useEffect(() => {
    const popularMovies = async (): Promise<void> => {
      setMovies(await fetchPopularMovies());
    };
    popularMovies();
  }, []);

  return (
    <div>
      <TrendingMoviesSlider />
      <Container component="main" maxWidth="xl">
        <Box my={10}>
          <CategorySlider />
        </Box>
        <Movies whichPage="home" />
      </Container>
      <ScrollToTop showBelow={250} />
    </div>
  );
}
