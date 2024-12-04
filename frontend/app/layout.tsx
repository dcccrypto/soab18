import '@/styles/globals.css'
import { Providers } from './providers'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { defaultMetadata } from './metadata'

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://solbastard.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SOL Bastard",
              "alternateName": ["SOBA Token", "$SOBA"],
              "url": "https://solbastard.com",
              "description": "The most sophisticated memecoin on Solana, featuring a cigar-smoking chimp mascot, regular token burns, and exclusive NFTs.",
              "sameAs": [
                "https://x.com/SolBastardSoba",
                "https://t.me/SolBastardSOBA",
                "https://www.tiktok.com/@cryptobastard"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-black">
        <div className="relative min-h-screen overflow-hidden">
          {/* Base gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-950/50 to-black" />
          
          {/* Layered gradients for depth */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.02)_0%,transparent_50%)]" />
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.3)_0%,transparent_60%)]" />
          <div className="fixed inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,107,0,0.01)_0deg,transparent_60deg,rgba(255,107,0,0.01)_120deg,transparent_180deg,rgba(255,107,0,0.01)_240deg,transparent_300deg)]" />
          
          {/* Content */}
          <div className="relative isolate">
            <Providers>
              <div className="relative z-10">
                <Header />
                <main className="min-h-[calc(100vh-4rem)]">
                  {children}
                </main>
                <Footer />
              </div>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  )
}