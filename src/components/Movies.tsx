import React from "react";
import { useMovies } from "../contexts/MoviesContext";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

export default function Movies() {
  const { movies } = useMovies();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const length = 15;

  return (
    <div>
      {movies.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {movies.map((movie) => (
            <Grid xs={2} md={3} key={movie.id}>
              <Item>
                <a href={`/movie/${movie.id}`} title={movie.title}>
                  <img
                    src={
                      movie.poster_path !== ""
                        ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                        : "/images/noImage.png"
                    }
                    alt={movie.title}
                    style={{
                      display: "block",
                      margin: "0 auto",
                      maxWidth: "100%",
                    }}
                  />
                </a>
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from({ length }).map((_, i) => (
            <Grid xs={2} md={3} key={i}>
              <Item>
                <Skeleton height={400} sx={{transform:"scale(1,1)"}}/>
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
