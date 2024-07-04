import "../styles/layouts/Header.scss";

import logoImg from "/public/logo.webp";
import searchIcon from "/public/search-icon.webp";
import accountIcon from "/public/account-icon.webp";
import favoriteIcon from "/public/favorite-icon.webp";
import shoppingIcon from "/public/shopping-icon.webp";

interface props {
  path: string;
}

export function Header({ path }: props) {
  const block = Array.from({ length: 16 }, (_, i) => i);

  return (
    <header>
      <div className="high-container">
        <a href="/" className="refresh-link">
          <img src={logoImg} className="logo" alt="Logo" />
        </a>
        <div className="search-container">
          <input
            type="search"
            name="query"
            id="search-input-hed"
            placeholder="Search product"
          />
          <button id="search-button">
            <img src={searchIcon} alt="Search icon" />
          </button>
        </div>
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
      <div id="blocks-container">
        <div className="view"></div>
        {block.map((i) => (
          <div key={i} className="block"></div>
        ))}
      </div>
    </header>
  );
}
