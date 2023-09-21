import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type HomePageData = Contentstack.Item<{
  hero_carousel: Contentstack.Globals.HeroCarousel
  open_graph: Contentstack.Globals.OpenGraph
  heading: string
  sub_heading: string
}>

export const generateMetadata = createMetadataGenerator('/', 'page_home', store.api)

export default async function getHomePage({ preview }: { preview?: LivePreviewQuery }): Promise<Result<HomePageData>> {
  const result = await store.api.find<HomePageData>('page_home', preview, (query) => {
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
