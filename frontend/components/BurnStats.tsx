import { motion } from 'framer-motion';
import { Flame, TrendingUp, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BURN_INFO } from '@/constants';
import { formatNumber } from '@/lib/utils';

export const BurnStats = () => {
  const [burnStats, setBurnStats] = useState({
    totalBurned: BURN_INFO.BURN_HISTORY.reduce((acc, burn) => acc + burn.amount, 0),
    burnRate: 2.5,
    nextBurnDate: new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)
  });

  const stats = [
    {
      icon: Flame,
      title: "Total Burned",
      value: `${formatNumber(burnStats.totalBurned)} SOBA`,
      color: "text-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Burn Rate",
      value: `${burnStats.burnRate}%`,
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "Next Burn",
      value: burnStats.nextBurnDate.toLocaleDateString(),
      color: "text-blue-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-black/40 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-orange-500">
              {stat.title}
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}; 