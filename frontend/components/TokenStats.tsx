import { Card } from '@/components/ui/card';
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper';
import { formatNumber, formatDateTime } from '@/lib/utils';
import { useTokenStats } from '@/hooks/useTokenStats';
import { DollarSign, TrendingUp, Users, Flame, Clock, Wallet } from 'lucide-react';

export const TokenStatsDisplay = () => {
  const { data: stats, isLoading, error } = useTokenStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 bg-black/40">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
            <div className="h-8 bg-gray-700 rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-500/50">
        <p className="text-red-500">Failed to load token stats</p>
      </Card>
    );
  }

  if (!stats) return null;

  const statsData = [
    {
      title: "Price",
      value: `$${formatNumber(stats.price, 12)}`,
      description: "Current token price in USD",
      icon: <DollarSign className="text-green-500" />,
      color: "text-green-500"
    },
    {
      title: "Market Cap",
      value: `$${formatNumber(stats.marketCap, 2)}`,
      description: "Total market value of circulating supply",
      icon: <DollarSign className="text-blue-500" />,
      color: "text-blue-500"
    },
    {
      title: "Total Value",
      value: `$${formatNumber(stats.totalValue, 2)}`,
      description: "Total value of all tokens",
      icon: <DollarSign className="text-purple-500" />,
      color: "text-purple-500"
    },
    {
      title: "Circulating Supply",
      value: formatNumber(stats.circulatingSupply),
      description: `$${formatNumber(stats.marketCap, 2)} USD`,
      icon: <TrendingUp className="text-orange-500" />,
      color: "text-orange-500"
    },
    {
      title: "Total Supply",
      value: formatNumber(stats.totalSupply),
      description: `$${formatNumber(stats.totalValue, 2)} USD`,
      icon: <TrendingUp className="text-yellow-500" />,
      color: "text-yellow-500"
    },
    {
      title: "Founder Balance",
      value: formatNumber(stats.founderBalance),
      description: `$${formatNumber(stats.founderValue, 2)} USD`,
      icon: <Wallet className="text-red-500" />,
      color: "text-red-500"
    },
    {
      title: "Burned Tokens",
      value: formatNumber(stats.burnedTokens),
      description: `$${formatNumber(stats.burnedValue, 2)} USD`,
      icon: <Flame className="text-orange-500" />,
      color: "text-orange-500"
    },
    {
      title: "Holders",
      value: formatNumber(stats.holders),
      description: "Number of unique token holders",
      icon: <Users className="text-indigo-500" />,
      color: "text-indigo-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card 
            key={stat.title}
            className="p-6 bg-black/40 border-orange-500/20 hover:border-orange-500/40 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <TooltipWrapper content={stat.description}>
                  <h3 className={`text-lg font-semibold ${stat.color} cursor-help`}>
                    {stat.title}
                  </h3>
                </TooltipWrapper>
                <div className="p-2 rounded-lg bg-orange-500/10">
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-black/40 border-orange-500/20">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last Updated: {formatDateTime(stats.lastUpdated)}</span>
          {stats.cached && (
            <span className="text-sm">
              (Cached {stats.cacheAge}s ago)
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};