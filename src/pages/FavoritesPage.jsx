import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import CardGrid from '../components/CardGrid'
import EmptyState from '../components/EmptyState'

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()
  const [filter, setFilter] = useState('')

  const visible = useMemo(
    () => favorites
      .filter((f) => f.name.includes(filter.trim().toLowerCase()))
      .sort((a, b) => a.id - b.id),
    [favorites, filter],
  )

  const collectionLabel = favorites.length === 0
    ? 'Ready to begin'
    : favorites.length < 6
      ? 'Rising trainer'
      : favorites.length < 12
        ? 'Battle ready'
        : 'Elite collector'

  if (favorites.length === 0) {
    return (
      <section className="favorites-shell favorites-shell-empty">
        <div className="favorites-empty-state">
          <span className="favorites-empty-icon" aria-hidden="true">★</span>
          <p className="eyebrow">Trainer collection</p>
          <h1>Start building your favorites</h1>
          <p>
            Tap the star on any Pokémon to save it here. Your favorite picks stay saved in this browser.
          </p>
          <div className="favorites-actions centered">
            <Link to="/" className="button">Browse Pokédex</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="favorites-shell">
      <div className="favorites-hero">
        <div className="favorites-hero-copy">
          <p className="eyebrow">Trainer collection</p>
          <h1>
            Your favorites
            <span className="favorites-count">{favorites.length}</span>
          </h1>
          <p className="favorites-subtitle">
            A curated set of Pokémon you love most, ready whenever you want to revisit them.
          </p>
        </div>

        <div className="favorites-actions">
          <Link to="/" className="button secondary">Browse Pokédex</Link>
          <button
            type="button"
            className="danger"
            onClick={() => window.confirm('Remove all favorites?') && clearFavorites()}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="favorites-toolbar">
        <div className="favorites-search-wrap">
          <label htmlFor="favorites-filter">Filter favorites</label>
          <input
            id="favorites-filter"
            type="search"
            className="inline-filter"
            placeholder="Search by name…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter favorites"
          />
        </div>

        <div className="favorites-metrics" aria-label="Favorites summary">
          <div className="metric-card">
            <span className="metric-label">Saved</span>
            <strong>{favorites.length}</strong>
          </div>
          <div className="metric-card">
            <span className="metric-label">Visible</span>
            <strong>{visible.length}</strong>
          </div>
          <div className="metric-card accent">
            <span className="metric-label">Tier</span>
            <strong>{collectionLabel}</strong>
          </div>
        </div>
      </div>

      {visible.length === 0
        ? <EmptyState title="No favorites match that filter" />
        : <CardGrid items={visible} />}
    </section>
  )
}
