import React from 'react';
import Image from 'next/image';

const trackingPlatforms = [
  {
    name: 'CoinMarketCap',
    icon: '/images/assets/icons/cmc.svg',
    url: 'https://coinmarketcap.com/currencies/soba-token'
  },
  {
    name: 'CoinGecko',
    icon: '/images/assets/icons/coingecko.svg',
    url: 'https://www.coingecko.com/en/coins/soba-token'
  },
  {
    name: 'DexScreener',
    icon: '/images/assets/icons/dexscreener.svg',
    url: 'https://dexscreener.com/solana/soba'
  },
  {
    name: 'DexTools',
    icon: '/images/assets/icons/dextools.svg',
    url: 'https://www.dextools.io/app/en/solana/pair-explorer/soba'
  },
  {
    name: 'CoinPaprika',
    icon: '/images/assets/icons/coinpaprika.svg',
    url: 'https://coinpaprika.com/coin/soba-soba-token'
  },
  {
    name: 'CoinRanking',
    icon: '/images/assets/icons/coinranking.svg',
    url: 'https://coinranking.com/coin/soba-token'
  }
]

const TrackingLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {trackingPlatforms.map(platform => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors border border-orange-500/20 hover:border-orange-500/40"
        >
          <Image
            src={platform.icon}
            alt={platform.name}
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="text-orange-400 text-sm font-medium">{platform.name}</span>
        </a>
      ))}
    </div>
  );
};

export default TrackingLinks; 