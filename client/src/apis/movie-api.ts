// client/rc/apis/movie-api.ts

export const enum Category {
    POPULAR = 'popular',
    UPCOMING = 'upcoming',
    TOP_RATED = 'top_rated',
    NOW_PLAYING = 'now_playing'
}

export const getMovies = async (category: Category) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR`)
    const json = await response.json();
    return json.results;
}

export const searchMovies = async (query: string) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`)
    const json = await response.json();
    return json.results;
}