import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import WatchList from "./components/WatchList";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, tone = "success") => {
    setToast({ id: Date.now(), message, tone });
  };

  const handleAddToWatchlist = (movie) => {
    const isAlreadySaved = watchlist.some((item) => item.id === movie.id);

    if (isAlreadySaved) {
      showToast("This movie is already in your watchlist.", "info");
      return;
    }

    const updatedWatchlist = [...watchlist, movie];
    localStorage.setItem("moviesapp", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    showToast((movie.title || movie.name) + " added to your watchlist.");
  };

  const handleRemoveFromWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    localStorage.setItem("moviesapp", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    showToast((movie.title || movie.name) + " removed from your watchlist.", "info");
  };

  useEffect(() => {
    const storedMovies = localStorage.getItem("moviesapp");
    if (!storedMovies) return;

    try {
      const parsedMovies = JSON.parse(storedMovies);
      setWatchlist(Array.isArray(parsedMovies) ? parsedMovies : []);
    } catch (error) {
      console.error("Unable to restore the watchlist:", error);
      localStorage.removeItem("moviesapp");
    }
  }, []);

  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-2 font-semibold text-black transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <Navbar watchlistCount={watchlist.length} />

      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  handleAddToWatchlist={handleAddToWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                watchlist={watchlist}
                handleAddToWatchlist={handleAddToWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      <Toast
        key={toast?.id}
        toast={toast}
        onClose={() => setToast(null)}
      />
    </BrowserRouter>
  );
}

export default App;
