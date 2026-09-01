import { Film, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata";

export default function NotFoundPage() {
  usePageMetadata({
    title: "Page Not Found",
    description: "The requested Moviora
 page could not be found.",
    robots: "noindex,nofollow",
  });

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-20 text-center">
      <div className="max-w-lg">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-[#11151c] text-red-400">
          <Film className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-red-400">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
          This scene is missing
        </h1>
        <p className="mt-4 leading-7 text-gray-400">
          The page may have moved, or the address may be incorrect.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-red-600 px-6 font-bold text-white transition-colors hover:bg-red-500"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          Return home
        </Link>
      </div>
    </section>
  );
}

