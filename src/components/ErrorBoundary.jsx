import { Component } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, details) {
    console.error("CineMax encountered an unexpected error:", error, details);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080a0f] px-5 py-20 text-center text-white">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-[#11151c] p-8 sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-[-0.04em]">
            CineMax hit an unexpected problem
          </h1>
          <p className="mt-4 leading-7 text-gray-400">
            Your watchlist remains saved. Reload the application or return to
            the homepage to continue.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 font-bold hover:bg-red-500"
            >
              <RefreshCw className="h-5 w-5" aria-hidden="true" />
              Reload application
            </button>
            <a
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 font-bold hover:bg-white/10"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Return home
            </a>
          </div>
        </div>
      </main>
    );
  }
}

