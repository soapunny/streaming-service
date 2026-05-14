// client/src/screens/HomeScreen.tsx

import { Category, getMovies } from '@/api/tmdb';
import { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';
import MovieCard from '@/components/ui/MovieCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const CATEGORIES = [
    { label: 'Now Playing', value: Category.NOW_PLAYING },
    { label: 'Popular',     value: Category.POPULAR },
    { label: 'Upcoming',    value: Category.UPCOMING },
    { label: 'Top Rated',   value: Category.TOP_RATED },
];

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [category, setCategory] = useState<Category>(Category.NOW_PLAYING);

    useEffect(() => {
        setLoading(true);
        const fetchMovies = async () => {
            try {
                const res = await getMovies(category);
                setMovies(res);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [category]);

    return (
        <div className="home-screen">
            <div className="category-tabs">
                {CATEGORIES.map(({ label, value }) => (
                    <button
                        key={value}
                        className={`category-tab ${category === value ? 'category-tab--active' : ''}`}
                        onClick={() => setCategory(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading
                ? <LoadingSpinner />
                : (
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default HomeScreen;