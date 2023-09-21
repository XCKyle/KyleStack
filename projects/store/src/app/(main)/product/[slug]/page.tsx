import Wrapper from '@xc/ui/Wrapper'
import { notFound } from 'next/navigation'
import getProduct, { generateMetadata } from '@xc/shared/data/store/getProduct'
import ProductDetails from '@xc/ui/ProductDetails'
import RelatedProducts from '@xc/ui/RelatedProductsCarousel/RelatedProductCarousel'
import getProductDetailsPage from '@xc/shared/data/store/getProductDetailsPage'

export { generateMetadata }

export default async function Page({
  params,
  searchParams,
}: Core.Page<{
  slug: string
}>) {
  const productDetailsPageDataResult = await getProductDetailsPage({ preview: { ...searchParams } })

  const data = productDetailsPageDataResult.data
  if (!productDetailsPageDataResult.ok || !data) {
    return notFound()
  }
  const productResult = await getProduct(params.slug, data.related_products.number_of_items)
  if (!productResult.ok || !productResult.data) {
    return notFound()
  }
  const { product, related_products } = productResult.data
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <ProductDetails product={product} data={data} />
        {related_products.length > 0 && (
          <RelatedProducts products={related_products} relatedProductData={data.related_products} />
        )}
      </Wrapper>
    </div>
  )
}
