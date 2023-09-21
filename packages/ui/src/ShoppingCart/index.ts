import dynamic from 'next/dynamic'

export default dynamic(() => import('./ShoppingCart'))
export const CartEmpty = dynamic(() => import('./CartEmpty'))
export const CartSummary = dynamic(() => import('./CartSummary'))
export const CartItems = dynamic(() => import('./CartItems'))
export const CartItem = dynamic(() => import('./CartItem'))
