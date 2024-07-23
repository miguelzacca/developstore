'use client'

import { useEffect, useState } from 'react'
import { ProductEl } from '@/types/global'
import { AuthProvider } from '@/contexts/AuthContext'
import { useAuth } from '@/hooks/useAuth'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

function FavoritesPage() {
  const [favorites, setFavorites] = useState<ProductEl[]>([])
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) return location.replace('/login')

    const storedFavorites = sessionStorage.getItem('favorites')
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
    setFavorites(parsedFavorites)
  }, [isLoggedIn])

  return (
    <>
      <Header path="favorites" />
      <main id="Favorites">
        <ul>
          <ProductsUL products={favorites} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}

export default function Favorites() {
  return (
    <AuthProvider>
      <FavoritesPage />
    </AuthProvider>
  )
}
