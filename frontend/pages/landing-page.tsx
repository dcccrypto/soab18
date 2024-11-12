'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Flame, TrendingUp, Users, ChevronDown, ImageIcon } from 'lucide-react'

export default function LandingPage() {
  const [burnedTokens, setBurnedTokens] = useState(0)
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

  const dexButtons = [
    { name: 'CoinGecko', icon: '/images/assets/icons/coingecko.svg', color: 'bg-orange-500' },
    { name: 'DexTools', icon: '/images/assets/icons/dextools.svg', color: 'bg-orange-500' },
    { name: 'DexScreener', icon: '/images/assets/icons/dexscreener.svg', color: 'bg-orange-500' },
    { name: 'Toobit', icon: '/images/assets/icons/toobit.svg', color: 'bg-orange-500' },
    { name: 'CoinPaprika', icon: '/images/assets/icons/coinpaprika.svg', color: 'bg-orange-500' },
    { name: 'CoinRanking', icon: '/images/assets/icons/coinranking.svg', color: 'bg-orange-500' },
    { name: 'CoinMarketCap', icon: '/images/assets/icons/cmc.svg', color: 'bg-orange-500' },
    { name: 'BitMart', icon: '/images/assets/icons/bitmart.svg', color: 'bg-orange-500' },
  ]

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
      <section className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to the $SOBA Revolution
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
            <Link href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Explore White Paper
            </Link>
            <Link href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Join the Community
            </Link>
            <Link href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Buy $SOBA
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contract Address & Listings Section */}
      <section className="py-8 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-2 text-center">$SOBA Contract Address</h2>
              <div className="flex items-center bg-gray-800 rounded-full p-2">
                <span className="mr-2 truncate flex-grow">25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy size={20} />
                  </motion.button>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {dexButtons.map((dex) => (
                <motion.div
                  key={dex.name}
                  className="relative"
                  onMouseEnter={() => setHoveredDex(dex.name)}
                  onMouseLeave={() => setHoveredDex(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="#" 
                    className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Image
                      src={dex.icon}
                      alt={`${dex.name} logo`}
                      width={24}
                      height={24}
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

      {/* Chart Section */}
      <section className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">$SOBA Chart</h2>
          <div className="relative w-full" style={{ paddingBottom: '65%' }}>
            <iframe 
              src="https://dexscreener.com/solana/2zjiSTrub1KPtuJzDoRyXcUHFLLC5doUsmStyBi5SjXG?embed=1&theme=dark" 
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
        </div>
      </section>

      {/* About Sol Bastard Section */}
      <section className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">About Sol Bastard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="text-orange-400 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Community Driven</h3>
              <p>Our loyal community is the heart of Sol Bastard. Together, we're shaping the future of memecoins.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Flame className="text-orange-500 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Monthly Burns</h3>
              <p>We're committed to transparency and value. Our regular token burns reduce supply and increase scarcity.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TrendingUp className="text-orange-600 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Visionary Project</h3>
              <p>Sol Bastard is here to make waves. We're not just another memecoin; we're a movement.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Burn Tracker Preview */}
      <section className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">$SOBA Burn Tracker</h2>
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">Tokens Burned:</span>
              <motion.span 
                className="text-3xl font-bold text-orange-400"
                key={burnedTokens}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {burnedTokens.toLocaleString()}
              </motion.span>
            </div>
            <div className="flex justify-between items-center mb-6">
              
              <span className="text-2xl font-bold">Value Burned:</span>
              <motion.span 
                className="text-3xl font-bold text-orange-500"
                key={burnedValue}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ${burnedValue.toLocaleString()}
              </motion.span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
              <motion.div 
                className="bg-orange-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((burnedTokens / 1000000) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <Link href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg block text-center">
              Learn More About Our Burn Strategy
            </Link>
          </div>
        </div>
      </section>

      {/* PFP Generator Coming Soon Section */}
      <section id="pfp-generator" className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">PFP Generator</h2>
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
            <ImageIcon className="w-24 h-24 mx-auto mb-4 text-orange-500" />
            <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
            <p className="text-lg mb-6">Get ready to create your unique Sol Bastard profile picture! Our AI-powered PFP generator is under development and will be available soon.</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-not-allowed opacity-50">
              Generate PFP (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      {/* Community Gallery */}
      <section className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Community Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div 
                key={i} 
                className="bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src={`/placeholder.svg?height=200&width=200`} alt={`Community Meme ${i}`} width={200} height={200} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit Your Meme
            </motion.button>
          </div>
        </div>
      </section>

      {/* Social Media Feed & Engagement */}
      <section className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Join the Conversation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-4">Latest from TikTok</h3>
              {/* Placeholder for TikTok feed */}
              <div className="bg-gray-800 bg-opacity-50 h-64 rounded-lg flex items-center justify-center">
                <span className="text-orange-500">TikTok Feed Placeholder</span>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-4">X Updates</h3>
              {/* Placeholder for X (Twitter) feed */}
              <div className="bg-gray-800 bg-opacity-50 h-64 rounded-lg flex items-center justify-center">
                <span className="text-orange-500">X Feed Placeholder</span>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-4">Telegram Highlights</h3>
              {/* Placeholder for Telegram feed */}
              <div className="bg-gray-800 bg-opacity-50 h-64 rounded-lg flex items-center justify-center">
                <span className="text-orange-500">Telegram Feed Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 backdrop-blur-lg bg-black bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="rounded-lg overflow-hidden bg-gray-900 bg-opacity-50 shadow-lg"
                initial={false}
                animate={{ 
                  backgroundColor: openFaqIndex === index 
                    ? 'rgba(45, 55, 72, 0.5)' 
                    : 'rgba(26, 32, 44, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="flex justify-between items-center w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  whileHover={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-semibold text-lg text-orange-400">{item.question}</span>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-orange-400" />
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
                        open: { opacity: 1, height: "auto", marginTop: -1 },
                        collapsed: { opacity: 0, height: 0, marginTop: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="px-6 pb-6"
                    >
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, y: 0 },
                          collapsed: { opacity: 0, y: -10 }
                        }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}