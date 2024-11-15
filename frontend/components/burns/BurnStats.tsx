import { Card } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils'
import { BURN_SECTIONS } from '@/constants'
import { Flame, Clock } from 'lucide-react'

interface BurnStatsProps {
  totalBurned: number
  timeUntilNextBurn: string
  nextBurnDate: string
}

export const BurnStats = ({ totalBurned, timeUntilNextBurn, nextBurnDate }: BurnStatsProps) => {
  const stats = [
    {
      icon: Flame,
      title: BURN_SECTIONS.STATS.CARDS[0].title,
      description: BURN_SECTIONS.STATS.CARDS[0].description,
      value: `${formatNumber(totalBurned)} SOBA`,
      color: "text-orange-500"
    },
    {
      icon: Clock,
      title: BURN_SECTIONS.STATS.CARDS[1].title,
      description: BURN_SECTIONS.STATS.CARDS[1].description,
      value: timeUntilNextBurn,
      subValue: nextBurnDate,
      color: "text-orange-500"
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
                <stat.icon className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500">
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
              {stat.subValue && (
                <p className="text-sm text-gray-400 mt-1">
                  {stat.subValue}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 