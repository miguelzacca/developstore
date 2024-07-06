import "../styles/layouts/Header.scss";
import { SearchInput } from "../components/SearchInput";

import logoImg from "/public/logo.webp";
import accountIcon from "/public/account-icon.webp";
import favoriteIcon from "/public/favorite-icon.webp";
import shoppingIcon from "/public/shopping-icon.webp";

interface props {
  path: string;
}

export function Header({ path }: props) {
  return (
    <header>
      <div className="high-container">
        <a href="/" className="refresh-link">
          <img src={logoImg} className="logo" alt="Logo" />
        </a>
        <SearchInput id="search-input-header" />
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
            <a href="/#recommended-products">Recommended</a>
            <a href="/#popular-products">Popular 2024</a>
            <a href="/#best-products">The best</a>
          </div>
        </details>
        <div className="path">{`> ${path}`}</div>
      </div>
    </header>
  );
}
