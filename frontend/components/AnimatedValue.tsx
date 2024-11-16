import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedValueProps {
  value: string | number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}

export const AnimatedValue = ({ 
  value, 
  prefix = '', 
  suffix = '',
  className = '',
  duration = 0.4
}: AnimatedValueProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration, ease: "easeOut" }}
        className={`inline-block ${className}`}
      >
        {prefix}{value}{suffix}
      </motion.span>
    </AnimatePresence>
  )
}

export default AnimatedValue 