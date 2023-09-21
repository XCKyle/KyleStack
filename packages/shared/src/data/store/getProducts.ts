import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'

export type Product = Contentstack.Item<Models.Product>

export default async function getProducts(): Promise<Result<Product[]>> {
  const result = await store.api.find<Product>('product', null, (query) => {
    return query.limit(10).toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  return Result.success(result.data)
}
