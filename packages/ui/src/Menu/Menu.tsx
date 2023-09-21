import React from 'react'
import Contentstack from '@xc/ui/Contentstack'
import { IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'

type MenuProps = {
  items: Contentstack.ModularBlocks.NavMenuItem[]
  showCatMenu: boolean
  setShowCatMenu: (show: boolean) => void
}
export default function Menu({ items, showCatMenu, setShowCatMenu }: MenuProps) {
  return (
    <ul className="hidden items-center gap-8 font-medium text-black md:flex">
      {items.map(({ item }) => (
        <React.Fragment key={item.link.title}>
          {item.mb_sub_menu.length ? (
            <li
              className="relative cursor-pointer"
              onMouseEnter={() => setShowCatMenu(true)}
              onMouseLeave={() => setShowCatMenu(false)}
            >
              <div className="flex items-center gap-2">
                {item.link.title}
                <IconChevronDown size={14} />
              </div>
              {showCatMenu && (
                <ul className="absolute left-0 top-6 min-w-[250px] bg-white px-1 py-1 text-black shadow-lg">
                  {item.mb_sub_menu?.map(({ item: submenu }) => {
                    return (
                      <Link
                        key={submenu.link.title}
                        href={submenu.link.href}
                        title={submenu.link.title}
                        onClick={() => setShowCatMenu(false)}
                      >
                        <li className="flex h-12 items-center justify-between rounded-md px-3 hover:bg-black/[0.03]">
                          {submenu.link.title}
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.link.title}>
              <Contentstack.Link key={item.link.href} data={item.link} />
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  )
}
