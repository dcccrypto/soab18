import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export const ButtonBase = ({ 
  children, 
  className, 
  variant = 'default',
  size = 'md',
  ...props 
}: ButtonBaseProps) => {
  const baseStyles = "relative overflow-hidden rounded-full flex items-center justify-center gap-2 font-semibold transition-all duration-300 group"
  
  const variants = {
    default: "bg-orange-500 hover:bg-transparent text-white border border-transparent hover:border-orange-500 hover:text-orange-500",
    outline: "bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
    ghost: "bg-transparent text-orange-500 hover:bg-orange-500/10"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        "shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 group-hover:text-inherit transition-colors">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 animate-shimmer" />
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl" />
    </motion.button>
  )
} 