import { useEffect, useState } from 'react';
import { fetchTokenStats } from '../services/api';
import type { TokenStats } from '../types';

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
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  const circulatingSupply = stats.totalSupply - stats.founderBalance;
  const founderPercentage = (stats.founderBalance / stats.totalSupply) * 100;
  const circulatingPercentage = (circulatingSupply / stats.totalSupply) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="bg-orange-100 rounded-lg p-4">
        <h3 className="text-lg font-bold text-orange-900">Price</h3>
        <p className="text-2xl font-bold text-orange-600">
          ${stats.price.toFixed(12)}
        </p>
      </div>

      <div className="bg-orange-100 rounded-lg p-4">
        <h3 className="text-lg font-bold text-orange-900">Total Supply</h3>
        <p className="text-2xl font-bold text-orange-600">
          {stats.totalSupply.toLocaleString()} SOBA
        </p>
      </div>

      <div className="bg-orange-100 rounded-lg p-4">
        <h3 className="text-lg font-bold text-orange-900">Circulating Supply</h3>
        <p className="text-2xl font-bold text-orange-600">
          {circulatingSupply.toLocaleString()} SOBA
        </p>
        <p className="text-sm text-orange-700">
          ({circulatingPercentage.toFixed(2)}%)
        </p>
      </div>

      <div className="bg-orange-100 rounded-lg p-4">
        <h3 className="text-lg font-bold text-orange-900">Founder Balance</h3>
        <p className="text-2xl font-bold text-orange-600">
          {stats.founderBalance.toLocaleString()} SOBA
        </p>
        <p className="text-sm text-orange-700">
          ({founderPercentage.toFixed(2)}%)
        </p>
      </div>

      <div className="bg-orange-100 rounded-lg p-4">
        <h3 className="text-lg font-bold text-orange-900">Holders</h3>
        <p className="text-2xl font-bold text-orange-600">
          {stats.holders.toLocaleString()}
        </p>
      </div>

      <div className="bg-orange-100 rounded-lg p-4">
        <h3 className="text-lg font-bold text-orange-900">Last Updated</h3>
        <p className="text-sm text-orange-700">
          {new Date(stats.lastUpdated).toLocaleString()}
        </p>
        {stats.cached && (
          <p className="text-xs text-orange-500">
            Cached ({stats.cacheAge}s ago)
          </p>
        )}
      </div>
    </div>
  );
}; 