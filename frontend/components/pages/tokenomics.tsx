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
import { TOKENOMICS_CONTENT, BURN_INFO } from '@/constants'
import { ButtonBase } from '@/components/ui/button-base'
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { type MetricItems, MetricItem } from '@/types'
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

interface MetricsData {
  TOTAL_SUPPLY: MetricItem
  CIRCULATING: MetricItem
  BURNED: MetricItem
  FOUNDER: MetricItem
  HOLDERS: MetricItem
  PRICE: MetricItem
}

type MetricKey = 'TOTAL_SUPPLY' | 'CIRCULATING' | 'BURNED' | 'FOUNDER' | 'HOLDERS' | 'PRICE'

export default function TokenomicsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num)
  }

  const formatPercent = (value: number, total: number) => {
    return Math.round((value / total) * 100) + '%'
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
  const getMetrics = (): MetricsData => {
    if (!tokenStats) {
      return TOKENOMICS_CONTENT.METRICS.ITEMS as MetricsData;
    }

    return {
      TOTAL_SUPPLY: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.TOTAL_SUPPLY,
        VALUE: tokenStats.totalSupply,
        PREFIX: '',
        SUFFIX: ' SOBA'
      },
      CIRCULATING: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.CIRCULATING,
        VALUE: tokenStats.circulatingSupply,
        PREFIX: '',
        SUFFIX: ' SOBA',
        PERCENTAGE: true
      },
      BURNED: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.BURNED,
        VALUE: tokenStats.burnedTokens,
        PREFIX: '',
        SUFFIX: ' SOBA',
        PERCENTAGE: true
      },
      FOUNDER: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.FOUNDER,
        VALUE: tokenStats.founderBalance,
        PREFIX: '',
        SUFFIX: ' SOBA',
        PERCENTAGE: true
      },
      HOLDERS: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.HOLDERS,
        VALUE: tokenStats.holders,
        PREFIX: '',
        SUFFIX: ' holders'
      },
      PRICE: {
        ...TOKENOMICS_CONTENT.METRICS.ITEMS.PRICE,
        VALUE: tokenStats.price,
        PREFIX: '$',
        SUFFIX: ''
      }
    };
  };

  // Calculate supply distribution
  const getSupplyData = () => {
    const totalSupply = tokenStats?.totalSupply || TOKENOMICS_CONTENT.METRICS.ITEMS.TOTAL_SUPPLY.VALUE;
    const circulatingSupply = tokenStats?.circulatingSupply || TOKENOMICS_CONTENT.METRICS.ITEMS.CIRCULATING.VALUE;
    const founderBalance = tokenStats?.founderBalance || TOKENOMICS_CONTENT.METRICS.ITEMS.FOUNDER.VALUE;
    const burnedSupply = tokenStats?.burnedTokens || BURN_INFO.TOTAL_BURNED;

    const calculatePercentage = (value: number) => (value / totalSupply) * 100;

    return [
      {
        label: 'Circulating Supply',
        value: circulatingSupply,
        percentage: calculatePercentage(circulatingSupply).toFixed(2),
        color: '#FF6B00'
      },
      {
        label: 'Founder Holding',
        value: founderBalance,
        percentage: calculatePercentage(founderBalance).toFixed(2),
        color: '#FF8C00'
      },
      {
        label: 'Burned Supply',
        value: burnedSupply,
        percentage: calculatePercentage(burnedSupply).toFixed(2),
        color: '#FFA500'
      }
    ];
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 p-4 rounded-lg border border-orange-500/20">
          <p className="text-orange-500 font-semibold">{data.label}</p>
          <p className="text-white">{formatNumber(data.value)} SOBA</p>
          <p className="text-orange-400/80">{data.percentage}% of total supply</p>
        </div>
      )
    }
    return null
  }

  const getMetricValue = (metric: MetricKey) => {
    const value = getMetrics()[metric].VALUE;
    const totalSupply = tokenStats?.totalSupply || TOKENOMICS_CONTENT.METRICS.ITEMS.TOTAL_SUPPLY.VALUE;
    
    if (metric === 'PRICE') {
      // Format price with 12 decimals and remove trailing zeros
      const formattedPrice = value.toFixed(12).replace(/\.?0+$/, '');
      return `$${formattedPrice}`;
    }
    
    if (['TOTAL_SUPPLY', 'HOLDERS'].includes(metric)) {
      return formatNumber(value);
    }
    
    const percentage = ((value / totalSupply) * 100).toFixed(2);
    return `${formatNumber(value)} (${percentage}%)`;
  };

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
              <h1 className="text-4xl font-bold mb-4 gradient-text text-[#FF6B00]">
                How $SOBA Works
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
                Simple, fair, and fun - just like us!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Token Distribution Chart */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <Card className="mb-12 bg-[#111] border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-gray-300">
                  {TOKENOMICS_CONTENT.DISTRIBUTION.TITLE}
                </CardTitle>
                <CardDescription className="text-gray-400">
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
                        {new Intl.NumberFormat().format(item.value)} ({item.percentage}%)
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
                  {entry.label}: {entry.value} ({entry.percentage}%) 
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Token Metrics Grid */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariant}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4 gradient-text">
                SOBA Tokenomics
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Understanding the economic model behind SOBA
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {Object.entries(getMetrics()).map(([key, metric]) => (
                <Card 
                  key={key}
                  className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 relative overflow-hidden group hover:border-orange-500/40 transition-all duration-300"
                  onMouseEnter={() => setHoveredMetric(key)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  onClick={() => openDialog(metric.TITLE, getMetricDetails(key as MetricKey))}
                >
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center gap-2">
                      {metric.ICON && <metric.ICON className="text-orange-500" />}{metric.TITLE}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {metric.DESCRIPTION}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">
                      {getMetricValue(key as MetricKey)}
                    </div>
                    {metric.PERCENTAGE && (
                      <div className="text-sm text-orange-400/80 mt-1">
                        {formatPercent(metric.VALUE, tokenStats?.totalSupply || TOKENOMICS_CONTENT.METRICS.ITEMS.TOTAL_SUPPLY.VALUE)} of total supply
                      </div>
                    )}
                  </CardContent>
                  <motion.div
                    className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={hoveredMetric === key ? { scale: 1.05 } : { scale: 1 }}
                  />
                </Card>
              ))}
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* Tokenomics Features */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <Card className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="text-orange-500" />
                    <span className="text-orange-400">Deflationary Model</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Regular token burns reduce supply and increase scarcity
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-orange-500" />
                    <span className="text-orange-400">Fair Distribution</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Transparent allocation across different segments
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="text-orange-500" />
                    <span className="text-orange-400">Liquidity Burnt</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    All liquidity has been smoked to ashes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="text-orange-500" />
                    <span className="text-orange-400">Community Driven</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Governance and decision making by token holders
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="text-orange-500" />
                    <span className="text-orange-400">Regular Burns</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Monthly burns to maintain deflationary pressure
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-black/60 to-neutral-900/80 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="text-orange-500" />
                    <span className="text-orange-400">Transparent Supply</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Real-time tracking of token metrics
                  </CardDescription>
                </CardHeader>
              </Card>
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
