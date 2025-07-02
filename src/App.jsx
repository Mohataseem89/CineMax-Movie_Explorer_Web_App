import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddwatchlist = (movie) => {
    // to check movie already in watchlist
    const isAlreadyInWatchlist = watchlist.some((item) => item.id === movie.id);
    if (isAlreadyInWatchlist) {
      console.log("Movie already in watchlist");
      return;
    }

    const newWatchList = [...watchlist, movie];
    localStorage.setItem("moviesapp", JSON.stringify(newWatchList));
    setWatchlist(newWatchList);
    console.log("Added to watchlist:", movie.title || movie.name);
  };

  const handleremovewatchlist = (movieobj) => {
    const filteredwatchlist = watchlist.filter((movie) => {
      return movie.id !== movieobj.id;
    });
    setWatchlist(filteredwatchlist);
    localStorage.setItem("moviesapp", JSON.stringify(filteredwatchlist));
    console.log("Removed from watchlist:", movieobj.title || movieobj.name);
  };

  useEffect(() => {
    const moviesfromlocalstorage = localStorage.getItem("moviesapp");
    if (!moviesfromlocalstorage) {
      return;
    }
    try {
      const parsedMovies = JSON.parse(moviesfromlocalstorage);
      setWatchlist(parsedMovies);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      localStorage.removeItem("moviesapp"); // Clear corrupted data
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  handleAddwatchlist={handleAddwatchlist}
                  handleremovewatchlist={handleremovewatchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                handleremovewatchlist={handleremovewatchlist}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                watchlist={watchlist}
                handleAddwatchlist={handleAddwatchlist}
                handleremovewatchlist={handleremovewatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
