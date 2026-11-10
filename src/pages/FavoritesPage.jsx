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

  if (favorites.length === 0) {
    return (
      <EmptyState title="No favorites yet">
        <p>Tap the ☆ on any Pokémon to save it here. Favorites are kept in your browser.</p>
        <Link to="/" className="button">Browse Pokémon</Link>
      </EmptyState>
    )
  }

  return (
    <section>
      <div className="page-header">
        <h1>Your favorites ({favorites.length})</h1>
        <button
          type="button"
          className="danger"
          onClick={() => window.confirm('Remove all favorites?') && clearFavorites()}
        >
          Clear all
        </button>
      </div>
      <input
        type="search"
        className="inline-filter"
        placeholder="Filter favorites…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter favorites"
      />
      {visible.length === 0
        ? <EmptyState title="No favorites match that filter" />
        : <CardGrid items={visible} />}
    </section>
  )
}
