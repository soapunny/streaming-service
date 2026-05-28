// client/src/components/ui/MovieCardSkeleton.tsx

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton skeleton--poster" />
      <div className="movie-card__info">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--rating" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
