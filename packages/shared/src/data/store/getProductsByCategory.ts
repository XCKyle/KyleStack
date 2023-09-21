import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'
import GetProductsByCategorySlug from './queries/GetProductsByCategorySlug.graphql'
import { ApolloQueryResult } from '@apollo/client'

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
    total: number
    items: (Omit<Models.Product, 'thumbnail' | 'images'> & {
      media: { thumbnailConnection: ImageConnection; imagesConnection: ImageConnection }
    })[]
  }
  category: {
    items: {
      title: string
      slug: string
    }[]
  }
}

// export const generateMetadata = createMetadataGenerator('/posts', 'page_posts', store.api)

type ReturnType = Result<{
  products: Models.Product[]
  category: Models.Category
}>

export default async function getProductsByCategory(slug: string): Promise<ReturnType> {
  const response: ApolloQueryResult<ProductData> = await store.gql.query({
    query: GetProductsByCategorySlug,
    variables: {
      slug,
    },
  })

  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const products = response.data.products.items.map((item) => {
    return {
      ...item,
      media: {
        thumbnail: item.media.thumbnailConnection.edges[0].node,
        images: item.media.imagesConnection.edges.map((edge) => edge.node),
      },
    }
  })

  const category = response.data.category.items[0]

  return Result.success({ products, category })
}
