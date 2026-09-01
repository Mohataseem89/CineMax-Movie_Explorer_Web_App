export function readJson(key, fallback, storage = window.localStorage) {
  try {
    const rawValue = storage.getItem(key);
    if (rawValue === null) return fallback;
    return JSON.parse(rawValue);
  } catch {
    try {
      storage.removeItem(key);
    } catch {
      // Storage may be disabled or unavailable.
    }
    return fallback;
  }
}

export function writeJson(key, value, storage = window.localStorage) {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredValue(key, storage = window.localStorage) {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

