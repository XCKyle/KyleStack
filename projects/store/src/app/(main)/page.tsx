import { notFound } from 'next/navigation'
import getHomePage, { generateMetadata } from '@xc/shared/data/store/getHomePage'
import HeroCarousel from '@xc/ui/HeroCarousel'
import Wrapper from '@xc/ui/Wrapper'
import ProductList from '@xc/ui/ProductList'
import getProducts, { Product } from '@xc/shared/data/store/getProducts'

export { dynamic, revalidate } from '@/ssr'
export { generateMetadata }

export default async function Page({ searchParams }: Core.Page) {
  const result = await getHomePage({ preview: { ...searchParams } })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const productResult = await getProducts()
  let products: Product[] = []
  if (productResult.ok && productResult.data) {
    products = productResult.data
  }

  return (
    <>
      <HeroCarousel data={result.data.hero_carousel} />
      <Wrapper>
        <div className="mx-auto my-[50px] max-w-[800px] text-center md:my-[80px]">
          <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">{result.data.heading}</div>
          <div className="text-md md:text-xl" dangerouslySetInnerHTML={{ __html: result.data.sub_heading }}></div>
        </div>
        <ProductList products={products} />
      </Wrapper>
    </>
  )
}
