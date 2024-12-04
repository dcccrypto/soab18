import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://solbastard.com'),
  title: 'SOL Bastard ($SOBA) - The Premium Solana Memecoin | SOBA Token',
  description: 'SOL Bastard ($SOBA) is the most sophisticated memecoin on Solana, featuring a cigar-smoking chimp mascot, regular token burns, and exclusive NFTs. Join the elite!',
  keywords: [
    'SOL Bastard', 'SOBA token', 'SOBA', '$SOBA', 'Solana memecoin', 
    'cigar smoking chimp', 'premium crypto', 'token burns', 'Solana NFT', 
    'crypto community', 'Sol Bastard SOBA', 'SOBA Sol Bastard'
  ].join(', '),
  alternates: {
    canonical: 'https://solbastard.com'
  },
  openGraph: {
    type: 'website',
    url: 'https://solbastard.com',
    title: 'SOL Bastard ($SOBA) - The Premium Solana Memecoin',
    description: 'Join the most sophisticated memecoin on Solana. Led by a cigar-smoking chimp with expensive taste, featuring regular burns and exclusive NFTs.',
    siteName: 'SOL Bastard',
    images: [{
      url: '/images/soba-og.jpg',
      width: 1200,
      height: 630,
      alt: 'SOL Bastard - The Premium Solana Memecoin'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SolBastardSoba',
    creator: '@SolBastardSoba',
    title: 'SOL Bastard ($SOBA) - Premium Solana Memecoin',
    description: 'The richest, smoothest memecoin on Solana. Join our cigar-smoking chimp in the most sophisticated crypto community!',
    images: ['/images/soba-twitter.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
} 