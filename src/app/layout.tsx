import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'TrendWatcher',
  description: 'AI-powered trend detection for e-commerce sellers. Get trends 48 hours before the competition.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    'google-site-verification': 'Kvg7Mk9hHg4Jj9XxKvg7Mk9hHg4Jj9XxKvg7Mk9',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
