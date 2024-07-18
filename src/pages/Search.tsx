import { useEffect, useRef, useState } from 'react'
import { utils } from '../utils'

import { Header } from '../layouts/Header'
import { ProductEl } from '../types/global'
import { ProductsUL } from '../components/ProductsUL'

import '../styles/pages/Search.scss'

export function Search() {
  const [inputValue, setInputValue] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(
    document.createElement('input')
  )

  const setSearch = utils.getURLSearchParam('set')

  useEffect(() => {
    setSearch
      ? (searchInputRef.current.value = setSearch)
      : searchInputRef.current.focus()

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

  const storedProducts = JSON.parse(localStorage.getItem('storedProducts')!)
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
