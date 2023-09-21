'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getDiscountedPricePercentage } from 'store/src/utils'
import { IconHeart } from '@tabler/icons-react'
import { useState } from 'react'
import ProductDetailsCarousel from '@xc/ui/ProductDetailsCarousel'
import { useCartStore } from '@xc/lib/cartStore'
import { toast } from 'react-toastify'
import { ProductDetailsPageData } from '@xc/shared/src/data/store/getProductDetailsPage'
import useFavoritesStore from '@xc/lib/favoriteStore'

export default function ProductDetails({ product, data }: { product: Models.Product; data: ProductDetailsPageData }) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [showError, setShowError] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites)
  const favoriteItems = useFavoritesStore((state) => state.favoriteItems)

  function isFavorite(product: Models.Product) {
    return favoriteItems.some((item) => item.sku === product.sku)
  }

  const notify = (content: string) => {
    toast.success(content, {
      autoClose: 5000,
      hideProgressBar: false,
      position: 'bottom-center',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      toastId: 'add-to-cart-success',
    })
  }
  return (
    <div className="flex flex-col gap-[50px] md:px-10 lg:flex-row lg:gap-[100px]">
      <div className="mx-auto w-full max-w-[500px] flex-[1.5] md:w-auto lg:mx-0 lg:max-w-full">
        <ProductDetailsCarousel images={product.media.images} />
      </div>

      <div className="flex-[1] py-3">
        <div className="mb-2 text-[34px] font-semibold leading-tight">{product.name}</div>
        <div className="mb-5 text-lg font-semibold">{product.sub_title}</div>

        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold">
            {data.price_summary.price_label}: ${product.discounted_price}
          </p>
          {product.discounted_price && (
            <>
              <p className="text-base  font-medium line-through">${product.original_price}</p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(product.original_price, product.discounted_price)}%{' '}
                {data.price_summary.off_label}
              </p>
            </>
          )}
        </div>

        <div
          className="text-md mb-10 font-medium text-black/[0.5]"
          dangerouslySetInnerHTML={{ __html: data.price_summary.tax_info }}
        ></div>

        <div className="mb-10">
          <div className="mb-2 flex justify-between">
            <div className="text-md font-semibold">{data.size_summary.select_size_label}</div>
          </div>

          <div id="sizesGrid" className="grid grid-cols-3 gap-2">
            {product.sizes.map((item, i) => (
              <div
                key={i}
                className={`rounded-md border py-3 text-center font-medium ${
                  item.enabled ? 'cursor-pointer hover:border-black' : 'cursor-not-allowed bg-black/[0.1] opacity-50'
                } ${selectedSize === item.size ? 'border-black' : ''}`}
                onClick={() => {
                  setSelectedSize(item.size)
                  setShowError(false)
                }}
              >
                {item.size}
              </div>
            ))}
          </div>

          {showError && <div className="mt-1 text-red-600">{data.size_summary.size_selection_required_message}</div>}
        </div>

        <button
          className="mb-3 w-full rounded-full bg-black py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95"
          onClick={() => {
            if (!selectedSize) {
              setShowError(true)
              document.getElementById('sizesGrid')?.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              })
            } else {
              addToCart(product, selectedSize)
              notify('Item added to cart!')
            }
          }}
        >
          {data.cart_actions.add_to_cart_link.title}
        </button>

        {data.cart_actions?.add_to_favorites_link?.title && !isFavorite(product) && (
          <button
            className="flex w-full items-center justify-center gap-2 rounded-full border border-black py-4 text-lg font-medium transition-transform hover:opacity-75 active:scale-95"
            onClick={() => {
              addToFavorites(product)
              notify('Item added to favorites!')
            }}
          >
            {data.cart_actions.add_to_favorites_link.title}
            <IconHeart size={20} />
          </button>
        )}

        <div className="mt-10">
          <div className="mb-5 text-lg font-bold">{data.product_details_label}</div>
          <div className="markdown text-md mb-5" dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>
    </div>
  )
}
