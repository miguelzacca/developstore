import { ProductEl } from '@/types/global'
import './ProductsUL.scss'
import { ProductCard } from '../ProductCard/ProductCard'

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
          <ProductCard key={i} animation={animation} index={i} product={el} />
        ))
      ) : nullMessage ? (
        <h2 className="ifNull">{nullMessage}</h2>
      ) : null}
    </>
  )
}
