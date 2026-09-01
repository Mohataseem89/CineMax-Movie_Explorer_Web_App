import { readJson, removeStoredValue, writeJson } from "./storage.js";

const STORAGE_KEY = "cinemax_recent_searches";
const HISTORY_LIMIT = 6;

export function getRecentSearches(storage = window.localStorage) {
  const value = readJson(STORAGE_KEY, [], storage);
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim())
    .slice(0, HISTORY_LIMIT);
}

export function saveRecentSearch(query, storage = window.localStorage) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return getRecentSearches(storage);

  const searches = getRecentSearches(storage).filter(
    (item) => item.toLowerCase() !== normalizedQuery.toLowerCase()
  );
  const updatedSearches = [normalizedQuery, ...searches].slice(0, HISTORY_LIMIT);
  writeJson(STORAGE_KEY, updatedSearches, storage);
  return updatedSearches;
}

export function clearRecentSearches(storage = window.localStorage) {
  removeStoredValue(STORAGE_KEY, storage);
}
