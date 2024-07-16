import { useRef } from 'react'

import '../styles/components/SearchInput.scss'
import searchIcon from '/public/search-icon.webp'

interface SearchInputProps {
  id: string
  searchInputRef?: React.MutableRefObject<HTMLInputElement>
}

export function SearchInput({ id, searchInputRef }: SearchInputProps) {
  const redirectRef = useRef<HTMLInputElement>(document.createElement('input'))

  const redirect = () => {
    if (location.pathname !== '/search') {
      location.replace(
        `/search${
          redirectRef.current.value && `?set=${redirectRef.current.value}`
        }`
      )
    }
  }

  redirectRef.current.addEventListener('change', redirect)

  return (
    <div className="search-container">
      <div className="">
        <input
          type="search"
          name="query"
          id={id}
          placeholder=" "
          ref={searchInputRef ? searchInputRef : redirectRef}
        />
        <label htmlFor={id}>Search product</label>
      </div>
      <button id={`${id}-button`} onClick={() => redirect()}>
        <img src={searchIcon} alt="Search icon" />
      </button>
    </div>
  )
}
