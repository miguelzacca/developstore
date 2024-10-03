'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRef } from 'react'
import { utils } from '@/utils'
import { useProducts } from '@/hooks/useProducts'

import './ShoppingButton.scss'

interface ShoppingButtonProps {
  productId: number
}

export function ShoppingButton({ productId }: ShoppingButtonProps) {
  const shoppingBtnRef = useRef<HTMLButtonElement[]>([])
  const { isLoggedIn } = useAuth()
  const { shoppingId, checkShopping } = useProducts()

  const shoppingIdExists = shoppingId?.includes(productId)

  const addShoppingBtnRef = (index: number) => (element: HTMLButtonElement) => {
    shoppingBtnRef.current[index] = element
  }

  const texts = ['Add to shopping', 'Remove from shopping']

  const addShopping = async (productId: number) => {
    if (isLoggedIn) {
      const currentBtn = shoppingBtnRef.current[productId]
      currentBtn.textContent =
        currentBtn.textContent === texts[0] ? texts[1] : texts[0]

      await utils.toggleShopping(productId)
      await checkShopping()
      return
    }
    utils.redirectTo('/login')
  }

  return (
    <button
      className="shopping"
      ref={addShoppingBtnRef(productId)}
      onClick={() => addShopping(productId)}
    >
      {shoppingIdExists ? texts[1] : texts[0]}
    </button>
  )
}
