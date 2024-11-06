"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Flame, Users, Zap, Lock, ArrowRight, ChevronDown, Moon, Sun, Info, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Token data
const tokenData = {
  total: 1_000_000_000,
  circulating: 925_220_331.49,
  burned: 74_779_668.51,
  founder: 41_080_000
}

const additionalMetrics = {
  holders: 2_289
}

const chartData = [
  { name: 'Circulating Supply', value: tokenData.circulating, color: '#FF6B00' },
  { name: 'Burned Tokens', value: tokenData.burned, color: '#FF8C00' },
  { name: 'Founder Holdings', value: tokenData.founder, color: '#FFA500' }
]

export default function TokenomicsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercent = (value: number) => {
    return ((value / tokenData.total) * 100).toFixed(2) + '%'
  }

  const getMetricDetails = (metric: string) => {
    switch(metric) {
      case 'total':
        return "The original total supply of $SOBA tokens at launch"
      case 'circulating':
        return "Current $SOBA tokens in circulation, excluding burned tokens and founder holdings"
      case 'burned':
        return "Tokens permanently removed from circulation to increase scarcity"
      case 'founder':
        return "Tokens held by Crypto Bastard, accumulated through community engagement and project development"
      default:
        return ""
    }
  }

  const openDialog = (title: string, description: string) => {
    setDialogContent({ title, description })
    setIsDialogOpen(true)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`backdrop-blur-md ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} min-h-screen`}>
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-8">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-DBqVkxZx-T3IBDgcc0UVW81J7xogS5cUSXwPGrR.png" 
              alt="Sol Bastard Logo" 
              width={100} 
              height={100} 
              className="w-24 h-auto" 
            />
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Home</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">White Paper</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Community</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Roadmap</Link>
              <Button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center gap-2">
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
          <h1 className="text-5xl font-bold mb-6 text-center">$SOBA Tokenomics</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Discover the economic model behind $SOBA, designed for fairness, transparency, and community empowerment.
          </p>

          {/* Token Distribution Chart */}
          <Card className="mb-12 bg-[#111] border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Token Distribution</CardTitle>
              <CardDescription className="text-orange-300/80">
                Current distribution of $SOBA tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      innerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                          stroke={activeIndex === index ? '#fff' : 'none'}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload[0]) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-[#111] border border-orange-900/50 p-3 rounded-lg shadow-xl">
                              <p className="text-orange-500 font-bold">{data.name}</p>
                              <p className="text-orange-300">{formatNumber(data.value)} tokens</p>
                              <p className="text-orange-300">{formatPercent(data.value)}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex justify-center gap-8 mb-12">
            {chartData.map((entry, index) => (
              <motion.div
                key={entry.name}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                animate={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.5 }}
              >
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-orange-300 font-medium">{entry.name}</span>
                <span className="text-orange-400 font-bold">{formatPercent(entry.value)}</span>
              </motion.div>
            ))}
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {Object.entries(tokenData).map(([key, value]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredMetric(key)}
                onHoverEnd={() => setHoveredMetric(null)}
              >
                <Card className="bg-[#111] border-orange-900/50 relative overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-orange-500 capitalize">
                      {key.replace('_', ' ')} Supply
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-orange-400">
                        {key === 'founder' ? formatPercent(value) : formatNumber(value)}
                      </div>
                      <div className="text-sm text-orange-300/80">
                        {key === 'founder' ? 'Held by Crypto Bastard' : '$SOBA tokens'}
                      </div>
                      {key === 'founder' && (
                        <div className="text-xs text-orange-300/60">
                          Accumulated through project growth
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {hoveredMetric === key && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute inset-0 bg-[#111]/95 p-4 flex items-center justify-center"
                        >
                          <div className="text-center space-y-2">
                            <Info className="w-6 h-6 text-orange-500 mx-auto" />
                            <p className="text-orange-300 text-sm">{getMetricDetails(key)}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            <Card className="bg-[#111] border-orange-900/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-orange-500">Total Holders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-400">{formatNumber(additionalMetrics.holders)}</div>
                <div className="text-sm text-orange-300/80">Unique wallet addresses</div>
              </CardContent>
            </Card>
          </div>

          

          {/* Tokenomics Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <motion.div
              className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("Fair Launch", "Sol Bastard ($SOBA) had a fair launch on Pump.fun, ensuring that everyone had an equal opportunity to invest from the start. This approach aligns with our commitment to fairness and community empowerment.")}
            >
              <div className="flex items-center mb-4">
                <Flame className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Fair Launch</h3>
              </div>
              <p className="text-orange-300">Equal opportunity for all participants</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("Community-Driven", "The $SOBA community is at the heart of our project. We actively engage with our community through various social media platforms and involve them in key decisions, fostering a sense of ownership and shared success.")}
            >
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Community-Driven</h3>
              </div>
              <p className="text-orange-300">Active engagement and decision-making</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("Deflationary Model", "Our token burning mechanism regularly reduces the total supply of $SOBA, creating a deflationary effect. This approach aims to increase the scarcity and potential value of $SOBA over time.")}
            >
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Deflationary Model</h3>
              </div>
              <p className="text-orange-300">Regular token burns to reduce supply</p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("Liquidity Security", "All liquidity for $SOBA has been permanently burned. This action enhances the token's stability and builds trust within our community by preventing rug pulls and ensuring long-term viability.")}
            >
              <div className="flex items-center mb-4">
                <Lock className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Liquidity Security</h3>
              </div>
              <p className="text-orange-300">All liquidity permanently burned</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("Transparency", "We believe in full transparency. The initial developer allocation has been completely redistributed, demonstrating our commitment to a fair and community-driven project. Our current holdings are a result of active participation and project growth.")}
            >
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Transparency</h3>
              </div>
              <p className="text-orange-300">Open communication and fair practices</p>
            </motion.div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-orange-400">Ready to Join the $SOBA Revolution?</h2>
            <p className="text-xl mb-8 text-orange-300">Be part of our community-driven journey and experience the future of memecoins.</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold text-lg px-8 py-4 rounded-full transition-colors duration-300 flex items-center gap-2">
                Buy $SOBA Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="text-[#FF6B00] border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white text-lg px-8 py-4 rounded-full">
                Join Our Community
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 backdrop-blur-lg bg-[#111] bg-opacity-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">White Paper</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">Roadmap</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Community</Link>
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

        {/* Dialog for Tokenomics Features */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#111] text-white border-orange-500">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-orange-400">{dialogContent.title}</DialogTitle>
              <DialogDescription>
                <p className="text-gray-300">{dialogContent.description}</p>
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white">Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}