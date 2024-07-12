import "../styles/components/SearchInput.scss"
import searchIcon from "/public/search-icon.webp"

interface props {
  id: string
}

export function SearchInput({ id }: props) {
  return (
    <div className="search-container">
      <div className="">
        <input type="search" name="query" id={id} placeholder=" " />
        <label htmlFor={id}>Search product</label>
      </div>
      <button id="search-button">
        <img src={searchIcon} alt="Search icon" />
      </button>
    </div>
  )
}
