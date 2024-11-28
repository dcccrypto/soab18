import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { BurnTransaction, TokenStats } from '@/types';

interface BurnState {
  burnTransactions: BurnTransaction[];
  tokenStats: TokenStats | null;
  isLoading: boolean;
  error: string | null;
  setBurnTransactions: (transactions: BurnTransaction[]) => void;
  setTokenStats: (stats: TokenStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateTotalBurned: () => number;
  calculateBurnPercentage: () => number;
}

const useBurnStore = create<BurnState>()(
  devtools(
    (set, get) => ({
      burnTransactions: [],
      tokenStats: null,
      isLoading: false,
      error: null,
      setBurnTransactions: (transactions) => set({ burnTransactions: transactions }),
      setTokenStats: (stats) => set({ tokenStats: stats }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      calculateTotalBurned: () => {
        const { tokenStats } = get();
        return tokenStats?.burnedTokens || 0;
      },
      calculateBurnPercentage: () => {
        const { tokenStats } = get();
        if (!tokenStats?.totalSupply || !tokenStats?.burnedTokens) return 0;
        return (tokenStats.burnedTokens / tokenStats.totalSupply) * 100;
      },
    }),
    { name: 'burn-store' }
  )
);

export default useBurnStore;
