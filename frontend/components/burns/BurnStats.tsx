import { useBurnWallet } from '@/hooks/useBurnWallet'
import { BURN_HISTORY, BURN_SECTIONS } from '@/constants/static'
import { formatNumber } from '@/lib/utils'
import { Flame, DollarSign } from 'lucide-react'
import { Card } from '@/components/ui/card'

export const BurnStats = () => {
  const { balance, usdValue, isLoading } = useBurnWallet()
  
  // Total burns is static history plus current wallet balance
  const totalBurned = BURN_HISTORY.TOTAL_STATIC_BURNS + balance

  const stats = [
    {
      icon: Flame,
      title: BURN_SECTIONS.STATS.CARDS[0].title,
      description: BURN_SECTIONS.STATS.CARDS[0].description,
      value: isLoading ? 'Loading...' : `${formatNumber(totalBurned)} SOBA`,
      color: "text-orange-500"
    },
    {
      icon: DollarSign,
      title: BURN_SECTIONS.STATS.CARDS[1].title,
      description: BURN_SECTIONS.STATS.CARDS[1].description,
      value: isLoading ? 'Loading...' : `$${formatNumber(usdValue)}`,
      color: "text-green-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stats.map((stat, index) => (
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
            <div>
              <p className="text-2xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 