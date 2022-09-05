import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { fetchFavorites, fetchUserComments } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { fetchMovie, Movie } from "../api";
import { UserComment } from "../types";
import MovieCard from "../components/Movies/MovieCard";
import { Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function Profile() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const getFavorites = async (): Promise<void> => {
      setLoading(true);
      const result = await fetchFavorites(user.uid);
      const movies: Movie[] = [];
      for (let i = 0; i < result.length; i++) {
        const movie = await fetchMovie(Number(result[i]));
        movies.push(movie);
      }
      setFavorites(movies);
      setLoading(false);
    };

    const getComments = async (): Promise<void> => {
      setLoading(true);
      const result = await fetchUserComments(user.uid);
      const movieComments: UserComment[] = [];
      for (let i = 0; i < result.length; i++) {
        const movie: Movie = await fetchMovie(result[i].movieId);
        const comment = { movie: movie, comment: result[i] };
        movieComments.push(comment);
      }
      setUserComments(movieComments);
      setLoading(false);
    };

    getFavorites();
    getComments();
  }, [user]);

  const boxSX = {
    background: "rgba(0,0,0,0.4)",
    borderRadius: "15px",
    padding: "20px",
    margin: "50px 0",
  };

  const titleSX = {
    fontWeight: "bold",
    py: "20px",
    fontSize: "20px",
    textAlign: "center",
    color: "#ffa726",
  };

  const commentBoxSX = {
    color: "#fff",
    transition: "all .3s ease-in-out",
    padding: "12px",
    background: "#000",
    borderRadius: "10px",
    "&:hover": {
      background: "#ffa726",
    },
  };

  return (
    <Container maxWidth="lg">
      <Box sx={boxSX}>
        <Typography sx={titleSX}>My Favorite Movies</Typography>
        {loading ? (
          <Loading />
        ) : (
          <Grid container>
            {favorites.map((movie) => (
              <Grid key={movie.id} item xs={12} md={3} p={2}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box sx={boxSX}>
        <Typography sx={titleSX}>My Comments</Typography>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={3}>
            {userComments.map((item, index) => (
              <Grid key={index} item xs={12}>
                <Link to={`/movie/${item.movie.id}`} title={item.movie.title}>
                  <Stack direction="row" sx={commentBoxSX}>
                    <Box
                      component="img"
                      sx={{
                        heigth: 100,
                        width: 60,
                        maxWidth: "100%",
                        borderRadius: 2,
                      }}
                      src={
                        item.movie.poster_path !== null
                          ? `https://image.tmdb.org/t/p/w400/${item.movie.poster_path}`
                          : "/images/no-available-poster.jpg"
                      }
                      alt={item.movie.title}
                    />
                    <Box sx={{ ml: 3 }}>
                      <Typography sx={{ fontWeight: " bold", mb: 2 }}>
                        {item.movie.title}
                      </Typography>
                      <Typography>{item.comment.comment}</Typography>
                    </Box>
                  </Stack>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
