import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { fadeInUpVariant } from '@/lib/animations'

interface ScrollAnimatedSectionProps {
  children: React.ReactNode
  className?: string
}

export const ScrollAnimatedSection = ({ children, className = '' }: ScrollAnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.section
      ref={ref}
      variants={fadeInUpVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`py-16 relative overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  )
} 