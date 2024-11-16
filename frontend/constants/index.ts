// Burn Information
export const BURN_INFO = {
  TOTAL_BURNED: 2923939.833,
  BURN_WALLET: "BurnWa11etXXXXXXXXXXXXXXXXXXXXXXXX",
  BURN_WALLET_ADDRESS: "BurnWa11etXXXXXXXXXXXXXXXXXXXXXXXX",
  BURN_RATE: 2,
  BURN_HISTORY: [
    {
      date: "2024-02-01T00:00:00Z",
      amount: 1000000,
      txHash: "xxxxx"
    },
    {
      date: "2024-01-15T00:00:00Z",
      amount: 923939.833,
      txHash: "xxxxx"
    },
    {
      date: "2024-01-01T00:00:00Z",
      amount: 1000000,
      txHash: "xxxxx"
    }
  ],
  NEXT_BURN: {
    TARGET_DATE: "2024-12-25T00:00:00Z",
    ESTIMATED_AMOUNT: 1000000,
    DESCRIPTION: "December Mega Burn Event",
    EVENT_NAME: "December Mega Burn",
    CURRENT_USD_VALUE: 55459.80,
    LAST_BURN_DATE: "2024-11-25T00:00:00Z"
  },
  DISPLAY: {
    DISPLAY_DECIMALS: 3,
    UPDATE_INTERVAL: 30000
  }
} as const;

// Token Information
export const TOKEN_INFO = {
  TOTAL_SUPPLY: 1000000000,
  CIRCULATING_SUPPLY: 750000000,
  BURNED_TOKENS: BURN_INFO.TOTAL_BURNED,
  DECIMALS: 9,
  SYMBOL: 'SOBA',
  NAME: 'SOBA Token',
  MINT_ADDRESS: 'SOBAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
} as const;

// Contract Information
export const CONTRACT_ADDRESS = "25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH"

// Icon Sizes (used across the application)
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
  }
} as const

// Social Links and Icons
export const SOCIAL_LINKS = {
  TWITTER: {
    name: 'Twitter',
    url: 'https://twitter.com/solbastard',
    icon: '/images/assets/icons/x_com_logo.png'
  },
  TELEGRAM: {
    name: 'Telegram',
    url: 'https://t.me/solbastard',
    icon: '/images/assets/icons/telegram_logo.png'
  },
  DISCORD: {
    name: 'TikTok',
    url: 'https://discord.gg/solbastard',
    icon: '/images/assets/icons/tiktok_logo.png'
  }
} as const

// Navigation Links
export const NAV_LINKS = {
  HOME: '/',
  WHITEPAPER: '/soba-whitepaper',
  COMMUNITY: '/community-page',
  BURNS: '/burns-page',
  TOKENOMICS: '/tokenomics-page',
  ROADMAP: '/3d-roadmap'
} as const

// DEX Links
export const DEX_LINKS = {
  DexScreener: {
    name: 'DexScreener',
    url: 'https://dexscreener.com/solana/25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8',
    icon: '/images/assets/icons/dexscreener.svg'
  },
  DexTools: {
    name: 'DexTools',
    url: 'https://www.dextools.io/app/solana/pair-explorer/25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8',
    icon: '/images/assets/icons/dextools.svg'
  },
  CoinGecko: {
    name: 'CoinGecko',
    url: 'https://www.coingecko.com/en/coins/sol-bastard',
    icon: '/images/assets/icons/coingecko.svg'
  },
  CoinMarketCap: {
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com/currencies/sol-bastard/',
    icon: '/images/assets/icons/cmc.svg'
  },
  CoinPaprika: {
    name: 'CoinPaprika',
    url: 'https://coinpaprika.com/coin/soba-sol-bastard/',
    icon: '/images/assets/icons/coinpaprika.svg'
  },
  CoinRanking: {
    name: 'CoinRanking',
    url: 'https://coinranking.com/coin/sol-bastard',
    icon: '/images/assets/icons/coinranking.svg'
  },
  Toobit: {
    name: 'Toobit',
    url: 'https://www.toobit.com/en-US/trade/SOBA_USDT',
    icon: '/images/assets/icons/toobit.svg'
  },
  Bitmart: {
    name: 'Bitmart',
    url: 'https://www.bitmart.com/trade/en-US?symbol=SOBA_USDT',
    icon: '/images/assets/icons/bitmart.svg'
  }
} as const


// Exchange Links
export const EXCHANGE_LINKS = {
  BITMART: 'https://www.bitmart.com/trade/en-US?symbol=SOBA_USDT',
  TOOBIT: 'https://www.toobit.com/en-US/trade/SOBA_USDT'
} as const

// Tracking Platform Links
export const TRACKING_LINKS = {
  DEXTOOLS: 'https://www.dextools.io/app/solana/pair-explorer/25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8',
  DEXSCREENER: 'https://dexscreener.com/solana/25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH8',
  COINGECKO: 'https://www.coingecko.com/en/coins/sol-bastard',
  CMC: 'https://coinmarketcap.com/currencies/sol-bastard/',
  COINPAPRIKA: 'https://coinpaprika.com/coin/soba-sol-bastard/',
  COINRANKING: 'https://coinranking.com/coin/sol-bastard'
} as const

// Assets and Dimensions
export const ASSETS = {
  LOGO: '/images/logo.svg',
  HERO: '/images/hero.png',
  ABOUT: '/images/about.png',
  LOGO_DIMENSIONS: {
    width: 32,
    height: 32
  }
} as const

// Team Information
export const TEAM_MEMBERS = [
  {
    name: 'Crypto Bastard',
    role: 'Founder',
    description: 'Famous TikTok influencer and the visionary behind $SOBA, bringing unparalleled reach and charisma to the project.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Pb (DarkCobraCalls)',
    role: 'Project Manager and Developer',
    description: 'Oversees project management, team coordination, and leads the development efforts, ensuring the technical success of $SOBA.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Dan Margin',
    role: 'Marketing Lead',
    description: 'Experienced negotiator with strong connections to numerous crypto influencers, driving $SOBA\'s promotional efforts.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Titus',
    role: 'Project Lead',
    description: 'Dynamic leader passionately driving the vision forward, supporting negotiations and strategic decisions.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Alex_TNT',
    role: 'NFT and Graphic Designer',
    description: 'Responsible for NFT development and graphic design, ensuring high-quality visual standards across the project.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  }
] as const

// Roadmap Phases
export const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    title: "Fair Launch",
    status: "Completed",
    description: "Successfully launched on Pump.fun and Raydium, establishing $SOBA's presence in the market."
  },
  {
    phase: "Phase 2",
    title: "Community Building",
    status: "Completed",
    description: "Engaged community across TikTok, Twitter (X), and Telegram, fostering a strong $SOBA culture."
  },
  {
    phase: "Phase 3",
    title: "Marketing Expansion",
    status: "Completed",
    description: "Launched campaigns featuring Crypto Bastard and partnered with key influencers to increase visibility."
  },
  {
    phase: "Phase 4",
    title: "Listings and Growth",
    status: "Completed",
    description: "Secured listings on CoinMarketCap and CoinGecko, enhancing credibility and reach."
  },
  {
    phase: "Phase 5",
    title: "Exchange Listings",
    status: "In Progress",
    description: "Expanding $SOBA's presence on various cryptocurrency exchanges for wider accessibility."
  },
  {
    phase: "Phase 6",
    title: "Strategic Partnerships",
    status: "Upcoming",
    description: "Forming alliances with complementary projects to strengthen the $SOBA ecosystem."
  },
  {
    phase: "Phase 7",
    title: "NFT Launch",
    status: "Upcoming",
    description: "Releasing an exclusive $SOBA NFT collection to add value for our community."
  },
  {
    phase: "Phase 8",
    title: "Advanced Features",
    status: "Planned",
    description: "Implementing staking, rewards systems, and other engaging utilities for $SOBA holders."
  }
] as const

export const MEME_IMAGES = {
  meme1: '/images/memes/meme1.jpg',
  meme2: '/images/memes/meme2.jpg',
  meme3: '/images/memes/meme3.jpg',
  meme4: '/images/memes/meme4.jpg',
  meme5: '/images/memes/meme5.jpg',
  meme6: '/images/memes/meme6.jpg',
  meme7: '/images/memes/meme7.jpg',
  meme8: '/images/memes/meme8.jpg',
} as const

export const BURN_DISPLAY = {
  TOTAL_SUPPLY: 1000000000,
  DISPLAY_DECIMALS: 2,
  BURN_STATS: {
    BURNED_TOKENS: 74779668.51,
    BURN_RATE: 2.5,
    NEXT_BURN_DATE: '2024-12-01'
  }
} as const

// Social Feed Data
export const SOCIAL_FEED_DATA = {
  X_UPDATES: [
    {
      id: 1,
      content: "🚀 $SOBA just hit another milestone! 75M tokens burned and counting. The revolution continues! #SOBAArmy",
      timestamp: "2h ago",
      engagement: "2.5K"
    },
    {
      id: 2,
      content: "New exchange listing coming soon! Stay tuned for the big announcement 👀 #SOBA #Solana",
      timestamp: "5h ago",
      engagement: "1.8K"
    },
    {
      id: 3,
      content: "Community meme contest winners announced! Check out the amazing entries on our website 🏆",
      timestamp: "8h ago",
      engagement: "3.2K"
    }
  ],
  TELEGRAM_HIGHLIGHTS: [
    {
      id: 1,
      content: "Welcome to all new SOBA holders! Remember to read the pinned messages for important info.",
      author: "SOBA Admin",
      timestamp: "1h ago"
    },
    {
      id: 2,
      content: "AMA session with the team starting in 2 hours! Get your questions ready! 🎤",
      author: "SOBA Team",
      timestamp: "4h ago"
    },
    {
      id: 3,
      content: "Community tip: Don't forget to join our weekly meme contests for a chance to win $SOBA tokens!",
      author: "SOBA Mod",
      timestamp: "6h ago"
    }
  ]
} as const

// Burn Page Sections
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
        title: "Next Burn",
        description: "Countdown to next scheduled burn"
      }
    ]
  },
  HISTORY: {
    TITLE: "Burn History",
    DESCRIPTION: "Historical data of $SOBA burns",
    TABLE_HEADERS: ["Date", "Amount Burned", "Transaction"]
  },
  CONTRIBUTE: {
    TITLE: "Contribute to the Burn",
    DESCRIPTION: "Send your $SOBA tokens to the burn wallet",
    STEPS: [
      "Ensure you have $SOBA tokens and some SOL for transaction fees",
      "Copy the burn wallet address",
      "Initiate a transfer of $SOBA to the burn wallet address",
      "Confirm the transaction and wait for it to be processed",
      "Your contribution will be reflected in the next burn update"
    ]
  }
} as const

// First, let's define the allowed icon types
type TokenomicsIcon = "Users" | "Flame" | "Scale" | "Zap" | "Lock" | "Eye" | "ArrowRight";

export const TOKENOMICS_CONTENT = {
  HERO: {
    TITLE: "SOBA Tokenomics",
    SUBTITLE: "Understanding the distribution and utility of $SOBA tokens"
  },
  DISTRIBUTION: {
    TITLE: "Token Distribution",
    SUBTITLE: "How $SOBA tokens are allocated across different purposes",
    CHART_DATA: [
      {
        name: 'Circulating Supply',
        value: TOKEN_INFO.CIRCULATING_SUPPLY,
        color: '#FF4500',
        percentage: 75
      },
      {
        name: 'Burned Tokens',
        value: TOKEN_INFO.BURNED_TOKENS,
        color: '#FF8C00',
        percentage: 2.92
      },
      {
        name: 'Reserved for Development',
        value: TOKEN_INFO.TOTAL_SUPPLY * 0.15,
        color: '#FFA500',
        percentage: 15
      },
      {
        name: 'Team Allocation',
        value: TOKEN_INFO.TOTAL_SUPPLY * 0.07,
        color: '#FFD700',
        percentage: 7
      }
    ]
  },
  METRICS: {
    TITLE: "Key Metrics",
    SUBTITLE: "Important statistics about $SOBA token",
    ITEMS: {
      TOTAL_SUPPLY: {
        VALUE: TOKEN_INFO.TOTAL_SUPPLY,
        LABEL: "Total Supply",
        DESCRIPTION: "Maximum number of $SOBA tokens that will ever exist",
        ICON: "Zap" as TokenomicsIcon,
        TITLE: "Total Supply",
        DISPLAY_TYPE: "number" as const
      },
      CIRCULATING_SUPPLY: {
        VALUE: TOKEN_INFO.CIRCULATING_SUPPLY,
        LABEL: "Circulating Supply",
        DESCRIPTION: "Number of $SOBA tokens currently in circulation",
        ICON: "Users" as TokenomicsIcon,
        TITLE: "Circulating Supply",
        DISPLAY_TYPE: "number" as const
      },
      BURNED_TOKENS: {
        VALUE: TOKEN_INFO.BURNED_TOKENS,
        LABEL: "Burned Tokens",
        DESCRIPTION: "Total number of $SOBA tokens permanently removed from circulation",
        ICON: "Flame" as TokenomicsIcon,
        TITLE: "Burned Tokens",
        DISPLAY_TYPE: "number" as const
      }
    }
  },
  FEATURES: [
    {
      TITLE: "Fair Launch",
      DESCRIPTION: "Equal opportunity for all investors through Pump.fun launch",
      ICON: "Scale" as TokenomicsIcon,
      SHORT_DESC: "Fair and transparent launch process"
    },
    {
      TITLE: "Regular Burns",
      DESCRIPTION: "Scheduled token burns to increase scarcity and value",
      ICON: "Flame" as TokenomicsIcon,
      SHORT_DESC: "Deflationary tokenomics"
    },
    {
      TITLE: "Community Driven",
      DESCRIPTION: "Governance and decision-making led by token holders",
      ICON: "Users" as TokenomicsIcon,
      SHORT_DESC: "Community-first approach"
    }
  ],
  CTA: {
    TITLE: "Get Involved with $SOBA",
    SUBTITLE: "Join the revolution in meme tokens",
    BUTTONS: {
      PRIMARY: {
        TITLE: "Buy $SOBA",
        DESCRIPTION: "Get your tokens now on supported exchanges",
        URL: "#buy-soba",
        ICON: "ArrowRight" as TokenomicsIcon,
        TEXT: "Buy $SOBA"
      },
      SECONDARY: {
        TITLE: "Join Community",
        DESCRIPTION: "Be part of the $SOBA revolution",
        URL: "#community",
        ICON: "Users" as TokenomicsIcon,
        TEXT: "Join Community"
      }
    }
  }
} as const; 