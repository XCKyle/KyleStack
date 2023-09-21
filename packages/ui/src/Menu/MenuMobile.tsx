import React from 'react'
import Contentstack from '@xc/ui/Contentstack'
import { IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'

type MenuProps = {
  items: Contentstack.ModularBlocks.NavMenuItem[]
  showCatMenu: boolean
  setShowCatMenu: (show: boolean) => void
  setMobileMenu: (show: boolean) => void
}
export default function Menu({ items, showCatMenu, setShowCatMenu, setMobileMenu }: MenuProps) {
  return (
    <ul className="absolute left-0 top-[50px] flex h-[calc(100vh-50px)] w-full flex-col border-t bg-white font-bold text-black md:hidden">
      {items.map(({ item }) => (
        <React.Fragment key={item.link.title}>
          {item.mb_sub_menu.length ? (
            <li
              className="relative flex cursor-pointer flex-col border-b px-5 py-4"
              onClick={() => setShowCatMenu(!showCatMenu)}
            >
              <div className="flex items-center justify-between">
                {item.link.title}
                <IconChevronDown size={14} className={ showCatMenu ? 'rotate-180' : '' }/>
              </div>
              {showCatMenu && (
                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                  {item.mb_sub_menu?.map(({ item: submenu }) => {
                    return (
                      <Link
                        key={submenu.link.title}
                        href={submenu.link.href}
                        title={submenu.link.title}
                        onClick={() => {
                          setShowCatMenu(false)
                          setMobileMenu(false)
                        }}
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
            <li className="py-4 px-5 border-b" key={item.link.title}>
              <Contentstack.Link key={item.link.href} data={item.link} onClick={() => setMobileMenu(false)} />
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  )
}
