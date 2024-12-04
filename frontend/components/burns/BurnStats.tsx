import { useTokenStats } from '@/hooks/useTokenStats';
import { formatNumber } from '@/lib/utils';
import { Flame, Percent, DollarSign } from 'lucide-react';
import { Card } from '../ui/card';
import type { TokenStatsResponse } from '@/types';
import { BURN_INFO } from '@/constants/static';

export function BurnStats() {
  const { data: stats, isLoading, error } = useTokenStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse bg-gray-800/50" />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  const burnedPercentage = (stats.toBeBurnedTokens / stats.totalSupply) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Tokens to be Burned</p>
            <p className="text-2xl font-bold">{formatNumber(stats.toBeBurnedTokens)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Value to be Burned</p>
            <p className="text-2xl font-bold">${formatNumber(stats.toBeBurnedValue, 2)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Percent className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Burn Percentage</p>
            <p className="text-2xl font-bold">{formatNumber(burnedPercentage, 2)}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}