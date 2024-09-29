'use client'

import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import './ProductDialog.scss'

interface ProductDialogProps {
  children: JSX.Element
  openState: Dispatch<SetStateAction<boolean>>
}

export function ProductDialog({ children, openState }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeDialog = () => {
    dialogRef.current?.classList.add('close')
    setTimeout(() => { 
      openState(false)
    }, 150)
  }

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog ref={dialogRef}>
      {children}
      <button className="buy" onClick={closeDialog}>
        -
      </button>
      <button className="shopping">Shopping now</button>
    </dialog>
  )
}
