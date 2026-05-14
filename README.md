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

| Variable | Description |
|---|---|
| `VITE_TMDB_API_KEY` | TMDB API key |

## Roadmap

- [ ] SearchScreen
- [ ] WishlistScreen
- [ ] Trailer playback
- [ ] Reviews & ratings
- [ ] Responsive design (mobile)