import axios from "axios";
import { Cast, Movie, MovieTrailers, MovieCategory } from "./types";
export const apiKey: string | undefined = process.env.TMDB_API_KEY;
/**
 * Get Movie Categories
 */
export async function fetchCategories(): Promise<MovieCategory[]> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) => res.data.genres as MovieCategory[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get Movies by Category
 * @param {number} categoryId
 * @param {number} page
 */
export async function fetchMoviesByCategory(
  categoryId: number,
  page: number = 1
): Promise<Movie[]> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&append_to_response=images&include_image_language=en,pt,hu,tr&with_genres=${categoryId}`
      )
      .then((res) => res.data.results as Movie[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get Popular Movies
 * @param {number} page
 */
export async function fetchPopularMovies(page: number = 1): Promise<Movie[]> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then((res) => res.data.results as Movie[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get Trending Movies
 * @param {number} page
 */
export async function fetchTrendingMovies(page: number = 1): Promise<Movie[]> {
  try {
    const result = axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
      .then((res) => res.data.results as Movie[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get Movie by id
 * @param {number} movieId
 */
export async function fetchMovie(movieId: number): Promise<Movie> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      )
      .then((res) => res.data as Movie);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Search Movie by Query
 * @param {string} query
 * @param {number} page
 */
export async function searchMovie(query: string, page: number = 1): Promise<Movie[]> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&include_adult=false&query=${query}`
      )
      .then((res) => res.data.results as Movie[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get Movie's Trailers
 * @param {number} movieId
 */
export async function fetchTrailers(movieId: number): Promise<MovieTrailers[]> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
      )
      .then((res) => res.data.results as MovieTrailers[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get Movie's Cast
 * @param {number} movieId
 */
export async function fetchCast(movieId: number): Promise<Cast[]> {
  try {
    const result = axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
      )
      .then((res) => res.data.cast as Cast[]);
    return result;
  } catch (error) {
    console.log(error);
  }
}
