import type { Metadata } from 'next'

import TokenomicsPage from '@/components/pages/tokenomics'

export const metadata: Metadata = {
  title: 'SOL Bastard ($SOBA) Tokenomics - Alpha Token Economics',
  description: 'Explore SOL Bastard tokenomics - featuring strategic burns, sigma distribution, and the most alpha economic model on Solana.',
  openGraph: {
    title: 'SOL Bastard ($SOBA) Tokenomics - Alpha Token Economics',
    description: 'Explore SOL Bastard tokenomics - featuring strategic burns, sigma distribution, and the most alpha economic model on Solana.',
    images: [{ url: '/images/soba-og-tokenomics.jpg', width: 1200, height: 630, alt: 'SOBA Tokenomics' }]
  }
}

export default function TokenomicsRoute() {
  return <TokenomicsPage />
} 