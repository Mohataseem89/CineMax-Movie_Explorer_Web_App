const STORAGE_KEY = "cinemax_recent_searches";
const HISTORY_LIMIT = 6;

export function getRecentSearches() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter(Boolean).slice(0, HISTORY_LIMIT) : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveRecentSearch(query) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return getRecentSearches();

  const searches = getRecentSearches().filter(
    (item) => item.toLowerCase() !== normalizedQuery.toLowerCase()
  );
  const updatedSearches = [normalizedQuery, ...searches].slice(0, HISTORY_LIMIT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
  return updatedSearches;
}

export function clearRecentSearches() {
  localStorage.removeItem(STORAGE_KEY);
}
