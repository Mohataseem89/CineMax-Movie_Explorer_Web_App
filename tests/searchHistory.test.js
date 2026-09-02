import test from "node:test";
import assert from "node:assert/strict";
import { MemoryStorage } from "./helpers/memoryStorage.js";
import {
  clearRecentSearches,
  getRecentSearches,
  saveRecentSearch,
} from "../src/utils/searchHistory.js";

test("recent searches are trimmed, deduplicated, and newest first", () => {
  const storage = new MemoryStorage();

  saveRecentSearch("  Dune  ", storage);
  saveRecentSearch("Alien", storage);
  const searches = saveRecentSearch("dune", storage);

  assert.deepEqual(searches, ["dune", "Alien"]);
});

test("recent search history keeps no more than six entries", () => {
  const storage = new MemoryStorage();

  for (let index = 1; index <= 8; index += 1) {
    saveRecentSearch("Movie " + index, storage);
  }

  assert.deepEqual(getRecentSearches(storage), [
    "Movie 8",
    "Movie 7",
    "Movie 6",
    "Movie 5",
    "Movie 4",
    "Movie 3",
  ]);
});

test("recent searches recover from malformed data and can be cleared", () => {
  const storage = new MemoryStorage({
    FilmWick
_recent_searches: "invalid-json",
  });

  assert.deepEqual(getRecentSearches(storage), []);
  saveRecentSearch("Arrival", storage);
  clearRecentSearches(storage);

  assert.deepEqual(getRecentSearches(storage), []);
});

