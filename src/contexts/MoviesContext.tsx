import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPopularMovies, Movie } from "../api";

interface PropTypes {
  children: React.ReactNode;
}

export type MovieContextType = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};

const MovieContext = createContext<MovieContextType | null>(null);

const MoviesProvider = (props: PropTypes) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const values = { movies, setMovies };

  useEffect(() => {
    const movieCategories = async (): Promise<void> => {
      setMovies(await fetchPopularMovies());
    };
    movieCategories();
  }, []);

  useEffect(() => {
    setMovies(movies);
  }, [movies]);

  return (
    <MovieContext.Provider value={values}>
      {props.children}
    </MovieContext.Provider>
  );
};

const useMovies = () => useContext(MovieContext);

export { MoviesProvider, useMovies };
