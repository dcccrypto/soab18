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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })

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
    <div className="container mx-auto px-4 py-12">
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
  )
}