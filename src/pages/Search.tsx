import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../api";
import Movies from "../components/Movies";
import ScrollToTop from "../components/ScrollToTop";
import { useMovies } from "../contexts/MoviesContext";

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
      <Movies whichPage="search" extraParam={state} />
      <ScrollToTop showBelow={250} />
    </Container>
  );
}
