export default function SearchBar({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value)
  }
  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        placeholder="Search Pokémon by name or number…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search Pokémon"
      />
      <button type="submit">Search</button>
    </form>
  )
}
