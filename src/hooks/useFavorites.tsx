import { FavoritesContext } from '@/contexts/FavoritesContext'
import { useContext } from 'react'

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('Missing FavoritesProvider.')
  }
  return context
}
