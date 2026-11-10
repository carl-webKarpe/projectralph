import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState title="404 — Page not found">
      <p>This route doesn't exist.</p>
      <Link to="/" className="button">Go home</Link>
    </EmptyState>
  )
}
