import type { Metadata } from 'next'
import BurnsPage from '@/components/pages/burns'

export const metadata: Metadata = {
  title: 'SOL Bastard ($SOBA) Burns - Token Reduction Events',
  description: 'Track SOL Bastard ($SOBA) burns - regular token reduction events keeping paper hands crying and diamond hands winning.',
  openGraph: {
    title: 'SOL Bastard ($SOBA) Burns - Token Reduction Events',
    description: 'Track SOL Bastard ($SOBA) burns - regular token reduction events keeping paper hands crying and diamond hands winning.',
    images: [{ url: '/images/soba-og-burns.jpg', width: 1200, height: 630, alt: 'SOBA Burns' }]
  }
}

export default function BurnsRoute() {
  return <BurnsPage />
} 