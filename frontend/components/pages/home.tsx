"use client"

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Copy, Flame, TrendingUp, Users, ChevronDown, Image as ImageIcon, BookOpen, ArrowRight, Check, Upload, ChevronLeft, ChevronRight, MessageCircle, Share2, X } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useBurnStats } from '@/hooks/useBurnStats'
import useSWR from 'swr'
import { 
  DEX_LINKS,
  CONTRACT_ADDRESS,
  NAV_LINKS,
  ICON_SIZES,
  ASSETS,
  MEME_IMAGES,
  SOCIAL_FEED_DATA,
  SOCIAL_LINKS,
  BURN_INFO
} from '@/constants'
import { Header } from '@/components/Header'
import { ContractAddress } from '@/components/ContractAddress'
import { ButtonBase } from '@/components/ui/button-base'
import { formatNumber } from '@/lib/utils'
import fetcher from '@/lib/fetcher'

interface MemeData {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadDate: string;
  url: string;
}

interface MemeResponse {
  success: boolean;
  message: string;
  data: MemeData[];
}

interface DexLink {
  name: string
  icon: string
  url: string
}

// Add animation variants that we'll reuse
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const pulseVariant = {
  initial: { scale: 1 },
  pulse: {
    scale: 1.02,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

const MEME_COUNT = 8 // We can adjust this based on how many memes to show initially

const BURN_DISPLAY = {
  TOTAL_SUPPLY: 1000000000,
  DISPLAY_DECIMALS: 2
} as const

const NFT_SHOWCASE = [
  { id: 1, image: '/images/nfts/nft1.avif', name: 'SOBA #051', rarity: 'Gold' },
  { id: 2, image: '/images/nfts/nft2.avif', name: 'SOBA #069', rarity: 'Gold' },
  { id: 3, image: '/images/nfts/nft3.avif', name: 'SOBA #094', rarity: 'Gold' },
  { id: 4, image: '/images/nfts/nft4.avif', name: 'SOBA #063', rarity: 'Red-Gem' },
  { id: 5, image: '/images/nfts/nft5.avif', name: 'SOBA #016', rarity: 'Red-Gem' },
  { id: 6, image: '/images/nfts/nft6.avif', name: 'SOBA #060', rarity: 'Red-Gem' },
  { id: 7, image: '/images/nfts/nft7.avif', name: 'SOBA #030', rarity: 'Red-Gem' },
  { id: 8, image: '/images/nfts/nft8.avif', name: 'SOBA #033', rarity: 'Red-Gem' },
  { id: 9, image: '/images/nfts/nft9.avif', name: 'SOBA #097', rarity: 'Red-Gem' },
  { id: 10, image: '/images/nfts/nft10.avif', name: 'SOBA #056', rarity: 'Red-Gem' },
]

// Add this helper function at the top level
const downloadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `soba-meme-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download image:', error);
  }
};

// Near the top of the file, add this constant
const STATIC_MEMES = {
  meme1: '/images/memes/meme1.jpg',
  meme2: '/images/memes/meme2.jpg',
  meme3: '/images/memes/meme3.jpg',
  meme4: '/images/memes/meme4.jpg',
  meme5: '/images/memes/meme5.jpg',
  meme6: '/images/memes/meme6.jpg',
};

export default function LandingPage() {
  const { burnedTokens, burnedValue } = useBurnStats()
  const [hoveredDex, setHoveredDex] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);
  const { scrollY } = useScroll()
  const { data: memeResponse, mutate } = useSWR<MemeResponse>('/api/memes', fetcher)

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const { data: tokenStats, error } = useSWR('/api/token-stats', fetcher, {
    refreshInterval: 30000 // Refresh every 30 seconds
  })

  // Add animated number display
  const AnimatedNumber = ({ value }: { value: number }) => (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block"
    >
      {formatNumber(value)}
    </motion.span>
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      })
    }
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255, 165, 0, 0.05)'

      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas!.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas!.height) particle.speedY *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const faqItems = [
    {
      question: "What's SOBA all about?",
      answer: "SOBA (SOL Bastard) is the fanciest ape in crypto, puffing premium cigars on Solana. We're building a community that loves the finer things in life - like making money and having fun!"
    },
    {
      question: "How do I get SOBA?",
      answer: "Simple! Hit the 'Buy $SOBA' button above, pick your exchange, and join the high rollers. Even if you're new to crypto, we've made it easy to become part of the SOBA lifestyle."
    },
    {
      question: "What makes SOBA special?",
      answer: "Like our cigar-smoking mascot, we've got expensive taste but keep it real. We regularly burn tokens to keep things exclusive, and we're developing some fancy features like an AI tool to turn you into a SOBA-style baller."
    },
    {
      question: "Is there a limit to SOBA tokens?",
      answer: "You bet! We started with 1 billion tokens, but like a fine cigar, that number keeps getting smaller thanks to our regular burns. Scarcity is luxury, baby!"
    },
    {
      question: "How do I join the SOBA lifestyle?",
      answer: "Roll with us on Telegram, flex on X (Twitter), and show off your meme game on TikTok. The SOBA squad welcomes all aspiring ballers - bring your best memes and your finest virtual cigars!"
    }
  ]

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleMemeClick = (url: string) => {
    setSelectedMeme(url);
  };

  const handleCloseFullView = () => {
    setSelectedMeme(null);
  };

  return (
    <div className="min-h-screen gradient-dark text-white">
      <Header />
      
      <main>
        <section className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
          <motion.div 
            className="absolute inset-0 z-[1]"
            style={{ y: heroY }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/landingpagebg.png"
                alt="Landing page background"
                fill
                priority
                className="object-cover object-center opacity-70 transition-opacity duration-700"
                quality={100}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90 transition-all duration-700" />
            </div>
          </motion.div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text drop-shadow-2xl leading-tight text-[#FF6B00]">
                Meet SOBA: The SOL Bastard! 
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
                The richest, smoothest memecoin on Solana, led by a cigar-smoking chimp with expensive taste
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8">
                <motion.div
                  variants={{
                    initial: { scale: 1 },
                    pulse: { 
                      scale: 1.05,
                      transition: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }
                  }}
                  initial="initial"
                  animate="pulse"
                  className="w-full sm:w-auto"
                >
                  <ButtonBase
                    variant="default"
                    size="lg"
                    className="w-full min-w-[200px] font-bold hover:scale-105 transition-transform duration-200 py-4"
                    onClick={() => window.open('https://jup.ag/swap/soba-SOL', '_blank')}
                  >
                    Buy $SOBA
                  </ButtonBase>
                </motion.div>
                <ButtonBase
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px] font-bold hover:scale-105 transition-transform duration-200 py-4"
                  onClick={() => window.location.href = NAV_LINKS.WHITEPAPER}
                >
                  Read Whitepaper
                </ButtonBase>
              </div>
            </motion.div>

            <motion.div 
              className="mt-12 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto px-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(DEX_LINKS).map(([name, { url, icon }]) => (
                <motion.a
                  key={name}
                  variants={fadeInUpVariant}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-base p-3 sm:p-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={icon}
                      alt={`${name} icon`}
                      width={20}
                      height={20}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      unoptimized
                    />
                    <span className="text-xs sm:text-sm font-medium text-orange-400 group-hover:text-orange-300">
                      {name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <ContractAddress address={CONTRACT_ADDRESS} />
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <h2 className="text-3xl font-bold mb-8 md:mb-10 text-center gradient-text">
                $SOBA Chart
              </h2>
              <div className="aspect-[16/9] md:aspect-[21/9] w-full max-w-[1400px] mx-auto relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/20" />
                <div className="absolute inset-0 shadow-[0_0_80px_rgba(255,107,0,0.2)] rounded-xl" />
                <ErrorBoundary fallback={<ChartFallback />}>
                  <iframe 
                    src="https://dexscreener.com/solana/2zjiSTrub1KPtuJzDoRyXcUHFLLC5doUsmStyBi5SjXG?embed=1&theme=dark" 
                    className="absolute top-0 left-0 w-full h-full rounded-xl border border-orange-500/30 hover:border-orange-500/50 transition-colors duration-300 shadow-lg shadow-black/30"
                    title="SOBA Price Chart"
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)] z-0" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariant}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  $SOBA's Digital Art Club
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Get your paws on our exclusive digital collectibles. Each one's unique, just like you!
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                {NFT_SHOWCASE.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1, duration: 0.5 }
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-orange-500/20 group"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 w-full">
                          <p className="text-sm font-semibold">{nft.name}</p>
                          <p className="text-xs text-orange-400">{nft.rarity}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariant}
                className="text-center"
              >
                <Link 
                  href="https://magiceden.io/marketplace/solbastard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  Buy NFTs
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)] z-0" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariant}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Turn Yourself into a $SOBA Legend
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Our AI-powered profile picture maker is coming soon! Soon you'll be able to create your own $SOBA-style avatar and join our wall of fame.
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <motion.div
                  className="card-base p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/10" />
                  <div className="relative z-10">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center border border-orange-500/30">
                        <ImageIcon className="w-12 h-12 text-orange-500/70" />
                      </div>
                      <ButtonBase
                        variant="default"
                        size="lg"
                        disabled={true}
                        className="w-full sm:w-auto opacity-75 cursor-not-allowed"
                      >
                        Generate PFP (Coming Soon)
                      </ButtonBase>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4 gradient-text">
                    $SOBA's Shrinking Supply
                  </h2>
                  <p className="text-gray-400">
                    Watch our token supply get smaller in real-time. Less tokens = more rarity!
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-xl bg-black/40 border border-orange-500/20"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Flame className="w-6 h-6 text-orange-500" />
                      <h3 className="text-lg font-semibold text-gray-300">Tokens Burned</h3>
                    </div>
                    <p className="text-3xl font-bold text-orange-400">
                      {tokenStats ? (
                        <AnimatedNumber value={BURN_INFO.TOTAL_BURNED} />
                      ) : (
                        '...'
                      )} SOBA
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-xl bg-black/40 border border-orange-500/20"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                      <h3 className="text-lg font-semibold text-gray-300">Value Burned</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-400">
                      ${((tokenStats?.price || 0) * BURN_INFO.TOTAL_BURNED).toLocaleString(undefined, {
                        minimumFractionDigits: BURN_DISPLAY.DISPLAY_DECIMALS,
                        maximumFractionDigits: BURN_DISPLAY.DISPLAY_DECIMALS
                      })}
                    </p>
                  </motion.div>
                </div>

                <div className="w-full max-w-2xl mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Burn Progress</span>
                    <span className="text-orange-400">
                      {((burnedTokens / BURN_DISPLAY.TOTAL_SUPPLY) * 100).toFixed(BURN_DISPLAY.DISPLAY_DECIMALS)}%
                    </span>
                  </div>
                  <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-orange-500/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(burnedTokens / BURN_DISPLAY.TOTAL_SUPPLY) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {burnedTokens.toLocaleString(undefined, {
                      minimumFractionDigits: BURN_DISPLAY.DISPLAY_DECIMALS,
                      maximumFractionDigits: BURN_DISPLAY.DISPLAY_DECIMALS
                    })} / {BURN_DISPLAY.TOTAL_SUPPLY.toLocaleString()} SOBA
                  </p>
                </div>

                <Link 
                  href={NAV_LINKS.BURNS}
                  className="group relative"
                >
                  <ButtonBase
                    variant="default"
                    size="lg"
                    className="relative overflow-hidden group"
                  >
                    <span className="flex items-center gap-2">
                      Learn More About Our Burn Strategy
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </ButtonBase>
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <h2 className="text-3xl font-bold mb-8 md:mb-10 text-center gradient-text">
                Community Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Object.entries(STATIC_MEMES).map(([key, path]) => ({
                  id: key,
                  url: path,
                  isStatic: true
                }))].map((meme, index) => (
                  <motion.div
                    key={meme.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square rounded-xl overflow-hidden bg-neutral-900/50 border border-orange-500/20"
                  >
                    <div className="relative w-full h-full group">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5" />
                      <Image
                        src={meme.url}
                        alt={`Community Meme ${index + 1}`}
                        fill
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                        onClick={() => handleMemeClick(meme.url)}
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <ButtonBase
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-orange-400 transition-colors duration-300"
                          onClick={() => handleMemeClick(meme.url)}
                          aria-label={`View meme ${index + 1}`}
                        >
                          View
                        </ButtonBase>
                        <ButtonBase
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-orange-400 transition-colors duration-300"
                          onClick={() => downloadImage(meme.url)}
                          aria-label={`Download meme ${index + 1}`}
                        >
                          Download
                        </ButtonBase>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        {selectedMeme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={handleCloseFullView}
          >
            <div className="relative max-w-5xl w-full h-[85vh] rounded-xl overflow-hidden">
              <ButtonBase
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseFullView();
                }}
                aria-label="Close viewer"
              >
                <X className="w-6 h-6" />
              </ButtonBase>
              <div className="relative w-full h-full">
                <Image
                  src={selectedMeme}
                  alt="Full size meme"
                  fill
                  className="object-contain"
                />
              </div>
              <ButtonBase
                variant="default"
                size="lg"
                className="absolute bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(selectedMeme);
                }}
              >
                Download
              </ButtonBase>
            </div>
          </motion.div>
        )}

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.06)_0%,transparent_75%)]" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center gradient-text">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="card-base overflow-hidden"
                    initial={false}
                  >
                    <motion.button
                      className="flex justify-between items-center w-full text-left p-4 sm:p-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black/30"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      aria-expanded={openFaqIndex === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-semibold text-base sm:text-lg text-orange-400 pr-4">
                        {item.question}
                      </span>
                      <motion.div
                        initial={false}
                        animate={{ 
                          rotate: openFaqIndex === index ? 180 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-orange-400"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {openFaqIndex === index && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="border-t border-orange-500/20"
                        >
                          <motion.div
                            variants={{
                              open: { opacity: 1, y: 0 },
                              collapsed: { opacity: 0, y: -10 }
                            }}
                            transition={{ duration: 0.2 }}
                            className="p-4 sm:p-6 text-sm sm:text-base text-gray-300 leading-relaxed bg-orange-500/5"
                          >
                            {item.answer}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <div className="h-32 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 transition-all duration-700" />
      </main>

      <div className="h-32 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 transition-all duration-700" />
    </div>
  )
}

function ChartFallback() {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-900/90 rounded-lg border border-orange-500/30">
      <p className="text-gray-200">Unable to load chart. Please try again later.</p>
    </div>
  )
}

// Reusable component for scroll-based animations
const ScrollAnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.section
      ref={ref}
      variants={fadeInUpVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-16 relative overflow-hidden"
    >
      {children}
    </motion.section>
  )
}

