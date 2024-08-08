'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRef } from 'react'
import { utils } from '@/utils'
import { useFavorites } from '@/hooks/useFavorites'

import './FavoriteButton.scss'

interface FavoriteButtonProps {
  index: number
  productId: number
}

export function FavoriteButton({ index, productId }: FavoriteButtonProps) {
  const favoriteBtnRef = useRef<HTMLButtonElement[]>([])
  const { isLoggedIn } = useAuth()
  const { favoritesId } = useFavorites()

  const addFavoriteBtnRef = (index: number) => (element: HTMLButtonElement) => {
    favoriteBtnRef.current[index] = element
  }

  const favorite = async (index: number, productId: number) => {
    if (isLoggedIn) {
      favoriteBtnRef.current[index].classList.toggle('checked')
      await utils.toggleFavorite(productId)
      return
    }
    utils.redirectTo('/login')
  }

  return (
    <button
      className={`favorite ${
        favoritesId?.includes(productId) ? 'checked' : ''
      }`}
      ref={addFavoriteBtnRef(index)}
      onClick={() => favorite(index, productId)}
    >
      <div className="favorite-icon"></div>
    </button>
  )
}
