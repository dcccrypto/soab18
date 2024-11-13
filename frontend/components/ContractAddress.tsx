import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from './ui/button';
import { CONTRACT_ADDRESS, ICON_SIZES } from '../constants';

export const ContractAddress: React.FC = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    // Add toast notification here if desired
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg p-6 border border-orange-500/20">
      <h2 className="text-2xl font-bold text-orange-400 mb-4 text-center">
        $SOBA Contract Address
      </h2>
      <div className="flex items-center justify-between gap-4 bg-black rounded-lg p-4">
        <code className="text-orange-300 text-lg font-mono flex-1 break-all">
          {CONTRACT_ADDRESS}
        </code>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          className="hover:bg-orange-500/20"
        >
          <Copy className="w-5 h-5 text-orange-400" />
        </Button>
      </div>
    </div>
  );
}; 