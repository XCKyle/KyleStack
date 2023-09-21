import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type PriceSummary = {
  price_label: string
  tax_info: string
  off_label: string
}

export type SizeSummary = {
  select_size_label: string
  size_selection_required_message: string
}

export type RelatedProductsData = {
  heading: string
  number_of_items: number
  off_label: string
}

export type NotificationToast = {
  content: string
  theme: 'light' | 'dark'
  timeout: number
}

export type ProductDetailsPageData = Contentstack.Item<{
  title: string
  price_summary: PriceSummary
  size_summary: SizeSummary
  product_details_label: string
  related_products: RelatedProductsData
  cart_actions: {
    success_toast: NotificationToast
    error_toast: NotificationToast
    add_to_cart_link: Contentstack.Fields.Link
    add_to_favorites_link: Contentstack.Fields.Link
  }
}>

export default async function getProductDetailsPage({
  preview,
}: {
  preview?: LivePreviewQuery
}): Promise<Result<ProductDetailsPageData>> {
  const result = await store.api.find<ProductDetailsPageData>('page_product_details', preview, (query) => {
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
