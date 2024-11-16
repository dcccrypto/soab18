"use client"

import { useTokenStats } from '@/hooks/useTokenStats' // New hook for real-time data
import { motion, AnimatePresence } from 'framer-motion'

// Add this near the top of the file
const AnimatedValue = ({ value, prefix = '', suffix = '' }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="inline-block"
      >
        {prefix}{value}{suffix}
      </motion.span>
    </AnimatePresence>
  )
}

export default function Tokenomics() {
  const { 
    totalSupply,
    circulatingSupply,
    burnedTokens,
    price,
    holders
  } = useTokenStats()

  // Update the metrics section to use AnimatedValue
  return (
    // ... existing code ...
    <div className="text-3xl font-bold text-orange-400">
      <AnimatedValue 
        value={value.DISPLAY_TYPE === 'percent' 
          ? formatPercent(value.VALUE) 
          : formatNumber(value.VALUE)
        } 
      />
    </div>
    // ... rest of the code ...
  )
} 