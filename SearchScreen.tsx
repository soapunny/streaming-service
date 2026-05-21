// client/src/screens/SearchScreen.tsx

import { searchMovies } from "@/api/tmdb";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MovieCard from "@/components/ui/MovieCard";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SearchScreen = () => {
  const keyword = useParams().keyword?.trim();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchMovies(keyword);
        setMovies(res);
      } catch (err) {
        console.error("Failed to search movies:", err);
      } finally {
        setLoading(false);
      }
    }, 300); //debounce: wait for 300ms after the user stops typing to send the request

    return () => clearTimeout(timer); //cleanup: clear the timer if the component unmounts or keyword changes before the timer finishes
  }, [keyword]);

  if (!keyword) {
    return (
      <div className="search-screen">
        <h1>Search Movies</h1>
        <p>Enter a keyword to search for movies.</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="search-screen">
        <h1>Search Movies</h1>
        <LoadingSpinner />
      </div>
    );
  }
  if (movies.length === 0) {
    return (
      <div className="search-screen">
        <h1>Search Movies</h1>
        <p>No movies found for "{keyword}".</p>
      </div>
    );
  }

  return (
    <div className="search-screen">
      <h1>Search Movies</h1>
      <p>Showing results for "{keyword}"</p>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
          // ...movie: spread operator(MovieCard's props must match movie's properties or error)
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
