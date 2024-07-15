import '../styles/layouts/Header.scss'
import { SearchInput } from '../components/SearchInput'

import logoImg from '/public/logo.webp'
import accountIcon from '/public/account-icon.webp'
import favoriteIcon from '/public/favorite-icon.webp'
import shoppingIcon from '/public/shopping-icon.webp'

interface HeaderProps {
  path: string
  searchInputRef?: React.MutableRefObject<HTMLInputElement>
}

export function Header({ path, searchInputRef }: HeaderProps) {
  return (
    <header>
      <div className="high-container">
        <a href="/" className="refresh-link">
          <img src={logoImg} className="logo" alt="Logo" />
        </a>
        <SearchInput id="search-input-header" searchInputRef={searchInputRef} />
        <nav>
          <a href="./account" className="account-link">
            <img src={accountIcon} alt="Account icon" />
            Account
          </a>
          <a href="./favorites" className="favorite-link">
            <img src={favoriteIcon} alt="Favorite icon" />
          </a>
          <a href="./shopping" className="shopping-link">
            <img src={shoppingIcon} alt="Shopping icon" />
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
