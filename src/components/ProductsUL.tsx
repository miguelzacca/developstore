import { useEffect, useState } from 'react'
import { utils } from '../utils'
import { ProductEl } from '../types/global'

import favoriteIcon from '/public/favorite-icon.webp'

interface ProductsULProps {
  category: string
  animation?: boolean
}

export function ProductsUL({ category, animation }: ProductsULProps) {
  const [productList, setProductList] = useState<ProductEl[]>([])

  useEffect(() => {
    utils.getProducts(category, setProductList)
  }, [category])

  return (
    <>
      {productList.map((el: ProductEl, i) => (
        <li
          key={el.id}
          style={animation ? ({ '--i': i } as React.CSSProperties) : undefined}
        >
          <button className="favorite">
            <img src={favoriteIcon} alt="Favorite icon" />
          </button>
          <picture>
            <img src={el.img} alt="Product image" />
          </picture>
          <div className="info-container">
            <h3>{el.productName}</h3>
            <p>{el.info}</p>
            <div className="price-container">
              {el.oldPrice ? <del>R$ {el.oldPrice}</del> : null}
              <p id="price">R$ {el.price}</p>
            </div>
          </div>
          <button id="buy">+</button>
        </li>
      ))}
    </>
  )
}
