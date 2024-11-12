import { motion } from 'framer-motion';
import { Flame, TrendingUp, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { tokenService } from '@/services/api';

export const BurnStats = () => {
  const [burnStats, setBurnStats] = useState({
    totalBurned: 74779668.51,
    burnRate: 2.5,
    nextBurnDate: new Date('2024-04-01')
  });

  useEffect(() => {
    const fetchBurnStats = async () => {
      try {
        const tokenInfo = await tokenService.getTokenInfo('25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8');
        const nextBurnInfo = await tokenService.getNextBurnInfo('25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8');
        setBurnStats({
          totalBurned: tokenInfo.totalBurned,
          burnRate: tokenInfo.burnRate,
          nextBurnDate: new Date(nextBurnInfo.nextBurnDate)
        });
      } catch (error) {
        console.error('Error fetching burn stats:', error);
      }
    };

    fetchBurnStats();
  }, []);

  const stats = [
    {
      icon: Flame,
      title: "Total Burned",
      value: `${burnStats.totalBurned.toLocaleString()} SOBA`,
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
    <>
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.title}
          className="bg-gray-900 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
            <h2 className="text-xl font-bold text-orange-400">{stat.title}</h2>
          </div>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </>
  );
}; 