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
import { getBurnProgress, getNextBurnDate } from '@/lib/dateUtils'
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

export function BurnChart() {
  const chartRef = useRef<ChartJS<'line'>>(null)
  const [isClient, setIsClient] = useState(false)
  const [burnProgress, setBurnProgress] = useState(0)
  const [nextBurnDate, setNextBurnDate] = useState<Date>(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    setIsClient(true)
    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [])

  const updateProgress = () => {
    const progress = getBurnProgress()
    const nextBurn = getNextBurnDate()
    
    setBurnProgress(progress)
    setNextBurnDate(nextBurn)
  }

  const formatBurnDate = (dateStr: string) => {
    try {
      const [day, month, year] = dateStr.split('/').map(Number)
      const date = new Date(year, month - 1, day)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
    } catch (error) {
      console.error('Error formatting date:', dateStr, error)
      return dateStr // Return original string instead of 'Invalid Date'
    }
  }

  if (!isClient) {
    return (
      <div className="relative h-[500px] md:h-[600px] w-full p-4 bg-black/40 rounded-xl border border-orange-500/20 flex items-center justify-center">
        <div className="text-orange-500">Loading chart...</div>
      </div>
    )
  }

  // Sort burn history by date and calculate cumulative burns
  const sortedBurns = [...BURN_HISTORY]
    .sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
    })
    .filter(burn => {
      const [day, month, year] = burn.date.split('/').map(Number);
      return !isNaN(day) && !isNaN(month) && !isNaN(year);
    });

  const chartData: ChartData<'line'> = {
    labels: sortedBurns.map(item => item.date),
    datasets: [
      {
        label: 'Burn Amount',
        data: sortedBurns.map(item => Number((item.amount / 1000000).toFixed(2))),
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
        title: {
          display: true,
          text: 'Burn Date',
          color: '#9CA3AF',
          font: {
            size: 12
          }
        },
        ticks: {
          color: '#9CA3AF',
          maxRotation: 45,
          minRotation: 45,
          callback: function(value, index) {
            // Show fewer labels on mobile
            if (window.innerWidth < 768) {
              return index % 3 === 0 ? sortedBurns[index]?.date : '';
            }
            return sortedBurns[index]?.date;
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (Millions)',
          color: '#9CA3AF',
          font: {
            size: 12
          }
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value) {
            return formatNumber(value) + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#F97316',
        bodyColor: '#fff',
        borderColor: '#F97316',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => {
            const index = items[0].dataIndex;
            const burn = sortedBurns[index];
            return burn.date;
          },
          label: (item) => {
            const burn = sortedBurns[item.dataIndex];
            const lines = [`Amount: ${formatNumber(burn.amount / 1000000)}M SOBA`];
            
            if (burn.value !== undefined) {
              lines.push(`Value: $${formatNumber(burn.value)}`);
            }
            
            return lines;
          }
        }
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors bg-orange-500 text-white"
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
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="text-sm text-gray-400">
            Next Burn: <span className="text-orange-400">{formatDate(nextBurnDate)}</span>
          </div>
        </div>
        <Line data={chartData} options={options} ref={chartRef} />
      </div>

      {/* Selected Burn Details */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-black/40 rounded-xl border border-orange-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-2">Selected Burn Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-300">Date</p>
            <p className="text-white">{formatDate(new Date(sortedBurns[selectedBurn].date))}</p>
          </div>
          <div>
            <p className="text-gray-300">Amount</p>
            <p className="text-white">{(sortedBurns[selectedBurn].amount / 1000000).toFixed(2)}M SOBA</p>
          </div>
          <div>
            <p className="text-gray-300">Transaction</p>
            <a
              href={`https://solscan.io/tx/${sortedBurns[selectedBurn].txId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
            >
              View on Solscan
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div> */}

      {/* Burn History Table */}
      <div className="overflow-x-auto rounded-xl border border-orange-500/20 bg-black/40">
        <table className="w-full">
          <thead>
            <tr className="border-b border-orange-500/20">
              <th className="p-4 text-left text-white font-medium">Date</th>
              <th className="p-4 text-left text-white font-medium">Amount</th>
              <th className="p-4 text-left text-white font-medium">Value</th>
              <th className="p-4 text-left text-white font-medium">Transaction</th>
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
                  {formatBurnDate(burn.date)}
                </td>
                <td className="p-4 text-gray-300">
                  {(burn.amount / 1000000).toFixed(2)}M SOBA
                </td>
                <td className="p-4 text-green-400">
                  ${formatNumber(burn.value || 0, 2)}
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