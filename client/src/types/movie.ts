// client/src/types/movie.ts

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

// 트레일러 타입 추가
export interface Video {
  id: string;
  key: string; // YouTube 영상 ID
  name: string;
  site: string; // "YouTube" | "Vimeo"
  type: string; // "Trailer" | "Teaser" | "Clip" ...
  official: boolean;
}

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  videos: { results: Video[] }; // 추가
}

export interface PaginatedResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
