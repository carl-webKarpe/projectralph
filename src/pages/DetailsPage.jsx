import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchPokemonDetails, POKEMON_LIMIT } from '../api/pokeapi'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import EmptyState from '../components/EmptyState'
import FavoriteButton from '../components/FavoriteButton'
import StatBar from '../components/StatBar'
import TypeBadge from '../components/TypeBadge'
import { formatId } from '../utils/format'

export default function DetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: pokemon, loading, error, retry } = useFetch(
    (signal) => fetchPokemonDetails(id, signal),
    [id],
  )

  if (loading) return <Spinner label="Loading Pokémon…" />

  if (error) {
    if (error.status === 404) {
      return (
        <EmptyState title="Pokémon not found">
          <p>No Pokémon matches “{id}”.</p>
          <Link to="/" className="button">Back to browse</Link>
        </EmptyState>
      )
    }
    return <ErrorBanner message={`Couldn't load this Pokémon: ${error.message}.`} onRetry={retry} />
  }

  const total = pokemon.stats.reduce((sum, s) => sum + s.value, 0)

  return (
    <article className="details">
      <div className="details-nav">
        <button type="button" className="link-button" onClick={() => navigate(-1)}>← Back</button>
        <div>
          {pokemon.id > 1 && <Link to={`/pokemon/${pokemon.id - 1}`}>‹ {formatId(pokemon.id - 1)}</Link>}
          {pokemon.id < POKEMON_LIMIT && <Link to={`/pokemon/${pokemon.id + 1}`}>{formatId(pokemon.id + 1)} ›</Link>}
        </div>
      </div>

      <div className="details-body">
        <div className={`details-art type-bg-${pokemon.types[0]}`}>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className="details-info">
          <span className="card-id">{formatId(pokemon.id)}</span>
          <h1>{pokemon.name}</h1>
          {pokemon.genus && <p className="genus">{pokemon.genus}</p>}
          <div className="types">
            {pokemon.types.map((t) => <TypeBadge key={t} type={t} />)}
          </div>
          {pokemon.description && <p className="description">{pokemon.description}</p>}

          <FavoriteButton pokemon={pokemon} large />

          <dl className="facts">
            <div><dt>Height</dt><dd>{pokemon.height} m</dd></div>
            <div><dt>Weight</dt><dd>{pokemon.weight} kg</dd></div>
            <div><dt>Base XP</dt><dd>{pokemon.baseExperience ?? '—'}</dd></div>
            <div>
              <dt>Abilities</dt>
              <dd>
                {pokemon.abilities.map((a) => (
                  <span key={a.name} className="ability">
                    {a.name}{a.hidden && <small> (hidden)</small>}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <h2>Base stats</h2>
          {pokemon.stats.map((s) => <StatBar key={s.name} {...s} />)}
          <p className="stat-total">Total: <strong>{total}</strong></p>
        </div>
      </div>
    </article>
  )
}
