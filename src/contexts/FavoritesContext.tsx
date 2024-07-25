'use client'

import { createContext, useEffect, useState, useCallback } from 'react'
import { ProductEl } from '@/types/global'
import { utils } from '@/utils'
import { useAuth } from '@/hooks/useAuth'

interface FavoritesData {
  favorites: ProductEl[]
  favoritesId: number[]
}

interface FavoritesContextType extends FavoritesData {
  checkFavorites: () => Promise<FavoritesData>
}

interface FavoritesProviderType {
  children: React.ReactNode
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

export function FavoritesProvider({ children }: FavoritesProviderType) {
  const [favoritesData, setFavoritesData] = useState({} as FavoritesData)
  const { isLoggedIn } = useAuth()

  const checkFavorites = useCallback(async () => {
    const data = await utils.getAllFavorites()
    const payload = {
      favorites: data,
      favoritesId: data.map((el: ProductEl) => el.id),
    }
    setFavoritesData(payload)
    return payload
  }, [])

  useEffect(() => {
    const fnHandler = async () => {
      if (isLoggedIn) {
        await checkFavorites()
      }
    }
    fnHandler()
  }, [isLoggedIn, checkFavorites])

  const { favorites, favoritesId } = favoritesData

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoritesId, checkFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
