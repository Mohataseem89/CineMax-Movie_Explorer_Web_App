import Banner from "../components/Banner";
import DiscoveryRows from "../components/DiscoveryRows";
import Movies from "../components/Movies";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { SITE_NAME, SITE_URL } from "../seo/site";

export default function HomePage(props) {
  usePageMetadata({
    title: "FlickMuse — Movie Discovery, Trailers & Cast",
    description:
      "Explore trending, popular, upcoming, and top-rated movies on FlickMuse. Watch trailers, browse cast, view movie details, and save a personal watchlist.",
    canonicalPath: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL + "/",
          description: "A movie discovery website for browsing films, trailers, cast, and movie details.",
          potentialAction: {
            "@type": "SearchAction",
            target: SITE_URL + "/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "WebApplication",
          name: SITE_NAME,
          applicationCategory: "EntertainmentApplication",
          operatingSystem: "Web",
          url: SITE_URL + "/",
          description: "Discover movies, trailers, cast profiles, and movie details, then save titles to a personal watchlist.",
        },
      ],
    },
  });

  return (
    <>
      <Banner />
      <DiscoveryRows {...props} />
      <Movies {...props} />
      <section className="border-t border-white/[0.07] bg-[#0b0e14] py-16 text-white sm:py-20" aria-labelledby="about-flickmuse-title">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">About FlickMuse</p>
          <h2 id="about-flickmuse-title" className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            A simple way to find your next movie
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-gray-300">
            FlickMuse helps movie lovers explore popular, trending, upcoming, and top-rated films. Search by title, use genre and rating filters, open trailers and cast profiles, and keep a personal watchlist for later.
          </p>
        </div>
      </section>
    </>
  );
}
