import { SORT_OPTIONS } from '../utils/format'

export default function FilterBar({ types, type, onTypeChange, sort, onSortChange, typesError }) {
  return (
    <div className="filter-bar">
      <label>
        Type
        <select value={type} onChange={(e) => onTypeChange(e.target.value)} disabled={!types}>
          <option value="">All types</option>
          {types?.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Sort by
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {Object.entries(SORT_OPTIONS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      {typesError && <span className="hint">Type filter unavailable</span>}
    </div>
  )
}
