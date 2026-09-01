import { X } from "lucide-react";
import { useEffect } from "react";

export default function TrailerModal({ trailer, onClose }) {
  useEffect(() => {
    if (!trailer) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [trailer, onClose]);

  if (!trailer) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trailer-title"
        className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#080a0f] shadow-2xl"
      >
        <div className="flex min-h-14 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-5">
          <h2 id="trailer-title" className="truncate font-bold text-white">
            {trailer.name || "Official trailer"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close trailer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <iframe
            className="h-full w-full"
            src={"https://www.youtube-nocookie.com/embed/" + trailer.key + "?autoplay=1&rel=0"}
            title={trailer.name || "Movie trailer"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

