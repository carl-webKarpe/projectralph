const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2'
export const POKEMON_LIMIT = Number(import.meta.env.VITE_POKEMON_LIMIT) || 1025

async function getJson(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal })
  if (!res.ok) {
    const error = new Error(res.status === 404 ? 'Not found' : `Request failed (${res.status})`)
    error.status = res.status
    throw error
  }
  return res.json()
}

export function idFromUrl(url) {
  return Number(url.split('/').filter(Boolean).pop())
}

export function artworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export async function fetchPokemonIndex(signal) {
  const data = await getJson(`/pokemon?limit=${POKEMON_LIMIT}`, signal)
  return data.results.map(({ name, url }) => ({ id: idFromUrl(url), name }))
}

export async function fetchTypes(signal) {
  const data = await getJson('/type?limit=50', signal)
  return data.results
    .map((t) => t.name)
    .filter((name) => !['unknown', 'shadow', 'stellar'].includes(name))
}

export async function fetchPokemonNamesByType(type, signal) {
  const data = await getJson(`/type/${type}`, signal)
  return new Set(data.pokemon.map((p) => p.pokemon.name))
}

export async function fetchPokemonDetails(idOrName, signal) {
  const [pokemon, species] = await Promise.all([
    getJson(`/pokemon/${idOrName}`, signal),
    getJson(`/pokemon-species/${idOrName}`, signal).catch(() => null),
  ])
  const flavor = species?.flavor_text_entries.find((f) => f.language.name === 'en')
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    baseExperience: pokemon.base_experience,
    types: pokemon.types.map((t) => t.type.name),
    abilities: pokemon.abilities.map((a) => ({ name: a.ability.name, hidden: a.is_hidden })),
    stats: pokemon.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    image: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
    genus: species?.genera.find((g) => g.language.name === 'en')?.genus ?? '',
    description: flavor ? flavor.flavor_text.replace(/[\f\n\r]/g, ' ') : '',
  }
}
