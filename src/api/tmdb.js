const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

async function tmdbRequest(path, { params = {}, signal } = {}) {
  if (!API_KEY) {
    throw new Error(
      "TMDb API key is missing. Add VITE_TMDB_API_KEY to your environment."
    );
  }

  const normalizedParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  const url = new URL(API_BASE_URL + path);
  url.search = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...normalizedParams,
  }).toString();

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("TMDb request failed with status " + response.status + ".");
  }

  return response.json();
}

export function getPopularMovies(page = 1, signal) {
  return tmdbRequest("/movie/popular", {
    params: { page: String(page) },
    signal,
  });
}

export function getTrendingMovies(signal) {
  return tmdbRequest("/trending/movie/week", { signal });
}

export function getNowPlayingMovies(signal) {
  return tmdbRequest("/movie/now_playing", {
    params: { page: "1" },
    signal,
  });
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

export function getUpcomingMovies(signal) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  return tmdbRequest("/discover/movie", {
    params: {
      page: "1",
      include_adult: "false",
      include_video: "false",
      sort_by: "popularity.desc",
      "primary_release_date.gte": formatLocalDate(tomorrow),
      "primary_release_date.lte": formatLocalDate(sixMonthsFromNow),
    },
    signal,
  });
}

export function getTopRatedMovies(signal) {
  return tmdbRequest("/movie/top_rated", {
    params: { page: "1" },
    signal,
  });
}

export function searchMovies(query, page = 1, signal) {
  return tmdbRequest("/search/movie", {
    params: {
      query,
      page: String(page),
      include_adult: "false",
    },
    signal,
  });
}

export function discoverMovies(filters = {}, signal) {
  const {
    page = 1,
    genre,
    year,
    sortBy = "popularity.desc",
    minimumRating,
  } = filters;

  return tmdbRequest("/discover/movie", {
    params: {
      page: String(page),
      include_adult: "false",
      include_video: "false",
      with_genres: genre,
      primary_release_year: year,
      sort_by: sortBy,
      "vote_average.gte": minimumRating,
      "vote_count.gte": minimumRating ? "100" : undefined,
    },
    signal,
  });
}

export function getMovieGenres(signal) {
  return tmdbRequest("/genre/movie/list", { signal });
}

export function getMovieDetails(id, signal) {
  return tmdbRequest("/movie/" + id, { signal });
}

export function getSimilarMovies(id, signal) {
  return tmdbRequest("/movie/" + id + "/similar", { signal });
}

export function getMovieBundle(id, signal) {
  return tmdbRequest("/movie/" + id, {
    params: {
      append_to_response: "videos,credits,recommendations,similar",
    },
    signal,
  });
}

export function getPersonDetails(id, signal) {
  return tmdbRequest("/person/" + id, { signal });
}

export function getPersonMovieCredits(id, signal) {
  return tmdbRequest("/person/" + id + "/movie_credits", { signal });
}

export function getImageUrl(path, size = "w500") {
  return path ? IMAGE_BASE_URL + "/" + size + path : null;
}
