import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { tokenService } from '@/services/api';
import { ExternalLink } from 'lucide-react';

interface BurnTransaction {
  txHash: string;
  timestamp: number;
  amount: number;
  sender: string;
}

export const BurnHistory = () => {
  const [burnHistory, setBurnHistory] = useState<BurnTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBurnHistory = async () => {
      try {
        const history = await tokenService.getBurnHistory('25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8');
        setBurnHistory(history);
      } catch (error) {
        console.error('Error fetching burn history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBurnHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-900 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-orange-400">Date</th>
              <th className="px-6 py-3 text-left text-orange-400">Amount</th>
              <th className="px-6 py-3 text-left text-orange-400">Transaction</th>
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