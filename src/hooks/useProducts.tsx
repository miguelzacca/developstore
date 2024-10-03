import { ProductsContext } from '@/contexts/ProductsContext'
import { useContext } from 'react'

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('Missing ProductsProvider.')
  }
  return context
}
