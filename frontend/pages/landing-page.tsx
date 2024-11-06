import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Copy, Flame, TrendingUp, Users, Zap, Moon, Sun, ChevronDown, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LandingPage() {
  const [burnedTokens, setBurnedTokens] = useState(0)
  const [burnedValue, setBurnedValue] = useState(0)
  const [hoveredDex, setHoveredDex] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const dexButtons = [
    { name: 'CoinGecko', color: 'bg-orange-500' },
    { name: 'DexTools', color: 'bg-orange-500' },
    { name: 'DexScreener', color: 'bg-orange-500' },
    { name: 'Toobit', color: 'bg-orange-500' },
    { name: 'CoinPaprika', color: 'bg-orange-500' },
    { name: 'CoinRanking', color: 'bg-orange-500' },
    { name: 'CoinMarketCap', color: 'bg-orange-500' },
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
    <div className="min-h-screen bg-black text-white">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <div className="backdrop-blur-md bg-black bg-opacity-50 min-h-screen">
        {/* Hero Section */}
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-8">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_256x256-ncAT5qaZrGhObqpoOr5sQQ2Dj5huL2.png" 
              alt="Sol Bastard Logo" 
              width={100} 
              height={100} 
              className="w-24 h-auto" 
            />
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">White Paper</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Community</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
              <Link href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Buy $SOBA
              </Link>
            </div>
          </nav>
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
        </header>

        {/* Contract Address & Listings Section */}
        <section className="py-8 backdrop-blur-lg bg-black bg-opacity-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-8">
              <div className="mb-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center">$SOBA Contract Address</h2>
                <div className="flex items-center bg-gray-800 rounded-full p-2">
                  <span className="mr-2 truncate flex-grow">25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8</span>
                  <motion.button 
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy size={20} />
                  </motion.button>
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
                      className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    >
                      {dex.name}
                    </Link>
                    {hoveredDex === dex.name && (
                      <motion.div
                        className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
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

        {/* Footer */}
        <footer className="py-8 backdrop-blur-lg bg-black bg-opacity-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">White Paper</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">Roadmap</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <Zap size={24} />
                </Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2h-19C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM5 19.5v-13c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v13c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5z"></path><path d="M12 6l-4 4h3v4h2v-4h3l-4-4z"></path></svg>
                </Link>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Sol Bastard. All rights reserved.</p>
              <a href="mailto:contact@solbastardsoba.com" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                contact@solbastardsoba.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}