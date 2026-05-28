// client/src/screens/HomeScreen.tsx

import { Category, getMovies } from "@/api/tmdb";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";

const CATEGORIES = [
  //prevent re-rendering by declaring the const outside. also protect encapsulation
  { label: "Now Playing", value: Category.NOW_PLAYING },
  { label: "Popular", value: Category.POPULAR },
  { label: "Upcoming", value: Category.UPCOMING },
  { label: "Top Rated", value: Category.TOP_RATED },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState<Category>(Category.NOW_PLAYING);

  useEffect(() => {
    // useEffect callback function (return void)
    setLoading(true);
    const fetchMovies = async () => {
      //async function can not return void, but return Promise<void>
      try {
        const res = await getMovies(category);
        //await : wait for the promise to resolve(only block the current async function)
        setMovies(res);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category]); // if category changes, fetch movies again

  return (
    <div className="home-screen">
      <div className="category-tabs">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            className={`category-tab ${category === value ? "category-tab--active" : ""}`}
            onClick={() => setCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="movie-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
            // ...movie: spread operator(MovieCard's props must match movie's properties or error)
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
