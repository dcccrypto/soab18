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

export const ASSETS = {
  LOGO: '/images/logo.svg',
  HERO: '/images/hero.png',
  ABOUT: '/images/about.png',
  LOGO_DIMENSIONS: {
    width: 32,
    height: 32
  }
} as const

export const BURN_HISTORY = {
  WALLET_ADDRESS: '7wtbTXc7Lyxt1enezJa7eNyNxenaLYsmBeiZTsA3KvwL',
  BURNS: [
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
  TOTAL_STATIC_BURNS: 2923939.833, // Sum of all historical burns
  DISPLAY_DECIMALS: 3,
  UPDATE_INTERVAL: 30000
} as const

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
  }
} as const

// Other static content... 