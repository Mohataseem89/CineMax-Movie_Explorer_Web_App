import MovieCards from "./MovieCards";

const ResultSkeleton = () => (
  <div aria-hidden="true">
    <div className="aspect-[2/3] animate-pulse rounded-2xl border border-white/[0.06] bg-[#171c25]" />
    <div className="mx-1 mt-3 h-4 w-4/5 animate-pulse rounded bg-white/10" />
    <div className="mx-1 mt-2 h-3 w-2/5 animate-pulse rounded bg-white/[0.07]" />
  </div>
);

const MovieResultsGrid = ({
  movies,
  loading,
  watchlist,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  emptyMessage = "No movies matched your request.",
}) => {
  if (!loading && movies.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {loading
        ? Array.from({ length: 12 }, (_, index) => (
            <ResultSkeleton key={index} />
          ))
        : movies.map((movie) => (
            <MovieCards
              key={movie.id}
              movie={movie}
              watchlist={watchlist}
              handleAddToWatchlist={handleAddToWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          ))}
    </div>
  );
};

export default MovieResultsGrid;
