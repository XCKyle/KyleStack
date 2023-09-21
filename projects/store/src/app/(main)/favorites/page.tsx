import { notFound } from 'next/navigation'
import Favorites from '@xc/ui/Favorites'
import getFavoritesPage from '@xc/shared/data/store/getFavoritesPage'

export default async function Page({ searchParams }: Core.Page) {
  const result = await getFavoritesPage({ preview: { ...searchParams } })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return <Favorites data={result.data} />
}
