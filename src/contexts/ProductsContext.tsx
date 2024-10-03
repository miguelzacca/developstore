'use client'

import { createContext, useEffect, useState, useCallback } from 'react'
import { ProductEl } from '@/types/global'
import { utils } from '@/utils'
import { useAuth } from '@/hooks/useAuth'

interface FavoritesData {
  favorites: ProductEl[]
  favoritesId: number[]
}

interface ShoppingData {
  shopping: ProductEl[]
  shoppingId: number[]
}

interface ProductsContextType {
  favorites: ProductEl[]
  favoritesId: number[]
  shopping: ProductEl[]
  shoppingId: number[]
  checkFavorites: () => Promise<FavoritesData>
  checkShopping: () => Promise<ShoppingData>
}

interface ProductsProviderType {
  children: React.ReactNode
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
)

export function ProductsProvider({ children }: ProductsProviderType) {
  const [favoritesData, setFavoritesData] = useState({} as FavoritesData)
  const [shoppingData, setShoppingData] = useState({} as ShoppingData)

  const { isLoggedIn } = useAuth()

  const checkFavorites = useCallback(async () => {
    if (!isLoggedIn) return {} as FavoritesData
    const data = await utils.getAllFavorites()
    const payload = {
      favorites: data,
      favoritesId: data.map((el: ProductEl) => el.id),
    }
    setFavoritesData(payload)
    return payload
  }, [isLoggedIn])

  const checkShopping = useCallback(async () => {
    if (!isLoggedIn) return {} as ShoppingData
    const data = await utils.getAllShopping()
    const payload = {
      shopping: data,
      shoppingId: data.map((el: ProductEl) => el.id),
    }
    setShoppingData(payload)
    return payload
  }, [isLoggedIn])

  useEffect(() => {
    const fnHandler = async () => {
      await Promise.all([checkFavorites(), checkShopping()])
    }
    fnHandler()
  }, [checkFavorites, checkShopping])

  return (
    <ProductsContext.Provider
      value={{
        ...favoritesData,
        checkFavorites,
        ...shoppingData,
        checkShopping,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
