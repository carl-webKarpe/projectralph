function pageNumbers(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1])
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  const numbers = pageNumbers(page, totalPages)
  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}>‹ Prev</button>
      {numbers.map((n, i) => (
        <span key={n} className="page-group">
          {i > 0 && n - numbers[i - 1] > 1 && <span className="ellipsis">…</span>}
          <button
            type="button"
            className={n === page ? 'current' : ''}
            aria-current={n === page ? 'page' : undefined}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        </span>
      ))}
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next ›</button>
    </nav>
  )
}
