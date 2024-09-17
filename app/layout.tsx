import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavMenu from './components/NavMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie & TV Recommender',
  description: 'Discover and explore movies and TV shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NavMenu />
        <main className="flex-grow bg-gray-50">{children}</main>
        <footer className="gradient-bg text-white py-6 text-center">
          <p className="text-sm">&copy; 2023 Movie & TV Recommender. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
