"use client"

import dynamic from 'next/dynamic'
import { ClientOnly } from '@/components/client-only'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Flame, Copy, ExternalLink, TrendingUp, Clock, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { BurnChart } from '@/components/burns/BurnChart'
import { BURN_INFO, BURN_SECTIONS } from '@/constants'
import { formatNumber, formatDate } from '@/lib/utils'
import { useTokenStats } from '@/hooks/useTokenStats'
import Image from 'next/image'
import { Header } from '@/components/Header'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { type Timeframe } from '@/constants/types'
import { BurnHistory } from '@/components/BurnHistory'
import { Progress } from '@/components/ui/progress'

const SOBA_QUOTES = [
  "Time to make SOBA more scarce! ",
  "Every burn makes SOBA stronger! ",
  "Join the burn revolution! ",
  "SOBA getting rarer by the minute! ",
  "Less SOBA = More Value! ",
  "December Mega Burn incoming! ",
  "December 1st - Mark your calendars! "
] as const

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
} as const

const TooltipProviderComponent = dynamic(
  () => import('@/components/ui/tooltip').then(mod => ({
    default: ({ children, ...props }: any) => (
      <ClientOnly>
        <mod.TooltipProvider {...props}>{children}</mod.TooltipProvider>
      </ClientOnly>
    )
  })),
  { ssr: false }
)

const timeframes: Timeframe[] = ['1M', '3M', '6M', '1Y', 'ALL']

export default function BurnsPage() {
  const { data: tokenStats, isLoading } = useTokenStats()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1Y')
  const [showQuote, setShowQuote] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timeUntilNextBurn, setTimeUntilNextBurn] = useState('')
  
  const nextBurnDate = new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)
  const daysUntilNextBurn = Math.ceil(
    (nextBurnDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  // Calculate progress towards next burn
  const calculateBurnProgress = useCallback(() => {
    const now = new Date()
    const lastBurnDate = new Date(BURN_INFO.NEXT_BURN.LAST_BURN_DATE)
    
    const totalDuration = nextBurnDate.getTime() - lastBurnDate.getTime()
    const elapsedDuration = now.getTime() - lastBurnDate.getTime()
    
    const progress = (elapsedDuration / totalDuration) * 100
    return Math.min(Math.max(progress, 0), 100)
  }, [nextBurnDate])

  // Combined useEffect for both canvas and timer
  useEffect(() => {
    // Timer for burn progress
    const timer = setInterval(() => {
      setTimeUntilNextBurn(new Date().toISOString())
    }, 1000)

    // Canvas setup and animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }> = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    }))

    let animationFrameId: number

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255, 165, 0, 0.05)'

      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    animate()

    // Cleanup function
    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, []) // Empty dependency array since we don't need to re-run this effect

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Flame className="w-8 h-8 text-orange-500" />
        </motion.div>
      </div>
    )
  }

  const burnStats = {
    burnedTokens: tokenStats?.toBeBurnedTokens || 0,
    burnRate: tokenStats?.burnRate || 0,
    burnedValue: tokenStats?.toBeBurnedValue || 0,
    lastUpdated: tokenStats?.lastUpdated ? new Date(tokenStats.lastUpdated) : new Date()
  }

  const { burnedTokens, burnRate, burnedValue, lastUpdated } = burnStats

  const calculateTimeProgress = () => {
    const lastBurnDate = new Date(BURN_INFO.NEXT_BURN.LAST_BURN_DATE)
    const nextBurnDate = new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)
    const currentDate = new Date()
    
    const totalDuration = nextBurnDate.getTime() - lastBurnDate.getTime()
    const elapsedDuration = currentDate.getTime() - lastBurnDate.getTime()
    
    return Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100)
  }

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

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main>
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-orange-500" />
                <div>
                  <h2 className="text-2xl font-bold text-orange-500">November 2024 Burn</h2>
                  <p className="text-gray-400">Next burn pending...</p>
                  <p className="text-sm text-gray-500">Monthly token burn</p>
                </div>
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                size="lg"
              >
                Contribute to Burn <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400 mb-1">Tokens Collected</p>
                <p className="text-2xl font-bold text-orange-500">
                  {formatNumber(BURN_INFO.TOTAL_BURNED)} SOBA
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 mb-1">Current Value</p>
                <p className="text-2xl font-bold text-green-500">
                  ${formatNumber(tokenStats?.burnedValue || 0)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Time until December Mega Burn: Next burn pending...
                </span>
                <span className="text-orange-500">Nov 1</span>
              </div>
              <Progress 
                value={calculateBurnProgress()} 
                className="h-2 bg-orange-950/30"
                indicatorClassName="bg-gradient-to-r from-orange-500 to-orange-600"
              />
            </div>
          </div>
        </div>

        <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
          <motion.div 
            className="absolute inset-0 z-[1]"
            style={{ y: heroY }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/burnspagebg.png"
                alt="Burns background"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FF6B00] mb-4">
                $SOBA Token Burns
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Every month, we burn {(BURN_INFO.BURN_RATE / 1000000).toFixed(1)}M $SOBA tokens to increase scarcity and reward our holders.
              </p>
            </motion.div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 shadow-[0_8px_32px_rgba(255,165,0,0.1)] hover:shadow-[0_8px_32px_rgba(255,165,0,0.15)] relative z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.03)_0%,transparent_70%)] rounded-xl" />
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-black/40 rounded-xl border border-orange-500/20">
                    <h3 className="text-lg font-semibold text-[#FF6B00] mb-2">Total Burned</h3>
                    <p className="text-2xl font-bold text-white">
                      {(BURN_INFO.TOTAL_BURNED / 1000000).toFixed(1)}M SOBA
                    </p>
                  </div>
                  <div className="p-6 bg-black/40 rounded-xl border border-orange-500/20">
                    <h3 className="text-lg font-semibold text-[#FF6B00] mb-2">Next Burn</h3>
                    <p className="text-2xl font-bold text-white">
                      {(BURN_INFO.BURN_RATE / 1000000).toFixed(1)}M SOBA
                    </p>
                    <p className="text-sm text-white/80 mt-1">
                      in {daysUntilNextBurn} days
                    </p>
                  </div>
                  <div className="p-6 bg-black/40 rounded-xl border border-orange-500/20">
                    <h3 className="text-lg font-semibold text-[#FF6B00] mb-2">Burn Schedule</h3>
                    <p className="text-2xl font-bold text-white">
                      {BURN_INFO.BURN_SCHEDULE}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#FF6B00]">Burn History</h2>
                    <div className="flex gap-2">
                      {timeframes.map((tf: Timeframe) => (
                        <Button
                          key={tf}
                          variant={selectedTimeframe === tf ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedTimeframe(tf)}
                          className={`min-w-[60px] ${
                            selectedTimeframe === tf 
                              ? 'bg-[#FF6B00] hover:bg-[#FF8C00] text-white' 
                              : 'text-white/90 border-orange-500/20 hover:border-orange-500/40'
                          }`}
                        >
                          {tf}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[400px] w-full">
                    <BurnChart timeframe={selectedTimeframe} />
                  </div>

                  <div className="mt-8">
                    <BurnHistory />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>
      </main>

      <div className="h-32 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 transition-all duration-700" />
    </div>
  )
}