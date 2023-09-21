import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type EmptyFavorites = {
  continue_shopping_link: Contentstack.Fields.Link
  description: string
  hero_image: Contentstack.Fields.File
  heading: string
}

export type FavoritesPageData = Contentstack.Item<{
  url: string
  heading: string
  empty_favorites: EmptyFavorites
  open_graph: Contentstack.Globals.OpenGraph
  remove_favorite_icon: Contentstack.Fields.File
}>

export const generateMetadata = createMetadataGenerator('/', 'page_favorites', store.api)

export default async function getFavoritesPage({
  preview,
}: {
  preview?: LivePreviewQuery
}): Promise<Result<FavoritesPageData>> {
  const result = await store.api.find<FavoritesPageData>('page_favorites', preview, (query) => {
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
