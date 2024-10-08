'use client'

import { useEffect, useState } from 'react'
import { ProductEl } from '@/types/global'
import { useProducts } from '@/hooks/useProducts'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

export default function Favorites() {
  const [favorites, setFavorites] = useState<ProductEl[]>([])
  const [isLoading, setLoading] = useState(true)
  const { checkFavorites } = useProducts()

  useEffect(() => {
    checkFavorites().then((data) => {
      setFavorites(data?.favorites)
      setLoading(false)
    })
  }, [checkFavorites])

  return (
    <>
      <Header path="favorites" />
      <main id="Favorites">
        <ul className={isLoading ? 'load' : undefined}>
          <ProductsUL products={favorites} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}
