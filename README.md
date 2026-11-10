# PokéFinder — React + PokéAPI Single-Page Application

PokéFinder is a client-side single-page application (SPA) built with **React 19**, **Vite** and **React Router**. It uses live data from the public **[PokéAPI](https://pokeapi.co/)** REST API. You can browse more than 1,000 Pokémon, search them by name or number, filter by type, sort the results and page through them. You can also open a details page with stats, abilities and the Pokédex entry. Favorite Pokémon and recent search terms are saved in your browser with `localStorage`.

> Final project for **Web Systems and Technologies**.

## Features

| Requirement | Implementation |
|---|---|
| External REST API | PokéAPI: `/pokemon`, `/pokemon/:id`, `/pokemon-species/:id`, `/type`, `/type/:name` |
| Async data fetching | `useFetch` custom hook: `useEffect` + `async/await` + `fetch`, with `AbortController` cleanup |
| Loading states | Shimmering skeleton card grid (browse page) and spinner (details page) |
| Error handling | `ErrorBanner` with a **Retry** button, a "Pokémon not found" state for invalid IDs, empty-result states, and a 404 page |
| Routing (React Router) | `/` browse/search · `/pokemon/:id` details · `/favorites` bookmarks · `*` not found |
| 1. Search filter | Live filtering by name or Pokédex number (`pika`, `25`, `#025`) |
| 2. Category filter & sorting | Type dropdown (fire, water, …) and sorting by number or name (asc/desc) |
| 3. Pagination | 24 cards per page, with Prev/Next, page numbers and ellipses |
| localStorage persistence | Favorites (★) and the 6 most recent search terms are kept across page reloads |
| Shareable state | Search, type, sort and page are stored in the URL query string, so the Back button and shared links restore the same view |

## APIs used

- **PokéAPI**: https://pokeapi.co/ ([docs](https://pokeapi.co/docs/v2))
- **PokéAPI sprites** (official artwork): https://github.com/PokeAPI/sprites

PokéAPI is free and needs **no API key**.

## Project structure

```
finalreact/
├── .env.example              # Environment variable template
├── index.html
└── src/
    ├── api/pokeapi.js        # All API calls + response mapping
    ├── context/FavoritesContext.jsx   # Favorites state shared app-wide (persisted)
    ├── hooks/
    │   ├── useFetch.js       # Loading / error / retry wrapper around async fetchers
    │   └── useLocalStorage.js
    ├── components/           # Header, SearchBar, FilterBar, RecentSearches, CardGrid,
    │                         # CardItem, FavoriteButton, Pagination, SkeletonGrid,
    │                         # Spinner, ErrorBanner, EmptyState, StatBar, TypeBadge
    ├── pages/                # HomePage, DetailsPage, FavoritesPage, NotFoundPage
    ├── utils/format.js
    ├── App.jsx               # Layout + routes
    ├── main.jsx              # BrowserRouter + FavoritesProvider
    └── index.css
```

## Setup & installation

Requirements: **Node.js 20+** and npm.

```bash
git clone https://github.com/carl-webkarpe/finalreact.git
```

```bash
cd finalreact/finalreact
```

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build into dist/
```

```bash
npm run preview   # serve the production build locally
```

```bash
npm run lint      # ESLint
```

## Environment variables

Vite exposes only variables that start with `VITE_`. Copy `.env.example` to `.env` and change the values if you need to:

| Variable | Default | Description |
|---|---|---|
| `VITE_POKEAPI_BASE_URL` | `https://pokeapi.co/api/v2` | Base URL of the REST API (point it at a mirror or a self-hosted PokéAPI) |
| `VITE_POKEMON_LIMIT` | `1025` | How many Pokémon are loaded into the browsable index |

Both variables are optional, and the app falls back to the defaults. If you later add an API that needs a key, put the key in `.env` as `VITE_SOME_API_KEY=...` and read it with `import.meta.env.VITE_SOME_API_KEY`. `.env` is git-ignored, so the key is not committed. Keep in mind that any `VITE_` value is bundled into client-side JavaScript and can be seen by users.

## Git workflow

- `main` is protected by convention. No one commits to it directly.
- All work happens on feature branches (`feature/api-fetch`, `feature/search-bar`, `feature/favorites`, …) and is merged through Pull Requests.
- Commit messages use conventional prefixes: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.

## Team member contributions

| Member | Contributions |
|---|---|
| _Member 1 name_ (@github-handle) | _e.g. API layer (`pokeapi.js`, `useFetch`), Home page search/filter/sort/pagination, routing_ |
| _Member 2 name_ (@github-handle) | _e.g. Details & Favorites pages, localStorage persistence, styling/responsive layout, README_ |

> Replace the placeholders above with your actual names and work breakdown.

## Credits

Pokémon data comes from [PokéAPI](https://pokeapi.co/). Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak and The Pokémon Company. This is a non-commercial educational project.
