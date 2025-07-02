import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCards = ({
  movie,
  handleAddwatchlist,
  handleremovewatchlist,
  watchlist,
}) => {
  const navigate = useNavigate();
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    isInWatchlist ? handleremovewatchlist(movie) : handleAddwatchlist(movie);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative h-[42vh] w-[200px] rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-[1.05] group cursor-pointer"
      style={{
        //from TMDB
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>

      <div
        className="absolute top-3 right-3 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center text-white text-xl font-bold transition"
        onClick={handleWatchlistClick}
        title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInWatchlist ? "✕" : "+"}
      </div>

      {/* {//info of movies} */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 text-center space-y-1">
        <h3 className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
          {movie.title || movie.name}
        </h3>
        <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition duration-300">
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCards;
