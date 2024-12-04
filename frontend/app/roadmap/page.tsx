import type { Metadata } from 'next'
import Roadmap from '@/components/pages/roadmap'  // Keep using your existing page

export const metadata: Metadata = {
  title: 'SOL Bastard ($SOBA) Roadmap - The Path to Alpha',
  description: 'Discover the SOL Bastard roadmap - our journey to building the most sophisticated memecoin ecosystem on Solana.',
  openGraph: {
    title: 'SOL Bastard ($SOBA) Roadmap - The Path to Alpha',
    description: 'Discover the SOL Bastard roadmap - our journey to building the most sophisticated memecoin ecosystem on Solana.',
    images: [{ url: '/images/soba-og-roadmap.jpg', width: 1200, height: 630, alt: 'SOBA Roadmap' }]
  }
}

export default function RoadmapRoute() {
  return <Roadmap />
} 