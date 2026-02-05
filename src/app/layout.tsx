import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrendWatcher',
  description: 'AI-powered trend detection for e-commerce sellers. Get trends 48 hours before the competition.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
