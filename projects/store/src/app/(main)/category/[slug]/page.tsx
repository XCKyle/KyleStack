import Wrapper from '@xc/ui/Wrapper'
import getProductsByCategory from '@xc/shared/data/store/getProductsByCategory'
import ProductList from '@xc/ui/ProductList'
import { notFound } from 'next/navigation'

export default async function Page({ params }: Core.Page<{ slug: string }>) {
  const result = await getProductsByCategory(params.slug)
  if (!result.ok || !result.data) {
    return notFound()
  }
  if (result.data.category == null) {
    return notFound()
  }
  return (
    <>
      <Wrapper>
        <div className="mx-auto mt-8 max-w-[800px] text-center md:mt-0">
          <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">
            {result.data.category.title}
          </div>
        </div>
        <ProductList products={result.data.products} />
      </Wrapper>
    </>
  )
}
