import React, { useState } from "react";
import { useMovies } from "../contexts/MoviesContext";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import { fetchPopularMovies, searchMovie } from "../api";
import MovieCard from "./Movies/MovieCard";

type PropTypes = {
  whichPage: string;
  extraParam?: any;
};

export default function Movies(props: PropTypes) {
  const { movies, setMovies } = useMovies();
  const [page, setPage] = useState(1);
  const hasMoreData = movies.length < 1000;

  const loadMore = async (): Promise<void> => {
    setPage((page) => page + 1);
    let response: any[];

    // Detect on which page the component was created edit, fetch the data accordingly
    if (props.whichPage === "search") { 
      response = await searchMovie(props.extraParam, page);
    } else {
      response = await fetchPopularMovies(page);
    }
    const newArray = movies.concat(response);
    setMovies(newArray);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <InfiniteScroll
      hasMoreData={hasMoreData}
      onBottomHit={loadMore}
      loadOnMount={true}
    >
      {movies.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {movies.map((movie, index) => (
            <Grid xs={2} md={3} key={`${movie.id}-${index}`}>
              <Item>
                <Link to={`/movie/${movie.id}`} title={movie.title}>
                  <MovieCard movie={movie} />
                </Link>
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
          {Array(20)
            .fill([""])
            .map((_, i) => (
              <Grid xs={2} md={3} key={i}>
                <Item>
                  <Skeleton height={400} sx={{ transform: "scale(1,1)" }} />
                </Item>
              </Grid>
            ))}
        </Grid>
      )}
    </InfiniteScroll>
  );
}
