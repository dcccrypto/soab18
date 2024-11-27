import { useTokenStats } from '@/hooks/useTokenStats';
import { formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DollarSign, Flame, TrendingUp } from 'lucide-react';

export const BurnStats = () => {
  const { data: stats, isLoading } = useTokenStats();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-lg bg-black/40">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
            <div className="h-8 bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const burnedPercentage = (stats.burnedTokens / stats.totalSupply) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-lg bg-black/40 border border-orange-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-orange-500">Burned SOBA</h3>
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Flame className="text-orange-500" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">
          {formatNumber(stats.burnedTokens)} SOBA
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {burnedPercentage.toFixed(6)}% of total supply
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-lg bg-black/40 border border-green-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-500">Burned Value</h3>
          <div className="p-2 rounded-lg bg-green-500/10">
            <DollarSign className="text-green-500" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">
          ${formatNumber(stats.burnedValue, 2)}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Current SOBA price: ${formatNumber(stats.price, 12)}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-lg bg-black/40 border border-blue-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-500">Total Supply</h3>
          <div className="p-2 rounded-lg bg-blue-500/10">
            <TrendingUp className="text-blue-500" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">
          {formatNumber(stats.totalSupply)} SOBA
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Total Value: ${formatNumber(stats.totalValue, 2)}
        </p>
      </motion.div>
    </div>
  );
};