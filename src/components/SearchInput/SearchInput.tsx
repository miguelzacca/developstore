import { useRef } from 'react'
import Image from 'next/image'

import './SearchInput.scss'

interface SearchInputProps {
  id: string
  searchInputRef?: React.MutableRefObject<HTMLInputElement | null>
  onChangeFunction?: Function
}

export function SearchInput({
  id,
  searchInputRef,
  onChangeFunction,
}: SearchInputProps) {
  const redirectRef = useRef<HTMLInputElement>(null)

  const redirect = () => {
    if (location.pathname !== '/search') {
      location.replace(
        `/search${
          redirectRef.current?.value && `?set=${redirectRef.current!.value}`
        }`,
      )
    }
  }

  redirectRef.current?.addEventListener('change', redirect)

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
        <Image
          src="/images/search-icon.webp"
          width={17}
          height={17}
          alt="Search icon"
        />
      </button>
    </div>
  )
}
