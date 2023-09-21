'use client'
import Link from 'next/link'
import React from 'react'
import Wrapper from '@xc/ui/Wrapper'
import { RootLayoutData } from '@xc/shared/data/store/getRootLayout'
import Image from 'next/image'

export default function Footer({ data }: { data: RootLayoutData }) {
  return (
    <footer className="bg-black pb-3 pt-14 text-white">
      <Wrapper className="flex flex-col justify-between gap-[50px] md:flex-row md:gap-0">
        <div className="flex flex-col gap-[50px] md:flex-row md:gap-[75px] lg:gap-[100px]">
          <div className="flex shrink-0 flex-col gap-3">
            {data.footer_primary_links.map((link) => {
              return (
                <div key={link.title} className="font-oswald cursor-pointer text-sm font-medium uppercase">
                  {link.title}
                </div>
              )
            })}
          </div>

          <div className="flex shrink-0 gap-[50px] md:gap-[75px] lg:gap-[100px]">
            {data.mb_footer_secondary_links.map((link, i) => (
              <div className="flex flex-col gap-3" key={`secondary-links-${i}`}>
                <div className="font-oswald text-sm font-medium uppercase">{link.link_group.heading}</div>
                {link.link_group.links.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    className="cursor-pointer text-sm text-white/[0.5] hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 md:justify-start">
          {data.mb_footer_social_media_links.map(({ item }) => (
            <div
              key={item.link.title}
              onClick={() => window.open(item.link.href, '_blank')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/[0.25] text-black hover:bg-white/[0.5]"
            >
              {item.icon && (
                <Image src={item.icon.url} alt={item.icon.title} width={20} height={20} className="w-[20px]" />
              )}
            </div>
          ))}
        </div>
      </Wrapper>
      <Wrapper className="mt-10 flex flex-col justify-between gap-[10px] md:flex-row md:gap-0">
        <div className="cursor-pointer text-center text-[12px] text-white/[0.5] hover:text-white md:text-left">
          {data.footer_copyright_info}
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-center md:gap-5 md:text-left">
          {data.footer_bottom_links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="cursor-pointer text-[12px] text-white/[0.5] hover:text-white"
              title={link.title}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </Wrapper>
    </footer>
  )
}
