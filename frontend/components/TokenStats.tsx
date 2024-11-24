import { useEffect, useState } from 'react';
import { fetchTokenStats } from '@/constants/api';
import type { TokenStats } from '@/constants/types';
import { Card } from '@/components/ui/card';
import { formatNumber, formatDateTime } from '@/lib/utils';
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper';
import { Users, Clock } from 'lucide-react';

export const TokenStatsDisplay = () => {
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchTokenStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load token stats');
        console.error('[TokenStats Error]:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    // Refresh every minute
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <Card className="p-6">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2"></div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-500/50">
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <TooltipWrapper content="Total supply of SOBA tokens">
            <h3 className="text-lg font-semibold text-orange-500 cursor-help">
              Total Supply
            </h3>
          </TooltipWrapper>
          <p className="text-2xl font-bold mt-2">
            {formatNumber(stats.totalSupply)} SOBA
          </p>
        </Card>

        <Card className="p-6">
          <TooltipWrapper content="SOBA tokens currently in circulation">
            <h3 className="text-lg font-semibold text-green-500 cursor-help">
              Circulating Supply
            </h3>
          </TooltipWrapper>
          <p className="text-2xl font-bold mt-2">
            {formatNumber(stats.circulatingSupply)} SOBA
          </p>
        </Card>

        <Card className="p-6">
          <TooltipWrapper content="Current market price of SOBA">
            <h3 className="text-lg font-semibold text-blue-500 cursor-help">
              Price
            </h3>
          </TooltipWrapper>
          <p className="text-2xl font-bold mt-2">
            ${formatNumber(stats.price, 6)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            <TooltipWrapper content="Number of unique SOBA token holders">
              <h3 className="text-lg font-semibold text-purple-500 cursor-help">
                Holders
              </h3>
            </TooltipWrapper>
          </div>
          <p className="text-2xl font-bold mt-2">
            {formatNumber(stats.holders)}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-500">
              Last Updated
            </h3>
          </div>
          <p className="text-lg mt-2">
            {formatDateTime(stats.lastUpdated)}
          </p>
          {stats.cached && (
            <p className="text-sm text-gray-400 mt-1">
              Cached ({stats.cacheAge}s ago)
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};