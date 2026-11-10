export default function RecentSearches({ terms, onSelect, onClear }) {
  if (terms.length === 0) return null
  return (
    <div className="recent">
      <span className="recent-label">Recent:</span>
      {terms.map((term) => (
        <button key={term} type="button" className="chip" onClick={() => onSelect(term)}>
          {term}
        </button>
      ))}
      <button type="button" className="link-button" onClick={onClear}>Clear</button>
    </div>
  )
}
