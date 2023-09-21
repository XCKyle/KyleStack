import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type EmptyCart = {
  continue_shopping_link: Contentstack.Fields.Link
  description: string
  hero_image: Contentstack.Fields.File
  heading: string
}

export type CartSummary = {
  heading: string
  subtotal_label: string
  description: string
  checkout_link: Contentstack.Fields.Link
}

export type ShoppingCartPageData = Contentstack.Item<{
  url: string
  heading: string
  cart_item: {
    heading: string
    size_label: string
    quantity_label: string
    price_label: string
    max_quantity: number
  }
  empty_cart: EmptyCart
  summary: CartSummary
  open_graph: Contentstack.Globals.OpenGraph
}>

export const generateMetadata = createMetadataGenerator('/', 'page_home', store.api)

export default async function getShoppingCartPage({
  preview,
}: {
  preview?: LivePreviewQuery
}): Promise<Result<ShoppingCartPageData>> {
  const result = await store.api.find<ShoppingCartPageData>('page_shopping_cart', preview, (query) => {
    return query.toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  const item = result.data?.shift()

  if (!item) {
    return Result.fail('Not Found')
  }

  return Result.success(item)
}
