'use client'

import Image from 'next/image'
import { ProductsUL } from '../ProductsUL/ProductsUL'
import { useRef } from 'react'
import { ProductEl } from '@/types/global'
import './ProductsSection.scss'

interface ProductsSectionProps {
  title: string
  products: ProductEl[]
  isFirst?: boolean
}

export function ProductsSection({
  title,
  products,
  isFirst = false,
}: ProductsSectionProps) {
  const ulRefs = useRef<HTMLUListElement[]>([])
  const moveScrollValue = 750

  const moveScroll = (ul: number, value: number) => {
    ulRefs.current[ul].scrollBy({
      left: value,
      behavior: 'smooth',
    })
  }

  const addUlRef = (index: number) => (element: HTMLUListElement) => {
    ulRefs.current[index] = element
  }

  return (
    <section id={isFirst ? 'first' : undefined}>
      <div className="control-container">
        <h2>{title}</h2>
        <div className="scroll-container">
          <button
            className="scroll-right"
            onClick={() => moveScroll(0, -moveScrollValue)}
          >
            <Image
              src="/images/arrow-left.webp"
              width={22.5}
              height={20}
              alt="Arrow left icon"
            />
          </button>
          <button
            className="scroll-left"
            onClick={() => moveScroll(0, moveScrollValue)}
          >
            <Image
              src="/images/arrow-right.webp"
              width={22.5}
              height={20}
              alt="Arrow right icon"
            />
          </button>
        </div>
      </div>
      <ul ref={addUlRef(0)}>
        <ProductsUL products={products} animation={isFirst} />
      </ul>
    </section>
  )
}
