import { NavLink, Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Header() {
  const { favorites } = useFavorites()
  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-ball" aria-hidden="true" />
        Find Your Pokemon
      </Link>
      <nav className="nav">
        <NavLink to="/" end>Browse</NavLink>
        <NavLink to="/favorites">
          Favorites <span className="badge">{favorites.length}</span>
        </NavLink>
      </nav>
    </header>
  )
}
