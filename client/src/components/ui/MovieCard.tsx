// client/src/components/ui/MovieCard.tsx

import { useWishlistStore } from "@/store/WishlistStore";
import { Movie } from "@/types/movie";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  id,
  poster_path,
  title,
  release_date,
  vote_average,
  ...rest
}: Movie) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const wishlisted = isInWishlist(id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (wishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        poster_path,
        title,
        release_date,
        vote_average,
        ...rest,
      });
    }
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
      <div className="movie-card__poster-wrapper">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w342${poster_path}`
              : "/placeholder-poster.png"
          }
          alt={title}
          className="movie-card__poster"
        />
        <button
          className={`movie-card__wishlist ${wishlisted ? "movie-card__wishlist--active" : ""}`}
          onClick={handleWishlist}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">
          {title}
          <span className="movie-card__year">
            {release_date ? ` (${release_date.split("-")[0]})` : ""}
          </span>
        </h3>
        <p className="movie-card__rating">
          ⭐ {Math.round(vote_average * 10) / 10} / 10
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
