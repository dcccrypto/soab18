import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatNumber(number: number | string, decimals?: number): string {
  const num = typeof number === 'string' ? parseFloat(number) : number
  if (isNaN(num)) return '0'
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals ?? 2,
    maximumFractionDigits: decimals ?? 2
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
  
  // Format as MMM DD, YYYY (e.g., Dec 01, 2023)
  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
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

export function formatDateNew(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');
}

export function getCurrentMonthDates() {
  // Get current date in CST/CDT
  const now = new Date()
  const cstOffset = -6 * 60 // CST offset in minutes
  const localOffset = now.getTimezoneOffset()
  const offsetDiff = localOffset + cstOffset
  
  // Adjust to CST
  const cstNow = new Date(now.getTime() + offsetDiff * 60 * 1000)
  
  // Get next burn date (1st of next month at 4 AM CST)
  const getNextBurnDate = () => {
    const nextMonth = new Date(cstNow)
    nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1)
    nextMonth.setUTCDate(1)
    nextMonth.setUTCHours(4, 0, 0, 0) // 4 AM CST
    
    // If we're past this month's burn date, move to next month
    if (cstNow >= nextMonth) {
      nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1)
    }
    
    return nextMonth
  }

  const nextBurnDate = getNextBurnDate()
  const monthStart = new Date(cstNow)
  monthStart.setUTCDate(1)
  monthStart.setUTCHours(4, 0, 0, 0)

  return {
    startDate: monthStart.toISOString(),
    endDate: nextBurnDate.toISOString(),
    nextBurnDate: nextBurnDate.toISOString()
  }
}

// Format a date to CST/CDT timezone
export function formatDateToCst(date: Date) {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Chicago',
    hour12: true
  })
}

export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
