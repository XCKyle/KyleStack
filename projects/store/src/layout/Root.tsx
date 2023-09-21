import type { RootLayoutData } from '@xc/shared/data/store/getRootLayout'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header'
import Footer from '@/layout/Footer'
import { ToastContainer } from 'react-toastify'

export default function Root({
  data,
  children,
}: {
  data: RootLayoutData | null | undefined
  children: React.ReactNode
}) {
  return (
    <>
      {data && <Header data={data} />}
      <div className="flex-1">{children}</div>
      <ToastContainer />
      {data && <Footer data={data} />}
    </>
  )
}
