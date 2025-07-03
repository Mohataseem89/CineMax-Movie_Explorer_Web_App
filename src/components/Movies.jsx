import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviesCards from "./MovieCards";
import Pagination from "./Pagination";

const Movies = ({ handleAddwatchlist, handleremovewatchlist, watchlist }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handleprevpage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handlenextpage = () => {
    setPageNo(pageNo + 1);
  };
  //api from tmdb
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a6a787a5f6c18c47ea6315bc5900436c&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, [pageNo]);

  return (
    <div className="min-h-screen px-3 sm:px-10 lg:px-12 py-6 bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
        🎬 Trending Movies
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {movies.map((movie) => (
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

      <div className="mt-10">
        <Pagination
          pageNo={pageNo}
          handleprevpage={handleprevpage}
          handlenextpage={handlenextpage}
        />
      </div>
    </div>
  );
};

export default Movies;
