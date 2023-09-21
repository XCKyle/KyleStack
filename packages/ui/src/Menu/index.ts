import dynamic from 'next/dynamic'
export const Menu = dynamic(() => import('./Menu'))
export const MobileMenu = dynamic(() => import('./MenuMobile'))
export const MenuItemIcon = dynamic(() => import('./MenuItemIcon'))
