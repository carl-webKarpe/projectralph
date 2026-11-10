import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPokemonIndex, fetchPokemonNamesByType, fetchTypes } from '../api/pokeapi'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import SearchBar from '../components/SearchBar'
import RecentSearches from '../components/RecentSearches'
import FilterBar from '../components/FilterBar'
import CardGrid from '../components/CardGrid'
import SkeletonGrid from '../components/SkeletonGrid'
import ErrorBanner from '../components/ErrorBanner'
import EmptyState from '../components/EmptyState'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 24
const MAX_RECENT = 6

const sorters = {
  'id-asc': (a, b) => a.id - b.id,
  'id-desc': (a, b) => b.id - a.id,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
}

export default function HomePage() {
  // Filters live in the URL so they survive navigating to a details page and back.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const type = params.get('type') ?? ''
  const sort = sorters[params.get('sort')] ? params.get('sort') : 'id-asc'
  const page = Math.max(1, Number(params.get('page')) || 1)

  const [input, setInput] = useState(query)
  const [recent, setRecent] = useLocalStorage('pokedex:recent-searches', [])

  const index = useFetch((signal) => fetchPokemonIndex(signal), [])
  const types = useFetch((signal) => fetchTypes(signal), [])
  const typeMembers = useFetch(
    (signal) => (type ? fetchPokemonNamesByType(type, signal) : Promise.resolve(null)),
    [type],
  )

  const updateParams = (changes, options) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key)
      else next.set(key, String(value))
    })
    if (!('page' in changes)) next.delete('page')
    setParams(next, options)
  }

  const handleInput = (value) => {
    setInput(value)
    updateParams({ q: value.trim() }, { replace: true })
  }

  const saveSearch = (term) => {
    const cleaned = term.trim().toLowerCase()
    if (!cleaned) return
    setRecent((current) => [cleaned, ...current.filter((t) => t !== cleaned)].slice(0, MAX_RECENT))
  }

  const selectRecent = (term) => {
    setInput(term)
    updateParams({ q: term })
    saveSearch(term)
  }

  const filtered = useMemo(() => {
    if (!index.data) return []
    const q = query.toLowerCase()
    return index.data
      .filter((p) => !q || p.name.includes(q) || String(p.id) === q.replace(/^#0*/, ''))
      .filter((p) => !type || typeMembers.data?.has(p.name))
      .sort(sorters[sort])
  }, [index.data, query, type, typeMembers.data, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const changePage = (n) => {
    updateParams({ page: n === 1 ? '' : n })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const loading = index.loading || (type && typeMembers.loading)
  const error = index.error || (type && typeMembers.error)
  const retry = index.error ? index.retry : typeMembers.retry

  return (
    <section>
      <div className="hero">
        <h1>Find your Pokémon</h1>
        <p>Search, filter and bookmark every Pokémon using live data from PokéAPI.</p>
      </div>

      <div className="controls">
        <SearchBar value={input} onChange={handleInput} onSubmit={saveSearch} />
        <FilterBar
          types={types.data}
          typesError={types.error}
          type={type}
          onTypeChange={(value) => updateParams({ type: value })}
          sort={sort}
          onSortChange={(value) => updateParams({ sort: value === 'id-asc' ? '' : value })}
        />
        <RecentSearches terms={recent} onSelect={selectRecent} onClear={() => setRecent([])} />
      </div>

      {error ? (
        <ErrorBanner message={`Couldn't load Pokémon data: ${error.message}.`} onRetry={retry} />
      ) : loading ? (
        <SkeletonGrid />
      ) : filtered.length === 0 ? (
        <EmptyState title="No Pokémon found">
          <p>Try a different name, number or type.</p>
          <button type="button" onClick={() => { setInput(''); setParams({}) }}>Reset filters</button>
        </EmptyState>
      ) : (
        <>
          <p className="result-count">
            Showing {visible.length} of {filtered.length} Pokémon
          </p>
          <CardGrid items={visible} />
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}
    </section>
  )
}
