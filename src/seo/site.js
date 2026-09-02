export const SITE_NAME = "FlickMuse";
export const SITE_URL = "https://flickmuse.mohataseem.com";
export const DEFAULT_DESCRIPTION =
  "FlickMuse is a movie discovery app for exploring trending, popular, upcoming, and top-rated films, trailers, cast, and movie details.";
export const DEFAULT_SOCIAL_IMAGE = SITE_URL + "/og-flickmuse.png";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function textForMeta(value, maxLength = 155) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return DEFAULT_DESCRIPTION;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}
