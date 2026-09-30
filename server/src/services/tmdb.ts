const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const API_LANGUAGE = "en-US";

export const CATEGORIES = [
  "popular",
  "upcoming",
  "top_rated",
  "now_playing",
] as const;
export type Category = (typeof CATEGORIES)[number];

class TmdbError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetchTmdb = async (path: string, params: Record<string, string> = {}) => {
  const query = new URLSearchParams({
    api_key: API_KEY ?? "",
    language: API_LANGUAGE,
    ...params,
  });
  const response = await fetch(`${BASE_URL}${path}?${query}`);
  if (!response.ok) {
    throw new TmdbError(`TMDB request failed: ${response.statusText}`, response.status);
  }
  return response.json();
};

export const getMoviesByCategory = (category: Category) =>
  fetchTmdb(`/movie/${category}`);

export const getMovieById = (id: string) =>
  fetchTmdb(`/movie/${id}`, { append_to_response: "videos" });

export const searchMovies = (query: string, page: number) =>
  fetchTmdb(`/search/movie`, { query, page: String(page) });
