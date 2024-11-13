'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Flame, TrendingUp, Users, ChevronDown } from 'lucide-react'
import { CONTRACT_ADDRESS, DEX_LINKS, TOKEN_INFO, ASSETS, NAV_LINKS, ICON_SIZES } from '../constants'

export default function LandingPage() {
  const [burnedTokens, setBurnedTokens] = useState(Number(TOKEN_INFO.BURNED_TOKENS.replace(/,/g, '')))
  const [burnedValue, setBurnedValue] = useState(0)
  const [hoveredDex, setHoveredDex] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Simulating live data updates
    const interval = setInterval(() => {
      setBurnedTokens(prev => prev + Math.floor(Math.random() * 100))
      setBurnedValue(prev => prev + Math.floor(Math.random() * 10))
    }, 5000)

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
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 165, 0, 0.05)';

      particles.forEach(particle => {
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

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={ASSETS.LOGO}
              alt="SOBA Logo"
              width={ASSETS.LOGO_DIMENSIONS.width}
              height={ASSETS.LOGO_DIMENSIONS.height}
              className="mx-auto mb-8"
            />
          </motion.div>
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to $SOBA
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join the most rebellious, community-driven memecoin on Solana
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href={NAV_LINKS.WHITEPAPER} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Explore White Paper
            </Link>
            <Link href={NAV_LINKS.COMMUNITY} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Join the Community
            </Link>
            <Link href="#dex-section" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Buy $SOBA
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DEX Section */}
      <section id="dex-section" className="py-8 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-2 text-center">$SOBA Contract Address</h2>
              <div className="flex items-center bg-gray-800 rounded-full p-2">
                <span className="mr-2 truncate flex-grow">{CONTRACT_ADDRESS}</span>
                <motion.button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
                >
                  <Copy size={ICON_SIZES.SOCIAL.width} />
                </motion.button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {DEX_LINKS.map((dex) => (
                <motion.div
                  key={dex.name}
                  className="relative"
                  onMouseEnter={() => setHoveredDex(dex.name)}
                  onMouseLeave={() => setHoveredDex(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={dex.href}
                    className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Image
                      src={dex.icon}
                      alt={`${dex.name} logo`}
                      width={ICON_SIZES.SOCIAL.width}
                      height={ICON_SIZES.SOCIAL.height}
                      className="w-6 h-6"
                    />
                    <span>{dex.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}