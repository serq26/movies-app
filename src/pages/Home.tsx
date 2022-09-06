import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import CategorySlider from "../components/Home/CategorySlider";
import TrendingMoviesSlider from "../components/Home/TrendingMoviesSlider";
import MoviesList from "../components/Movies/MoviesList";
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
        <MoviesList whichPage="home" />
      </Container>
      <ScrollToTop showBelow={250} />
    </div>
  );
}
