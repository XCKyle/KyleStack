import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'
import { NotificationToast } from '@xc/shared/data/store/getProductDetailsPage'

export type ContactUsPageData = Contentstack.Item<{
  heading: string
  description: string
  mb_contact: {
    item: {
      icon: Contentstack.Fields.File
      description: string
      link: Contentstack.Fields.Link
    }
  }[]
  mb_form: {
    item: Contentstack.Globals.InputBox
  }[]
  submit_button_label: string
  success_notification: NotificationToast
  error_notification: NotificationToast
}>

export const generateMetadata = createMetadataGenerator('/', 'page_contact_us', store.api)

export default async function getContactUsPage({
  preview,
}: {
  preview?: LivePreviewQuery
}): Promise<Result<ContactUsPageData>> {
  const result = await store.api.find<ContactUsPageData>('page_contact_us', preview, (query) => {
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
