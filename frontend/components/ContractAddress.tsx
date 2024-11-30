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
      className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/30 p-6 rounded-2xl border border-orange-500/20 backdrop-blur-lg shadow-[0_8px_32px_rgba(255,165,0,0.1)] hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(255,165,0,0.2)] transition-all duration-300 group max-w-4xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <span className="text-orange-400/80 text-sm font-medium">Contract Address:</span>
        <code className="text-orange-500 font-mono text-sm sm:text-base tracking-wider font-semibold bg-orange-500/5 py-2 px-4 rounded-xl w-full sm:w-auto text-center sm:text-left">
          {address}
        </code>
      </div>
      
      <ButtonBase
        onClick={handleCopy}
        variant="default"
        size="lg"
        className="relative overflow-hidden px-6 py-2.5 text-base font-semibold min-w-[140px] rounded-xl shadow-[0_4px_16px_rgba(255,165,0,0.15)] whitespace-nowrap"
        aria-label={copied ? "Address copied" : "Copy contract address"}
      >
        <motion.div 
          className="flex items-center justify-center gap-2"
          initial={false}
          animate={{ opacity: 1 }}
          key={copied ? "copied" : "copy"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </motion.div>
      </ButtonBase>
    </motion.div>
  )
} 