// client/rc/api/tmdb.ts

import { PaginatedResponse } from "@/types/movie";

export const enum Category {
  POPULAR = "popular",
  UPCOMING = "upcoming",
  TOP_RATED = "top_rated",
  NOW_PLAYING = "now_playing",
}

// Relative path: Vite dev proxy (vite.config.ts) or CloudFront /api/* forwards to Express,
// which holds the TMDB API key. The key is no longer in the frontend bundle.
export const BASE_URL = "/api";

export const getMovies = async (category: Category) => {
  const response = await fetch(`${BASE_URL}/movies/${category}`);
  const json = await response.json();
  return json.results;
};

export const getMovieById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}`);
  const json = await response.json();
  return json;
};

export const searchMovies = async (query: string, page: number = 1) => {
  const params = new URLSearchParams({ query, page: String(page) });
  const response = await fetch(`${BASE_URL}/search?${params}`);
  const json: PaginatedResponse = await response.json();
  return json;
};
