import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number | string, decimals = 2): string {
  const num = typeof number === 'string' ? parseFloat(number) : number
  if (isNaN(num)) return '0'
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

export function shortenAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function isValidDate(date: any): boolean {
  if (!date) return false
  const parsedDate = new Date(date)
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
}

export function formatDate(date: Date | string | number): string {
  if (!isValidDate(date)) return 'Invalid Date'
  
  const parsedDate = new Date(date)
  
  // If the date is today
  const today = new Date()
  if (parsedDate.toDateString() === today.toDateString()) {
    return 'Today'
  }
  
  // If the date is yesterday
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (parsedDate.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }
  
  // If the date is within this year, don't show the year
  if (parsedDate.getFullYear() === today.getFullYear()) {
    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Default format for older dates
  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatDateTime(date: Date | string | number): string {
  if (!isValidDate(date)) return 'Invalid Date'
  
  const parsedDate = new Date(date)
  
  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getRelativeTime(date: Date | string | number): string {
  if (!isValidDate(date)) return 'Invalid Date'
  
  const parsedDate = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}