import type { Metadata } from 'next'
import { Fredoka, Open_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
})

export const metadata: Metadata = {
  title: 'B8S Solutions - Home & Garden Services',
  description: 'Local landscape gardening, garden maintenance, and general building services. Small jobs, Big jobs! Get in touch for a free quote.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${openSans.variable} font-body`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
