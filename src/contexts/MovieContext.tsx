import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMovie } from "../api";
import { Movie } from "../types";

interface PropTypes {
  children: React.ReactNode;
  movieId: number;
}

export type MovieContextType = {
  movie: Movie;
  setMovie: (movie: Movie) => void;
  movieId: number;
  setMovieId: (movieId: number) => void;
};

const MovieContext = createContext<MovieContextType | null>(null);

const MovieProvider = (props: PropTypes) => {
  const [movieId, setMovieId] = useState<number>(props.movieId);
  const [movie, setMovie] = useState<Movie>({} as Movie);

  const values = { movie, setMovie, movieId, setMovieId };

  useEffect(() => {
    const getMovie = async (): Promise<void> => {
      setMovie(await fetchMovie(movieId));
    };
    getMovie();
  }, [movieId]);

  return (
    <MovieContext.Provider value={values}>
      {props.children}
    </MovieContext.Provider>
  );
};

const useMovie = () => useContext(MovieContext);

export { MovieProvider, useMovie };
