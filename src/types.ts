import { Movie } from "./api";

export interface Favorites {
  movieId: string;
}

export interface Comments {
  name: string;
  comment: string;
  movieId: number;
}

export interface UserComment {
 movie: Movie;
 comment: Comments;
}