import type { Metadata } from 'next'
import Home from '@/components/pages/home'  // Updated import

export const metadata: Metadata = {
  title: 'SOL Bastard ($SOBA) - The Most Alpha Memecoin on Solana',
  description: 'Join the richest, smoothest memecoin on Solana. Led by a cigar-smoking chimp with expensive taste, SOL Bastard ($SOBA) features regular burns and exclusive NFTs.',
  openGraph: {
    title: 'SOL Bastard ($SOBA) - The Most Alpha Memecoin on Solana',
    description: 'Join the richest, smoothest memecoin on Solana. Led by a cigar-smoking chimp with expensive taste, SOL Bastard ($SOBA) features regular burns and exclusive NFTs.',
    images: [{ url: '/images/soba-og-home.jpg', width: 1200, height: 630, alt: 'SOL Bastard - Premium Solana Memecoin' }]
  }
}

export default function HomePage() {
  return <Home />
} 