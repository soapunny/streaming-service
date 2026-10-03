import { redis } from "./redis";

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

// ponytail: one TTL for everything; split per endpoint if movie details need longer
const CACHE_TTL_SECONDS = 60 * 60;

// Cache-aside: check Redis first, on a miss call TMDB and store the result.
// Any Redis failure is logged and skipped, so TMDB is always the fallback.
const fetchTmdb = async (path: string, params: Record<string, string> = {}) => {
  // Key excludes api_key so the secret never ends up in Redis.
  const cacheKey = `tmdb:${path}?${new URLSearchParams(params)}`;

  try {
    const cached = await redis.get(cacheKey); //If no cached data is found, it will return null. If cached data is found, it will return the cached data as a string.
    if (cached) {
      console.log(`cache HIT  ${cacheKey}`);
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error(
      "Redis get failed, falling back to TMDB:",
      (err as Error).message,
    );
  }
  console.log(`cache MISS ${cacheKey}`);

  const query = new URLSearchParams({
    api_key: API_KEY ?? "",
    language: API_LANGUAGE,
    ...params,
  });
  const response = await fetch(`${BASE_URL}${path}?${query}`);
  if (!response.ok) {
    throw new TmdbError(
      `TMDB request failed: ${response.statusText}`,
      response.status,
    );
  }
  const data = await response.json();

  // Not awaited: the user shouldn't wait for the cache write and get the "data" right away.
  redis
    .set(cacheKey, JSON.stringify(data), { EX: CACHE_TTL_SECONDS }) //cacheKey, 객체를 문자열로, Expiration time(TTL) 설정
    .catch((err) => console.error("Redis set failed:", err.message));

  return data;
};

export const getMoviesByCategory = (category: Category) =>
  fetchTmdb(`/movie/${category}`);

export const getMovieById = (id: string) =>
  fetchTmdb(`/movie/${id}`, { append_to_response: "videos" });

// Normalize so "Batman", "batman" and "batman  " share one cache entry
// (TMDB search is case-insensitive, so the results are the same).
export const searchMovies = (query: string, page: number) =>
  fetchTmdb(`/search/movie`, {
    query: query.toLowerCase().replace(/\s+/g, " "),
    page: String(page),
  });
