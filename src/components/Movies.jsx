import React, { useEffect, useState } from "react";
import MoviesCards from "./MovieCards";
import Pagination from "./Pagination";
import { getPopularMovies } from "../api/tmdb";

const Movies = ({ handleAddwatchlist, handleremovewatchlist, watchlist }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const handleprevpage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handlenextpage = () => {
    setPageNo(pageNo + 1);
  };
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPopularMovies(pageNo, controller.signal);
        setMovies(data.results ?? []);
      } catch (requestError) {
        if (requestError.name === "AbortError") return;
        setError(requestError.message || "Unable to load movies.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [pageNo, retryCount]);

  return (
    <section id="popular-movies" className="min-h-screen scroll-mt-24 bg-gradient-to-b from-gray-950 via-black to-gray-900 px-4 py-10 text-white sm:px-10 lg:px-12">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
        Popular Movies
      </h2>

      {error ? (
        <div className="mx-auto max-w-lg rounded-xl border border-red-500/30 bg-red-950/30 p-8 text-center">
          <h3 className="text-xl font-bold">Movies could not be loaded</h3>
          <p className="mt-2 text-gray-300">{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-red-500"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className="h-[42vh] min-h-[280px] w-[200px] animate-pulse rounded-xl bg-gray-800"
                  aria-hidden="true"
                />
              ))
            : movies.map((movie) => (
          <MoviesCards
            key={movie.id}
            movie={movie}
            poster_path={movie.poster_path}
            name={movie.original_title}
            handleAddwatchlist={handleAddwatchlist}
            handleremovewatchlist={handleremovewatchlist}
            watchlist={watchlist}
          />
              ))}
        </div>
      )}

      {!error && (
        <div className="mt-10">
        <Pagination
          pageNo={pageNo}
          currentPage={pageNo}
          loading={loading}
          handleprevpage={handleprevpage}
          handlenextpage={handlenextpage}
        />
        </div>
      )}
    </section>
  );
};

export default Movies;
