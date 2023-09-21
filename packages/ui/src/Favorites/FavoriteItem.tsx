'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'
import { IconHeartFilled } from '@tabler/icons-react'
import { useFavoritesStore } from '@xc/lib/favoriteStore'

export default function FavoriteItem({ favoriteItem }: { favoriteItem: Models.Product }) {
  const removeFromFavorites = useFavoritesStore((state) => state.removeFromFavorites)

  return (
    <div className="flex gap-3 border-b py-5 md:gap-5">
      <div className="aspect-square w-[50px] shrink-0 md:w-[120px]">
        <Image src={favoriteItem.media.thumbnail.url} alt={favoriteItem.name} width={120} height={120} />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="text-lg font-semibold text-black/[0.8] md:text-2xl">{favoriteItem.name}</div>

          <div className="md:text-md block text-sm font-medium text-black/[0.5] md:hidden">
            {favoriteItem.sub_title}
          </div>

          <div className="md:text-md mt-2 text-sm font-bold text-black/[0.5]">
            <span className="font-semibold">Price:</span> ${favoriteItem.discounted_price}
          </div>
        </div>

        <div className="text-md hidden font-medium text-black/[0.5] md:block">{favoriteItem.sub_title}</div>

        <IconHeartFilled
          onClick={() => removeFromFavorites({ sku: favoriteItem.sku })}
          className="cursor-pointer text-[16px] text-black/[0.5] hover:text-black md:text-[20px]"
        />
      </div>
    </div>
  )
}
