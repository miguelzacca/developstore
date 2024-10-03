'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import './ProductDialog.scss'
import { utils } from '@/utils'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingButton } from '../ShoppingButton/ShoppingButton'

interface ProductDialogProps {
  children: JSX.Element
  openState: Dispatch<SetStateAction<boolean>>
}

export function ProductDialog({ children, openState }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [productId, setProductId] = useState<number>(0)

  const closeDialog = () => {
    utils.removeURLSearchParam('view_product')
    dialogRef.current?.classList.add('close')
    setTimeout(() => {
      openState(false)
    }, 200)
  }

  useEffect(() => {
    setProductId(Number(utils.getURLSearchParam('view_product')))
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog ref={dialogRef}>
      {children}
      <button className="buy" onClick={closeDialog}>
        -
      </button>
      <ShoppingButton productId={productId} />
    </dialog>
  )
}
