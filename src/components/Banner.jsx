import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clapperboard, Info, Star, Calendar } from "lucide-react";
import { getImageUrl, getTrendingMovies } from "../api/tmdb";

//banner component
const Banner = () => {
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies(controller.signal);
        const featuredMovies = data.results
          .filter((movie) => movie.backdrop_path)
          .slice(0, 6);

        setMovies(featuredMovies);
        setCurrentMovie(featuredMovies[0] ?? null);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Unable to load featured movies:", error);
        const fallbackMovie = {
          title: "Discover your next favorite movie",
          overview:
            "Browse popular movies, explore details, and build a personal watchlist.",
          backdrop_path: null,
          vote_average: null,
          release_date: null,
        };
        setCurrentMovie(fallbackMovie);
        setMovies([fallbackMovie]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchFeaturedMovies();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  useEffect(() => {
    if (movies.length > 0) {
      setCurrentMovie(movies[currentIndex]);
    }
  }, [currentIndex, movies]);

  const handleBrowseMovies = () => {
    document.getElementById("popular-movies")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="relative h-screen min-h-96 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Loading Cinematic Experience...
          </h2>
        </div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="relative h-screen min-h-96 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-purple-900/90 to-indigo-900/90"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Unable to load movies</h2>
          <p className="text-lg opacity-80">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-[calc(100svh-77px)] min-h-[560px] items-center overflow-hidden bg-cover bg-center bg-no-repeat text-white transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: currentMovie.backdrop_path
          ? `linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0.9) 100%), url(${getImageUrl(currentMovie.backdrop_path, "w1280")})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-3xl space-y-8">
          <div className="transform transition-all duration-1000 ease-out">
            <h1 className="mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-4xl font-black leading-tight text-transparent drop-shadow-2xl sm:text-6xl md:text-7xl">
              {currentMovie.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-lg">
                {currentMovie.vote_average?.toFixed(1) || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">
                {currentMovie.release_date
                  ? new Date(currentMovie.release_date).getFullYear()
                  : "Coming soon"}
              </span>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full">
              <span className="font-bold text-sm">NOW TRENDING</span>
            </div>
          </div>

          <p className="text-xl leading-relaxed mb-8 drop-shadow-lg max-w-2xl opacity-90">
            {currentMovie.overview?.length > 250
              ? `${currentMovie.overview.substring(0, 250)}…`
              : currentMovie.overview}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleBrowseMovies}
              className="group flex cursor-pointer items-center justify-center space-x-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:from-red-700 hover:to-red-800 hover:shadow-2xl"
            >
              <Clapperboard className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Browse Movies</span>
            </button>
            <button
              type="button"
              disabled={!currentMovie.id}
              onClick={() => currentMovie.id && navigate(`/movie/${currentMovie.id}`)}
              className="group flex cursor-pointer items-center justify-center space-x-3 rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Info className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {movies.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            {movies.slice(0, 6).map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 border-2 ${
                  index === currentIndex
                    ? "bg-white border-white shadow-lg"
                    : "bg-transparent border-white/50 hover:border-white"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show featured movie ${index + 1}: ${movies[index].title}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
