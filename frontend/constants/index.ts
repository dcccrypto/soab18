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

// Token Information
export const TOKEN_INFO = {
  TOTAL_SUPPLY: 925219888.276,
  CIRCULATING_SUPPLY: 922295948.443,
  BURNED_TOKENS: 2923939.833,
  FOUNDER_HOLDINGS: 0.32,
  HOLDERS: 0,
  PRICE: 0.00554598,
  LAST_UPDATED: new Date().toISOString()
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

// Burn Information
export const BURN_INFO = {
  TOTAL_BURNED: 2923939.833,
  BURN_WALLET: "BurnWa11etXXXXXXXXXXXXXXXXXXXXXXXX",
  BURN_WALLET_ADDRESS: "BurnWa11etXXXXXXXXXXXXXXXXXXXXXXXX",
  BURN_RATE: 2, // 2% per transaction
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
    UPDATE_INTERVAL: 30000 // 30 seconds
  }
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

export const TOKENOMICS_CONTENT = {
  HERO: {
    TITLE: "$SOBA Tokenomics",
    SUBTITLE: "Discover the economic model behind $SOBA, designed for fairness, transparency, and community empowerment.",
    BACKGROUND_GRADIENT: "bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]"
  },
  DISTRIBUTION: {
    TITLE: "Token Distribution",
    SUBTITLE: "Current distribution of $SOBA tokens",
    CHART_DATA: [
      { 
        name: 'Circulating Supply', 
        value: TOKEN_INFO.CIRCULATING_SUPPLY, 
        color: '#FF6B00',
        percentage: 99.68
      },
      { 
        name: 'Burned Tokens', 
        value: TOKEN_INFO.BURNED_TOKENS, 
        color: '#FF8C00',
        percentage: 0.32
      }
    ]
  },
  METRICS: {
    TITLE: "Key Metrics",
    SUBTITLE: "Essential statistics about $SOBA token",
    ITEMS: {
      TOTAL_SUPPLY: {
        TITLE: "Total Supply",
        VALUE: TOKEN_INFO.TOTAL_SUPPLY,
        DESCRIPTION: "The original total supply of $SOBA tokens at launch",
        DISPLAY_TYPE: "number" as const
      },
      CIRCULATING: {
        TITLE: "Circulating Supply",
        VALUE: TOKEN_INFO.CIRCULATING_SUPPLY,
        DESCRIPTION: "Current $SOBA tokens in circulation",
        DISPLAY_TYPE: "number" as const
      },
      BURNED: {
        TITLE: "Burned Supply",
        VALUE: TOKEN_INFO.BURNED_TOKENS,
        DESCRIPTION: "Tokens permanently removed from circulation",
        DISPLAY_TYPE: "number" as const
      },
      PRICE: {
        TITLE: "Current Price",
        VALUE: TOKEN_INFO.PRICE,
        DESCRIPTION: "Live $SOBA token price in USD",
        DISPLAY_TYPE: "price" as const
      },
      HOLDERS: {
        TITLE: "Total Holders",
        VALUE: TOKEN_INFO.HOLDERS,
        DESCRIPTION: "Unique wallet addresses holding $SOBA",
        DISPLAY_TYPE: "number" as const
      }
    }
  },
  FEATURES: [
    {
      TITLE: "Fair Launch",
      DESCRIPTION: "Sol Bastard ($SOBA) had a fair launch on Pump.fun, ensuring that everyone had an equal opportunity to invest from the start. This approach aligns with our commitment to fairness and community empowerment.",
      ICON: "Flame",
      SHORT_DESC: "Equal opportunity for all participants",
      GRADIENT: "from-orange-500 to-orange-600"
    },
    {
      TITLE: "Community-Driven",
      DESCRIPTION: "The $SOBA community is at the heart of our project. We actively engage with our community through various social media platforms and involve them in key decisions, fostering a sense of ownership and shared success.",
      ICON: "Users",
      SHORT_DESC: "Active engagement and decision-making",
      GRADIENT: "from-orange-500 to-orange-600"
    },
    {
      TITLE: "Deflationary Model",
      DESCRIPTION: "Our token burning mechanism regularly reduces the total supply of $SOBA, creating a deflationary effect. This approach aims to increase the scarcity and potential value of $SOBA over time.",
      ICON: "Zap",
      SHORT_DESC: "Regular token burns to reduce supply",
      GRADIENT: "from-orange-500 to-orange-600"
    },
    {
      TITLE: "Liquidity Security",
      DESCRIPTION: "All liquidity for $SOBA has been permanently burned. This action enhances the token's stability and builds trust within our community by preventing rug pulls and ensuring long-term viability.",
      ICON: "Lock",
      SHORT_DESC: "All liquidity permanently burned",
      GRADIENT: "from-orange-500 to-orange-600"
    },
    {
      TITLE: "Transparency",
      DESCRIPTION: "We believe in full transparency. The initial developer allocation has been completely redistributed, demonstrating our commitment to a fair and community-driven project. Our current holdings are a result of active participation and project growth.",
      ICON: "Eye",
      SHORT_DESC: "Open communication and fair practices",
      GRADIENT: "from-orange-500 to-orange-600"
    }
  ],
  CTA: {
    TITLE: "Ready to Join the $SOBA Revolution?",
    SUBTITLE: "Be part of our community-driven journey and experience the future of memecoins.",
    BUTTONS: {
      PRIMARY: {
        TEXT: "Buy $SOBA Now",
        HREF: "#",
        ICON: "ArrowRight"
      },
      SECONDARY: {
        TEXT: "Join Our Community",
        HREF: "#",
        ICON: "Users"
      }
    }
  }
} as const 