import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Film,
  Globe2,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getImageUrl,
  getMovieDetails,
  getSimilarMovies,
} from "../api/tmdb";

const DetailSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-[#080a0f]">
    <div className="h-[58vh] min-h-[520px] bg-gradient-to-br from-gray-900 to-black" />
    <div className="mx-auto -mt-32 grid max-w-7xl gap-8 px-5 pb-20 sm:px-8 md:grid-cols-[260px_1fr]">
      <div className="aspect-[2/3] rounded-3xl bg-[#171c25]" />
      <div className="pt-32 md:pt-20">
        <div className="h-12 w-3/4 rounded-xl bg-white/10" />
        <div className="mt-5 h-5 w-2/5 rounded bg-white/[0.07]" />
        <div className="mt-8 h-32 max-w-2xl rounded-xl bg-white/[0.07]" />
      </div>
    </div>
  </div>
);

function MovieDetails({
  watchlist,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
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
        const [movieData, similarData] = await Promise.all([
          getMovieDetails(id, controller.signal),
          getSimilarMovies(id, controller.signal),
        ]);
        setMovie(movieData);
        setSimilarMovies(similarData.results || []);
      } catch (requestError) {
        if (requestError.name === "AbortError") return;
        setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchMovieDetails();
    return () => controller.abort();
  }, [id]);

  const isInWatchlist = watchlist.some(
    (item) => item.id === Number.parseInt(id, 10)
  );

  if (loading) return <DetailSkeleton />;

  if (error || !movie) {
    return (
      <section className="flex min-h-[65vh] items-center justify-center px-5 py-20 text-center">
        <div className="max-w-md rounded-3xl border border-white/10 bg-[#11151c] p-8 sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <Film className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-black">
            {error ? "Movie details could not be loaded" : "Movie not found"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            {error || "The movie may have been removed or the address is incorrect."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 min-h-11 rounded-xl bg-red-600 px-5 font-bold text-white transition-colors hover:bg-red-500"
          >
            Return home
          </button>
        </div>
      </section>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, "w1280");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const releaseYear = movie.release_date?.slice(0, 4) || "TBA";
  const languageName = movie.original_language?.toUpperCase() || "N/A";

  return (
    <article className="min-h-screen bg-[#080a0f] text-white">
      <header className="relative isolate min-h-[540px] overflow-hidden sm:min-h-[620px]">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-black/15 to-black/30" />

        <div className="relative mx-auto flex min-h-[540px] max-w-[1600px] flex-col px-5 py-8 sm:min-h-[620px] sm:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          <div className="mt-auto max-w-4xl pb-16 pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-400 sm:text-sm">
              Movie details
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.98] tracking-[-0.055em]">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-4 max-w-2xl text-lg italic text-gray-300 sm:text-xl">
                “{movie.tagline}”
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-gray-200">
              <span className="flex items-center gap-2">
                <Star
                  className="h-[18px] w-[18px] fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                {movie.vote_average?.toFixed(1) || "Not rated"}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
                {releaseYear}
              </span>
              {movie.runtime > 0 && (
                <span className="flex items-center gap-2">
                  <Clock3 className="h-[18px] w-[18px]" aria-hidden="true" />
                  {movie.runtime} min
                </span>
              )}
              <span className="rounded-md border border-white/20 bg-black/25 px-2.5 py-1 text-xs uppercase tracking-wider">
                {movie.status || "Released"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto -mt-10 grid max-w-[1600px] gap-8 px-5 pb-20 sm:px-8 md:-mt-20 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
        <div className="relative z-10">
          <div className="aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 bg-[#11151c] shadow-2xl shadow-black/45">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title + " poster"}
                width="500"
                height="750"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-500">
                <Film className="h-12 w-12" aria-hidden="true" />
                <span className="font-semibold">Poster unavailable</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              isInWatchlist
                ? handleRemoveFromWatchlist(movie)
                : handleAddToWatchlist(movie)
            }
            className={
              "mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-bold transition-colors " +
              (isInWatchlist
                ? "border border-white/10 bg-white/10 text-white hover:bg-white/15"
                : "bg-red-600 text-white hover:bg-red-500")
            }
          >
            {isInWatchlist ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Bookmark className="h-5 w-5" aria-hidden="true" />
            )}
            {isInWatchlist ? "Saved to watchlist" : "Add to watchlist"}
          </button>
        </div>

        <div className="pt-2 md:pt-24">
          <section aria-labelledby="overview-title">
            <h2
              id="overview-title"
              className="text-2xl font-black tracking-[-0.03em] sm:text-3xl"
            >
              Overview
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-gray-300 sm:text-lg">
              {movie.overview || "No overview is available for this movie."}
            </p>
          </section>

          <section className="mt-9" aria-labelledby="genres-title">
            <h2
              id="genres-title"
              className="text-sm font-bold uppercase tracking-[0.18em] text-gray-500"
            >
              Genres
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres?.length ? (
                movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-gray-200"
                  >
                    {genre.name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">Not available</span>
              )}
            </div>
          </section>

          <dl className="mt-9 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#11151c] p-5">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                Language
              </dt>
              <dd className="mt-2 font-bold text-gray-100">{languageName}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#11151c] p-5">
              <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Release date
              </dt>
              <dd className="mt-2 font-bold text-gray-100">
                {movie.release_date || "Not available"}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#11151c] p-5">
              <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Audience votes
              </dt>
              <dd className="mt-2 font-bold text-gray-100">
                {movie.vote_count?.toLocaleString() || "Not available"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <section
          className="border-t border-white/10 py-16 sm:py-20"
          aria-labelledby="similar-movies-title"
        >
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-400 sm:text-sm">
              Keep exploring
            </p>
            <h2
              id="similar-movies-title"
              className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl"
            >
              Similar movies
            </h2>

            <div className="movie-row mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-5">
              {similarMovies.slice(0, 14).map((similarMovie) => {
                const similarPoster = getImageUrl(
                  similarMovie.poster_path,
                  "w342"
                );

                return (
                  <Link
                    key={similarMovie.id}
                    to={"/movie/" + similarMovie.id}
                    className="group w-[42vw] max-w-[180px] shrink-0 snap-start rounded-2xl focus-visible:outline-none sm:w-[180px]"
                  >
                    <span className="block aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#11151c]">
                      {similarPoster ? (
                        <img
                          src={similarPoster}
                          alt={similarMovie.title + " poster"}
                          loading="lazy"
                          decoding="async"
                          width="342"
                          height="513"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-gray-600">
                          <Film className="h-8 w-8" aria-hidden="true" />
                        </span>
                      )}
                    </span>
                    <span className="mt-3 line-clamp-2 block text-sm font-bold leading-5 text-gray-200 transition-colors group-hover:text-red-400">
                      {similarMovie.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export default MovieDetails;
