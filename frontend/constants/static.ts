import { BookDashed } from 'lucide-react'
import type { BurnTransaction, BurnInfo, RoadmapPhase } from '../types'
import { getBurnDates } from '@/lib/dateUtils'

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
  WHITEPAPER: 'whitepaper',
  COMMUNITY: '/community',
  BURNS: '/burns',
  TOKENOMICS: '/tokenomics',
  ROADMAP: '/roadmap'
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BURNS: '/burns',
  TOKENOMICS: '/tokenomics',
  ROADMAP: '/roadmap'
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

const burnDates = getBurnDates()
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const BURN_INFO: BurnInfo = {
  BURN_WALLET: "7wtbTXc7Lyxt1enezJa7eNyNxenaLYsmBeiZTsA3KvwL",
  TOTAL_BURNED: 86570000,
  BURN_RATE: 10000000,
  BURN_SCHEDULE: "Monthly - 1st of every month at 10:00 AM Central Time",
  LATEST_BURN: {
    date: burnDates.currentBurn.toISOString(),
    amount: 10000000,
    txId: "4F3m9BWdYvixUHaf7WoioTM9VH1p6mz9pfzLHoFoRDE2bqJogAgvDM7uyXcqhHj3NpnK9jsiHAXXdMoAZzdWsXib"
  },
  NEXT_BURN: {
    TARGET_DATE: burnDates.nextBurn.toISOString(),
    LAST_BURN_DATE: burnDates.currentBurn.toISOString(),
    EVENT_NAME: `${monthNames[burnDates.nextBurn.getMonth()]} Burn Event`,
    DESCRIPTION: `Monthly token burn for ${monthNames[burnDates.nextBurn.getMonth()]}`,
    AMOUNT: 10000000
  },
  PROGRESS: 0,
  START_DATE: burnDates.currentBurn.toISOString(),
  END_DATE: burnDates.nextBurn.toISOString(),
  NEXT_BURN_DATE: burnDates.nextBurn.toISOString()
} as const

// Replace the generateBurnHistory function with actual data
export const BURN_HISTORY: BurnTransaction[] = [
  {
    txId: '4F3m9BWdYvixUHaf7WoioTM9VH1p6mz9pfzLHoFoRDE2bqJogAgvDM7uyXcqhHj3NpnK9jsiHAXXdMoAZzdWsXib',
    amount: 12777077,
    date: '01/12/2024',
    value: 86465.42,
  },
  {
    txId: '5rAonRA58uCnMYz3bek3M3RCf8j31GHsb2AeuMrcYSdCogSN5EUzXA5pCZJZi4tHDDXtd2URM4uxCM7AmtQc9VxL',
    amount: 11090000,
    date: '23/07/2024',
    value: 18436.84,
  },
  {
    txId: '2YJddGWGfJ6wmk5DjjB5jmLonZvB8GBLv4gzJA4QZEGM9TTj38r68AgvMEN9QWCiPcDV57JfoNv2CDjBcUEWo7yZ',
    amount: 22000000,
    date: '01/08/2024',
    value: 41518.37
  },
  {
    txId: 'apj6z65J7fuG5posHKDMGGpUSjLVbZW8yChBrAZR4Xg8kTjAoL3az5wdU6BanCDVsq7hqxjhP8nKpRJ4fRu2xJ9',
    amount: 215000,
    date: '19/08/2024',
    value: 170.55
  },
  {
    txId: '5a5AztHHBSXYcsxoc17bKQhyJCytdimPmSaWVhrApG99xhJSWtVWExcvwKPp4XmWVbdQJDgY8VKhVZU6mEGeLUUu',
    amount: 21420000,
    date: '25/08/2024',
    value: 25515.97
  },
  {
    txId: '3PLRtU2i3KLwA7FMPL1KuZozbFeNyyqkHJVznqNBpqKFNJ6A7iUDxWXjHL8hRxh7rycZUNxUFFAjfiego7oVF9HN',
    amount: 3280000,
    date: '01/10/2024',
    value: 4517
  },
  {
    txId: '4s4EyPN8SSicrbRx9mc3ECAjbZQU1azGtfGtXUao3kE3UW6LRdTvdwXwDamRLxNvGt2iGHX7SvbWt9kGuyNSNX9A',
    amount: 15970000,
    date: '30/10/2024',
    value: 77614.03
  }
] as const

export const BURN_SECTIONS = {
  HERO: {
    TITLE: "The SOBA Cigar Lounge",
    SUBTITLE: "Where tokens go up in smoke and value rises like fine cigar smoke"
  },
  WALLET: {
    TITLE: "The VIP Vault",
    DESCRIPTION: "Where $SOBA tokens retire in style"
  },
  STATS: {
    TITLE: "Smoke & Numbers",
    CARDS: [
      {
        title: "Gone Like Smoke",
        description: "These tokens are enjoying the afterlife"
      },
      {
        title: "Luxury Locked",
        description: "The value of our premium stash"
      }
    ]
  },
  CONTRIBUTE: {
    TITLE: "Join the Smoking Circle",
    DESCRIPTION: "Help make SOBA more exclusive:",
    STEPS: [
      "Acquire your SOBA tokens",
      "Copy our premium vault address",
      "Send tokens to the vault",
      "Watch them vanish in style",
      "Track your contribution in our ledger"
    ]
  }
} as const

export const SOCIAL_LINKS = {
  TWITTER: {
    name: 'Twitter',
    url: 'https://x.com/SolBastardSoba',
    icon: '/images/assets/icons/x_com_logo.png'
  },
  TELEGRAM: {
    name: 'Telegram',
    url: 'https://t.me/SolBastardSOBA',
    icon: '/images/assets/icons/telegram_logo.png'
  },
  TIKTOK: {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@cryptobastard',
    icon: '/images/assets/icons/tiktok_logo.png'
  }
} as const

export const DEX_LINKS = {
  COINGECKO: {
    name: "CoinGecko",
    description: "Real-time market data",
    url: "https://www.coingecko.com/en/coins/sol-bastard",
    icon: "/images/assets/icons/coingecko.svg"
  },
  COINMARKETCAP: {
    name: "CoinMarketCap",
    description: "Real-time market data",
    url: "https://coinmarketcap.com/currencies/soba-token",
    icon: "/images/assets/icons/cmc.svg"
  },
  DEXSCREENER: {
    name: "Dex Screener",
    description: "Token analytics",
    url: "https://dexscreener.com/solana/25p2bonp6qrjh5as6ek6h7ei495oskyzd3tgb97sqfmh",
    icon: "/images/assets/icons/dexscreener.svg"
  },
  DEXTOOLS: {
    name: "Dex Tools",
    description: "Token analytics",
    url: "https://www.dextools.io/app/en/solana/pair-explorer/2zjiSTrub1KPtuJzDoRyXcUHFLLC5doUsmStyBi5SjXG?t=1717700292610",
    icon: "/images/assets/icons/dextools.svg"
  },

  BOSA: {
    name: "Bosa",
    description: "Bastard",
    url: "https://bosabastard.com",
    icon: "/images/bosalogo.png"
  }

} as const

export const TOKEN_INFO = {
  HERO: {
    TITLE: "SOBA Economics",
    SUBTITLE: "Where Sophistication Meets Scarcity"
  },
  METRICS: {
    SUPPLY: {
      TITLE: "Limited Edition Supply",
      DESCRIPTION: "Like a rare vintage, our token supply is carefully curated"
    },
    HOLDERS: {
      TITLE: "Distinguished Holders",
      DESCRIPTION: "Our growing society of sophisticated investors"
    },
    BURNED: {
      TITLE: "Premium Burns",
      DESCRIPTION: "Tokens retired in our exclusive vault"
    }
  },
  BURNED_TOKENS: "1,000,000",
  SECTIONS: [
    {
      title: 'Refined Distribution',
      description: 'Strategic allocation of SOBA tokens',
      items: [
        { label: 'Public Sale', value: '40%', description: 'Fair launch for our distinguished community' },
        { label: 'Liquidity', value: '30%', description: 'Ensuring smooth trading for our holders' },
        { label: 'Team', value: '15%', description: 'Reserved for our dedicated connoisseurs' },
        { label: 'Marketing', value: '10%', description: 'Promoting the SOBA lifestyle' },
        { label: 'Development', value: '5%', description: 'Crafting premium features' }
      ]
    }
  ],
  CTA: {
    TITLE: "Join the SOBA Elite",
    SUBTITLE: "Become part of our distinguished circle",
    BUTTONS: {
      PRIMARY: {
        TEXT: "Acquire SOBA",
        URL: "https://jup.ag/swap/soba-SOL"
      },
      SECONDARY: {
        TEXT: "Enter the Lounge",
        URL: SOCIAL_LINKS.TELEGRAM.url
      }
    }
  }
} as const

export const CONTRACT_ADDRESS = '25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH'

export const SOCIAL_FEED_DATA = {
  X_UPDATES: [
    {
      id: '1',
      content: 'Just burned another 1M $SOBA tokens. Stay alpha, stay smoking. 💨',
      timestamp: '15/03/2024',
      engagement: 1650,
      username: 'sobatoken',
      author: 'SOL Bastard',
      profileImage: '/images/assets/icons/logo.svg'
    },
    {
      id: '2',
      content: 'Beta coins cry, alpha chimps thrive. Another day in the SOBA lounge. 🎩🔥',
      timestamp: '12/03/2024',
      engagement: 1210,
      username: 'sobatoken',
      author: 'SOL Bastard',
      profileImage: '/images/assets/icons/logo.svg'
    }
  ],
  TELEGRAM_HIGHLIGHTS: [
    {
      id: '1',
      content: 'New burn mechanism dropping soon. Time to separate the alphas from the paper hands! 🔥',
      timestamp: '14/03/2024',
      engagement: 567,
      username: 'SOBA Official',
      author: 'SOL Bastard',
      memberCount: '5,000+'
    },
    {
      id: '2',
      content: 'VIP AMA this weekend in the cigar lounge. Bring your finest Cuban! 🚬',
      timestamp: '13/03/2024',
      engagement: 432,
      username: 'SOBA Official',
      author: 'SOL Bastard',
      memberCount: '5,000+'
    }
  ]
} as const

export const MEME_IMAGES = [
  '/images/memes/meme1.jpg',
  '/images/memes/meme2.jpg',
  '/images/memes/meme3.jpg'
] as const

export const ROADMAP_CONTENT = {
  PHASES: [
    {
      title: "Fair Launch",
      status: "Completed",
      description: "Launch on Pump.fun and Raydium",
      icon: "Rocket"
    },
    {
      title: "Community Building",
      status: "Completed",
      description: "Engagement on TikTok, Twitter (X), Telegram",
      icon: "Users"
    },
    {
      title: "Marketing Expansion",
      status: "Completed",
      description: "Campaigns featuring Crypto Bastard, influencer partnerships",
      icon: "Megaphone"
    },
    {
      title: "Listings and Growth",
      status: "Completed",
      description: "Listings on CoinMarketCap and CoinGecko, community giveaways",
      icon: "LineChart"
    },
    {
      title: "Exchange Listings",
      status: "Completed",
      description: "Additional exchange listings",
      icon: "BarChart"
    },
    {
      title: "Strategic Partnerships",
      status: "Completed",
      description: "Collaborations with other projects and influencers",
      icon: "Handshake"
    },
    {
      title: "NFT Launch",
      status: "Completed",
      description: "Release exclusive $SOBA NFT collection",
      icon: "Palette"
    },
    {
      title: "Regular Burns",
      status: "Completed",
      description: "Implement regular burns",
      icon: "Flame"
    },
    {
      title: "Advanced Features",
      status: "Upcoming",
      description: "NFT staking, AI-driven PFP Generator, gated content",
      icon: "Cpu"
    },
    {
      title: "Gamification",
      status: "Upcoming",
      description: "Leaderboards, achievement system, social sharing",
      icon: "Gamepad"
    },
    {
      title: "DAO Transition",
      status: "Upcoming",
      description: "Decentralized governance, community voting",
      icon: "Vote"
    },
    {
      title: "Expansion",
      status: "Upcoming",
      description: "Strategic alliances, cross-platform engagement, mainstream presence",
      icon: "Rocket"
    }
  ],
  SECTIONS: {
    COMPLETED: {
      TITLE: "Completed Milestones",
      DESCRIPTION: "What we've achieved so far"
    },
    UPCOMING: {
      TITLE: "Upcoming Developments",
      DESCRIPTION: "What's next for SOBA"
    }
  },
  CTA: {
    TITLE: "Ready to Join the $SOBA Revolution?",
    DESCRIPTION: "Don't miss out on the opportunity to be part of something extraordinary.",
    BUTTONS: {
      PRIMARY: {
        TEXT: "Buy $SOBA Now",
        URL: "https://jup.ag/swap/soba-SOL"
      },
      SECONDARY: {
        TEXT: "Join Our Community",
        URL: SOCIAL_LINKS.TELEGRAM.url
      }
    }
  }
} as const

export const TEAM_MEMBERS = [
  {
    name: 'SOL Bastard',
    role: 'The Distinguished Founder',
    description: 'Our cigar-smoking mastermind who keeps SOBA sophisticated. Always planning the next power move from his penthouse office.',
    imageUrl: '/images/assets/team/founder.jpg',
    image: '/images/assets/team/founder.jpg',
    social: {
      twitter: 'https://twitter.com/cryptobastard',
      telegram: 'https://t.me/cryptobastard'
    }
  },
  {
    name: 'PB',
    role: 'Tech Connoisseur',
    description: 'The genius behind SOBA\'s premium features. Crafts elegant solutions while maintaining our high standards of excellence.',
    imageUrl: '/images/assets/team/dev.jpg',
    image: '/images/assets/team/dev.jpg',
    social: {
      twitter: 'https://twitter.com/sobadev',
      github: 'https://github.com/sobadev'
    }
  },
  {
    name: 'Dan Margin',
    role: 'Deal Maestro',
    description: 'Our connection to the finer circles of crypto. Opens doors and secures partnerships with the elegance of a seasoned diplomat.',
    imageUrl: '/images/assets/team/negotiator.jpg',
    image: '/images/assets/team/negotiator.jpg',
    social: {
      twitter: 'https://twitter.com/danmargin',
      telegram: 'https://t.me/danmargin'
    }
  },
  {
    name: 'Alex_TNT',
    role: 'Art Wizard',
    description: 'The creative genius behind our awesome NFTs. If it looks cool, Alex probably made it!',
    imageUrl: '/images/assets/team/nft.jpg',
    image: '/images/assets/team/nft.jpg',
    social: {
      twitter: 'https://twitter.com/alex_tnt',
      instagram: 'https://instagram.com/alex_tnt'
    }
  }
] as const

export const TOKENOMICS_CONTENT = {
  TITLE: 'SOBA Economics',
  DESCRIPTION: 'The Art of Alpha Tokenomics',
  HERO: {
    TITLE: 'SOBA Economics',
    SUBTITLE: 'Where Alphas Get Richer',
    DESCRIPTION: 'Discover how SOBA maintains its dominance through strategic burns and sigma distribution.'
  },
  FEATURES: [
    {
      TITLE: 'Alpha Scarcity',
      DESCRIPTION: 'Regular burns keep paper hands crying',
      ICON: 'Flame'
    },
    {
      TITLE: 'Sigma Distribution',
      DESCRIPTION: 'Fair allocation for true alphas',
      ICON: 'Users'
    },
    {
      TITLE: 'Diamond Hands',
      DESCRIPTION: 'Liquidity is smoked to ashes',
      ICON: 'Flame'
    },
    {
      TITLE: 'Chad Governance',
      DESCRIPTION: 'Your voice in the alpha club',
      ICON: 'Vote'
    },
    {
      TITLE: 'Smoke & Burn',
      DESCRIPTION: 'Monthly token reduction events',
      ICON: 'Flame'
    },
    {
      TITLE: 'Based Transparency',
      DESCRIPTION: 'Full clarity for the squad',
      ICON: 'LineChart'
    }
  ],
  METRICS: {
    ITEMS: {
      TOTAL_SUPPLY: {
        TITLE: 'Total Supply',
        VALUE: 1000000000,
        DESCRIPTION: 'Maximum alpha tokens',
        DISPLAY_TYPE: 'number'
      },
      CIRCULATING: {
        TITLE: 'Circulating Supply',
        VALUE: 750000000,
        DESCRIPTION: 'Tokens in diamond hands',
        DISPLAY_TYPE: 'number'
      },
      BURNED: {
        TITLE: 'Burned Tokens',
        VALUE: BURN_INFO.TOTAL_BURNED,
        DESCRIPTION: 'Tokens that will never be seen again',
        DISPLAY_TYPE: 'number'
      },
      FOUNDER: {
        TITLE: 'Founder Holdings',
        VALUE: 40800000,
        DESCRIPTION: 'SOL Bastard\'s stash',
        DISPLAY_TYPE: 'number'
      },
      HOLDERS: {
        TITLE: 'Based Holders',
        VALUE: 1000,
        DESCRIPTION: 'Diamond hand chads',
        DISPLAY_TYPE: 'number'
      },
      PRICE: {
        TITLE: 'Current Price',
        VALUE: 0,
        DESCRIPTION: 'Alpha pricing',
        DISPLAY_TYPE: 'price'
      }
    }
  },
  DISTRIBUTION: {
    TITLE: 'Token Distribution',
    SUBTITLE: 'The Alpha Allocation',
    DESCRIPTION: 'How SOBA tokens are allocated',
    DATA: [
      { name: 'Liquidity', value: 40 },
      { name: 'Community', value: 30 },
      { name: 'Team', value: 15 },
      { name: 'Marketing', value: 15 }
    ]
  },
  CTA: {
    TITLE: "Join the Alpha Movement",
    SUBTITLE: "Become Part of the Elite",
    DESCRIPTION: "Be part of the most based token on Solana",
    BUTTONS: {
      PRIMARY: {
        TEXT: "Buy $SOBA",
        URL: "https://jup.ag/swap/soba-SOL"
      },
      SECONDARY: {
        TEXT: "Join Community",
        URL: "/community"
      }
    }
  }
} as const

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Other static content...

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Grand Opening",
    status: "Completed",
    description: "Launched with sophistication on premium platforms",
    objective: "Ensure fair distribution of tokens",
    details: "A distinguished debut worthy of SOBA's status",
    icon: "Rocket"
  },
  {
    phase: 2,
    title: "Elite Community",
    status: "Completed",
    description: "Building our circle of distinguished holders",
    objective: "Build strong community presence",
    details: "Cultivating a community of refined crypto enthusiasts",
    icon: "Users"
  },
  {
    phase: 3,
    title: "Marketing Expansion",
    status: "Completed",
    description: "Campaigns featuring Crypto Bastard, influencer partnerships",
    objective: "Increase brand awareness",
    details: "Successfully executed marketing campaigns with key influencers.",
    icon: "Megaphone"
  },
  {
    phase: 4,
    title: "Listings and Growth",
    status: "Completed",
    description: "Listings on CoinMarketCap and CoinGecko, community giveaways",
    objective: "Enhance market presence",
    details: "Achieved listings on major tracking platforms.",
    icon: "LineChart"
  },
  {
    phase: 5,
    title: "Exchange Listings",
    status: "Completed",
    description: "Additional exchange listings",
    objective: "Increase trading accessibility",
    details: "Successfully listed on multiple exchanges.",
    icon: "BarChart"
  },
  {
    phase: 6,
    title: "Strategic Partnerships",
    status: "Completed",
    description: "Collaborations with other projects and influencers",
    objective: "Expand ecosystem reach",
    details: "Formed strategic alliances with key projects and influencers.",
    icon: "Handshake"
  },
  {
    phase: 7,
    title: "NFT Launch",
    status: "Completed",
    description: "Release exclusive $SOBA NFT collection",
    objective: "Expand the ecosystem with collectible digital assets",
    details: "Successfully launched exclusive NFT collection.",
    icon: "Palette"
  },
  {
    phase: 8,
    title: "Regular Burns",
    status: "Completed",
    description: "Implement regular burns",
    objective: "Boost long-term value by reducing supply",
    details: "Implemented systematic burn mechanism.",
    icon: "Flame"
  },
  {
    phase: 9,
    title: "Advanced Features",
    status: "Upcoming",
    description: "NFT staking, AI-driven PFP Generator, gated content",
    objective: "Enhance ecosystem with unique features",
    details: "Development of advanced features in progress.",
    icon: "Cpu"
  },
  {
    phase: 10,
    title: "Gamification",
    status: "Upcoming",
    description: "Leaderboards, achievement system, social sharing",
    objective: "Drive engagement through interactive experiences",
    details: "Planning implementation of gamification features.",
    icon: "Gamepad"
  },
  {
    phase: 11,
    title: "DAO Transition",
    status: "Upcoming",
    description: "Decentralized governance, community voting",
    objective: "Enable community governance",
    details: "Preparing for transition to DAO structure.",
    icon: "Vote"
  },
  {
    phase: 12,
    title: "Expansion",
    status: "Upcoming",
    description: "Strategic alliances, cross-platform engagement, mainstream presence",
    objective: "Achieve mainstream adoption",
    details: "Planning strategic expansion across platforms.",
    icon: "Rocket"
  }
] as const

export const TRACKING_LINKS = {
  COINGECKO: {
    name: "CoinGecko",
    description: "Track SOBA's distinguished performance",
    url: "https://www.coingecko.com/en/coins/soba",
    icon: "/images/assets/tracking/coingecko.png"
  },
  CMC: {
    name: "CoinMarketCap",
    description: "Monitor SOBA's market presence",
    url: "https://coinmarketcap.com/currencies/soba/",
    icon: "/images/assets/tracking/cmc.png"
  }
} as const

export const COMMUNITY_EVENTS = [
  {
    title: "Alpha Hour",
    description: "Weekly alpha leaks from SOL Bastard himself. No betas allowed.",
    date: "2024-03-20",
    type: "AMA"
  },
  {
    title: "Burn & Earn",
    description: "Monthly token burn ceremony. Watch your bag grow while others cry.",
    date: "2024-03-25",
    type: "Event"
  },
  {
    title: "Cigar Lounge Social",
    description: "VIP holders only. Premium cigars and premium gains.",
    date: "2024-03-30",
    type: "Social"
  }
]