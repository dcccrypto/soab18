"use client"

import { useBurnStats } from '@/hooks/useBurnStats'
import { motion, AnimatePresence } from 'framer-motion'

// Add animated number component
const AnimatedNumber = ({ value, duration = 1 }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.4 }
      }}
      className="inline-block"
    >
      {value}
    </motion.span>
  )
}

export default function Burns() {
  // Update burn stats display with animations
  return (
    // ... existing code ...
    <div className="text-xl font-bold text-orange-500">
      <AnimatedNumber value={formatNumber(burnedTokens)} />
      <span className="ml-2">SOBA</span>
    </div>
    // ... rest of the code ...
  )
} 