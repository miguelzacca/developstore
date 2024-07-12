import { useRef } from 'react'

import '../styles/pages/Home.scss'
import { Header } from '../layouts/Header'
import { Footer } from '../layouts/Footer'

import productImg from '/public/product.webp'
import shoppingIcon from '/public/shopping-icon.webp'
import arrowLeftImg from '/public/arrow-left.webp'
import arrowRightImg from '/public/arrow-right.webp'
import favoriteIcon from '/public/favorite-icon.webp'

export function Home() {
  const products = Array.from({ length: 7 }, (_, i) => i)

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
            {products.map((i) => (
              <li key={i} style={{ '--i': i } as React.CSSProperties}>
                <button className="favorite">
                  <img src={favoriteIcon} alt="Favorite icon" />
                </button>
                <picture>
                  <img src={productImg} alt="Product image" />
                </picture>
                <div className="info-container">
                  <h3>Product Name</h3>
                  <p>Small information</p>
                  <div className="price-container">
                    <del>R$ 4,99</del>
                    <p id="price">R$ 1,99</p>
                  </div>
                </div>
                <button id="buy">+</button>
              </li>
            ))}
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
            {products.map((i) => (
              <li key={i}>
                <button className="favorite">
                  <img src={favoriteIcon} alt="Favorite icon" />
                </button>
                <picture>
                  <img src={productImg} alt="Product image" />
                </picture>
                <div className="info-container">
                  <h3>Product Name</h3>
                  <p>Small information</p>
                  <div className="price-container">
                    <del>R$ 4,99</del>
                    <p id="price">R$ 1,99</p>
                  </div>
                </div>
                <button id="buy">+</button>
              </li>
            ))}
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
            {products.map((i) => (
              <li key={i}>
                <button className="favorite">
                  <img src={favoriteIcon} alt="Favorite icon" />
                </button>
                <picture>
                  <img src={productImg} alt="Product image" />
                </picture>
                <div className="info-container">
                  <h3>Product Name</h3>
                  <p>Small information</p>
                  <div className="price-container">
                    <del>R$ 4,99</del>
                    <p id="price">R$ 1,99</p>
                  </div>
                </div>
                <button id="buy">+</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
