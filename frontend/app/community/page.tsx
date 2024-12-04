import type { Metadata } from 'next'
import Community from '@/components/pages/community'  


export const metadata: Metadata = {
  title: 'SOL Bastard ($SOBA) Community - Join the Elite',
  description: 'Join the most sophisticated crypto community on Solana. SOL Bastard ($SOBA) holders enjoy exclusive benefits and alpha opportunities.',
  openGraph: {
    title: 'SOL Bastard ($SOBA) Community - Join the Elite',
    description: 'Join the most sophisticated crypto community on Solana. SOL Bastard ($SOBA) holders enjoy exclusive benefits and alpha opportunities.',
    images: [{ url: '/images/soba-og-community.jpg', width: 1200, height: 630, alt: 'SOBA Community' }]
  }
}

export default function CommunityRoute() {
  return <Community />
} 