import { useEffect, useRef, useState } from 'react'

import { Header } from '../layouts/Header'
import { ProductEl } from '../types/global'
import { ProductsUL } from '../components/ProductsUL'
import { Footer } from '../layouts/Footer'

import '../styles/pages/Search.scss'

export function Search() {
  const [inputValue, setInputValue] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(
    document.createElement('input')
  )

  const getURLSearch = (query: string) => {
    return location.search
      ?.split(`${query}=`)[1]
      ?.split('&')[0]
      .replace('%20', ' ')
  }

  const setSearch = getURLSearch('set')

  useEffect(() => {
    searchInputRef.current.focus()

    const handleChange = (event: Event) => {
      const { value } = event.target as HTMLInputElement
      setInputValue(value)
    }

    const inputElement = searchInputRef.current
    if (inputElement) {
      inputElement.addEventListener('change', handleChange)

      return () => inputElement.removeEventListener('change', handleChange)
    }
  }, [])

  const storedProducts = JSON.parse(localStorage.getItem('storedProducts')!)
  const valid = (str: string) => str.trim().toLowerCase()

  const filter = inputValue || setSearch

  const filtereProducts = filter
    ? storedProducts.filter((el: ProductEl) =>
        valid(`${el.productName}${el.category}`).includes(valid(filter))
      )
    : storedProducts

  return (
    <>
      <Header path="search" searchInputRef={searchInputRef} />
      <main id="Search">
        <ul>
          <ProductsUL products={filtereProducts} />
        </ul>
      </main>
      <Footer />
    </>
  )
}
