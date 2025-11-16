import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'PointCall — Portfolio SaaS',
  description: 'Modern portfolio with pricing like a spreadsheet and beautiful detail modals.',
  metadataBase: new URL('https://example.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}


