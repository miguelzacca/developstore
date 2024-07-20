'use client'

import { ProductEl } from '@/types/global'
import { useRef } from 'react'
import { utils } from '@/utils'
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
  const favoriteBtnRef = useRef<HTMLButtonElement[]>([])
  if (typeof window === 'undefined') return

  const addFavoriteBtnRef = (index: number) => (element: HTMLButtonElement) => {
    favoriteBtnRef.current[index] = element
  }

  const favorite = (index: number, productId: number) => {
    favoriteBtnRef.current[index].classList.toggle('checked')

    const storedFavorites = localStorage.getItem('favorites')
    const parsedStoredFavorites: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : []

    if (parsedStoredFavorites.includes(productId)) {
      return localStorage.setItem(
        'favorites',
        JSON.stringify(parsedStoredFavorites.filter((id) => id !== productId)),
      )
    }

    localStorage.setItem(
      'favorites',
      JSON.stringify([...parsedStoredFavorites, productId]),
    )
  }

  return (
    <>
      {products[0] ? (
        products.map((el: ProductEl, i) => (
          <li
            key={el.id}
            style={
              animation ? ({ '--i': i } as React.CSSProperties) : undefined
            }
          >
            <button
              className={`favorite ${utils.isFavorite(el.id) ? 'checked' : ''}`}
              ref={addFavoriteBtnRef(i)}
              onClick={() => favorite(i, el.id)}
            >
              <div className="favorite-icon"></div>
            </button>
            <picture>
              <Image
                src={el.img}
                width={175}
                height={175}
                alt="Product image"
                priority
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
