'use client'

import { useEffect, useRef, useState } from 'react'
import { utils } from '@/utils'

import { Header } from '@/components/Header/Header'
import { ProductEl } from '@/types/global'
import { ProductsUL } from '@/components/ProductsUL/ProductsUL'

import './page.scss'

export default function Search() {
  const [inputValue, setInputValue] = useState('')
  const [storedProducts, setStoredProducts] = useState<ProductEl[]>([])

  const searchInputRef = useRef<HTMLInputElement>(null)

  const setSearch = utils.getURLSearchParam('set')

  useEffect(() => {
    setSearch
      ? (searchInputRef.current!.value = setSearch)
      : searchInputRef.current?.focus()

    const handleChange = (event: Event) => {
      const { value } = event.target as HTMLInputElement
      setInputValue(value)
    }

    const inputElement = searchInputRef.current
    if (inputElement) {
      inputElement.addEventListener('change', handleChange)

      return () => inputElement.removeEventListener('change', handleChange)
    }
  }, [setSearch])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('storedProducts')!)
    setStoredProducts(data)
  }, [])

  const valid = (str: string) => str.trim().toLowerCase()

  const filter = inputValue || setSearch

  const filtereProducts = filter
    ? storedProducts.filter((el: ProductEl) =>
        valid(`${el.productName}${el.category}${el.info}`).includes(
          valid(filter)
        )
      )
    : storedProducts

  return (
    <>
      <Header path="search" searchInputRef={searchInputRef} />
      <main id="Search">
        <ul>
          <ProductsUL products={filtereProducts} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}
