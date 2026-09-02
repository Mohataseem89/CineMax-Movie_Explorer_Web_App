# Changelog

Notable changes to FilmWick
 are documented here. The project follows semantic versioning for portfolio releases.

## [1.0.0] — 2026-09-01

### Added

- Advanced discovery filters with shareable URL state
- Movie trailers, cast and crew, recommendations, and similar titles
- Person profile pages with biography and filmography
- Persistent watchlist with search, genre filtering, and sorting
- Debounced search suggestions and recent-search history
- Responsive navigation, grids, watchlist layouts, and image delivery
- Route-level code splitting and lightweight loading fallbacks
- TMDb response caching, request deduplication, and timeouts
- Dynamic metadata, canonical URLs, social tags, and structured data
- Favicons, web app manifest, robots file, sitemap, and social preview
- Application error boundary and resilient browser-storage utilities
- Keyboard, focus, modal, status-message, and reduced-motion improvements
- Seven regression tests and a GitHub Actions quality gate
- Architecture, deployment, testing, accessibility, and portfolio documentation

### Changed

- Reworked the visual system into a brighter cinematic interface
- Corrected the upcoming collection to use future release dates
- Improved hero and movie-detail backdrop visibility
- Renamed the package to `FilmWick
-movie-explorer`

### Security

- Added restrictive Vercel permissions and referrer headers
- Removed hardcoded API credentials in favor of environment configuration
