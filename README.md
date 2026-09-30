# REEL

A movie discovery app built with React + TypeScript, powered by the TMDB API.

## Tech Stack

- **React 19** + **TypeScript**
- **React Router v7** — client-side routing
- **Vite** — build tool
- **TMDB API** — movie data
- **Node.js + Express 5** + **TypeScript** — backend API proxy for TMDB (in progress)

## Features

- Browse movies by category (Now Playing, Popular, Upcoming, Top Rated)
- Search movies by keyword
- Movie detail page (backdrop, poster, genres, rating, overview)
- Wishlist (Zustand + localStorage)
- Trailer playback (YouTube embed)
- Reviews & ratings (coming soon)

## Project Structure

```
client/src/
├── api/          # TMDB API fetch logic
├── components/
│   ├── layout/   # Navbar
│   └── ui/       # MovieCard, LoadingSpinner, Button
├── constants/    # Genre mapping
├── screens/      # HomeScreen, MovieDetailScreen, SearchScreen
├── types/        # Movie, MovieDetail, Genre
└── styles/       # global.css

server/src/
├── index.ts      # Express app entry
├── middleware/   # Centralized error handler
├── routes/       # movies.ts, search.ts
└── services/     # tmdb.ts (all TMDB calls go through fetchTmdb)
```

## API Endpoints (server)

| Method | Endpoint                       | Description                                                          |
| ------ | ------------------------------ | -------------------------------------------------------------------- |
| GET    | `/api/movies/:category`        | Movie list (`now_playing`, `popular`, `upcoming`, `top_rated`)       |
| GET    | `/api/movie/:id`               | Movie detail (`id` must be numeric)                                  |
| GET    | `/api/search?query=&page=`     | Search movies (`query` required, `page` positive integer, default 1) |

Invalid input returns `400` with an error message.

## Getting Started

### Prerequisites

- Node.js 18+
- TMDB API Key ([get one here](https://www.themoviedb.org/settings/api))

### Client

```bash
cd client
npm install
# Add VITE_TMDB_API_KEY to client/.env
npm run dev
```

### Server

```bash
cd server
npm install
cp .env.example .env
# Add your TMDB API key to server/.env
npm run dev   # http://localhost:4000
```

## Environment Variables

| Location      | Variable            | Description                                 |
| ------------- | ------------------- | ------------------------------------------- |
| `client/.env` | `VITE_TMDB_API_KEY` | TMDB API key (until client moves to server) |
| `server/.env` | `TMDB_API_KEY`      | TMDB API key                                |
| `server/.env` | `PORT`              | Server port (default 4000)                  |

## Roadmap

- [x] SearchScreen
- [x] WishlistScreen
- [x] Trailer playback
- [x] Responsive design (mobile)
- [x] Express API proxy for TMDB
- [ ] Switch client to call the Express server
- [ ] Redis caching (cache-aside, TTL)
- [ ] Health check, Redis fallback to TMDB
- [ ] Deploy server to AWS Elastic Beanstalk + ElastiCache
- [ ] Reviews & ratings

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

### 2026-05-26

- Reviewed and studied SearchScreen (infinite scroll, Intersection Observer)
- Reviewed and studied wishlistStore (Zustand, persist middleware)
- Reviewed and studied Navbar (controlled component, event handling)

### 2026-05-28

- Add responsive design (2col mobile / 3col tablet / 4col desktop)
- Add trailer modal with YouTube iframe embed on MovieDetailScreen
- Add official trailer filtering with YouTube fallback
- Add Skeleton UI to HomeScreen and SearchScreen
- Add MovieCardSkeleton component with shimmer animation
- Deploy to AWS S3 + CloudFront
- Configure CloudFront custom error responses for React Router
- Add deploy.sh for automated redeployment

### 2026-09-29

- Added Node.js/Express backend (`server/`) with TypeScript
- Added `/api/movies/:category`, `/api/movie/:id`, `/api/search` endpoints proxying TMDB
- Moved TMDB API key to server environment variables
- Added input validation (category whitelist, numeric id, query/page checks)
- Added centralized error handling middleware
- Smoke-tested valid and invalid requests with curl

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
- Array methods: some, every, find, filter, map
- Zustand set(fn) vs set(value) difference
- Zustand middleware pattern create()()
- Controlled Component (value + onChange)
- React event types (ChangeEvent, MouseEvent, KeyboardEvent)
- onClick arrow function vs direct call
- CSS Grid responsive layout (auto-fill, minmax, media queries)
- YouTube iframe embed
- Skeleton UI / shimmer animation
- Array.from({ length: N }) for generating placeholder arrays
- AWS S3 static website hosting
- AWS CloudFront CDN distribution
- CloudFront custom error responses (React Router 404 fix)
- AWS CLI (configure, s3 sync, cloudfront invalidation)
- IAM user and permissions (least privilege principle)
- Express Router, middleware chain, error-handling middleware (4 args)
- Passing async errors to next(err)
- Keeping API keys server-side (dotenv, .env.example)
