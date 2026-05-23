# REEL

A movie discovery app built with React + TypeScript, powered by the TMDB API.

## Tech Stack

- **React 19** + **TypeScript**
- **React Router v7** — client-side routing
- **Vite** — build tool
- **TMDB API** — movie data

## Features

- Browse movies by category (Now Playing, Popular, Upcoming, Top Rated)
- Search movies by keyword
- Movie detail page (backdrop, poster, genres, rating, overview)
- Wishlist (coming soon)
- Reviews & ratings (coming soon)
- Trailer playback (coming soon)

## Project Structure

```
src/
├── api/          # TMDB API fetch logic
├── components/
│   ├── layout/   # Navbar
│   └── ui/       # MovieCard, LoadingSpinner, Button
├── constants/    # Genre mapping
├── screens/      # HomeScreen, MovieDetailScreen, SearchScreen
├── types/        # Movie, MovieDetail, Genre
└── styles/       # global.css
```

## Getting Started

### Prerequisites

- Node.js 18+
- TMDB API Key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your TMDB API key to .env
VITE_TMDB_API_KEY=your_api_key_here

# Start dev server
npm run dev
```

## Environment Variables

| Variable            | Description  |
| ------------------- | ------------ |
| `VITE_TMDB_API_KEY` | TMDB API key |

## Roadmap

- [ ] SearchScreen
- [ ] WishlistScreen
- [ ] Trailer playback
- [ ] Reviews & ratings
- [ ] Responsive design (mobile)

## Dev Log

### 2025-05-19

- Migrated project to TypeScript
- Set up base layout (Navbar, HomeScreen, MovieDetailScreen)
- Refactored genre mapping (removed redundant constants/genres.ts)

### 2026-05-21

- Implemented SearchScreen with real-time search
- Added debounce (300ms) to prevent excessive API calls
- Added encodeURIComponent / decodeURIComponent for safe URL handling
- Added { replace: true } to prevent search history stacking
- Fixed optional route parameter (/search/:keyword?)

### 2026-05-23

- Implemented infinite scroll on SearchScreen with Intersection Observer
- Added pagination support to searchMovies API (page parameter)
- Added PaginatedResponse type
- Split loading states (loading / pageLoading) to prevent scroll reset
- Added duplicate movie deduplication with Set
- Implemented Wishlist with Zustand + localStorage persist
- Added wishlist heart button to MovieCard
- Added WishlistScreen

### Learning Notes

- TypeScript type narrowing (null check, generics)
- useEffect async pattern
- Movie vs MovieDetail type separation (Omit utility type)
- Non-blocking I/O / Event Loop
- never[] vs typed array (useState generics)
- Early Return pattern
- debounce with setTimeout + useEffect cleanup
- encodeURIComponent / decodeURIComponent
- React Router replace option
- useRef (DOM reference)
- useCallback (function memoization)
- Intersection Observer API
- useEffect cleanup (preventing memory leaks)
- Set for deduplication
- Zustand store + persist middleware
- localStorage vs cookie vs memory
