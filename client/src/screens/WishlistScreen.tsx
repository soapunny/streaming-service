// client/src/screens/WishlistScreen.tsx

import MovieCard from "@/components/ui/MovieCard";
import { useWishlistStore } from "@/store/WishlistStore";

import { useNavigate } from "react-router-dom";

const WishlistScreen = () => {
  const { wishlist } = useWishlistStore();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="search-screen">
        <div className="search-empty">
          <span className="search-empty__icon">🤍</span>
          <p className="search-empty__title">No movies in your wishlist</p>
          <p className="search-empty__sub">
            Add movies by clicking the heart on any movie card
          </p>
          <button className="button" onClick={() => navigate("/")}>
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-screen">
      <p className="search-keyword">
        {wishlist.length} movies in your wishlist
      </p>
      <div className="movie-grid">
        {wishlist.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default WishlistScreen;
