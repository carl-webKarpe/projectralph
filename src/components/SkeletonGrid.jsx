export default function SkeletonGrid({ count = 12 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading Pokémon">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card skeleton">
          <div className="skeleton-img" />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  )
}
