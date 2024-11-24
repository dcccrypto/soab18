import { useEffect } from 'react'
import useWebSocket from '../../services/websocket'
import useBurnStore from '../../store/burnStore'
import { formatNumber, formatDateTime } from '@/lib/utils'
import { Flame, DollarSign, Users, TrendingUp, LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'

interface StatItem {
  icon: LucideIcon
  title: string
  description: string
  value: string
  subValue?: string
  color: string
}

export const BurnStats = () => {
  const { connect, disconnect } = useWebSocket()
  const { 
    totalBurned, 
    burnRate, 
    price, 
    marketCap,
    holderCount,
    volume24h,
    tokenMetrics 
  } = useBurnStore()

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [])

  const stats: StatItem[] = [
    {
      icon: Flame,
      title: "Total Burned",
      description: "Total SOBA tokens permanently removed from circulation",
      value: `${formatNumber(totalBurned)} SOBA`,
      subValue: `${formatNumber(burnRate, 2)}% of total supply`,
      color: "text-orange-500"
    },
    {
      icon: DollarSign,
      title: "Market Data",
      description: "Current market statistics",
      value: `$${formatNumber(price)}`,
      subValue: `MC: $${formatNumber(marketCap)}`,
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Holders",
      description: "Total number of SOBA token holders",
      value: formatNumber(holderCount),
      subValue: `24h Volume: $${formatNumber(volume24h)}`,
      color: "text-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Supply Metrics",
      description: "Token supply distribution",
      value: `${formatNumber(tokenMetrics.circulatingSupply)} SOBA`,
      subValue: `Total: ${formatNumber(tokenMetrics.totalSupply)}`,
      color: "text-purple-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card 
          key={stat.title}
          className="bg-black/40 border-orange-500/20 hover:border-orange-500/40 transition-all"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <TooltipWrapper content={stat.description}>
                  <h3 className={`text-lg font-semibold ${stat.color} cursor-help`}>
                    {stat.title}
                  </h3>
                </TooltipWrapper>
                {stat.subValue && (
                  <p className="text-sm text-gray-400">
                    {stat.subValue}
                  </p>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {stat.value}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}