"use client"

import * as React from 'react'
import dynamic from 'next/dynamic'
import { ClientOnly } from '@/components/client-only'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Flame, Copy, ExternalLink, TrendingUp, Clock, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { BurnChart } from '@/components/burns/BurnChart'
import { BURN_INFO, BURN_SECTIONS } from '@/constants'
import { formatNumber } from '@/lib/utils'
import { useTokenStats } from '@/hooks/useTokenStats'
import Image from 'next/image'
import { Header } from '@/components/Header'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { formatDateToCst, getTimeUntilNextBurn, getNextBurnDate } from '@/lib/dateUtils'

const SOBA_QUOTES = [
  "Time to make $SOBA more exclusive! 🔥",
  "Another premium burn event! 💨",
  "Making $SOBA rarer, like a fine cigar! 🚬",
  "Less $SOBA = More Prestige! 💎",
  "This month's cigar lounge burn is ready! 🔥",
  "Mark your calendars - premium burn incoming! 📅",
  "Join the exclusive burn ceremony! 🎩"
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

export default function BurnsPage() {
  const { data: tokenStats, isLoading } = useTokenStats()
  const [timeUntilNextBurn, setTimeUntilNextBurn] = useState('')
  const [nextBurnDateDisplay, setNextBurnDateDisplay] = useState('')
  const [showQuote, setShowQuote] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const burnStats = {
    burnedTokens: BURN_INFO.TOTAL_BURNED || 0,
    burnRate: tokenStats?.burnRate || 0,
    burnedValue: tokenStats?.toBeBurnedValue || 0,
    nextBurnDate: tokenStats?.lastUpdated ? new Date(tokenStats.lastUpdated) : new Date()
  }

  const { burnedTokens, burnRate, burnedValue } = burnStats

  useEffect(() => {
    const interval = setInterval(() => {
      setShowQuote(true)
      setCurrentQuote((prev) => (prev + 1) % SOBA_QUOTES.length)
      setTimeout(() => setShowQuote(false), 3000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateBurnInfo = () => {
      const timeLeft = getTimeUntilNextBurn()
      const nextBurn = getNextBurnDate()

      const formattedDays = String(timeLeft.days).padStart(2, '0')
      const formattedHours = String(timeLeft.hours).padStart(2, '0')
      const formattedMinutes = String(timeLeft.minutes).padStart(2, '0')
      const formattedSeconds = String(timeLeft.seconds).padStart(2, '0')

      setTimeUntilNextBurn(`${formattedDays}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`)
      setNextBurnDateDisplay(formatDateToCst(nextBurn))
    }

    updateBurnInfo()
    const interval = setInterval(updateBurnInfo, 1000)
    return () => clearInterval(interval)
  }, [])

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
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
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

  // Add loading state
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="min-h-[70vh] pt-16 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
        <motion.div 
          className="absolute inset-0 z-[1]"
          style={{ y: heroY }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/burnpagebg.png"
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
            <h1 className="text-5xl font-bold mb-6 text-center gradient-text text-[#FF6B00]">
              {BURN_SECTIONS.HERO.TITLE}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
              {BURN_SECTIONS.HERO.SUBTITLE}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            SOBA Burn Tracker
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track the deflationary mechanism of SOBA in real-time. Every burn makes your SOBA more valuable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-black/40 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-gray-300 flex items-center gap-2">
                <Flame className="text-orange-500" />
                Tokens Burned
              </CardTitle>
              <CardDescription className="text-gray-400">
                Total SOBA removed from circulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400">
                {formatNumber(burnedTokens)} SOBA
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-gray-300 flex items-center gap-2">
                <TrendingUp className="text-green-500" />
                Burn Rate
              </CardTitle>
              <CardDescription className="text-gray-400">
                Current burn velocity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {formatNumber(burnRate)}/day
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-gray-300 flex items-center gap-2">
                <Clock className="text-orange-500" />
                Next Burn
              </CardTitle>
              <CardDescription className="text-gray-400">
                {nextBurnDateDisplay}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400 font-mono">
                {timeUntilNextBurn}
              </div>
            </CardContent>
          </Card>
        </div>

        <main className="space-y-8">
          {/* Floating Quote Animation */}
          <AnimatePresence mode="wait">
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 right-8 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg z-50"
              >
                <p className="text-lg font-bold">{SOBA_QUOTES[currentQuote]}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Burn Card with Enhanced Animation */}
          <ScrollAnimatedSection>
            <Card className="bg-gradient-to-br from-orange-500/10 to-black/40 border-orange-500/20 overflow-hidden">
              <CardContent className="p-8">
                <motion.div 
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-orange-500">{BURN_INFO.NEXT_BURN.EVENT_NAME}</h3>
                        <p className="text-xl text-orange-300/80">{timeUntilNextBurn}</p>
                        <p className="text-sm text-gray-400 mt-1">{BURN_INFO.NEXT_BURN.DESCRIPTION}</p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white group relative overflow-hidden"
                      onClick={() => window.location.href = '#contribute'}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Contribute to Burn
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </div>

                  {/* Collection Progress */}
                  <div className="space-y-6 bg-black/20 rounded-xl p-6 border border-orange-500/10">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Tokens Collected</p>
                        <div className="flex items-end gap-2">
                          <p className="text-xl font-bold text-orange-500">
                            <AnimatedNumber value={tokenStats?.toBeBurnedTokens || 0} />
                            <span className="ml-2">SOBA</span>
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Current Value</p>
                        <p className="text-xl font-bold text-green-500">
                          ${formatNumber(burnedValue || 0, 2)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-orange-500/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateTimeProgress()}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 relative"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:1rem_1rem] animate-[shimmer_2s_linear_infinite]" />
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-orange-400">Time until December Mega Burn: {timeUntilNextBurn}</p>
                        <p className="text-gray-400">{nextBurnDateDisplay}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </ScrollAnimatedSection>

          {/* Chart Section */}
          <ScrollAnimatedSection>
            <Card className="mb-12 bg-black/40 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-500">
                  Burn Analytics
                </CardTitle>
                <CardDescription className="text-orange-300/80">
                  Historical visualization of $SOBA burns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BurnChart />
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
          {/* Contribute Section - Moved Above History */}
          <ScrollAnimatedSection>
            <Card className="mb-12 bg-gradient-to-br from-orange-500/10 to-black/40 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-500 flex items-center gap-2">
                  <Flame className="w-6 h-6 animate-pulse" />
                  {BURN_SECTIONS.CONTRIBUTE.TITLE}
                </CardTitle>
                <CardDescription className="text-orange-300/80">
                  {BURN_SECTIONS.CONTRIBUTE.DESCRIPTION}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <code className="text-orange-400 flex-1 font-mono">{BURN_INFO.BURN_WALLET}</code>
                    <TooltipProviderComponent>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-orange-500/20"
                            onClick={() => navigator.clipboard.writeText(BURN_INFO.BURN_WALLET)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy to clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProviderComponent>
                  </div>
                  <div className="space-y-4">
                    {BURN_SECTIONS.CONTRIBUTE.STEPS.map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex gap-4 items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          {index + 1}
                        </span>
                        <p className="text-gray-300 group-hover:text-orange-300 transition-colors">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
          {/* History Section - Moved Below Contribute */}
          <ScrollAnimatedSection children={
            <div>
              {/* ... existing history section ... */}
            </div>
          }>
          </ScrollAnimatedSection>
          
        </main>
      </div>
    </div>
  )
};

