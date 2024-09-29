'use client'

import { ProductEl } from '@/types/global'
import { FavoriteButton } from '../FavoriteButton/FavoriteButton'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ProductDialog } from '../ProductDialog/ProductDialog'
import { utils } from '@/utils'

interface ProductCardProps {
  index: number
  animation?: boolean
  product: ProductEl
  reverify?: boolean
}

function CardData({ index, product, reverify }: ProductCardProps) {
  return (
    <>
      <FavoriteButton
        index={index}
        productId={product.id}
        reverify={reverify}
      />
      <picture>
        <Image
          src={product.img}
          width={175}
          height={175}
          alt="Product image"
          priority={true}
        />
      </picture>
      <div className="info-container">
        <h3>{product.productName}</h3>
        <p>{product.info}</p>
        <div className="price-container">
          {product.oldPrice ? <del>R$ {product.oldPrice}</del> : null}
          <p id="price">R$ {product.price}</p>
        </div>
      </div>
    </>
  )
}

export function ProductCard({ animation, index, product }: ProductCardProps) {
  const [isOpen, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setHasOpened(true)
    utils.setURLSearchParam('view_product', product.id)
  }

  useEffect(() => {
    const productUrl = utils.getURLSearchParam('view_product')
    if (productUrl === String(product.id)) {
      setOpen(true)
    }
  }, [product])

  return (
    <>
      <li
        className={hasOpened ? 'pre' : undefined}
        style={
          animation ? ({ '--i': index } as React.CSSProperties) : undefined
        }
      >
        <CardData index={index} product={product} />
        <button className="buy" onClick={handleOpen}>
          +
        </button>
      </li>
      {isOpen && (
        <ProductDialog openState={setOpen}>
          <li>
            <CardData index={index} product={product} reverify={true} />
          </li>
        </ProductDialog>
      )}
    </>
  )
}
