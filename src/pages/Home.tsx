import { useRef, useEffect, useState } from 'react'
import { utils } from '../utils'
import { ProductEl } from '../types/global'

import '../styles/pages/Home.scss'
import { Header } from '../layouts/Header'
import { Footer } from '../layouts/Footer'
import { ProductsUL } from '../components/ProductsUL'

import shoppingIcon from '/public/shopping-icon.webp'
import arrowLeftImg from '/public/arrow-left.webp'
import arrowRightImg from '/public/arrow-right.webp'

export function Home() {
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
      localStorage.setItem('storedProducts', JSON.stringify(fetchedProducts))
    }

    fetchProducts()
  }, [])

  const recommendedProducts = products.filter(
    (el) => el.category === 'Recommended'
  )

  const popular2024Products = products.filter(
    (el) => el.category === 'Popular 2024'
  )

  const theBestProducts = products.filter((el) => el.category === 'The best')

  return (
    <>
      <Header path="home" />
      <main id="Home">
        <div className="sales-container">
          <div className="offer">
            <h2>
              Products on <br />
              offer 2024
            </h2>
            <h3 translate="no">20% OFF</h3>
            <button className="shopping-now">
              <img src={shoppingIcon} alt="Shopping icon" />
              Shopping now
            </button>
          </div>
          <picture>
            {products[0] ? (
              <img src={products[0].img} alt="Sale product image" />
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
                <img src={arrowLeftImg} alt="Arrow left icon" />
              </button>
              <button
                className="scroll-left"
                onClick={() => moveScroll(0, moveScrollValue)}
              >
                <img src={arrowRightImg} alt="Arrow right icon" />
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
                <img src={arrowLeftImg} alt="Arrow left icon" />
              </button>
              <button
                className="scroll-left"
                onClick={() => moveScroll(1, moveScrollValue)}
              >
                <img src={arrowRightImg} alt="Arrow right icon" />
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
                <img src={arrowLeftImg} alt="Arrow left icon" />
              </button>
              <button
                className="scroll-left"
                onClick={() => moveScroll(2, moveScrollValue)}
              >
                <img src={arrowRightImg} alt="Arrow right icon" />
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
