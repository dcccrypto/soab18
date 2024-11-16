import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { tokenService } from '@/services/api';
import { ExternalLink } from 'lucide-react';

interface BurnTransaction {
  timestamp: string;
  amount: number;
  txHash: string;
}

export const BurnHistory = () => {
  const [burnHistory, setBurnHistory] = useState<BurnTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBurnHistory = async () => {
      try {
        setLoading(true);
        const history = await tokenService.getBurnHistory();
        setBurnHistory(history);
      } catch (error) {
        console.error('Error fetching burn history:', error);
        setError('Failed to load burn history');
      } finally {
        setLoading(false);
      }
    };

    fetchBurnHistory();
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-x-auto"
    >
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Transaction
              </th>
            </tr>
          </thead>
          <tbody>
            {burnHistory.map((burn, index) => (
              <motion.tr 
                key={burn.txHash || index}
                className="border-t border-gray-800 hover:bg-gray-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <td className="px-6 py-4 text-orange-300">
                  {new Date(burn.timestamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-orange-300">
                  {burn.amount.toLocaleString()} SOBA
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://solscan.io/tx/${burn.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
                  >
                    {burn.txHash.slice(0, 8)}...{burn.txHash.slice(-8)}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}; 