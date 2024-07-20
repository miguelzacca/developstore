'use client'

import { useEffect, useState } from 'react'
import { utils } from '@/utils'
import { ProductEl } from '@/types/global'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

export default function Favorites() {
  const [storedProducts, setStoredProducts] = useState<ProductEl[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('storedProducts')!)
    setStoredProducts(data)
  }, [])

  const nodeFavorites = storedProducts.filter((el: ProductEl) =>
    utils.isFavorite(el.id)
  )

  return (
    <>
      <Header path="favorites" />
      <main id="Favorites">
        <ul>
          <ProductsUL products={nodeFavorites} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}
