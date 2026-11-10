import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteButton({ pokemon, large = false }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(pokemon.id)
  return (
    <button
      type="button"
      className={`fav-button${active ? ' active' : ''}${large ? ' large' : ''}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(pokemon)
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
    >
      {active ? '★' : '☆'}{large && (active ? ' Favorited' : ' Add to favorites')}
    </button>
  )
}
