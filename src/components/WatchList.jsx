import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WatchList = ({ watchlist, setWatchlist }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const getGenres = () => {
    const allGenres = new Set();
    watchlist.forEach((movie) => {
      movie.genre_ids?.forEach((genreId) => {
        if (genreMap[genreId]) allGenres.add(genreMap[genreId]);
      });
    });
    return ["All", ...Array.from(allGenres).sort()];
  };

  const getGenreName = (genreId) => genreMap[genreId] || `Genre ${genreId}`;

  const handlesearch = (e) => setSearch(e.target.value);

  const sortRatingsAsc = () => {
    setWatchlist(
      [...watchlist].sort((a, b) => a.vote_average - b.vote_average)
    );
    setActiveSort("ratings-asc");
  };

  const sortRatingsDesc = () => {
    setWatchlist(
      [...watchlist].sort((a, b) => b.vote_average - a.vote_average)
    );
    setActiveSort("ratings-desc");
  };

  const sortPopularityAsc = () => {
    setWatchlist([...watchlist].sort((a, b) => a.popularity - b.popularity));
    setActiveSort("popularity-asc");
  };

  const sortPopularityDesc = () => {
    setWatchlist([...watchlist].sort((a, b) => b.popularity - a.popularity));
    setActiveSort("popularity-desc");
  };

  const filteredMovies = watchlist.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre_ids?.some((id) => genreMap[id] === selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const handleDeleteMovie = (movieId) => {
    const updatedList = watchlist.filter((m) => m.id !== movieId);
    setWatchlist(updatedList);
    localStorage.setItem("moviesapp", JSON.stringify(updatedList));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6 max-w-7xl mx-auto text-white">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {getGenres().map((genre) => (
          <button
            key={genre}
            className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 backdrop-blur-md shadow-md ${
              selectedGenre === genre
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <input
          value={search}
          onChange={handlesearch}
          type="text"
          placeholder="Search for movies..."
          className="w-full max-w-md px-4 py-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-900 text-white placeholder-gray-400"
        />
      </div>

      {/* watchlist table */}
      <div className="overflow-x-auto bg-black rounded-xl border border-gray-800 shadow-xl">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-gradient-to-r from-purple-700 to-pink-600 text-white text-sm sm:text-base">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={sortRatingsAsc}
                    className={`hover:text-yellow-400 ${
                      activeSort === "ratings-asc"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                  >
                    ▲
                  </button>
                  Ratings
                  <button
                    onClick={sortRatingsDesc}
                    className={`hover:text-yellow-400 ${
                      activeSort === "ratings-desc"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                  >
                    ▼
                  </button>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={sortPopularityAsc}
                    className={`hover:text-yellow-400 ${
                      activeSort === "popularity-asc"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                  >
                    ▲
                  </button>
                  Popularity
                  <button
                    onClick={sortPopularityDesc}
                    className={`hover:text-yellow-400 ${
                      activeSort === "popularity-desc"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                  >
                    ▼
                  </button>
                </div>
              </th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-t border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="flex items-center px-4 py-4 text-left gap-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="h-20 w-14 object-cover rounded-md shadow-md"
                    />
                    <button
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="text-cyan-400 hover:underline text-sm font-bold"
                    >
                      {movie.title || movie.name}
                    </button>
                  </td>
                  <td className="font-medium">
                    {movie.vote_average?.toFixed(1) || "N/A"}
                  </td>
                  <td className="font-medium">
                    {Math.round(movie.popularity) || "N/A"}
                  </td>
                  <td className="text-sm">
                    {movie.genre_ids
                      ?.slice(0, 2)
                      .map((id) => getGenreName(id))
                      .join(", ") || "N/A"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm px-2 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-gray-400 py-6 text-center">
                  No movies found in your watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
