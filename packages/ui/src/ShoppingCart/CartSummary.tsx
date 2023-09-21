import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { CartSummary } from '@xc/shared/src/data/store/getShoppingCartPage'
import Link from 'next/link'

export default function CartSummary({ data, total }: { data: CartSummary; total: number }) {
  return (
    <div className="flex-[1]">
      <div className="text-lg font-bold">{data.heading}</div>

      <div className="my-5 rounded-xl bg-black/[0.05] p-5">
        <div className="flex justify-between">
          <div className="text-md font-medium uppercase text-black md:text-lg">{data.subtotal_label}</div>
          <div className="text-md font-medium text-black md:text-lg">${total}</div>
        </div>
        <div
          className="md:text-md mt-5 border-t py-5 text-sm"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>

      <Link
        href={data.checkout_link}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95"
        title={data.checkout_link.title}
      >
        <span>{data.checkout_link.title}</span>
        {/*{loading && <img src="/spinner.svg" />}*/}
      </Link>
    </div>
  )
}
