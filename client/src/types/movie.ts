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

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
    //Omit -> Typescript utility type
    //Omit<Movie, 'genre_ids'>: Extend all the properties of Movie except 'genre_ids'
    genres: Genre[];
    runtime: number | null;
    tagline: string;
    status: string;
    budget: number;
    revenue: number;
}