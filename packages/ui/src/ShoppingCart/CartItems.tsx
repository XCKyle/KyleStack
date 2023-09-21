'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useMemo } from 'react'
import { ShoppingCartPageData } from '@xc/shared/src/data/store/getShoppingCartPage'
import { CartSummary, CartItem } from '@xc/ui/ShoppingCart'

export default function CartItems({ data, cartItems }: { data: ShoppingCartPageData; cartItems: Models.CartItem[] }) {
  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.product.discounted_price * item.quantity
    }, 0)
  }, [cartItems])

  return (
    <>
      <div className="mx-auto mt-8 max-w-[800px] text-center md:mt-0">
        <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">{data.heading}</div>
      </div>

      <div className="flex flex-col gap-12 py-10 lg:flex-row">
        <div className="flex-[2]">
          <div className="text-lg font-bold">{data.cart_item.heading}</div>
          {cartItems.map((item) => (
            <CartItem key={item.product.sku} cartItem={item} />
          ))}
        </div>
        <CartSummary data={data.summary} total={subTotal} />
      </div>
    </>
  )
}
