import test from "node:test";
import assert from "node:assert/strict";
import { MemoryStorage } from "./helpers/memoryStorage.js";
import {
  WATCHLIST_STORAGE_KEY,
  addMovieToWatchlist,
  loadWatchlist,
  normalizeWatchlist,
  removeMovieFromWatchlist,
  saveWatchlist,
} from "../src/utils/watchlist.js";

test("normalizeWatchlist removes invalid entries and duplicate movie IDs", () => {
  const firstMovie = { id: 10, title: "First" };
  const result = normalizeWatchlist([
    firstMovie,
    null,
    { title: "Missing ID" },
    { id: 10, title: "Duplicate" },
    { id: 11, title: "Second" },
  ]);

  assert.deepEqual(result, [firstMovie, { id: 11, title: "Second" }]);
});

test("addMovieToWatchlist adds a valid movie only once", () => {
  const movie = { id: 42, title: "The Answer" };
  const firstResult = addMovieToWatchlist([], movie);
  const duplicateResult = addMovieToWatchlist(firstResult.watchlist, movie);

  assert.equal(firstResult.added, true);
  assert.equal(duplicateResult.added, false);
  assert.deepEqual(duplicateResult.watchlist, [movie]);
});

test("removeMovieFromWatchlist removes only the selected movie", () => {
  const result = removeMovieFromWatchlist(
    [
      { id: 1, title: "One" },
      { id: 2, title: "Two" },
    ],
    1
  );

  assert.deepEqual(result, [{ id: 2, title: "Two" }]);
});

test("watchlist persistence survives malformed browser data", () => {
  const storage = new MemoryStorage({
    [WATCHLIST_STORAGE_KEY]: "{not-valid-json",
  });

  assert.deepEqual(loadWatchlist(storage), []);
  assert.equal(storage.getItem(WATCHLIST_STORAGE_KEY), null);

  const movies = [{ id: 7, title: "Saved" }];
  assert.equal(saveWatchlist(movies, storage), true);
  assert.deepEqual(loadWatchlist(storage), movies);
});

