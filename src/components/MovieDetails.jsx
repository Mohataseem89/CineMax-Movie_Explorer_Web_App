import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getImageUrl,
  getMovieDetails,
  getSimilarMovies,
} from "../api/tmdb";

function MovieDetails({
  watchlist,
  handleAddwatchlist,
  handleremovewatchlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const [data, simData] = await Promise.all([
          getMovieDetails(id, controller.signal),
          getSimilarMovies(id, controller.signal),
        ]);
        setMovie(data);
        setSimilarMovies(simData.results || []);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchMovieDetails();
    return () => controller.abort();
  }, [id]);

  const isInWatchlist = watchlist.some((item) => item.id === parseInt(id));

  if (loading)
    return (
      <div className="min-h-[50vh] py-16 text-center text-lg font-medium text-white">
        🎬 Loading movie...
      </div>
    );

  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold text-red-500 mb-4">
          ⚠️ Error: {error}
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:brightness-110 text-white px-6 py-2 rounded-full font-medium"
        >
          ⬅ Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-400 mb-4">
          🎞️ Movie not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium"
        >
          ⬅ Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-12 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-2xl text-blue-400 hover:underline hover:text-blue-600"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/3 w-full">
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl border border-gray-700"
          />
        </div>

        <div className="md:w-2/3 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            {movie.title}
          </h1>

          <div className="flex items-center space-x-4 mb-6 text-sm md:text-base">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-400">
              📅 {movie.release_date?.split("-")[0]}
            </span>
            <span className="text-gray-400">⏱ {movie.runtime} min</span>
          </div>

          <p className="mb-6 text-lg leading-relaxed text-gray-300">
            {movie.overview}
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">🎭 Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-1 rounded-full text-sm font-medium shadow"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              isInWatchlist
                ? handleremovewatchlist(movie)
                : handleAddwatchlist(movie);
            }}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:scale-105 ${
              isInWatchlist
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isInWatchlist ? "✖ Remove from Watchlist" : "➕ Add to Watchlist"}
          </button>
        </div>
      </div>

      {/*suggesatins or carousel for similar movis */}
      {similarMovies.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">🎬 Similar Movies</h2>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {similarMovies.map((simMovie) => (
              <div
                key={simMovie.id}
                onClick={() => navigate(`/movie/${simMovie.id}`)}
                className="min-w-[150px] cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:bg-gray-700 transition"
              >
                <img
                  src={getImageUrl(simMovie.poster_path, "w200")}
                  alt={simMovie.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[225px] object-cover"
                />
                <div className="text-sm p-2 text-center font-semibold truncate">
                  {simMovie.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
