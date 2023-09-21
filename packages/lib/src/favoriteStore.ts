import { create } from 'zustand'
import CartItem = Models.CartItem

type FavoritesState = {
  favoriteItems: Models.Product[]
  addToFavorites: (product: Models.Product) => void
  removeFromFavorites: (item: { sku: string }) => void
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favoriteItems: [],
  addToFavorites: (product: Models.Product) =>
    set((state) => {
      // only add if product is not already in favorites
      if (state.favoriteItems.find((item) => item.sku === product.sku)) {
        return state
      }
      return {
        favoriteItems: [...state.favoriteItems, product],
      }
    }),
  removeFromFavorites: ({ sku }: { sku: string }) =>
    set((state) => {
      return { favoriteItems: state.favoriteItems.filter((item) => item.sku !== sku) }
    }),
}))

export default useFavoritesStore
