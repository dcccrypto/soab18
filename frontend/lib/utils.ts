import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// This is needed for button-base and other components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Remove duplicate formatNumber function and keep the more detailed one
export function formatNumber(number: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number)
}

export function shortenAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatDate(date: Date | number): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
} 