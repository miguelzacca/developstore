'use client'

import { useEffect, useState } from 'react'
import { ProductEl } from '@/types/global'
import { useFavorites } from '@/hooks/useFavorites'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

export default function Favorites() {
  const [favorites, setFavorites] = useState<ProductEl[]>([])
  const { checkFavorites } = useFavorites()

  useEffect(() => {
    checkFavorites().then((data) => {
      setFavorites(data?.favorites)
    })
  }, [checkFavorites])

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
