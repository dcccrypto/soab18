import type { BurnTransaction, BurnInfo } from '../types'

// Static constants that don't need updates
export const ICON_SIZES = {
  SOCIAL: {
    width: 150,
    height: 150
  },
  EXCHANGE: {
    width: 32,
    height: 32
  },
  TRACKING: {
    width: 24,
    height: 24
  },
  LOGO: {
    width: 32,
    height: 32
  }
} as const

export const NAV_LINKS = {
  HOME: '/',
  WHITEPAPER: '/soba-whitepaper',
  COMMUNITY: '/community-page',
  BURNS: '/burns-page',
  TOKENOMICS: '/tokenomics-page',
  ROADMAP: '/3d-roadmap'
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BURNS: '/burns-page',
  TOKENOMICS: '/tokenomics-page',
  ROADMAP: '/3d-roadmap'
} as const

export const ASSETS = {
  LOGO: {
    src: '/images/assets/icons/logo.svg',
    alt: 'SOBA Logo',
    width: 32,
    height: 32
  },
  HERO: '/images/hero.png',
  ABOUT: '/images/about.png',
  LOGO_DIMENSIONS: {
    width: 32,
    height: 32
  }
} as const

// Helper function to get next burn date
export function getNextBurnDate(): Date {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  // Set to 1st of next month at 10 AM Central Time
  const nextBurn = new Date(currentYear, currentMonth + 1, 1, 10, 0, 0)
  
  // Adjust for Central Time (UTC-6 or UTC-5 depending on daylight saving)
  const isCentralDST = isDST(nextBurn)
  nextBurn.setUTCHours(isCentralDST ? 15 : 16) // 10 AM CT = 15:00/16:00 UTC
  
  return nextBurn
}

function isDST(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset()
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
  const stdTimezoneOffset = Math.max(jan, jul)
  return date.getTimezoneOffset() < stdTimezoneOffset
}

export const BURN_INFO: BurnInfo = {
  BURN_WALLET: "7wtbTXc7Lyxt1enezJa7eNyNxenaLYsmBeiZTsA3KvwL",
  TOTAL_BURNED: 73990000,
  BURN_RATE: 10000000,
  BURN_SCHEDULE: "Monthly - 1st of every month at 10:00 AM Central Time",
  LATEST_BURN: {
    date: "2024-11-01T15:00:00.000Z", // 10 AM CST
    amount: 10000000,
    txId: "5RpUwQ"
  },
  NEXT_BURN: {
    TARGET_DATE: "2024-12-01T16:00:00.000Z", // 10 AM CST
    LAST_BURN_DATE: "2024-11-01T15:00:00.000Z", // 10 AM CST
    EVENT_NAME: "December Burn Event",
    DESCRIPTION: "Monthly token burn for December",
    AMOUNT: 10000000
  },
  PROGRESS: 0,
  START_DATE: "2024-11-01T15:00:00.000Z", // 10 AM CST
  END_DATE: "2024-12-01T16:00:00.000Z", // 10 AM CST
  NEXT_BURN_DATE: "2024-12-01T16:00:00.000Z" // 10 AM CST
} as const

// Replace the generateBurnHistory function with actual data
export const BURN_HISTORY: BurnTransaction[] = [
  {
    txId: '5rAonRA58uCnMYz3bek3M3RCf8j31GHsb2AeuMrcYSdCogSN5EUzXA5pCZJZi4tHDDXtd2URM4uxCM7AmtQc9VxL',
    amount: 11090000, // 11.09M
    date: '2024-07-23T15:00:00.000Z' // 10 AM CST
  },
  {
    txId: '2YJddGWGfJ6wmk5DjjB5jmLonZvB8GBLv4gzJA4QZEGM9TTj38r68AgvMEN9QWCiPcDV57JfoNv2CDjBcUEWo7yZ',
    amount: 22000000, // 22.0M
    date: '2024-08-01T15:00:00.000Z' // 10 AM CST
  },
  {
    txId: 'apj6z65J7fuG5posHKDMGGpUSjLVbZW8yChBrAZR4Xg8kTjAoL3az5wdU6BanCDVsq7hqxjhP8nKpRJ4fRu2xJ9',
    amount: 215000, // 215k
    date: '2024-08-19T15:00:00.000Z' // 10 AM CST
  },
  {
    txId: '5a5AztHHBSXYcsxoc17bKQhyJCytdimPmSaWVhrApG99xhJSWtVWExcvwKPp4XmWVbdQJDgY8VKhVZU6mEGeLUUu',
    amount: 21420000, // 21.42M
    date: '2024-08-25T15:00:00.000Z' // 10 AM CST
  },
  {
    txId: '3PLRtU2i3KLwA7FMPL1KuZozbFeNyyqkHJVznqNBpqKFNJ6A7iUDxWXjHL8hRxh7rycZUNxUFFAjfiego7oVF9HN',
    amount: 3280000, // 3.28M
    date: '2024-10-01T15:00:00.000Z' // 10 AM CST
  },
  {
    txId: '4s4EyPN8SSicrbRx9mc3ECAjbZQU1azGtfGtXUao3kE3UW6LRdTvdwXwDamRLxNvGt2iGHX7SvbWt9kGuyNSNX9A',
    amount: 15970000, // 15.97M
    date: '2024-10-30T15:00:00.000Z' // 10 AM CST
  }
] as const

export const BURN_SECTIONS = {
  HERO: {
    TITLE: "$SOBA Burns",
    SUBTITLE: "Witness the power of scarcity as we reduce supply through regular token burns."
  },
  WALLET: {
    TITLE: "Burn Wallet",
    DESCRIPTION: "All burned tokens are sent to this address"
  },
  STATS: {
    TITLE: "Burn Statistics",
    CARDS: [
      {
        title: "Total Burned",
        description: "Permanently removed from circulation"
      },
      {
        title: "Current Value",
        description: "USD value of burned tokens"
      }
    ]
  },
  CONTRIBUTE: {
    TITLE: "Contribute to Burns",
    DESCRIPTION: "Help reduce the supply by participating in our community burns",
    BUTTON_TEXT: "Burn Tokens",
    STEPS: [
      "Connect your wallet using the button above",
      "Enter the amount of SOBA you want to burn",
      "Confirm the transaction in your wallet",
      "Watch the total burned supply increase!",
      "Your contribution will be recorded in burn history"
    ],
    DIALOG: {
      TITLE: "Burn Your Tokens",
      DESCRIPTION: "Choose the amount of SOBA tokens you want to burn",
      CONFIRM_TEXT: "Confirm Burn",
      CANCEL_TEXT: "Cancel"
    }
  }
} as const

export const SOCIAL_LINKS = {
  TWITTER: {
    name: 'Twitter',
    url: 'https://twitter.com/sobatoken',
    icon: '/images/assets/icons/x_com_logo.png'
  },
  TELEGRAM: {
    name: 'Telegram',
    url: 'https://t.me/sobatoken',
    icon: '/images/assets/icons/telegram_logo.png'
  },
  TIKTOK: {
    name: 'TikTok',
    url: 'https://tiktok.com/@sobatoken',
    icon: '/images/assets/icons/tiktok_logo.png'
  }
} as const

export const TOKEN_INFO = {
  SYMBOL: 'SOBA',
  NAME: 'SOBA Token',
  DECIMALS: 9,
  TOTAL_SUPPLY: 1000000000,
  CIRCULATING_SUPPLY: 750000000,
  BURNED_TOKENS: BURN_INFO.TOTAL_BURNED,
  FOUNDER_HOLDINGS: 40800000, // 4.08% held by Crypto Bastard
  MINT_ADDRESS: '25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH'
} as const

export const CONTRACT_ADDRESS = '25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH'

export const DEX_LINKS = {
  BITMART: {
    url: 'https://www.bitmart.com/trade/en-US?symbol=SOBA_USDT',
    icon: '/images/assets/icons/bitmart.svg'
  },
  TOOBIT: {
    url: 'https://www.toobit.com/en-US/trade/SOBA_USDT',
    icon: '/images/assets/icons/toobit.svg'
  },
  DEXSCREENER: {
    url: 'https://dexscreener.com/solana/soba',
    icon: '/images/assets/icons/dexscreener.svg'
  },
  DEXTOOLS: {
    url: 'https://www.dextools.io/app/en/solana/pair-explorer/soba',
    icon: '/images/assets/icons/dextools.svg'
  },
  COINGECKO: {
    url: 'https://www.coingecko.com/en/coins/soba-token',
    icon: '/images/assets/icons/coingecko.svg'
  },
  CMC: {
    url: 'https://coinmarketcap.com/currencies/soba-token',
    icon: '/images/assets/icons/cmc.svg'
  },
  COINPAPRIKA: {
    url: 'https://coinpaprika.com/coin/soba-soba-token',
    icon: '/images/assets/icons/coinpaprika.svg'
  },
  COINRANKING: {
    url: 'https://coinranking.com/coin/soba-token',
    icon: '/images/assets/icons/coinranking.svg'
  }
} as const

export const SOCIAL_FEED_DATA = {
  X_UPDATES: [
    {
      id: '1',
      content: 'SOBA Token is revolutionizing DeFi!',
      timestamp: '2024-02-01T12:00:00Z',
      engagement: 1650,
      username: 'sobatoken',
      author: 'SOBA Team',
      profileImage: '/images/assets/icons/logo.svg'
    },
    {
      id: '2',
      content: 'Join our growing community!',
      timestamp: '2024-01-28T15:30:00Z',
      engagement: 1210,
      username: 'sobatoken',
      author: 'SOBA Team',
      profileImage: '/images/assets/icons/logo.svg'
    }
  ],
  TELEGRAM_HIGHLIGHTS: [
    {
      id: '1',
      content: 'New burn mechanism announcement coming soon!',
      timestamp: '2024-02-02T10:00:00Z',
      engagement: 567,
      username: 'SOBA Official',
      author: 'SOBA Team',
      memberCount: '5,000+'
    },
    {
      id: '2',
      content: 'Community AMA session this weekend!',
      timestamp: '2024-02-01T15:00:00Z',
      engagement: 432,
      username: 'SOBA Official',
      author: 'SOBA Team',
      memberCount: '5,000+'
    }
  ]
} as const

export const MEME_IMAGES = [
  '/images/memes/meme1.jpg',
  '/images/memes/meme2.jpg',
  '/images/memes/meme3.jpg'
] as const

export const ROADMAP_PHASES = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    description: 'Establishing the core infrastructure and community',
    items: [
      'Token Launch',
      'Community Building',
      'Initial Burns'
    ],
    completed: true,
    status: 'Completed'
  },
  {
    phase: 'Phase 2',
    title: 'Growth',
    description: 'Expanding reach and utility',
    items: [
      'DEX Listings',
      'Marketing Campaign',
      'Burn Mechanism Implementation'
    ],
    completed: false,
    status: 'In Progress'
  }
] as const

export const TEAM_MEMBERS = [
  {
    name: 'Crypto Bastard',
    role: 'Founder',
    description: 'Visionary leader and crypto enthusiast driving SOBA\'s innovation',
    imageUrl: '/images/assets/team/founder.jpg',
    image: '/images/assets/team/founder.jpg',
    social: {
      twitter: 'https://twitter.com/cryptobastard',
      telegram: 'https://t.me/cryptobastard'
    }
  },
  {
    name: 'SOBA Dev',
    role: 'Lead Developer',
    description: 'Expert blockchain developer specializing in Solana ecosystem',
    imageUrl: '/images/assets/team/dev.jpg',
    image: '/images/assets/team/dev.jpg',
    social: {
      twitter: 'https://twitter.com/sobadev',
      github: 'https://github.com/sobadev'
    }
  }
] as const

export const TOKENOMICS_CONTENT = {
  TITLE: 'SOBA Tokenomics',
  DESCRIPTION: 'Understanding the economic model of SOBA Token',
  HERO: {
    TITLE: 'SOBA Tokenomics',
    SUBTITLE: 'Understanding the Economic Model',
    DESCRIPTION: 'Explore the tokenomics of SOBA - our deflationary token with regular burns and fair distribution.'
  },
  FEATURES: [
    {
      TITLE: 'Deflationary Model',
      DESCRIPTION: 'Regular token burns reduce supply and increase scarcity',
      ICON: 'Flame'
    },
    {
      TITLE: 'Fair Distribution',
      DESCRIPTION: 'Transparent allocation across different segments',
      ICON: 'Users'
    },
    {
      TITLE: 'Liquidity Security',
      DESCRIPTION: 'Permanently locked liquidity for stability',
      ICON: 'Lock'
    },
    {
      TITLE: 'Community Driven',
      DESCRIPTION: 'Governance and decision making by token holders',
      ICON: 'Vote'
    },
    {
      TITLE: 'Regular Burns',
      DESCRIPTION: 'Monthly burns to maintain deflationary pressure',
      ICON: 'Flame'
    },
    {
      TITLE: 'Transparent Supply',
      DESCRIPTION: 'Real-time tracking of token metrics',
      ICON: 'LineChart'
    }
  ],
  METRICS: {
    ITEMS: {
      TOTAL_SUPPLY: {
        TITLE: 'Total Supply',
        VALUE: 1000000000,
        DESCRIPTION: 'Maximum token supply',
        DISPLAY_TYPE: 'number'
      },
      CIRCULATING: {
        TITLE: 'Circulating Supply',
        VALUE: 750000000,
        DESCRIPTION: 'Tokens in circulation',
        DISPLAY_TYPE: 'number'
      },
      BURNED: {
        TITLE: 'Burned Tokens',
        VALUE: BURN_INFO.TOTAL_BURNED,
        DESCRIPTION: 'Permanently removed from supply',
        DISPLAY_TYPE: 'number'
      },
      FOUNDER: {
        TITLE: 'Founder Holdings',
        VALUE: 40800000,
        DESCRIPTION: 'Tokens held by founder',
        DISPLAY_TYPE: 'number'
      },
      HOLDERS: {
        TITLE: 'Token Holders',
        VALUE: 1000,
        DESCRIPTION: 'Unique wallet addresses',
        DISPLAY_TYPE: 'number'
      },
      PRICE: {
        TITLE: 'Token Price',
        VALUE: 0,
        DESCRIPTION: 'Current token price in USD',
        DISPLAY_TYPE: 'price'
      }
    }
  },
  DISTRIBUTION: {
    TITLE: 'Token Distribution',
    SUBTITLE: 'Initial allocation of SOBA tokens across different segments',
    DESCRIPTION: 'Initial allocation of SOBA tokens',
    CHART_DATA: [
      { label: 'Public Sale', value: 40, color: '#FF6B00' },
      { label: 'Liquidity', value: 30, color: '#FF8C00' },
      { label: 'Team', value: 15, color: '#FFA500' },
      { label: 'Marketing', value: 10, color: '#FFB833' },
      { label: 'Development', value: 5, color: '#FFC966' }
    ]
  },
  SECTIONS: [
    {
      title: 'Token Distribution',
      description: 'Initial allocation of SOBA tokens',
      items: [
        { label: 'Public Sale', value: '40%' },
        { label: 'Liquidity', value: '30%' },
        { label: 'Team', value: '15%' },
        { label: 'Marketing', value: '10%' },
        { label: 'Development', value: '5%' }
      ]
    },
    {
      title: 'Burn Mechanism',
      description: 'Regular token burns to reduce supply',
      items: [
        { label: 'Burn Rate', value: '2% monthly' },
        { label: 'Burn Schedule', value: 'Monthly' },
        { label: 'Total Burned', value: `${BURN_INFO.TOTAL_BURNED.toLocaleString()} SOBA` }
      ]
    }
  ],
  CTA: {
    TITLE: 'Join the SOBA Community',
    SUBTITLE: 'Be part of our growing ecosystem',
    BUTTONS: {
      PRIMARY: {
        TEXT: 'Buy SOBA',
        URL: 'https://raydium.io/swap'
      },
      SECONDARY: {
        TEXT: 'Join Discord',
        URL: 'https://discord.gg/soba'
      }
    }
  }
} as const

// Other static content...