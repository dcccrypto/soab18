import { useTokenStats } from '@/hooks/useTokenStats';
import { formatNumber } from '@/lib/utils';
import { AnimatedValue } from '../AnimatedValue';
import { Card } from '@/components/ui/card'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { Flame, DollarSign, Users, TrendingUp } from 'lucide-react'

export const BurnStats = () => {
  const { data: stats, isLoading, error } = useTokenStats()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-black/50 rounded-lg border border-orange-500/20">
          <div className="h-32 animate-pulse bg-gray-700/50 rounded" />
        </div>
        <div className="p-6 bg-black/50 rounded-lg border border-orange-500/20">
          <div className="h-32 animate-pulse bg-gray-700/50 rounded" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-4 bg-red-500/10 rounded-lg">
        <p className="text-red-400">Failed to load burn statistics</p>
      </div>
    );
  }

  const circulatingPercentage = (stats.circulatingSupply / stats.totalSupply) * 100;
  const burnedPercentage = ((stats.totalSupply - stats.circulatingSupply) / stats.totalSupply) * 100;

  const statsData = [
    {
      icon: DollarSign,
      title: "Price",
      value: `$${formatNumber(stats.price, 12)}`,
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Supply",
      value: `${formatNumber(stats.circulatingSupply)} (${circulatingPercentage.toFixed(2)}%)`,
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Holders",
      value: formatNumber(stats.holders),
      color: "text-purple-500"
    },
    {
      icon: Flame,
      title: "Founder Balance",
      value: formatNumber(stats.founderBalance),
      color: "text-orange-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat) => (
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
                <TooltipWrapper content={stat.title}>
                  <h3 className={`text-lg font-semibold ${stat.color} cursor-help`}>
                    {stat.title}
                  </h3>
                </TooltipWrapper>
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