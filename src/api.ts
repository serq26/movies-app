import axios from "axios";
export const apiKey: string | undefined = process.env.TMDB_API_KEY;

export interface MovieCategory {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export async function fetchCategories(): Promise<MovieCategory[]> {
  const result = axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    )
    .then((res) => res.data.genres as MovieCategory[]);
  return result;
}

export async function fetchMoviesByCategory(
  categoryId: number,
  page: number = 1
): Promise<Movie[]> {
  const result = axios
    .get(
      `https://api.themoviedb.org/3/list/${categoryId}?api_key=${apiKey}&language=en-US&page=${page}&append_to_response=images&include_image_language=en,pt,hu,tr`
    )
    .then((res) => res.data.items as Movie[]);
  return result;
}

export async function fetchPopularMovies(page: number = 1): Promise<Movie[]> {
  const result = axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    )
    .then((res) => res.data.results as Movie[]);
  return result;
}

export async function fetchMovie(movieId: number): Promise<Movie> {
  const result = axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    )
    .then((res) => res.data as Movie);
  return result;
}

export async function searchMovie(query: string): Promise<Movie[]> {
  const result = axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`
    )
    .then((res) => res.data.results as Movie[]);
  return result;
}

