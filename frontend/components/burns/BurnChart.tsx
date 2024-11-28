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
  Filler,
  ChartData,
  ChartOptions,
  TooltipItem
} from 'chart.js'
import { ExternalLink, TrendingUp, Flame, Calendar } from 'lucide-react'
import { BURN_HISTORY, BURN_INFO } from '@/constants'
import { formatDate, formatNumber, isValidDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { BurnTransaction } from '@/types'

// Register ChartJS components
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

interface ChartBurnData extends BurnTransaction {
  cumulative: number
}

type ChartViewType = 'cumulative' | 'individual'

export const BurnChart = () => {
  const chartRef = useRef<ChartJS<'line'>>(null)
  const [isClient, setIsClient] = useState(false)
  const [selectedBurn, setSelectedBurn] = useState<number | null>(null)
  const [chartView, setChartView] = useState<ChartViewType>('cumulative')

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
  const sortedBurns = [...BURN_HISTORY]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(burn => isValidDate(burn.date)) // Filter out invalid dates
  
  let cumulativeBurns = 0
  const cumulativeData: ChartBurnData[] = sortedBurns.map(burn => {
    cumulativeBurns += burn.amount
    return {
      ...burn,
      cumulative: cumulativeBurns
    }
  }).reverse() // Reverse for chronological order in chart

  const chartData: ChartData<'line'> = {
    labels: cumulativeData.map(item => formatDate(item.date)),
    datasets: [
      {
        label: chartView === 'cumulative' ? 'Total Burned' : 'Burn Amount',
        data: chartView === 'cumulative' 
          ? cumulativeData.map(item => Number((item.cumulative / 1000000).toFixed(2)))
          : cumulativeData.map(item => Number((item.amount / 1000000).toFixed(2))),
        borderColor: '#f97316',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)')
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0.0)')
          return gradient
        },
        borderWidth: 2,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#f97316',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(249, 115, 22, 0.1)',
          display: false
        },
        ticks: {
          color: '#f97316',
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(249, 115, 22, 0.1)',
          display: false
        },
        ticks: {
          color: '#f97316',
          callback: function(this: any, tickValue: number | string): string {
            const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue
            return `${value}M`
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#f97316',
        bodyColor: '#fff',
        borderColor: 'rgba(249, 115, 22, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            const dataIndex = context.dataIndex
            const burn = cumulativeData[dataIndex]
            return [
              `Amount: ${(burn.amount / 1000000).toFixed(2)}M SOBA`,
              `Total Burned: ${(burn.cumulative / 1000000).toFixed(2)}M SOBA`,
              'Click to view transaction'
            ]
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index
        setSelectedBurn(index)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartView('cumulative')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              chartView === 'cumulative'
                ? 'bg-orange-500 text-white'
                : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Cumulative
          </button>
          <button
            onClick={() => setChartView('individual')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              chartView === 'individual'
                ? 'bg-orange-500 text-white'
                : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
            }`}
          >
            <Flame className="w-4 h-4" />
            Individual Burns
          </button>
        </div>

        <div className="flex items-center gap-2 text-orange-500">
          <Calendar className="w-4 h-4" />
          <span>Latest Burn: {formatDate(new Date(BURN_INFO.LATEST_BURN.date))}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[500px] md:h-[600px] w-full p-4 bg-black/40 rounded-xl border border-orange-500/20">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      {/* Selected Burn Details */}
      {selectedBurn !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-black/40 rounded-xl border border-orange-500/20"
        >
          <h3 className="text-lg font-semibold text-orange-500 mb-2">Selected Burn Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400">Date</p>
              <p className="text-white">{formatDate(new Date(cumulativeData[selectedBurn].date))}</p>
            </div>
            <div>
              <p className="text-gray-400">Amount</p>
              <p className="text-white">{(cumulativeData[selectedBurn].amount / 1000000).toFixed(2)}M SOBA</p>
            </div>
            <div>
              <p className="text-gray-400">Transaction</p>
              <a
                href={`https://solscan.io/tx/${cumulativeData[selectedBurn].txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
              >
                View on Solscan
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
      
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
            {sortedBurns.map((burn, index) => (
              <motion.tr 
                key={burn.txId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors"
              >
                <td className="p-4 text-gray-300">
                  {formatDate(new Date(burn.date))}
                </td>
                <td className="p-4 text-gray-300">
                  {(burn.amount / 1000000).toFixed(2)}M SOBA
                </td>
                <td className="p-4 text-gray-300">
                  {(cumulativeData[cumulativeData.length - 1 - index].cumulative / 1000000).toFixed(2)}M SOBA
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
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}