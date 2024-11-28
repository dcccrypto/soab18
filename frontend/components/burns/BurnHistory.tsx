import { Table } from '@/components/ui/table'
import { formatNumber, formatDateTime, getRelativeTime } from '@/lib/utils'
import { BURN_INFO } from '@/constants'
import { ExternalLink } from 'lucide-react'
import { BurnTransaction } from '@/types'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'

// Extend BurnTransaction for additional properties
interface BurnRecord extends BurnTransaction {
  cumulative?: number
}

interface BurnHistoryProps {
  burnHistory: BurnRecord[]
}

export const BurnHistory = ({ burnHistory }: BurnHistoryProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th className="p-4 text-left text-orange-500 font-medium">Date</th>
          <th className="p-4 text-left text-orange-500 font-medium">Amount</th>
          <th className="p-4 text-left text-orange-500 font-medium">Transaction</th>
        </tr>
      </thead>
      <tbody>
        {burnHistory.map((burn) => (
          <tr 
            key={burn.txId}
            className="border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors"
          >
            <td className="p-4 text-gray-300">
              <TooltipWrapper content={formatDateTime(burn.date)}>
                <span className="cursor-help">
                  {getRelativeTime(burn.date)}
                </span>
              </TooltipWrapper>
            </td>
            <td className="p-4 text-gray-300">
              {formatNumber(burn.amount)} SOBA
            </td>
            <td className="p-4">
              <a
                href={`https://solscan.io/tx/${burn.txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                aria-label={`View transaction ${burn.txId} on Solscan`}
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