import React, { useState, useEffect } from "react";
import { Play, Info, Star, Calendar, X, Home, Bookmark } from "lucide-react";

//banner component
const Banner = () => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  // api_key from TMDB
  const API_KEY = "a6a787a5f6c18c47ea6315bc5900436c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    fetchPopularMovies();
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

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data.results.slice(0, 8));
      setCurrentMovie(data.results[0]);
    } catch (error) {
      console.error("Error:", error);
      const fallbackMovie = {
        title: "Avengers: Endgame",
        overview:
          "After the devastating events of Avengers: Infinity War, the universe is in ruins.",
        backdrop_path: null,
        vote_average: 8.4,
        release_date: "2019-04-26",
      };
      setCurrentMovie(fallbackMovie);
      setMovies([fallbackMovie]);
    } finally {
      setLoading(false);
    }
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
      className="relative h-screen min-h-96 flex items-center text-white overflow-hidden transition-all duration-1000 ease-in-out bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: currentMovie.backdrop_path
          ? `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%), url(${IMAGE_BASE_URL}${currentMovie.backdrop_path})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-8 py-16">
        <div className="max-w-3xl space-y-8">
          <div className="transform transition-all duration-1000 ease-out">
            <h1 className="text-6xl md:text-7xl font-black mb-6 drop-shadow-2xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
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
                {new Date(currentMovie.release_date).getFullYear()}
              </span>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full">
              <span className="font-bold text-sm">NOW TRENDING</span>
            </div>
          </div>

          <p className="text-xl leading-relaxed mb-8 drop-shadow-lg max-w-2xl opacity-90">
            {currentMovie.overview?.substring(0, 250)}...
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Watch Now</span>
            </button>
            <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 transform hover:scale-105 border border-white/30 flex items-center justify-center space-x-3">
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
