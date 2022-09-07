import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { lazy,Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../api";
import MoviesList from "../components/Movies/MoviesList";
import { useMovies } from "../contexts/MoviesContext";

const ScrollToTop = lazy(() => import("../components/ScrollToTop"));

export default function Search() {
  const { state } = useLocation();
  const { setMovies } = useMovies();

  useEffect(() => {
    setMovies([]);
    const getData = setTimeout(async () => {
      setMovies(await searchMovie(state as string));
    }, 500);

    return () => {
      clearTimeout(getData);
    };
  }, [state]);

  return (
    <Container maxWidth="xl">
      <Typography
        component="p"
        sx={{
          p: 5,
          textAlign: "center",
          fontSize: "18px",
          textTransform: "capitalize",
        }}
      >
        Results for "{state as string}"
      </Typography>
      <MoviesList whichPage="search" extraParam={state} />
      <Suspense><ScrollToTop showBelow={250} /></Suspense>
    </Container>
  );
}
