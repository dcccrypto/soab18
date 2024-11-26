import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Copy, Flame, TrendingUp, Users, ChevronDown, Image as ImageIcon, BookOpen, ArrowRight, Check, Upload, ChevronLeft, ChevronRight, MessageCircle, Share2 } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { ErrorBoundary } from '../components/ErrorBoundary'
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
  SOCIAL_LINKS
} from '@/constants'
import { Header } from '@/components/Header'
import { ContractAddress } from '@/components/ContractAddress'
import { ButtonBase } from '@/components/ui/button-base'
import { SubmitMemeModal } from '@/components/SubmitMemeModal'
import { formatNumber } from '@/lib/utils'
import fetcher from '@/lib/fetcher'
import { ApiTest } from '@/components/ApiTest'

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

export default function LandingPage() {
  const { burnedTokens, burnedValue } = useBurnStats()
  const [hoveredDex, setHoveredDex] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const { scrollY } = useScroll()
  const [isMemeModalOpen, setIsMemeModalOpen] = useState(false)
  
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
      question: "What is Sol Bastard ($SOBA)?",
      answer: "Sol Bastard ($SOBA) is a community-driven memecoin on the Solana blockchain. It combines the fun and engagement of meme culture with the innovative technology of Solana."
    },
    {
      question: "How can I buy $SOBA tokens?",
      answer: "You can buy $SOBA tokens on various decentralized exchanges (DEXs) that support Solana tokens. Check our 'Buy $SOBA' section for direct links to supported exchanges."
    },
    {
      question: "What makes Sol Bastard unique?",
      answer: "Sol Bastard stands out with its strong community focus, regular token burns to increase scarcity, and innovative features like the upcoming AI-powered PFP generator."
    },
    {
      question: "Is there a maximum supply of $SOBA tokens?",
      answer: "Yes, the total supply of $SOBA tokens is capped at 1 billion. This fixed supply, combined with our regular burn events, helps maintain the token's value over time."
    },
    {
      question: "How can I get involved in the Sol Bastard community?",
      answer: "Join our vibrant community on Telegram, follow us on X (Twitter), and participate in our TikTok challenges. You can also contribute memes to our community gallery!"
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
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text drop-shadow-2xl leading-tight">
                Welcome to the $SOBA Revolution
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
                Join the most rebellious and innovative memecoin on Solana
              </p>
　　 　 　 　 <div className="container mx-auto px-4 py-8">
                <ApiTest />
　　 　 　 　 </div>
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
                    onClick={() => window.location.href = '#buy-soba'}
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
            <div className="card-base p-4 sm:p-8 max-w-4xl mx-auto bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 relative z-10">
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">Contract Address</h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full">
                  <div className="flex items-center justify-center bg-black/20 rounded-xl px-3 sm:px-6 py-3 w-full sm:w-auto">
                    <span className="font-mono text-sm sm:text-lg text-gray-200 break-all">
                      {CONTRACT_ADDRESS}
                    </span>
                  </div>
                  <ButtonBase 
                    variant="outline"
                    size="lg"
                    onClick={handleCopyAddress}
                    className="flex items-center justify-center gap-2 min-w-[160px] hover:bg-orange-500/10 transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </ButtonBase>
                </div>
              </div>
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
                    $SOBA Burn Tracker
                  </h2>
                  <p className="text-gray-400">
                    Tracking our deflationary mechanism in real-time
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
                        <AnimatedNumber value={tokenStats.burnedTokens} />
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
                      ${burnedValue.toLocaleString(undefined, {
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
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Join the Conversation
                </h2>
                <p className="text-gray-400">
                  Stay updated with the latest $SOBA news and community highlights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group"
                >
                  <div className="h-full p-6 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Share2 className="w-5 h-5 text-orange-500" />
                        <h3 className="text-xl font-semibold text-orange-400">X Updates</h3>
                      </div>
                      <Link 
                        href={SOCIAL_LINKS.TWITTER.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        Follow Us
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {SOCIAL_FEED_DATA.X_UPDATES.map((update) => (
                        <div 
                          key={update.id}
                          className="p-4 rounded-lg bg-neutral-900/50 border border-orange-500/10 hover:border-orange-500/20 transition-all duration-300"
                        >
                          <p className="text-gray-300 mb-2">{update.content}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{update.timestamp}</span>
                            <span>{update.engagement} interactions</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group"
                >
                  <div className="h-full p-6 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-orange-500" />
                        <h3 className="text-xl font-semibold text-orange-400">Telegram Highlights</h3>
                      </div>
                      <Link 
                        href={SOCIAL_LINKS.TELEGRAM.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        Join Chat
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {SOCIAL_FEED_DATA.TELEGRAM_HIGHLIGHTS.map((highlight) => (
                        <div 
                          key={highlight.id}
                          className="p-4 rounded-lg bg-neutral-900/50 border border-orange-500/10 hover:border-orange-500/20 transition-all duration-300"
                        >
                          <p className="text-gray-300 mb-2">{highlight.content}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{highlight.author}</span>
                            <span>{highlight.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
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
　　 　 　 　 <div className="relative group">
                <div className="overflow-x-auto overflow-y-hidden scrollbar-none">
                  <div className="flex gap-4 md:gap-6 pb-4 min-w-full">
                    {Object.entries(MEME_IMAGES).map(([key, path], index) => (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        className="flex-shrink-0 w-[280px] md:w-[320px] aspect-square rounded-xl overflow-hidden bg-neutral-900/50 border border-orange-500/20"
                      >
                        <div className="relative w-full h-full group">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5" />
                          <Image
                            src={path}
                            alt={`Community Meme ${index + 1}`}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            unoptimized
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300 flex items-center justify-center">
                            <ButtonBase
                              variant="ghost"
                              size="sm"
                              className="text-white hover:text-orange-400 transition-colors duration-300"
                              onClick={() => window.open(path, '_blank')}
                              aria-label={`View meme ${index + 1}`}
                            >
                              View Full Size
                            </ButtonBase>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scroll Indicators */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ButtonBase
                    variant="ghost"
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                    onClick={() => {
                      const container = document.querySelector('.overflow-x-auto')
                      if (container) {
                        container.scrollBy({ left: -340, behavior: 'smooth' })
                      }
                    }}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </ButtonBase>
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ButtonBase
                    variant="ghost"
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                    onClick={() => {
                      const container = document.querySelector('.overflow-x-auto')
                      if (container) {
                        container.scrollBy({ left: 340, behavior: 'smooth' })
                      }
                    }}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </ButtonBase>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 mt-8">
                <ButtonBase
                  variant="default"
                  size="lg"
                  className="group relative overflow-hidden"
                  onClick={() => setIsMemeModalOpen(true)}
                >
                  <span className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Submit Your Meme
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </ButtonBase>
                <p className="text-sm text-gray-400/90">
                  Share your creativity with the $SOBA community!
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <SubmitMemeModal 
          isOpen={isMemeModalOpen}
          onClose={() => setIsMemeModalOpen(false)}
        />

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