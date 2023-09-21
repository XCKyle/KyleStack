'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'
import Link from 'next/link'
import { getDiscountedPricePercentage } from 'store/src/utils'

export default function ProductCard({
  product,
  data,
}: {
  product: Models.Product
  data?: {
    off_label: string
  }
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="transform cursor-pointer overflow-hidden bg-white duration-200 hover:scale-105"
    >
      <Image width={500} height={500} src={product.media.thumbnail.url} alt={product.media.thumbnail.title} />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{product.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">${product.discounted_price}</p>

          {product.original_price && (
            <>
              <p className="text-base  font-medium line-through">${product.original_price}</p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(product.original_price, product.discounted_price)}%{' '}
                {data?.off_label ?? 'off'}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
