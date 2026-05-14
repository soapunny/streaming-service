// client/src/components/ui/MovieCard.tsx

// client/src/components/ui/MovieCard.tsx

import { Movie } from '@/types/movie';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ id, poster_path, title, release_date, vote_average }: Movie) => {
    const navigate = useNavigate();

    return (
        <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
            <img
                src={poster_path
                    ? `https://image.tmdb.org/t/p/w342${poster_path}`
                    : '/placeholder-poster.png'}
                alt={title}
                className="movie-card__poster"
            />
            <div className="movie-card__info">
                <h3 className="movie-card__title">
                    {title}
                    <span className="movie-card__year">
                        {release_date ? ` (${release_date.split('-')[0]})` : ''}
                    </span>
                </h3>
                <p className="movie-card__rating">
                    ⭐ {Math.round(vote_average * 10) / 10} / 10
                </p>
            </div>
        </div>
    );
}

export default MovieCard;