# CineMax — Movie Explorer and Watchlist

CineMax is a responsive movie-discovery application powered by the TMDb API. It combines curated collections, advanced discovery filters, fast title search, rich movie and cast pages, trailers, recommendations, and a persistent personal watchlist.

- **Live demo:** https://cine-maxapp.vercel.app/
- **Repository:** https://github.com/Mohataseem89/CineMax-Movie_Explorer_Web_App

## Features

- Weekly trending-movie hero
- Global movie search with debounced suggestions and recent-search history
- URL-shareable discovery filters for genre, year, rating, and sort order
- Now playing, upcoming, top-rated, and popular movie collections
- Paginated popular-movie browsing
- Rich movie details with trailers, cast, key crew, genres, and release data
- Recommendation and similar-movie collections
- Actor and filmmaker profile pages with biography and filmography highlights
- Persistent local watchlist
- Watchlist search, genre filtering, and sorting
- Responsive desktop and mobile navigation
- Modern cinematic interface with responsive poster grids
- Mobile card and desktop table watchlist layouts
- Accessible watchlist controls and user feedback notifications
- Loading, error, fallback, and retry states
- Client-side routing with Vercel SPA rewrites
- Route-level code splitting with lightweight page fallbacks
- In-memory TMDb response caching and duplicate-request deduplication
- Responsive poster and backdrop image delivery
- Dynamic titles, descriptions, canonical URLs, and social metadata
- Movie and person structured data, robots.txt, and sitemap.xml
- Installable web-app manifest and responsive CineMax favicon set
- Safe watchlist and search-history persistence with malformed-data recovery
- Global application error recovery and TMDb request timeouts
- Keyboard-accessible search suggestions, mobile navigation, and trailer modal
- Automated regression tests for watchlist and recent-search behavior

## Technology

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based user interface |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Responsive styling |
| Vite 7 | Development and production builds |
| Lucide React | Interface icons |
| TMDb API | Movie data and imagery |
| Vercel | Hosting and deployment |

## Local setup

Requirements: Node.js 20 or newer and a TMDb API key.

```bash
git clone https://github.com/Mohataseem89/CineMax-Movie_Explorer_Web_App.git
cd CineMax-Movie_Explorer_Web_App
npm install
cp .env.example .env
npm run dev
```

Set your TMDb key in `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Environment variables prefixed with `VITE_` are included in the browser bundle. For a higher-traffic production application, place the TMDb credential behind an allowlisted serverless API proxy.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run test     # Run regression tests
npm run check    # Run lint, tests, and the production build
npm run preview  # Preview the production build
```

## Project structure

```text
src/
├── api/
│   └── tmdb.js
├── components/
│   ├── Banner.jsx
│   ├── DiscoveryRows.jsx
│   ├── ErrorBoundary.jsx
│   ├── Footer.jsx
│   ├── MovieCards.jsx
│   ├── MovieDetails.jsx
│   ├── MovieResultsGrid.jsx
│   ├── Movies.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── PageLoader.jsx
│   ├── SearchBar.jsx
│   ├── ScrollToTop.jsx
│   ├── TrailerModal.jsx
│   ├── Toast.jsx
│   └── WatchList.jsx
├── pages/
│   ├── DiscoverPage.jsx
│   ├── HomePage.jsx
│   ├── NotFoundPage.jsx
│   ├── PersonDetails.jsx
│   └── SearchPage.jsx
├── hooks/
│   ├── usePageMetadata.js
│   └── useWatchlist.js
├── utils/
│   ├── searchHistory.js
│   ├── storage.js
│   └── watchlist.js
├── App.jsx
├── index.css
└── main.jsx
```

## Deployment

The repository includes `vercel.json`, which rewrites application routes to `index.html`. This allows direct visits and refreshes on routes such as `/movie/:id`, `/person/:id`, `/discover`, and `/search`. It also adds long-lived caching for hashed build assets and security-focused response headers.

Add `VITE_TMDB_API_KEY` to the Vercel project environment before deploying.

## Data attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie information and images are provided by [The Movie Database](https://www.themoviedb.org/).

## Author

**Mohataseem Khan**

- [LinkedIn](https://www.linkedin.com/in/mohataseem-khan/)
- [GitHub](https://github.com/Mohataseem89)


> Made with ❤️ for movie lovers.
