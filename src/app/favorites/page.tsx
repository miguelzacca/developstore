'use client'

import { utils } from '@/utils'
import { ProductEl } from '@/types/global'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

export default function Favorites() {
  if (typeof window === 'undefined') return

  const storedProducts = JSON.parse(
    localStorage.getItem('storedProducts')!,
  )

  const nodeFavorites = storedProducts.filter((el: ProductEl) =>
    utils.isFavorite(el.id),
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
