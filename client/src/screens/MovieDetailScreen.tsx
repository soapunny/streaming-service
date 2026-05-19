// client/src/screens/MovieDetailScreen.tsx

import { getMovieById } from "@/api/tmdb";
import { MovieDetail } from "@/types/movie";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
//import { GENRES } from "@/constants/genres"; // deprecated

export const MovieDetailsScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        if (!id) return;// Type narrowing for Typescript(id can be undefined)
        // id is guaranteed to be a string from now on.
        setLoading(true);
        const fetchMovie = async () => {
            try {
                const res: MovieDetail = await getMovieById(id);
                setMovie(res);
            } catch (err) {
                console.error('Failed to fetch movie:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (!id) return <p className="status-text">Movie not found.</p>;
    if (loading) return <LoadingSpinner />;
    if (!movie) return <p className="status-text">Failed to load movie.</p>;
    // movie is guaranteed to be MovieDetail from now on.

    // const genres = movie.genres
    //     .map((g) => GENRES[g.id]) // find the genre name from GENRES object by using genre id (e.g., 28 -> Action)
    //     .filter(Boolean); // remove null, undefined, false, 0, '', null(when genre id is not found in GENRES object)

    const genres = movie.genres.map((g) => g.name);//get the genre name and make an array of genre names

    return (
        <div className="detail-screen">
            {/* Backdrop */}
            <div className="detail-backdrop">
                <img
                    src={movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                        : '/placeholder-backdrop.png'}
                    alt={movie.title}
                    className="detail-backdrop__img"
                />
                <div className="detail-backdrop__overlay" />
            </div>

            {/* 콘텐츠 */}
            <div className="detail-content">
                <button className="detail-back" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <div className="detail-info">
                    {/* 포스터 */}
                    <img
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                            : '/placeholder-poster.png'}
                        alt={movie.title}
                        className="detail-poster"
                    />

                    {/* 텍스트 정보 */}
                    <div className="detail-meta">
                        <h1 className="detail-title">
                            {movie.title}
                            <span className="detail-year">
                                {movie.release_date ? ` (${movie.release_date.split('-')[0]})` : ''}
                            </span>
                        </h1>

                        <p className="detail-rating">
                            ⭐ {Math.round(movie.vote_average * 10) / 10} / 10
                            <span className="detail-vote-count"> ({movie.vote_count.toLocaleString()} votes)</span>
                            {/* toLocaleString(): convert a number to a string, using the locale's conventions, e.g. 1000 -> 1,000(in US/KR), 1 000(in France), 1.000(in Germany) */}
                        </p>

                        <div className="detail-genres">
                            {genres.map((genre) => (
                                <span key={genre} className="genre-badge">{genre}</span>
                            ))}
                        </div>

                        <p className="detail-overview">{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsScreen;