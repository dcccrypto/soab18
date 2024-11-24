import * as React from 'react'
import { Providers } from './providers'
import { Footer } from '../components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}