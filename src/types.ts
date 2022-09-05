export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genres[];
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

export interface MovieTrailers {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

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

export interface MovieCategory {
  id: number;
  name: string;
}

export interface Genres {
  id: string;
  name: string;
}
