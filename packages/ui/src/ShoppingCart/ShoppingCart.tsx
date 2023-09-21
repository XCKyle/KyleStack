'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useCartStore } from '@xc/lib/cartStore'
import Wrapper from '@xc/ui/Wrapper'
import { ShoppingCartPageData } from '@xc/shared/src/data/store/getShoppingCartPage'
import { CartEmpty, CartItems } from '@xc/ui/ShoppingCart'

export default function ShoppingCart({ data }: { data: ShoppingCartPageData }) {
  const cartItems = useCartStore((state) => state.cartItems)
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 ? <CartItems data={data} cartItems={cartItems} /> : <CartEmpty data={data.empty_cart} />}
      </Wrapper>
    </div>
  )
}
