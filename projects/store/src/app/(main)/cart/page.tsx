import { notFound } from 'next/navigation'
import getShoppingCartPage from '@xc/shared/data/store/getShoppingCartPage'
import ShoppingCart from '@xc/ui/ShoppingCart'

export default async function Page({ searchParams }: Core.Page) {
  const result = await getShoppingCartPage({ preview: { ...searchParams } })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return <ShoppingCart data={result.data} />
}
