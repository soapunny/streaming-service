// client/src/screens/SearchScreen.tsx

import { searchMovies } from "@/api/tmdb";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import { Movie } from "@/types/movie";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const SearchScreen = () => {
  const encodedKeyword = useParams().keyword;
  const keyword = encodedKeyword
    ? decodeURIComponent(encodedKeyword).trim()
    : "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null); // no re-render on ref change

  useEffect(() => {
    if (!keyword) return;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchMovies(keyword);
        setMovies(res.results);
        setPage(res.page);
        setTotalPages(res.total_pages);
        setTotalResults(res.total_results);
      } catch (err) {
        console.error("Failed to search movies:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
    // return() => {}: cleanup function, runs before next effect call or on unmount
    // here, when page or keyword changes cleanup function runs.
    // clearTimeout(timer): remove prior timer on keyword change or unmount
    // If not, every keystroke would trigger a search, causing too many API calls
  }, [keyword]);

  useEffect(() => {
    if (page === 1 || page > totalPages) return;
    setPageLoading(true);
    const fetchMore = async () => {
      try {
        const res = await searchMovies(keyword, page);
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id)); // prev movies' ids
          const newMovies = res.results.filter((m) => !existingIds.has(m.id));
          // if the new movies contain movie ids already in prev, filter them out to avoid duplicates
          return [...prev, ...newMovies];
        });
        setTotalPages(res.total_pages);
        setTotalResults(res.total_results);
      } catch (err) {
        console.error("Failed to load more movies:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchMore();
  }, [page]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // entries: observed elements' info array
      const target = entries[0]; // we only observe one element, so entries[0] is our target
      if (target.isIntersecting && !pageLoading && page < totalPages) {
        //isIntersecting true when target is in viewport.
        setPage((prev) => prev + 1); // load next page
      }
    },
    [pageLoading, page, totalPages],
  ); // recreate only if pageLoading, page, or totalPages changes

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5, // 요소가 50% 보이면 handleObserver 실행
    });
    if (observerRef.current) observer.observe(observerRef.current); // observe the target element
    return () => observer.disconnect(); // cleanup: when page changes, disconnect the observer to avoid memory leaks.
  }, [handleObserver]);

  if (!keyword) {
    return (
      <div className="search-screen">
        <div className="search-empty">
          <span className="search-empty__icon">🔍</span>
          <p className="search-empty__title">Find your next movie</p>
          <p className="search-empty__sub">
            Type a keyword in the search bar above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-screen">
      {loading ? (
        <>
          <p className="search-keyword">Results for "{keyword}"</p>
          <div className="movie-grid">
            {Array.from({ length: 20 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : movies.length === 0 ? (
        <>
          <p className="search-keyword">Results for "{keyword}"</p>
          <div className="search-empty">
            <span className="search-empty__icon">🎬</span>
            <p className="search-empty__title">No results found</p>
            <p className="search-empty__sub">Try a different keyword</p>
          </div>
        </>
      ) : (
        <>
          <p className="search-keyword">
            {totalResults} results for "{keyword}"
          </p>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </>
      )}
      {/* observerRef는 항상 DOM에 존재해야 함 */}
      <div ref={observerRef} className="observer-target">
        {/* 감시 대상 요소 -> div */}
        {pageLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};
export default SearchScreen;
