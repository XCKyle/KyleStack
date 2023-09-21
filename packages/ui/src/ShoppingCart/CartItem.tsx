'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'
import { IconTrash } from '@tabler/icons-react'
import { useCartStore } from '@xc/lib/cartStore'

export default function CartItem({ cartItem }: { cartItem: Models.CartItem }) {
  const { product } = cartItem
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const updateSize = useCartStore((state) => state.updateSize)

  function updateCartItem(e: any, key: string) {
    if (key === 'quantity') {
      updateQuantity({ sku: product.sku, size: cartItem.size, quantity: e.target.value })
    } else if (key === 'size') {
      updateSize({ sku: product.sku, size: cartItem.size, newSize: e.target.value })
    }
  }

  return (
    <div className="flex gap-3 border-b py-5 md:gap-5">
      <div className="aspect-square w-[50px] shrink-0 md:w-[120px]">
        <Image src={product.media.thumbnail.url} alt={product.name} width={120} height={120} />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="text-lg font-semibold text-black/[0.8] md:text-2xl">{product.name}</div>

          <div className="md:text-md block text-sm font-medium text-black/[0.5] md:hidden">{product.sub_title}</div>

          <div className="md:text-md mt-2 text-sm font-bold text-black/[0.5]">
            <span className="font-semibold">Price:</span> ${product.discounted_price}
          </div>
        </div>

        <div className="text-md hidden font-medium text-black/[0.5] md:block">{product.sub_title}</div>

        <div className="md:text-md flex items-center gap-2 text-sm text-black/[0.5] md:gap-10">
          <div className="flex items-center gap-1">
            <div className="font-semibold">Size:</div>
            <select className="hover:text-black" onChange={(e) => updateCartItem(e, 'size')}>
              {product.sizes.map((item, i) => {
                return (
                  <option key={i} value={item.size} disabled={!item.enabled} selected={cartItem.size === item.size}>
                    {item.size}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <div className="font-semibold">Quantity:</div>
            <select className="hover:text-black" onChange={(e) => updateCartItem(e, 'quantity')}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                return (
                  <option key={i} value={q} selected={cartItem.quantity == q}>
                    {q}
                  </option>
                )
              })}
            </select>
          </div>
          <IconTrash
            onClick={() => removeFromCart({ sku: product.sku, size: cartItem.size })}
            className="cursor-pointer text-[16px] text-black/[0.5] hover:text-black md:text-[20px]"
          />
        </div>
      </div>
    </div>
  )
}
