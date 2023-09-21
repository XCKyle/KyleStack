/// <reference types="node" />
/// <reference types="next" />
/// <reference types="next/image-types/global" />

//
// Models

declare namespace Models {
  type Product = {
    title: string
    sku: string
    name: string
    sub_title: string
    discounted_price: number
    original_price: number
    description: string
    slug: string
    media: {
      thumbnail: Pick<Contentstack.Fields.File, 'url' | 'title'>
      images: Pick<Contentstack.Fields.File, 'url' | 'title'>[]
    }
    sizes: {
      size: string
      enabled: boolean
    }[]
  }

  type Category = {
    title: string
    slug: string
  }

  type CartItem = {
    product: Models.Product
    quantity: number
    size: string
    price: number
  }

  type Cart = {
    items: CartItem[]
  }
}
