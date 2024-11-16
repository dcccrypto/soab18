import { BURN_HISTORY } from '@/constants/static'
import { formatDate } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export const BurnHistory = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {BURN_HISTORY.BURNS.map((burn, index) => (
            <motion.tr 
              key={burn.txHash}
              className="border-t border-gray-800 hover:bg-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <td className="px-6 py-4 text-orange-300">
                {formatDate(new Date(burn.date))}
              </td>
              <td className="px-6 py-4 text-orange-300">
                {burn.amount.toLocaleString()} SOBA
              </td>
              <td className="px-6 py-4">
                <a
                  href={`https://solscan.io/tx/${burn.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
                  tabIndex={0}
                  aria-label={`View transaction ${burn.txHash}`}
                >
                  {burn.txHash.slice(0, 8)}...{burn.txHash.slice(-8)}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 