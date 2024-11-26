import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { formatNumber } from '@/lib/utils';
import { AnimatedValue } from './AnimatedValue';

export const BurnStats = () => {
  const [burnStats, setBurnStats] = useState({
    totalBurned: 0,
    burnRate: 0,
    price: 0,
    totalSupply: 0,
    holders: 0,
    lastUpdated: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.getTokenStats();
        const stats = response.data;
        setBurnStats({
          totalBurned: stats.totalSupply - stats.circulatingSupply,
          burnRate: ((stats.totalSupply - stats.circulatingSupply) / stats.totalSupply) * 100,
          price: stats.price,
          totalSupply: stats.totalSupply,
          holders: stats.holders,
          lastUpdated: new Date(stats.lastUpdated)
        });
        setError(null);
      } catch (err) {
        setError('Failed to load token stats');
        console.error('Error fetching burn stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg bg-black/20 border border-orange-500/20 animate-pulse">
            <div className="h-6 w-24 bg-orange-500/20 rounded mb-2"></div>
            <div className="h-8 w-32 bg-orange-500/20 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/20">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-black/20 border border-orange-500/20">
        <h3 className="text-lg font-semibold text-orange-400">Total Burned</h3>
        <AnimatedValue
          value={formatNumber(burnStats.totalBurned)}
          suffix=" SOBA"
          className="text-2xl font-bold"
        />
      </div>
      <div className="p-4 rounded-lg bg-black/20 border border-orange-500/20">
        <h3 className="text-lg font-semibold text-orange-400">Burn Rate</h3>
        <AnimatedValue
          value={burnStats.burnRate.toFixed(2)}
          suffix="%"
          className="text-2xl font-bold"
        />
      </div>
      <div className="p-4 rounded-lg bg-black/20 border border-orange-500/20">
        <h3 className="text-lg font-semibold text-orange-400">Holders</h3>
        <AnimatedValue
          value={formatNumber(burnStats.holders)}
          className="text-2xl font-bold"
        />
      </div>
    </div>
  );
};