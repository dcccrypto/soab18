"use client"

import dynamic from 'next/dynamic'
import { ClientOnly } from '@/components/client-only'
import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Flame, Users, Lock, Eye, Vote, LineChart, Info, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Header } from '@/components/Header'
import { TOKENOMICS_CONTENT } from '@/constants'
import { ButtonBase } from '@/components/ui/button-base'
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { type MetricItems } from '@/types'
import Image from 'next/image'
import { useTokenStats } from '@/hooks/useTokenStats'
import { AnimatedValue } from '@/components/AnimatedValue'

// Animation variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

// Add these type definitions
type MetricKey = keyof typeof TOKENOMICS_CONTENT.METRICS.ITEMS
type ChartData = typeof TOKENOMICS_CONTENT.DISTRIBUTION.CHART_DATA

// Update the dynamic import to handle Dialog components properly
const DynamicDialog = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.Dialog),
  { ssr: false }
)

const DynamicDialogContent = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogContent),
  { ssr: false }
)

const DynamicDialogHeader = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogHeader),
  { ssr: false }
)

const DynamicDialogTitle = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogTitle),
  { ssr: false }
)

const DynamicDialogDescription = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogDescription),
  { ssr: false }
)

const COLORS = ['#FF6B00', '#FFB800', '#FF3D00']

export default function TokenomicsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercent = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(2) + '%'
  }

  const getMetricDetails = (metric: MetricKey) => {
    return TOKENOMICS_CONTENT.METRICS.ITEMS[metric]?.DESCRIPTION || ""
  }

  const openDialog = (title: string, description: string) => {
    setDialogContent({ title, description })
    setIsDialogOpen(true)
  }

  // Add this for parallax effect
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  // Use our token stats hook
  const { data: tokenStats, isLoading, error } = useTokenStats()

  // Get the latest metrics from API or fallback to static content
  const getMetrics = () => {
    if (!tokenStats) return TOKENOMICS_CONTENT.METRICS.ITEMS;

    return {
      ...TOKENOMICS_CONTENT.METRICS.ITEMS,
      TOTAL_SUPPLY: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.TOTAL_SUPPLY,
        VALUE: tokenStats.totalSupply
      },
      CIRCULATING: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.CIRCULATING,
        VALUE: tokenStats.circulatingSupply
      },
      BURNED: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.BURNED,
        VALUE: tokenStats.toBeBurnedTokens
      },
      HOLDERS: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.HOLDERS,
        VALUE: tokenStats.holders
      },
      TOKEN_PRICE: {
        TITLE: 'Token Price',
        VALUE: tokenStats.price,
        DESCRIPTION: 'Current token price in USD',
        DISPLAY_TYPE: 'price'
      }
    };
  };
  
  // Calculate supply distribution
  const getSupplyData = () => {
    if (!tokenStats) return [...TOKENOMICS_CONTENT.DISTRIBUTION.CHART_DATA];
    
    return [
      {
        label: 'Circulating Supply',
        value: tokenStats.circulatingSupply,
        color: '#FF6B00'
      },
      {
        label: 'Founder Holding',
        value: tokenStats.founderBalance,
        color: '#FF8C00'
      },
      {
        label: 'Burned Supply',
        value: tokenStats.toBeBurnedTokens,
        color: '#FFA500'
      }
    ];
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = tokenStats?.totalSupply || TOKENOMICS_CONTENT.METRICS.ITEMS.TOTAL_SUPPLY.VALUE;
      return (
        <div className="bg-black/90 p-4 rounded-lg border border-orange-500/20">
          <p className="text-orange-500 font-semibold">{data.label}</p>
          <p className="text-white">{formatNumber(data.value)}</p>
          <p className="text-orange-400/80">{formatPercent(data.value, total)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
          <motion.div 
            className="absolute inset-0 z-[1]"
            style={{ y: heroY }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/tokenomicspagebg.png"
                alt="Tokenomics Background"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-400 mb-4">
                {TOKENOMICS_CONTENT.HERO.TITLE}
              </h1>
              <p className="text-xl text-orange-300/80 max-w-3xl mx-auto">
                {TOKENOMICS_CONTENT.HERO.SUBTITLE}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Token Distribution Chart */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <Card className="mb-12 bg-[#111] border-orange-900/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-500">
                  {TOKENOMICS_CONTENT.DISTRIBUTION.TITLE}
                </CardTitle>
                <CardDescription className="text-orange-300/80">
                  {TOKENOMICS_CONTENT.DISTRIBUTION.SUBTITLE}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getSupplyData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getSupplyData().map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-8">
                  {getSupplyData().map((item, index) => (
                    <div 
                      key={item.label}
                      className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-orange-500/10"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-300">{item.label}</span>
                      </div>
                      <span className="text-orange-500 font-mono">
                        {new Intl.NumberFormat().format(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimatedSection>

        {/* Legend */}
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 mb-12">
            {getSupplyData().map((entry, index) => (
              <motion.div
                key={entry.label}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                animate={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.5 }}
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
              >
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-orange-300">
                  {entry.label}: {entry.value}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Token Metrics Grid */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {Object.entries(getMetrics()).map(([key, metric]) => (
                <motion.div
                  key={key}
                  variants={fadeInUpVariant}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 rounded-xl bg-black/20 border border-orange-500/20 transition-colors duration-300
                    ${hoveredMetric === key ? 'bg-black/30' : ''}`}
                  onMouseEnter={() => setHoveredMetric(key)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-orange-400">{metric.TITLE}</h3>
                    {metric.DESCRIPTION && (
                      <ButtonBase
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => openDialog(metric.TITLE, metric.DESCRIPTION)}
                      >
                        <Info className="w-4 h-4 text-orange-500/70" />
                      </ButtonBase>
                    )}
                  </div>
                  <AnimatedValue
                    value={formatNumber(metric.VALUE)}
                    suffix={metric.DISPLAY_TYPE === 'price' ? ' USD' : ' SOBA'}
                    className="text-2xl font-bold"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* Tokenomics Features */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {TOKENOMICS_CONTENT.FEATURES.map((feature) => (
                <motion.div
                  key={feature.TITLE}
                  className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openDialog(feature.TITLE, feature.DESCRIPTION)}
                >
                  <div className="flex items-center mb-4">
                    {feature.ICON === 'Flame' && <Flame className="w-8 h-8 mr-3 text-[#FF6B00]" />}
                    {feature.ICON === 'Users' && <Users className="w-8 h-8 mr-3 text-[#FF6B00]" />}
                    {feature.ICON === 'Lock' && <Lock className="w-8 h-8 mr-3 text-[#FF6B00]" />}
                    {feature.ICON === 'Vote' && <Vote className="w-8 h-8 mr-3 text-[#FF6B00]" />}
                    {feature.ICON === 'LineChart' && <LineChart className="w-8 h-8 mr-3 text-[#FF6B00]" />}
                    <h3 className="text-xl font-bold text-orange-400">{feature.TITLE}</h3>
                  </div>
                  <p className="text-orange-300">{feature.DESCRIPTION}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* CTA Section */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-orange-400">
                {TOKENOMICS_CONTENT.CTA.TITLE}
              </h2>
              <p className="text-xl mb-8 text-orange-300">
                {TOKENOMICS_CONTENT.CTA.SUBTITLE}
              </p>
              <div className="flex justify-center gap-4">
                <ButtonBase
                  variant="default"
                  size="lg"
                  className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold px-8 py-4 rounded-full flex items-center gap-2"
                  onClick={() => window.location.href = TOKENOMICS_CONTENT.CTA.BUTTONS.PRIMARY.URL}
                >
                  {TOKENOMICS_CONTENT.CTA.BUTTONS.PRIMARY.TEXT}
                  <ArrowRight className="w-5 h-5" />
                </ButtonBase>
                <ButtonBase
                  variant="outline"
                  size="lg"
                  className="text-[#FF6B00] border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-8 py-4 rounded-full"
                  onClick={() => window.location.href = TOKENOMICS_CONTENT.CTA.BUTTONS.SECONDARY.URL}
                >
                  {TOKENOMICS_CONTENT.CTA.BUTTONS.SECONDARY.TEXT}
                </ButtonBase>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>
      </main>

      {/* Update Dialog implementation */}
      <ClientOnly>
        <DynamicDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DynamicDialogContent className="bg-[#111] text-white border-orange-500">
            <DynamicDialogHeader>
              <DynamicDialogTitle className="text-2xl font-bold text-orange-400">
                {dialogContent.title}
              </DynamicDialogTitle>
              <DynamicDialogDescription>
                <p className="text-gray-300">{dialogContent.description}</p>
              </DynamicDialogDescription>
            </DynamicDialogHeader>
            <Button 
              onClick={() => setIsDialogOpen(false)} 
              className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white"
            >
              Close
            </Button>
          </DynamicDialogContent>
        </DynamicDialog>
      </ClientOnly>
    </div>
  )
}