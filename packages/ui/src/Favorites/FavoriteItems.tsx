'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FavoriteItem } from '@xc/ui/Favorites'
import { FavoritesPageData } from '@xc/shared/src/data/store/getFavoritesPage'

export default function FavoriteItems({
  data,
  favoriteItems,
}: {
  data: FavoritesPageData
  favoriteItems: Models.Product[]
}) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-[800px] text-center md:mt-0">
        <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">{data.heading}</div>
      </div>

      <div className="flex flex-col gap-12 py-10 lg:flex-row">
        <div className="flex-[2]">
          {favoriteItems.map((item) => (
            <FavoriteItem key={item.sku} favoriteItem={item} />
          ))}
        </div>
      </div>
    </>
  )
}
