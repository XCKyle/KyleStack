import Image from 'next/image'
import Link from 'next/link'
import { ContactUsPageData } from '@xc/shared/src/data/store/getContactUsPage'

export default function ContactUsTouch({ data }: { data: ContactUsPageData }) {
  return (
    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
      <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
          <svg
            className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="100%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="white" />
            <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
              <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{data.heading}</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
        <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
          {data.mb_contact.map(({ item }, i) => (
            <div key={i} className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">{item.description}</span>
                <Image
                  src={item.icon.url}
                  alt={item.icon.title}
                  className="h-7 w-6 text-gray-400 opacity-60"
                  aria-hidden="true"
                  width={24}
                  height={28}
                />
              </dt>
              {item.link.href ? (
                <Link href={item.link.href} title={item.link.title}>
                  <dd dangerouslySetInnerHTML={{ __html: item.description }}></dd>
                </Link>
              ) : (
                <dd dangerouslySetInnerHTML={{ __html: item.description }}></dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
