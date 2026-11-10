const LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

export default function StatBar({ name, value }) {
  return (
    <div className="stat">
      <span className="stat-name">{LABELS[name] ?? name}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${Math.min(100, (value / 255) * 100)}%` }} />
      </div>
    </div>
  )
}
