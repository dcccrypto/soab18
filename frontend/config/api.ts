// Default to Heroku URL in production, localhost in development
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  'https://soba-api-v1-127255a88636.herokuapp.com';

// API endpoints
export const API_ENDPOINTS = {
  MEMES: {
    UPLOAD: `${API_BASE_URL}/api/memes/upload`,
    GET_ALL: `${API_BASE_URL}/api/memes`,
  },
  TOKEN_STATS: `${API_BASE_URL}/token-stats`,
} as const;
