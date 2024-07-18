import { utils } from '../utils'

import { ProductsUL } from '../components/ProductsUL'
import { Header } from '../layouts/Header'
import { ProductEl } from '../types/global'

import '../styles/pages/Search.scss'

export function Favorites() {
  const storedProducts = JSON.parse(localStorage.getItem('storedProducts')!)

  const nodeFavorites = storedProducts.filter((el: ProductEl) =>
    utils.isFavorite(el.id)
  )

  return (
    <>
      <Header path="favorites" />
      <main id="Favorites">
        <ul>
          <ProductsUL products={nodeFavorites} nullMessage="<Empty>" />
        </ul>
      </main>
    </>
  )
}
