import type { NextApiRequest, NextApiResponse } from 'next';
import type { TokenStatsResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenStatsResponse>
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');
    const response = await fetch(`${apiUrl}/token-stats`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure all numeric values are properly formatted
    const formattedData: TokenStatsResponse = {
      price: Number(data.price),
      totalSupply: Number(data.totalSupply),
      circulatingSupply: Number(data.circulatingSupply),
      burnedTokens: Number(data.burnedTokens),
      founderBalance: Number(data.founderBalance),
      holders: Number(data.holders),
      marketCap: Number(data.marketCap),
      totalValue: Number(data.totalValue),
      burnedValue: Number(data.burnedValue),
      founderValue: Number(data.founderValue),
      toBeBurnedTokens: Number(data.toBeBurnedTokens),
      toBeBurnedValue: Number(data.toBeBurnedValue),
      burnRate: Number(data.burnRate),
      lastUpdated: data.lastUpdated,
      cached: Boolean(data.cached),
      cacheAge: data.cacheAge ? Number(data.cacheAge) : undefined
    };

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('[Token Stats API Error]:', error);
    res.status(500).json({
      price: 0,
      totalSupply: 1_000_000_000,
      circulatingSupply: 0,
      burnedTokens: 0,
      founderBalance: 0,
      holders: 0,
      marketCap: 0,
      totalValue: 0,
      burnedValue: 0,
      founderValue: 0,
      toBeBurnedTokens: 0,
      toBeBurnedValue: 0,
      burnRate: 0,
      lastUpdated: new Date().toISOString(),
      cached: false,
      cacheAge: 0
    });
  }
}