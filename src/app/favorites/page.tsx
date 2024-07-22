'use client'

import { useEffect, useState } from 'react'
import { ProductEl } from '@/types/global'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

export default function Favorites() {
  const [favorites, setFavorites] = useState<ProductEl[]>([])

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites')
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
    setFavorites(parsedFavorites)
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
