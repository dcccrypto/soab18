import { Table } from '@/components/ui/table'
import { formatNumber } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { BurnTransaction } from '@/types'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'

interface BurnHistoryProps {
  burnHistory: BurnTransaction[]
}

export const BurnHistory = ({ burnHistory }: BurnHistoryProps) => {
  const sortedBurns = [...burnHistory].sort((a, b) => {
    try {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      const dateA = new Date(yearA, monthA - 1, dayA)
      const dateB = new Date(yearB, monthB - 1, dayB)
      return dateB.getTime() - dateA.getTime()
    } catch {
      return 0
    }
  })

  const formatDisplayDate = (dateStr: string) => {
    try {
      const [day, month, year] = dateStr.split('/').map(Number)
      const date = new Date(year, month - 1, day)
      if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }).format(date)
      }
      return dateStr // Return original string if parsing fails
    } catch {
      return dateStr // Return original string on error
    }
  }

  const formatAmount = (amount: number) => {
    return amount >= 1000000 
      ? `${(amount / 1000000).toFixed(2)}M` 
      : amount >= 1000 
        ? `${(amount / 1000).toFixed(2)}K`
        : amount.toString()
  }

  return (
    <Table>
      <thead>
        <tr>
          <th className="p-4 text-left text-orange-500 font-medium">Date</th>
          <th className="p-4 text-left text-orange-500 font-medium">Amount</th>
          <th className="p-4 text-left text-orange-500 font-medium">Value</th>
          <th className="p-4 text-left text-orange-500 font-medium">Transaction</th>
        </tr>
      </thead>
      <tbody>
        {sortedBurns.map((burn) => (
          <tr 
            key={burn.txId}
            className="border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors"
          >
            <td className="p-4 text-gray-300">
              {formatDisplayDate(burn.date)}
            </td>
            <td className="p-4 text-gray-300">
              {formatAmount(burn.amount)} SOBA
            </td>
            <td className="p-4 text-green-400">
              ${typeof burn.value === 'number' ? formatNumber(burn.value, 2) : '0.00'}
            </td>
            <td className="p-4">
              <a
                href={`https://solscan.io/tx/${burn.txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span className="font-mono">
                  {burn.txId.slice(0, 8)}...{burn.txId.slice(-8)}
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}