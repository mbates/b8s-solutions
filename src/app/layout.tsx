import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'B8S Solutions',
  description: 'B8S Solutions Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
