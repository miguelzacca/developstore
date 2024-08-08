import { utils } from '@/utils'
import Image from 'next/image'
import { unstable_cache } from 'next/cache'

import { Header } from '@/components/Header/Header'
import { ProductsSection } from '@/components/ProductsSection/ProductsSection'
import { Footer } from '@/components/Footer/Footer'

import './page.scss'

export default async function Home() {
  const fetchProducts = unstable_cache(
    async () => {
      const recommendedReq = utils.getProducts({ category: 'Recommended' })
      const popularReq = utils.getProducts({ category: 'Popular 2024' })
      const bestReq = utils.getProducts({ category: 'The best' })

      const [recommended, popular, best] = await Promise.all([
        recommendedReq,
        popularReq,
        bestReq,
      ])

      return { recommended, popular, best }
    },
    [],
    { revalidate: 3600, tags: ['products'] }
  )

  const products = await fetchProducts()
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
          {productsExists ? (
            <picture>
              <Image
                src={products.recommended[0].img}
                width={250}
                height={250}
                alt="Sale product image"
                priority
              />
            </picture>
          ) : null}
        </div>
        <ProductsSection
          products={products.recommended}
          title="Recommended"
          isFirst={true}
        />
        <ProductsSection products={products.popular} title="Popular 2024" />
        <ProductsSection products={products.best} title="The best" />
      </main>
      <Footer />
    </>
  )
}
