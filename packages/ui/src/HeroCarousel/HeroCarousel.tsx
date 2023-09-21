'use client'

import type { ModularBlock } from '@xc/ui/Contentstack'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { IconArrowLeft } from '@tabler/icons-react'
import Image from 'next/image'

export default function HeroCarousel({ data }: ModularBlock<Contentstack.Globals.HeroCarousel>) {
  if (!data) return null

  return (
    <div className="relative mx-auto w-full max-w-[1360px] text-[20px] text-white">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute bottom-0 right-[31px] z-10 flex h-[30px] w-[30px] cursor-pointer items-center justify-center bg-black hover:opacity-90 md:right-[51px] md:h-[50px] md:w-[50px]"
          >
            <IconArrowLeft className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute bottom-0 right-0 z-10 flex h-[30px] w-[30px] cursor-pointer items-center justify-center bg-black hover:opacity-90 md:h-[50px] md:w-[50px]"
          >
            <IconArrowLeft className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {data.mb_carousel_items.map(({ item }) => (
          <div key={item.link.title} className="relative">
            <Image
              src={item.image.url}
              className="aspect-[16/10] object-cover md:aspect-auto"
              alt={item.image.title}
              width={1200}
              height={525}
            />
            <div className="font-oswald absolute bottom-[25px] left-0 cursor-pointer bg-white px-[15px] py-[10px] text-[15px] font-medium uppercase text-black/[0.9] hover:opacity-90 md:bottom-[75px] md:px-[40px] md:py-[25px] md:text-[30px]">
              {item.link.title}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
