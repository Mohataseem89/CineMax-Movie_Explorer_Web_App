import Banner from "../components/Banner";
import DiscoveryRows from "../components/DiscoveryRows";
import Movies from "../components/Movies";
import { usePageMetadata } from "../hooks/usePageMetadata";

export default function HomePage(props) {
  usePageMetadata({
    title: "FilmWick— Discover Movies, Trailers and Cast",
    description:
      "Discover trending, popular, upcoming, and top-rated movies. Watch trailers, explore cast profiles, and build your personal watchlist.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "FilmWick",
      url: window.location.origin + "/",
      potentialAction: {
        "@type": "SearchAction",
        target: window.location.origin + "/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  });

  return (
    <>
      <Banner />
      <DiscoveryRows {...props} />
      <Movies {...props} />
    </>
  );
}

