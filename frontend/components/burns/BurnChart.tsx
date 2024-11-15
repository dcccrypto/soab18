import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { ExternalLink } from 'lucide-react'
import { BURN_INFO } from '@/constants'
import { formatDate, formatNumber } from '@/lib/utils'

if (typeof window !== 'undefined') {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )
}

export const BurnChart = () => {
  const chartRef = useRef<ChartJS>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="relative h-[500px] md:h-[600px] w-full p-4 bg-black/40 rounded-xl border border-orange-500/20 flex items-center justify-center">
        <div className="text-orange-500">Loading chart...</div>
      </div>
    )
  }

  // Sort burn history by date and calculate cumulative burns
  const sortedBurns = [...BURN_INFO.BURN_HISTORY]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  let cumulativeBurns = 0
  const cumulativeData = sortedBurns.map(burn => {
    cumulativeBurns += burn.amount
    return {
      date: burn.date,
      amount: burn.amount,
      cumulative: cumulativeBurns,
      txHash: burn.txHash
    }
  })

  const data = {
    labels: cumulativeData.map(burn => formatDate(new Date(burn.date))),
    datasets: [
      {
        label: 'Cumulative Burns',
        data: cumulativeData.map(burn => burn.cumulative),
        fill: true,
        backgroundColor: (context: any) => {
          if (!context?.chart?.ctx) return 'rgba(249, 115, 22, 0.1)'
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.2)')
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0.0)')
          return gradient
        },
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(249, 115, 22, 1)',
        pointBorderColor: 'rgba(249, 115, 22, 1)',
        pointHoverBackgroundColor: 'rgba(249, 115, 22, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(255, 115, 22, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 45,
          minRotation: 45,
          font: { size: 12 }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 115, 22, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: (value: any) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
            if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
            return value
          },
          font: { size: 12 }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'rgba(255, 115, 22, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(255, 115, 22, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            if (items[0]?.label) {
              return items[0].label
            }
            return ''
          },
          label: (context: any) => {
            const dataIndex = context.dataIndex
            const burn = cumulativeData[dataIndex]
            return [
              `Total Burned: ${formatNumber(burn.cumulative)} SOBA`,
              `This Burn: ${formatNumber(burn.amount)} SOBA`,
              `TX: ${burn.txHash.slice(0, 8)}...`
            ]
          }
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative h-[500px] md:h-[600px] w-full p-4 bg-black/40 rounded-xl border border-orange-500/20">
        <Line data={data} options={options} ref={chartRef} />
      </div>
      
      {/* Burn History Table */}
      <div className="overflow-x-auto rounded-xl border border-orange-500/20 bg-black/40">
        <table className="w-full">
          <thead>
            <tr className="border-b border-orange-500/20">
              <th className="p-4 text-left text-orange-500 font-medium">Date</th>
              <th className="p-4 text-left text-orange-500 font-medium">Amount</th>
              <th className="p-4 text-left text-orange-500 font-medium">Total Burned</th>
              <th className="p-4 text-left text-orange-500 font-medium">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {cumulativeData.map((burn, index) => (
              <tr 
                key={burn.txHash}
                className="border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors"
              >
                <td className="p-4 text-gray-300">
                  {formatDate(new Date(burn.date))}
                </td>
                <td className="p-4 text-gray-300">
                  {formatNumber(burn.amount)} SOBA
                </td>
                <td className="p-4 text-gray-300">
                  {formatNumber(burn.cumulative)} SOBA
                </td>
                <td className="p-4">
                  <a
                    href={`https://solscan.io/tx/${burn.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    aria-label={`View transaction ${burn.txHash} on Solscan`}
                  >
                    <span className="font-mono">
                      {burn.txHash.slice(0, 8)}...{burn.txHash.slice(-8)}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 