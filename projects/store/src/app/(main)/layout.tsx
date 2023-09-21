import getRootLayout from '@xc/shared/data/store/getRootLayout'

import Contentstack from '@xc/ui/Contentstack'
import { Root } from '@/layout'

export default async function Layout({ children }: Core.Layout) {
  const result = await getRootLayout()

  return (
    <>
      <Contentstack.LivePreview>
        <Root data={result.data}>{children}</Root>
      </Contentstack.LivePreview>
    </>
  )
}
