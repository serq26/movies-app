import "@testing-library/jest-dom";
import { fetchMovie, searchMovie } from "./api";
import { describe, expect, test } from "@jest/globals";

describe("#fetchMovie() using Promises", () => {
  test("should load movie data", () => {
    const movieId = 629176;
    return fetchMovie(movieId).then((data) => {
      expect(data).toBeDefined();
      expect(data.title).toEqual("Samaritan");
    });
  });
});

describe("#searchMovie() using Promises", () => {
  test("should load searching movies data", () => {
    const query = "Spider-Man: No Way Home";
    return searchMovie(query).then((data) => {
      expect(data).toBeDefined();
      data.forEach((movie) => {
        expect(movie.title).toEqual("Spider-Man: No Way Home")
      })
    });
  });
});
