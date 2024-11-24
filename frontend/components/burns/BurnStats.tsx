import { useEffect, useState } from 'react'
import { useBurnWallet } from '@/hooks/useBurnWallet'
import { BURN_INFO, TOKEN_INFO } from '@/constants/static'
import { formatNumber } from '@/lib/utils'
import { Flame, DollarSign, LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface StatItem {
  icon: LucideIcon
  title: string
  description: string
  value: string
  color: string
}

export const BurnStats = () => {
  const { balance, usdValue, isLoading } = useBurnWallet()
  const [totalBurned, setTotalBurned] = useState<number>(BURN_INFO.TOTAL_BURNED)
  const [burnRate, setBurnRate] = useState<number>(BURN_INFO.BURN_RATE)

  useEffect(() => {
    if (!isLoading) {
      // Calculate total burned including current wallet balance
      const newTotalBurned = BURN_INFO.TOTAL_BURNED + balance
      setTotalBurned(newTotalBurned)

      // Update burn rate
      const newBurnRate = (newTotalBurned / TOKEN_INFO.TOTAL_SUPPLY) * 100
      setBurnRate(newBurnRate)
    }
  }, [balance, isLoading])

  const stats: StatItem[] = [
    {
      icon: Flame,
      title: "Total Burned",
      description: "Total SOBA tokens permanently removed from circulation",
      value: isLoading ? 'Loading...' : `${formatNumber(totalBurned)} SOBA`,
      color: "text-orange-500"
    },
    {
      icon: DollarSign,
      title: "Current Value",
      description: "USD value of burned tokens",
      value: isLoading ? 'Loading...' : `$${formatNumber(usdValue)}`,
      color: "text-green-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className={`text-lg font-semibold ${stat.color}`}>
                  {stat.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {stat.description}
                </p>
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