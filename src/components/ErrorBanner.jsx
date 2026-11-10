export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <span>⚠️ {message}</span>
      {onRetry && <button type="button" onClick={onRetry}>Retry</button>}
    </div>
  )
}
