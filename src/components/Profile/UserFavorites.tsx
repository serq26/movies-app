import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { fetchFavorites } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { fetchMovie } from "../../api";
import { Movie } from "../../types";
import MovieCard from "../../components/Movies/MovieCard";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Loading from "../Loading";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const getFavorites = async (): Promise<void> => {
      try {
        setLoading(true);
        const result = await fetchFavorites(user.uid);
        const movies: Movie[] = [];
        for (let i = 0; i < result.length; i++) {
          const movie = await fetchMovie(Number(result[i]));
          movies.push(movie);
        }
        setFavorites(movies);
        setLoading(false);
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    getFavorites();
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

  const emptyMessageSX = {
    color: "#fff",
    display: "block",
    margin: "20px auto"
  }

  return (
    <Box sx={boxSX}>
      <Typography sx={titleSX}>My Favorite Movies</Typography>
      {loading ? (
        <Loading />
      ) : (
        <Grid container>
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={6} md={3} p={2}>
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </Grid>
            ))
          ) : (
            <Typography component="p" sx={emptyMessageSX}>
              You haven't added any movies to your favorites yet.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}
