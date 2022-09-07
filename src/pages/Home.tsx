import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import React, { useEffect, lazy, Suspense } from "react";
import TrendingMoviesSlider from "../components/Home/TrendingMoviesSlider";
import { useMovies } from "../contexts/MoviesContext";
import { fetchPopularMovies } from "../api";
import Loading from "../components/Loading";

const CategorySlider = lazy(() => import("../components/Home/CategorySlider"));
const MoviesList = lazy(() => import("../components/Movies/MoviesList"));
const ScrollToTop = lazy(() => import("../components/ScrollToTop"));

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
          <Suspense fallback={<Loading/>}>
            <CategorySlider />
          </Suspense>
        </Box>
        <Suspense fallback={<Loading/>}>
          <MoviesList whichPage="home" />
        </Suspense>
      </Container>
      <Suspense fallback={<Loading/>}>
        <ScrollToTop showBelow={250} />
      </Suspense>
    </div>
  );
}
