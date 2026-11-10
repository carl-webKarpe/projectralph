import { Link } from 'react-router-dom'
import { artworkUrl } from '../api/pokeapi'
import FavoriteButton from './FavoriteButton'
import { formatId } from '../utils/format'

export default function CardItem({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card">
      <FavoriteButton pokemon={pokemon} />
      <img src={artworkUrl(pokemon.id)} alt={pokemon.name} loading="lazy" />
      <span className="card-id">{formatId(pokemon.id)}</span>
      <h3 className="card-name">{pokemon.name}</h3>
    </Link>
  )
}
