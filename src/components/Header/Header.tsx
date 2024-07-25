'use client'

import Image from 'next/image'
import { SearchInput } from '../SearchInput/SearchInput'
import './Header.scss'
import { utils } from '@/utils'
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  path: string
  searchInputRef?: React.MutableRefObject<HTMLInputElement | null>
}

export function Header({ path, searchInputRef }: HeaderProps) {
  const { isLoggedIn } = useAuth()
  const { favorites } = useFavorites()

  const accessTest = () => {
    if (!isLoggedIn) {
      return utils.redirectTo('/login')
    }
    utils.redirectTo('/favorites')
  }

  return (
    <header>
      <div className="high-container">
        <a href="/" className="refresh-link">
          <Image
            src="/images/logo.webp"
            priority
            width={60}
            height={35}
            className="logo"
            alt="Logo"
          />
        </a>
        <SearchInput id="search-input-header" searchInputRef={searchInputRef} />
        <nav>
          <a href="./account" className="account-link">
            <Image
              src="/images/account-icon.webp"
              width={20}
              height={20}
              alt="Account icon"
            />
            Account
          </a>
          <a
            className={`favorite-link ${favorites?.length > 0 ? 'alert' : ''}`}
            onClick={() => accessTest()}
          >
            <Image
              src="/images/favorite-icon.webp"
              width={20}
              height={20}
              alt="Favorite icon"
            />
          </a>
          <a href="./shopping" className="shopping-link">
            <Image
              src="/images/shopping-icon.webp"
              width={20}
              height={20}
              alt="Shopping icon"
            />
          </a>
        </nav>
      </div>
      <div className="low-container">
        <details>
          <summary>Categories</summary>
          <div>
            <a href="/search?set=Recommended">Recommended</a>
            <a href="/search?set=Popular 2024">Popular 2024</a>
            <a href="/search?set=The best">The best</a>
            <a href="/search">All</a>
          </div>
        </details>
        <div className="path">{`> ${path}`}</div>
      </div>
    </header>
  )
}
