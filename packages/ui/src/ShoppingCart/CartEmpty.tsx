import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { EmptyCart } from '@xc/shared/src/data/store/getShoppingCartPage'
import Image from 'next/image'
import Link from '@xc/ui/Contentstack/Link'

export default function ShoppingCart({ data }: { data: EmptyCart }) {
  return (
    <div className="flex flex-[2] flex-col items-center pb-[50px] md:-mt-14">
      <Image
        src={data.hero_image.url}
        width={300}
        height={300}
        className="w-[300px] md:w-[400px]"
        alt={data.hero_image.title}
      />
      <span className="text-xl font-bold">{data.heading}</span>
      <span className="mt-4 text-center" dangerouslySetInnerHTML={{ __html: data.description }}></span>
      <Link
        data={data.continue_shopping_link}
        className="mb-3 mt-8 rounded-full bg-black px-8 py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95"
      />
    </div>
  )
}
