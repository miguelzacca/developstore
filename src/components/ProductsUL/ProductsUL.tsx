import { ProductEl } from '@/types/global'
import { FavoriteButton } from '../FavoriteButton/FavoriteButton'
import Image from 'next/image'
import './ProductsUL.scss'

interface ProductsULProps {
  products: ProductEl[]
  animation?: boolean
  nullMessage?: string
}

export function ProductsUL({
  products,
  animation,
  nullMessage,
}: ProductsULProps) {
  const productsExists =
    products && Array.isArray(products) ? products[0] : false

  return (
    <>
      {productsExists ? (
        products.map((el: ProductEl, i) => (
          <li
            key={el.id}
            style={
              animation ? ({ '--i': i } as React.CSSProperties) : undefined
            }
          >
            <FavoriteButton index={i} productId={el.id} />
            <picture>
              <Image
                src={el.img}
                width={175}
                height={175}
                alt="Product image"
                priority={true}
              />
            </picture>
            <div className="info-container">
              <h3>{el.productName}</h3>
              <p>{el.info}</p>
              <div className="price-container">
                {el.oldPrice ? <del>R$ {el.oldPrice}</del> : null}
                <p id="price">R$ {el.price}</p>
              </div>
            </div>
            <button className="buy">+</button>
          </li>
        ))
      ) : nullMessage ? (
        <h2 className="ifNull">{nullMessage}</h2>
      ) : null}
    </>
  )
}
