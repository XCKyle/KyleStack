import Link from 'next/link'
import Image from 'next/image'

export default function MenuItemIcon({ item, badge }: { item: Contentstack.Globals.IconLink; badge: string | number }) {
  const showBadge = badge !== '' && +badge > 0
  return (
    <Link href={item.link.href} title={item.link.title}>
      <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12">
        <Image src={item.icon.url} alt={item.icon.title} width={24} height={24} className="w-[24px]" />
        {showBadge && (
          <div className="absolute left-5 top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-red-600 px-[2px] text-[10px] text-white md:left-7 md:h-[18px] md:min-w-[18px] md:px-[5px] md:text-[12px]">
            {badge}
          </div>
        )}
      </div>
    </Link>
  )
}
