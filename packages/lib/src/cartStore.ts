import { create } from 'zustand'
import CartItem = Models.CartItem

type CartState = {
  cartItems: CartItem[]
  addToCart: (product: Models.Product, size: string) => void
  removeFromCart: (item: { sku: string; size: string }) => void
  updateQuantity: ({ sku, size, quantity }: { sku: string; size: string; quantity: number }) => void
  updateSize: ({ sku, size, newSize }: { sku: string; size: string; newSize: string }) => void
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (product: Models.Product, size: string) =>
    set((state) => {
      const existingLineItem = state.cartItems.find((p) => p.product.sku === product.sku && p.size === size)
      if (existingLineItem) {
        existingLineItem.quantity++
        return {
          cartItems: [...state.cartItems],
        }
      }
      return {
        cartItems: [
          ...state.cartItems,
          {
            product,
            quantity: 1,
            size,
            price: product.discounted_price,
          },
        ],
      }
    }),
  removeFromCart: ({ sku, size }: { sku: string; size: string }) =>
    set((state) => {
      return { cartItems: state.cartItems.filter((item) => item.product.sku !== sku || item.size !== size) }
    }),
  updateQuantity: ({ sku, size, quantity }: { sku: string; size: string; quantity: number }) =>
    set((state) => {
      const lineItem = state.cartItems.find((p) => p.product.sku === sku && p.size === size)
      if (lineItem) {
        lineItem.quantity = quantity
      }
      return { cartItems: [...state.cartItems] }
    }),
  updateSize: ({ sku, size, newSize }: { sku: string; size: string; newSize: string }) =>
    set((state) => {
      const lineItem = state.cartItems.find((p) => p.product.sku === sku && p.size === size)
      if (lineItem) {
        lineItem.size = newSize
      }
      return { cartItems: [...state.cartItems] }
    }),
}))

export default useCartStore
