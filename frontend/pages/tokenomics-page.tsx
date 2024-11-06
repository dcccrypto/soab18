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
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-orange-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        $SOBA Tokenomics
      </motion.h1>
      {/* Rest of the content remains the same but remove header/footer sections */}
    </div>
  )
}