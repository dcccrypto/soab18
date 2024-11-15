import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { ButtonBase } from './ui/button-base'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

interface ContractAddressProps {
  address: string
}

export const ContractAddress: React.FC<ContractAddressProps> = ({ address }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    toast({
      title: "Address copied!",
      description: "Contract address has been copied to clipboard",
      className: "bg-orange-500 text-white border border-orange-500/20 rounded-2xl",
    })
    
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-black/30 p-8 rounded-2xl border border-orange-500/20 backdrop-blur-lg shadow-[0_8px_32px_rgba(255,165,0,0.1)] hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(255,165,0,0.2)] transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-4">
        <span className="text-orange-400/80 text-sm font-medium group-hover:text-orange-300 transition-colors">Contract:</span>
        <p className="text-orange-500 font-mono text-lg tracking-wider font-semibold group-hover:text-orange-400 transition-colors bg-orange-500/5 py-2 px-4 rounded-xl">
          {address.slice(0, 8)}...{address.slice(-8)}
        </p>
      </div>
      <ButtonBase
        onClick={handleCopy}
        variant="default"
        size="lg"
        className="relative overflow-hidden px-8 py-4 text-base font-semibold min-w-[160px] rounded-xl shadow-[0_4px_16px_rgba(255,165,0,0.15)]"
        aria-label={copied ? "Address copied" : "Copy contract address"}
      >
        <motion.div 
          className="flex items-center justify-center gap-3"
          initial={false}
          animate={{ opacity: 1 }}
          key={copied ? "copied" : "copy"}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Copied! ✅</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copy Address</span>
            </>
          )}
        </motion.div>
      </ButtonBase>
    </motion.div>
  )
} 