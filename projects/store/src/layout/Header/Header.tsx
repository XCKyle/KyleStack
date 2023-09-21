'use client'
import type { RootLayoutData } from '@xc/shared/data/store/getRootLayout'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Wrapper from '@xc/ui/Wrapper'
import { Menu, MobileMenu, MenuItemIcon } from '@xc/ui/Menu'
import { IconX, IconMenuDeep } from '@tabler/icons-react'
import { useCartStore } from '@xc/lib/cartStore'
import useFavoritesStore from '@xc/lib/favoriteStore'

export default function Header({ data }: { data: RootLayoutData }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [show, setShow] = useState('translate-y-0')
  const [showCatMenu, setShowCatMenu] = useState(false)
  const cartItems = useCartStore((state) => state.cartItems)
  const favoriteItems = useFavoritesStore((state) => state.favoriteItems)

  return (
    <header
      className={`sticky top-0 z-20 flex h-[50px] w-full items-center justify-between bg-white transition-transform duration-300 md:h-[80px] ${show}`}
    >
      <Wrapper className="flex h-[60px] items-center justify-between">
        <Link href="/">
          <Image
            src={data.image_header_logo.url}
            alt={data.image_header_logo.title}
            width={80}
            height={40}
            className="w-[40px] md:w-[60px]"
          />
        </Link>
        <Menu items={data.mb_nav_menu} setShowCatMenu={setShowCatMenu} showCatMenu={showCatMenu} />

        {mobileMenu && (
          <MobileMenu
            items={data.mb_nav_menu}
            setShowCatMenu={setShowCatMenu}
            showCatMenu={showCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}
        <div className="flex items-center gap-2 text-black">
          <ul className="flex">
            {data.mb_cart_links.map(({ item }) => (
              <li className="cursor-pointer" key={item.link.title}>
                {item.link.title === 'Cart' && <MenuItemIcon item={item} badge={cartItems.length} />}
                {item.link.title === 'Favorites' && <MenuItemIcon item={item} badge={favoriteItems.length} />}
              </li>
            ))}
          </ul>

          <div className="relative -mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/[0.05] md:hidden md:h-12 md:w-12">
            {mobileMenu ? (
              <IconX className="text-[16px]" onClick={() => setMobileMenu(false)} />
            ) : (
              <IconMenuDeep className="text-[20px]" onClick={() => setMobileMenu(true)} />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  )
}
