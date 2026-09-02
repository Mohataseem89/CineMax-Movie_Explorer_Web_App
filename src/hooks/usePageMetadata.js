import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_DESCRIPTION =
  "Discover trending, popular, upcoming, and top-rated movies with trailers, cast information, recommendations, and a personal watchlist.";

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(
    "meta[" + attribute + '="' + key + '"]'
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export function usePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  type = "website",
  robots = "index,follow",
  canonicalPath,
  structuredData,
}) {
  const location = useLocation();
  const structuredDataJson = structuredData
    ? JSON.stringify(structuredData)
    : "";

  useEffect(() => {
    const pageTitle = title.includes("FilmWick")
      ? title
      : title + " | FilmWick";
    const canonicalUrl =
      window.location.origin + (canonicalPath || location.pathname);
    const socialImage =
      image || window.location.origin + "/og-FilmWick.png";

    document.title = pageTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", socialImage);
    upsertMeta("property", "og:site_name", "FilmWick");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", socialImage);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const existingSchema = document.getElementById("page-structured-data");
    if (existingSchema) existingSchema.remove();

    if (structuredDataJson) {
      const schema = document.createElement("script");
      schema.id = "page-structured-data";
      schema.type = "application/ld+json";
      schema.textContent = structuredDataJson;
      document.head.appendChild(schema);
    }
  }, [
    canonicalPath,
    description,
    image,
    location.pathname,
    robots,
    structuredDataJson,
    title,
    type,
  ]);
}

