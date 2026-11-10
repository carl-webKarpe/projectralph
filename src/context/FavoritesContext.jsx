import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('pokedex:favorites', [])

  const isFavorite = (id) => favorites.some((f) => f.id === id)

  const toggleFavorite = (pokemon) => {
    setFavorites((current) =>
      current.some((f) => f.id === pokemon.id)
        ? current.filter((f) => f.id !== pokemon.id)
        : [...current, { id: pokemon.id, name: pokemon.name }],
    )
  }

  const clearFavorites = () => setFavorites([])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}
