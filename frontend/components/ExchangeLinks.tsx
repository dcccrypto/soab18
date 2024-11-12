import React from 'react';
import Image from 'next/image';

const exchanges = [
  {
    name: 'BitMart',
    icon: '/images/assets/icons/bitmart.svg',
    url: 'https://www.bitmart.com/trade/en-US?symbol=SOBA_USDT'
  },
  {
    name: 'Toobit',
    icon: '/images/assets/icons/toobit.svg',
    url: 'https://www.toobit.com/en-US/trade/SOBA_USDT'
  }
]

const ExchangeLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {exchanges.map(exchange => (
        <a
          key={exchange.name}
          href={exchange.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 p-4 rounded-lg bg-black hover:bg-gray-900 transition-colors border border-orange-500/20 hover:border-orange-500/40"
        >
          <Image
            src={exchange.icon}
            alt={exchange.name}
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-orange-400 font-medium">{exchange.name}</span>
        </a>
      ))}
    </div>
  );
};

export default ExchangeLinks; 