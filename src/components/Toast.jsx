import { CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(onClose, 2800);
    return () => window.clearTimeout(timeout);
  }, [toast, onClose]);

  if (!toast) return null;

  const Icon = toast.tone === "success" ? CheckCircle2 : Info;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[90] flex w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-[#171c25]/95 p-4 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl sm:left-auto sm:right-6 sm:w-auto sm:translate-x-0"
      role="status"
      aria-live="polite"
    >
      <Icon
        className={toast.tone === "success" ? "h-5 w-5 shrink-0 text-emerald-400" : "h-5 w-5 shrink-0 text-blue-400"}
        aria-hidden="true"
      />
      <p className="min-w-0 flex-1 font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toast;
