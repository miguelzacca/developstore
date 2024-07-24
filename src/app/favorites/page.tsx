'use client'

import { useEffect, useState } from 'react'
import { ProductEl } from '@/types/global'
import { utils } from '@/utils'
import { AuthProvider } from '@/contexts/AuthContext'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

function FavoritesPage() {
  const [favorites, setFavorites] = useState<ProductEl[]>([])

  useEffect(() => {
    utils.getAllFavorites().then((data) => {
      setFavorites(data)
    })
  }, [])

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
