import { BURN_HISTORY } from '@/constants/static'
import { formatDate } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import type { BurnTransaction } from '@/constants/types'

export const BurnHistory = () => {
  // Sort burns by date in descending order (newest first)
  const sortedBurns = [...BURN_HISTORY].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const formatAmount = (amount: number) => {
    return amount >= 1000000 
      ? `${(amount / 1000000).toFixed(2)}M` 
      : amount >= 1000 
        ? `${(amount / 1000).toFixed(2)}K`
        : amount.toString()
  }

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
          {sortedBurns.map((burn, index) => (
            <motion.tr 
              key={burn.txId}
              className="border-t border-gray-800 hover:bg-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <td className="px-6 py-4 text-orange-300">
                {formatDate(new Date(burn.date))}
              </td>
              <td className="px-6 py-4 text-orange-300">
                {formatAmount(burn.amount)} SOBA
              </td>
              <td className="px-6 py-4">
                <a
                  href={`https://solscan.io/tx/${burn.txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
                  tabIndex={0}
                  aria-label={`View transaction ${burn.txId}`}
                >
                  {burn.txId.slice(0, 8)}...{burn.txId.slice(-8)}
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