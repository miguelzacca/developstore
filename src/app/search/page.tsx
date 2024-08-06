'use client'

import { useEffect, useRef, useState } from 'react'
import { utils } from '@/utils'

import { Header } from '@/components/Header/Header'
import { ProductEl } from '@/types/global'
import { ProductsUL } from '@/components/ProductsUL/ProductsUL'

import './page.scss'

export default function Search() {
  const [inputValue, setInputValue] = useState('')
  const [products, setProducts] = useState<ProductEl[]>([])
  const [isPending, setPending] = useState(true)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const setSearch = utils.getURLSearchParam('set')

  useEffect(() => {
    const searchInputElement = searchInputRef.current!

    setSearch
      ? (searchInputElement.value = setSearch)
      : searchInputElement.focus()

    const handleChange = (event: Event) => {
      const { value } = event.target as HTMLInputElement
      setInputValue(value)
    }

    searchInputElement.addEventListener('change', handleChange)
    return () => searchInputElement.removeEventListener('change', handleChange)
  }, [setSearch])

  const search = inputValue || setSearch

  useEffect(() => {
    const categories: Record<string, boolean> = {
      Recommended: true,
      'Popular 2024': true,
      'The best': true,
    }

    const fetchProducts = async () => {
      if (search && categories[search]) {
        return await utils.getProducts({ category: search })
      }

      return await utils.getProducts(search ? { search } : undefined)
    }

    fetchProducts().then((data) => setProducts(data))

    setPending(false)
  }, [search])

  return (
    <>
      <Header path="search" searchInputRef={searchInputRef} />
      <main id="Search">
        <ul>
          <ProductsUL
            products={products}
            nullMessage={isPending ? undefined : '<Empty>'}
          />
        </ul>
      </main>
    </>
  )
}
