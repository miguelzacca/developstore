'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import { utils } from '@/utils'
import { useProducts } from '@/hooks/useProducts'

import './FavoriteButton.scss'

interface FavoriteButtonProps {
  index: number
  productId: number
  reverify?: boolean
}

export function FavoriteButton({
  index,
  productId,
  reverify,
}: FavoriteButtonProps) {
  const favoriteBtnRef = useRef<HTMLButtonElement[]>([])
  const { isLoggedIn } = useAuth()
  const { favoritesId, checkFavorites } = useProducts()
  const [reFavoritesId, setReFavoriteId] = useState<number[]>()

  const addFavoriteBtnRef = (index: number) => (element: HTMLButtonElement) => {
    favoriteBtnRef.current[index] = element
  }

  const favorite = async (index: number, productId: number) => {
    if (isLoggedIn) {
      favoriteBtnRef.current[index].classList.toggle('checked')
      await utils.toggleFavorite(productId)
      if (reverify) {
        await checkFavorites()
      }
      return
    }
    utils.redirectTo('/login')
  }

  useEffect(() => {
    if (reverify) {
      checkFavorites().then((data) => {
        setReFavoriteId(data.favoritesId)
      })
    }
  }, [checkFavorites, reverify])

  return (
    <button
      className={`favorite ${
        (reFavoritesId || favoritesId)?.includes(productId) ? 'checked' : ''
      }`}
      ref={addFavoriteBtnRef(index)}
      onClick={() => favorite(index, productId)}
    >
      <div className="favorite-icon"></div>
    </button>
  )
}
