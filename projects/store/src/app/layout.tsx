import './globals.css'

export default async function Layout({ children }: Core.Layout) {
  return (
    <html lang="en">
      <body className="flex flex-col">{children}</body>
    </html>
  )
}
