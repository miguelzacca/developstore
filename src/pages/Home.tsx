import { useRef } from 'react'

import '../styles/pages/Home.scss'
import { Header } from '../layouts/Header'
import { Footer } from '../layouts/Footer'
import { ProductsUL } from '../components/ProductsUL'

import productImg from '/public/product.webp'
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
            <img src={productImg} alt="Sale product image" />
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
          <ul ref={addUlRef(0)}>
            <ProductsUL category="Recommended" animation={true} />
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
          <ul ref={addUlRef(1)}>
            <ProductsUL category="Popular 2024" />
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
          <ul ref={addUlRef(2)}>
            <ProductsUL category="The best" />
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
