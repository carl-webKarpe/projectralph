import { NavLink, Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Header() {
  const { favorites } = useFavorites()
  return (
    <header className="header">
      <Link to="/" className="brand" aria-label="Go to Pokédex home page">
        <span className="brand-ball" aria-hidden="true" />
        <span className="brand-text">
          <span className="brand-name">Poké<span className="brand-name-accent">dex</span></span>
        </span>
      </Link>
      <nav className="nav" aria-label="Main navigation">
        <NavLink to="/" end>Browse</NavLink>
        <NavLink to="/favorites">
          Favorites <span className="badge">{favorites.length}</span>
        </NavLink>
      </nav>
    </header>
  )
}
