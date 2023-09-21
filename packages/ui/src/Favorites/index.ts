import dynamic from 'next/dynamic'

export default dynamic(() => import('./Favorites'))
export const FavoriteEmpty = dynamic(() => import('./FavoriteEmpty'))
export const FavoriteItems = dynamic(() => import('./FavoriteItems'))
export const FavoriteItem = dynamic(() => import('./FavoriteItem'))
