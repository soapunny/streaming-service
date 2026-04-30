// client/src/screens/movie-list-screen.tsx

import { Category, getMovies } from '@/apis/movie-api';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

export const MovieListScreen = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState(Category.NOW_PLAYING);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await getMovies(category);
            setMovies(res);
            setLoading(false);
        };
        fetchMovies();
    }, [category]);
        
    
    return (
        <div>
            <h1>Movie List</h1>
            <button onClick={() => setCategory(Category.NOW_PLAYING)}>Now Playing</button>
            <button onClick={() => setCategory(Category.POPULAR)}>Popular</button>
            <button onClick={() => setCategory(Category.UPCOMING)}>Upcoming</button>
            <button onClick={() => setCategory(Category.TOP_RATED)}>Top Rated</button>
            {loading ? <p>Loading...</p> : movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <hr />
                    <img height={"300px"} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div>
                        <h2>{movie.title} ({movie.release_date.split('-')[0]})</h2>
                        <p>⭐ {Math.round(movie.vote_average * 100) / 100} / 10</p>
                    </div>
                    <p>{movie.overview}</p>
                </div>
            ))}
        </div>
    );
}

export default MovieListScreen;