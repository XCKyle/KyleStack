import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'

export type RootLayoutData = Contentstack.Item<{
  image_header_logo: Contentstack.Fields.File
  mb_cart_links: {
    item: {
      link: Contentstack.Fields.Link
      icon: Contentstack.Fields.File
    }
  }[]
  mb_nav_menu: Contentstack.ModularBlocks.NavMenuItem[]
  footer_primary_links: Contentstack.Fields.Link[]
  footer_bottom_links: Contentstack.Fields.Link[]
  mb_footer_secondary_links: {
    link_group: {
      heading: string
      links: Contentstack.Fields.Link[]
    }
  }[]
  mb_footer_social_media_links: {
    item: Contentstack.Globals.IconLink
  }[]
  footer_copyright_info: string
}>

export default async function getRootLayout(): Promise<Result<RootLayoutData>> {
  const result = await store.api.find<RootLayoutData>('layout_root', null, (query) => {
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
