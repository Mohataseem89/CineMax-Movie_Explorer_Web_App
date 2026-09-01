const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

async function tmdbRequest(path, { params = {}, signal } = {}) {
  if (!API_KEY) {
    throw new Error(
      "TMDb API key is missing. Add VITE_TMDB_API_KEY to your environment."
    );
  }

  const url = new URL(`${API_BASE_URL}${path}`);
  url.search = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params,
  }).toString();

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`TMDb request failed with status ${response.status}.`);
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

export function getMovieDetails(id, signal) {
  return tmdbRequest(`/movie/${id}`, { signal });
}

export function getSimilarMovies(id, signal) {
  return tmdbRequest(`/movie/${id}/similar`, { signal });
}

export function getImageUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}
