import { useState, useEffect } from 'react';
import { BURN_INFO } from '@/constants';
import { formatNumber } from '@/lib/utils';
import { AnimatedValue } from './AnimatedValue';

export const BurnStats = () => {
  const [burnStats, setBurnStats] = useState({
    totalBurned: BURN_INFO.TOTAL_BURNED,
    burnRate: BURN_INFO.BURN_RATE,
    nextBurnDate: new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)
  });

  const totalBurnedValue = BURN_INFO.BURN_HISTORY.reduce((acc, burn) => acc + burn.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-black/20 border border-orange-500/20">
        <h3 className="text-lg font-semibold text-orange-400">Total Burned</h3>
        <AnimatedValue
          value={formatNumber(totalBurnedValue)}
          suffix=" SOBA"
          className="text-2xl font-bold"
        />
      </div>
      <div className="p-4 rounded-lg bg-black/20 border border-orange-500/20">
        <h3 className="text-lg font-semibold text-orange-400">Burn Rate</h3>
        <AnimatedValue
          value={burnStats.burnRate}
          suffix="%"
          className="text-2xl font-bold"
        />
      </div>
      <div className="p-4 rounded-lg bg-black/20 border border-orange-500/20">
        <h3 className="text-lg font-semibold text-orange-400">Next Burn</h3>
        <p className="text-2xl font-bold">
          {burnStats.nextBurnDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}; 