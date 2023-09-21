'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ProductCard from '@xc/ui/ProductCard'

export default function ProductList({ products }: { products: Models.Product[] }) {
  return (
    <div className="my-14 grid grid-cols-1 gap-5 px-5 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  )
}
