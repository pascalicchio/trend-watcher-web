import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trend-Watcher AI',
  description: 'AI-powered trend detection for e-commerce sellers. Get trends 48 hours before the competition.',
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
