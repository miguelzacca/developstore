'use client'

import { useRef, useEffect, useState } from 'react'
import { utils } from '@/utils'
import Image from 'next/image'
import { ProductEl } from '@/types/global'

import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ProductsUL } from '@/components/ProductsUL/ProductsUL'

import './page.scss'

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

  const [products, setProducts] = useState<ProductEl[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = localStorage.getItem('storedProducts')
      const newFetch = utils.has24hPassed()

      if (storedProducts && !newFetch) {
        return setProducts(JSON.parse(storedProducts))
      }

      const fetchedProducts = await utils.getAllProducts()
      setProducts(fetchedProducts)
      localStorage.setItem(
        'storedProducts',
        JSON.stringify(fetchedProducts),
      )
    }

    fetchProducts()
  }, [])

  const recommendedProducts = products.filter(
    (el) => el.category === 'Recommended',
  )

  const popular2024Products = products.filter(
    (el) => el.category === 'Popular 2024',
  )

  const theBestProducts = products.filter((el) => el.category === 'The best')

  return (
    <>
      <Header path="home" />
      <main id="Home" className="Home">
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
            {products[0] ? (
              <Image
                src={products[0].img}
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
                  width={25}
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
                  width={25}
                  height={20}
                  alt="Arrow right icon"
                />
              </button>
            </div>
          </div>
          <ul ref={addUlRef(0)} className={products[0] ? undefined : 'loading'}>
            <ProductsUL products={recommendedProducts} animation={true} />
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
                  width={25}
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
                  width={25}
                  height={20}
                  alt="Arrow right icon"
                />
              </button>
            </div>
          </div>
          <ul ref={addUlRef(1)} className={products[0] ? undefined : 'loading'}>
            <ProductsUL products={popular2024Products} />
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
                  width={25}
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
                  width={25}
                  height={20}
                  alt="Arrow right icon"
                />
              </button>
            </div>
          </div>
          <ul ref={addUlRef(2)} className={products[0] ? undefined : 'loading'}>
            <ProductsUL products={theBestProducts} />
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
