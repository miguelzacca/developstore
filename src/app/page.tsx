'use client'

import { useRef, useEffect, useState } from 'react'
import { utils } from '@/utils'
import Image from 'next/image'
import { ProductEl } from '@/types/global'

import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ProductsUL } from '@/components/ProductsUL/ProductsUL'

import './page.scss'

interface Products {
  recommended: ProductEl[]
  popular: ProductEl[]
  best: ProductEl[]
}

export default function Home() {
  const ulRefs = useRef<HTMLUListElement[]>([])
  const moveScrollValue = 500

  const moveScroll = (ul: number, value: number) => {
    ulRefs.current[ul].scrollBy({
      left: value,
      behavior: 'smooth',
    })
  }

  const addUlRef = (index: number) => (element: HTMLUListElement) => {
    ulRefs.current[index] = element
  }

  const [products, setProducts] = useState<Products>({
    recommended: [],
    popular: [],
    best: [],
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const recommendedReq = utils.getProducts({ category: 'Recommended' })
      const popularReq = utils.getProducts({ category: 'Popular 2024' })
      const bestReq = utils.getProducts({ category: 'The best' })

      const [recommended, popular, best] = await Promise.all([
        recommendedReq,
        popularReq,
        bestReq,
      ])

      setProducts({ recommended, popular, best })
    }

    fetchProducts()
  }, [])

  const productsExists = !!products.recommended[0]

  return (
    <>
      <Header path="home" />
      <main id="Home" className={productsExists ? undefined : 'loading'}>
        <div className="sales-container">
          <div className="offer">
            <h2>
              Products on <br />
              offer 2024
            </h2>
            <h3 translate="no">20% OFF</h3>
            <button className="shopping-now">
              <Image
                src="/images/shopping-icon.webp"
                width={20}
                height={20}
                alt="Shopping icon"
              />
              Shopping now
            </button>
          </div>
          <picture>
            {productsExists ? (
              <Image
                src={products.recommended[0].img}
                width={250}
                height={250}
                alt="Sale product image"
                priority
              />
            ) : null}
          </picture>
        </div>
        <section id="recommended-products">
          <div className="control-container">
            <h2>Recommended</h2>
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
            <ProductsUL products={products.recommended} animation={true} />
          </ul>
        </section>
        <section id="popular-products">
          <div className="control-container">
            <h2>Popular 2024</h2>
            <div className="scroll-container">
              <button
                className="scroll-right"
                onClick={() => moveScroll(1, -moveScrollValue)}
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
                onClick={() => moveScroll(1, moveScrollValue)}
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
          <ul ref={addUlRef(1)}>
            <ProductsUL products={products.popular} />
          </ul>
        </section>
        <section id="best-products">
          <div className="control-container">
            <h2>The best</h2>
            <div className="scroll-container">
              <button
                className="scroll-right"
                onClick={() => moveScroll(2, -moveScrollValue)}
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
                onClick={() => moveScroll(2, moveScrollValue)}
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
          <ul ref={addUlRef(2)}>
            <ProductsUL products={products.best} />
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
