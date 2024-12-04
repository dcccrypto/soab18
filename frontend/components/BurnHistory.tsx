import { BURN_HISTORY } from '@/constants/static'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatNumber } from '@/lib/utils'
import type { BurnTransaction } from '@/types'

export const BurnHistory = () => {
  // Sort burns by date in descending order (newest first)
  const sortedBurns = [...BURN_HISTORY].sort((a, b) => {
    try {
      // Parse dates in DD/MM/YYYY format
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      
      // Create Date objects (months are 0-based in JavaScript)
      const dateA = new Date(yearA, monthA - 1, dayA)
      const dateB = new Date(yearB, monthB - 1, dayB)
      
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.error('Invalid date comparison:', { dateA, dateB, burnA: a, burnB: b })
        return 0
      }
      
      return dateB.getTime() - dateA.getTime()
    } catch (error) {
      console.error('Error sorting dates:', error)
      return 0
    }
  })

  const formatAmount = (amount: number) => {
    return amount >= 1000000 
      ? `${(amount / 1000000).toFixed(2)}M` 
      : amount >= 1000 
        ? `${(amount / 1000).toFixed(2)}K`
        : amount.toString()
  }

  const formatDisplayDate = (dateStr: string) => {
    try {
      // Parse date string in DD/MM/YYYY format
      const [day, month, year] = dateStr.split('/').map(Number)
      
      // Validate date components
      if (!day || !month || !year || 
          day < 1 || day > 31 || 
          month < 1 || month > 12 || 
          year < 2020 || year > 2100) {
        throw new Error('Invalid date components')
      }

      // Create Date object (month is 0-based)
      const date = new Date(year, month - 1, day)
      
      // Validate the resulting date
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }

      // Format the date
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }).format(date)
    } catch (error) {
      console.error('Error formatting date:', dateStr, error)
      return 'Invalid Date'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Value</th>
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
                {formatDisplayDate(burn.date)}
              </td>
              <td className="px-6 py-4 text-orange-300">
                {formatAmount(burn.amount)} SOBA
              </td>
              <td className="px-6 py-4 text-green-400">
                ${burn.value ? formatNumber(burn.value, 2) : '0.00'}
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