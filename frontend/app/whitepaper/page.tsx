import type { Metadata } from 'next'
import WhitePaper from '@/components/pages/whitepaper'

export const metadata: Metadata = {
  title: 'SOL Bastard ($SOBA) Whitepaper - Premium Solana Memecoin',
  description: 'Discover how SOL Bastard ($SOBA) is revolutionizing the Solana memecoin space with innovative tokenomics, regular burns, and exclusive features.',
  openGraph: {
    title: 'SOL Bastard ($SOBA) Whitepaper - Premium Solana Memecoin',
    description: 'Discover how SOL Bastard ($SOBA) is revolutionizing the Solana memecoin space with innovative tokenomics, regular burns, and exclusive features.',
    images: [{
      url: '/images/soba-og-whitepaper.jpg',
      width: 1200,
      height: 630,
      alt: 'SOL Bastard Whitepaper'
    }]
  }
}

export default function WhitePaperPage() {
  return <WhitePaper />
} 