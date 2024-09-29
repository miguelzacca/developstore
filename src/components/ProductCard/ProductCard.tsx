'use client'

import { ProductEl } from '@/types/global'
import { FavoriteButton } from '../FavoriteButton/FavoriteButton'
import Image from 'next/image'
import { useState } from 'react'
import { ProductDialog } from '../ProductDialog/ProductDialog'

interface ProductCardProps {
  index: number
  animation?: boolean
  product: ProductEl
}

function CardData({ index, product }: ProductCardProps) {
  return (
    <>
      <FavoriteButton index={index} productId={product.id} />
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
  }

  return (
    <>
      {isOpen ? (
        <ProductDialog openState={setOpen}>
          <li key={product.id}>
            <CardData index={index} product={product} />
          </li>
        </ProductDialog>
      ) : (
        <li
          className={hasOpened ? 'pre' : undefined}
          key={product.id}
          style={
            animation ? ({ '--i': index } as React.CSSProperties) : undefined
          }
        >
          <CardData index={index} product={product} />
          <button className="buy" onClick={handleOpen}>
            +
          </button>
        </li>
      )}
    </>
  )
}
