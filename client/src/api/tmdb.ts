// client/rc/api/tmdb.ts

export const enum Category {
    POPULAR = 'popular',
    UPCOMING = 'upcoming',
    TOP_RATED = 'top_rated',
    NOW_PLAYING = 'now_playing'
}

export const BASE_URL = 'https://api.themoviedb.org/3'; 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_LANGUAGE = 'en-US';

export const getMovies = async (category: Category) => {
    const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=${API_LANGUAGE}`)
    const json = await response.json();
    return json.results;
}

export const getMovieById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`);
    const json = await response.json();
    return json;
}

export const searchMovies = async (query: string) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&query=${query}`)
    const json = await response.json();
    return json.results;
}