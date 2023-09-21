import { notFound } from 'next/navigation'
import getContactUsPage from '@xc/shared/data/store/getContactUsPage'
import ContactUsTouch from '@xc/ui/ContactUs/ContactUsTouch'
import ContactUsForm from '@xc/ui/ContactUs/ContactUsForm'

export default async function ContactPage({ searchParams }: Core.Page) {
  const result = await getContactUsPage({ preview: { ...searchParams } })

  const { data } = result
  if (!result.ok || !data) {
    return notFound()
  }
  return (
    <div className="relative isolate h-full bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <ContactUsTouch data={data} />
        <ContactUsForm data={data} />
      </div>
    </div>
  )
}
