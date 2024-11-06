'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Copy, ExternalLink, ArrowRight, Moon, Sun, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

export default function BurnsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [burnWalletBalance, setBurnWalletBalance] = useState(74779668.51)
  const [totalBurned, setTotalBurned] = useState(74779668.51)
  const [nextBurnDate, setNextBurnDate] = useState(new Date('2024-12-01'))
  const [timeUntilNextBurn, setTimeUntilNextBurn] = useState('')
  const [burnHistory, setBurnHistory] = useState([
    { date: '2024-11-01', amount: 1000000, txHash: '0x123...abc' },
    { date: '2024-10-01', amount: 950000, txHash: '0x456...def' },
    { date: '2024-09-01', amount: 900000, txHash: '0x789...ghi' },
    { date: '2024-08-01', amount: 850000, txHash: '0xabc...123' },
    { date: '2024-07-01', amount: 800000, txHash: '0xdef...456' },
    { date: '2024-06-01', amount: 750000, txHash: '0xghi...789' },
  ])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeDiff = nextBurnDate.getTime() - now.getTime()
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
      setTimeUntilNextBurn(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [nextBurnDate])

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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You might want to add a toast notification here
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <div className="backdrop-blur-md bg-black bg-opacity-50 min-h-screen">
        {/* Header */}
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
              <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Home</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">White Paper</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Community</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                Buy $SOBA
                <ArrowRight className="w-4 h-4" />
              </Button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-orange-500 text-white"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            $SOBA Burns
          </motion.h1>
          <motion.p 
            className="text-xl text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Witness the power of scarcity as we reduce supply through regular token burns.
          </motion.p>

          {/* Burn Wallet Overview */}
          <Card className="mb-12 bg-gray-900 bg-opacity-50 border-orange-500/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Burn Wallet</CardTitle>
              <CardDescription className="text-orange-300/80">
                All burned tokens are sent to this address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-orange-400">Address:</span>
                <div className="flex items-center bg-gray-800 rounded-lg p-2">
                  <span className="mr-2 font-mono text-orange-300">0x1234...5678</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard('0x1234...5678')}
                          className="hover:bg-orange-500/20"
                        >
                          <Copy className="h-4 w-4 text-orange-400" />
                          <span className="sr-only">Copy address</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-orange-400">Balance:</span>
                <span className="text-2xl font-bold text-orange-300">{formatNumber(burnWalletBalance)} $SOBA</span>
              </div>
            </CardContent>
          </Card>

          {/* Burn Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 bg-opacity-50 border-orange-500/50 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-500">Total Burned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-300">{formatNumber(totalBurned)} $SOBA</div>
                <p className="text-orange-400/80 mt-2">Permanently removed from circulation</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 bg-opacity-50 border-orange-500/50 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-500">Next Burn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-300">{timeUntilNextBurn}</div>
                <p className="text-orange-400/80 mt-2">Countdown to {nextBurnDate.toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Burn History Chart and Table */}
          <Card className="mb-12 bg-gray-900 bg-opacity-50 border-orange-500/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Burn History</CardTitle>
              <CardDescription className="text-orange-300/80">
                Historical data of $SOBA burns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={burnHistory.slice().reverse()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FF6B00" />
                    <XAxis dataKey="date" stroke="#FF6B00" />
                    <YAxis stroke="#FF6B00" />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #FF6B00' }}
                      labelStyle={{ color: '#FF6B00' }}
                    />
                    <Line type="monotone" dataKey="amount" stroke="#FF6B00" strokeWidth={2} dot={{ fill: '#FF6B00', r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-400">Date</TableHead>
                    <TableHead className="text-orange-400">Amount Burned</TableHead>
                    <TableHead className="text-orange-400">Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {burnHistory.map((burn, index) => (
                    <TableRow key={index} className="hover:bg-orange-500/10 transition-colors duration-200">
                      <TableCell className="text-orange-300">{burn.date}</TableCell>
                      <TableCell className="text-orange-300">{formatNumber(burn.amount)} $SOBA</TableCell>
                      <TableCell>
                        <Link 
                          href={`https://solscan.io/tx/${burn.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center"
                        >
                          {burn.txHash.slice(0, 6)}...{burn.txHash.slice(-4)}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Send to Burn Wallet Section */}
          <Card className="mb-12 bg-gray-900 bg-opacity-50 border-orange-500/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Contribute to the Burn</CardTitle>
              <CardDescription  className="text-orange-300/80">
                Send your $SOBA tokens to the burn wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-orange-300 mb-4">
                You can contribute to reducing the $SOBA supply by sending tokens directly to the burn wallet. 
                This action is irreversible and will permanently remove the tokens from circulation.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-orange-400">Burn Wallet Address:</span>
                <div className="flex items-center bg-gray-800 rounded-lg p-2">
                  <span className="mr-2 font-mono text-orange-300">0x1234...5678</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard('0x1234...5678')}
                          className="hover:bg-orange-500/20"
                        >
                          <Copy className="h-4 w-4 text-orange-400" />
                          <span className="sr-only">Copy address</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                    Learn How to Burn $SOBA
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-orange-500/50">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-orange-400">How to Burn $SOBA</DialogTitle>
                    <DialogDescription className="text-orange-300">
                      Follow these steps to contribute to the $SOBA burn:
                    </DialogDescription>
                  </DialogHeader>
                  <ol className="list-decimal list-inside text-orange-300 space-y-2">
                    <li>Connect your wallet to a Solana-compatible platform (e.g., Phantom, Solflare)</li>
                    <li>Ensure you have $SOBA tokens and some SOL for transaction fees</li>
                    <li>Copy the burn wallet address: 0x1234...5678</li>
                    <li>Initiate a transfer of $SOBA to the burn wallet address</li>
                    <li>Confirm the transaction and wait for it to be processed</li>
                    <li>Your contribution will be reflected in the next burn update</li>
                  </ol>
                  <p className="text-orange-400 font-semibold mt-4">
                    Warning: This action is irreversible. Only send tokens you intend to permanently remove from circulation.
                  </p>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Burn Impact Visualization */}
          <Card className="mb-12 bg-gray-900 bg-opacity-50 border-orange-500/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Burn Impact</CardTitle>
              <CardDescription className="text-orange-300/80">
                Visualizing the effect of burns on total supply
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                      Burned
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-orange-300">
                      {((totalBurned / 1000000000) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                  <motion.div 
                    style={{ width: `${(totalBurned / 1000000000) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalBurned / 1000000000) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <p className="text-orange-300 mt-4">
                As more $SOBA tokens are burned, the total supply decreases, potentially increasing the value of remaining tokens.
              </p>
            </CardContent>
          </Card>
        </main>

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
                  <Flame size={24} />
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