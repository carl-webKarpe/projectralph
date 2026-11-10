import CardItem from './CardItem'

export default function CardGrid({ items }) {
  return (
    <div className="grid">
      {items.map((p) => (
        <CardItem key={p.id} pokemon={p} />
      ))}
    </div>
  )
}
