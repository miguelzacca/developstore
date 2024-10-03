'use client'

import { useEffect, useState } from 'react'
import { ProductEl } from '@/types/global'

import { ProductsUL } from '@/components/ProductsUL/ProductsUL'
import { Header } from '@/components/Header/Header'

import '../search/page.scss'
import { utils } from '@/utils'

export default function Shopping() {
  const [shopping, setShopping] = useState<ProductEl[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    utils.getAllShopping().then((data) => {
      setShopping(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Header path="shopping" />
      <main id="Favorites">
        <ul className={isLoading ? 'load' : undefined}>
          <ProductsUL products={shopping} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}
