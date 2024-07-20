import './AnimeButton.scss'

interface props {
  loading?: boolean
}

export function AnimeButton({ loading }: props) {
  return (
    <button id="animeButton" type="submit" className={loading ? 'loading' : ''}>
      <p>Submit</p>
      <div className="loading-container"></div>
      <div className="left"></div>
      <div className="top"></div>
      <div className="right"></div>
      <div className="bottom"></div>
    </button>
  )
}
