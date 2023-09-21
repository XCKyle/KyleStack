'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Wrapper from '@xc/ui/Wrapper'
import { FavoriteEmpty, FavoriteItems } from '@xc/ui/Favorites'
import useFavoritesStore from '@xc/lib/favoriteStore'
import { FavoritesPageData } from '@xc/shared/src/data/store/getFavoritesPage'

export default function Favorites({ data }: { data: FavoritesPageData }) {
  const favoriteItems = useFavoritesStore((state) => state.favoriteItems)
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {favoriteItems.length > 0 ? (
          <FavoriteItems data={data} favoriteItems={favoriteItems} />
        ) : (
          <FavoriteEmpty data={data.empty_favorites} />
        )}
      </Wrapper>
    </div>
  )
}
