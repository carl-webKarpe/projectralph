export function formatId(id) {
  return `#${String(id).padStart(4, '0')}`
}

export const SORT_OPTIONS = {
  'id-asc': 'Number (low → high)',
  'id-desc': 'Number (high → low)',
  'name-asc': 'Name (A → Z)',
  'name-desc': 'Name (Z → A)',
}
