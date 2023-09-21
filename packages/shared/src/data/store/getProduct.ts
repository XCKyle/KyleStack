import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import GetProductBySlug from './queries/GetProductBySlug.graphql'
import GetProductsByCategorySlug from './queries/GetProductsByCategorySlug.graphql'
import { ApolloQueryResult } from '@apollo/client'

type ProductDataItem = Omit<Models.Product, 'thumbnail' | 'images' | 'size'> & {
  media: {
    thumbnailConnection: ImageConnection
    imagesConnection: ImageConnection
  }
  size: {
    data: [
      {
        size: string
        enabled: boolean
      },
    ]
  }
  categoriesConnection: {
    edges: {
      node: {
        slug: string
      }
    }[]
  }
}
type ImageConnection = {
  edges: {
    node: {
      url: string
      title: string
    }
  }[]
}
export type ProductData = {
  products: {
    items: ProductDataItem[]
  }
}

type ReturnType = Result<{
  product: Models.Product
  related_products: Models.Product[]
}>

function toProduct(productDataItem: ProductDataItem): Models.Product {
  return {
    ...productDataItem,
    media: {
      thumbnail: productDataItem.media.thumbnailConnection.edges[0].node,
      images: productDataItem.media.imagesConnection.edges.map((edge) => edge.node),
    },
    sizes:
      productDataItem.size?.data?.map((size) => {
        return {
          size: size.size,
          enabled: size.enabled,
        }
      }) ?? [],
  }
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const productDataResponse: ApolloQueryResult<ProductData> = await store.gql.query({
    query: GetProductBySlug,
    variables: { slug: params.slug },
    // fetchPolicy: 'no-cache',
  })
  if (!productDataResponse || productDataResponse.error || productDataResponse.data.products.items.length === 0) {
    return { title: 'Product' }
  }
  return { title: productDataResponse.data.products.items[0].title ?? 'Product' }
}

async function getRelatedProducts(
  productDataItem: ProductDataItem,
  relatedProductsLimit: number,
): Promise<Models.Product[]> {
  const categorySlug = productDataItem.categoriesConnection.edges[0].node.slug
  const productsByCategorySlugResponse: ApolloQueryResult<ProductData> = await store.gql.query({
    query: GetProductsByCategorySlug,
    variables: { slug: categorySlug, limit: relatedProductsLimit, skipSlug: productDataItem.slug },
    // fetchPolicy: 'no-cache',
  })

  if (
    !productsByCategorySlugResponse ||
    productsByCategorySlugResponse.error ||
    productsByCategorySlugResponse.data.products.items.length === 0
  ) {
    return []
  }
  return productsByCategorySlugResponse.data.products.items.map((item) => toProduct(item))
}

export default async function getProduct(slug: string, relatedProductsLimit: number): Promise<ReturnType> {
  const productDataResponse: ApolloQueryResult<ProductData> = await store.gql.query({
    query: GetProductBySlug,
    variables: { slug },
  })

  if (!productDataResponse || productDataResponse.error || productDataResponse.data.products.items.length === 0) {
    return Result.fail('Not Found')
  }

  const productDataItem = productDataResponse.data.products.items[0]
  const product = toProduct(productDataItem)
  const relatedProducts = await getRelatedProducts(productDataItem, relatedProductsLimit)

  return Result.success({ product, related_products: relatedProducts })
}
