'use client'

import { useEffect, useState } from 'react'
import { utils } from '@/utils'
import { ProductEl } from '@/types/global'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'

export default function Favorites() {
  const storedFavorites = sessionStorage.getItem('favorites')
  const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []

  return (
    <>
      <Header path="favorites" />
      <main id="Favorites">
        <ul>
          <ProductsUL products={parsedFavorites} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}
