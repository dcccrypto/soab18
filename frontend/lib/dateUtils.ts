// Constants for burn schedule
const BURN_HOUR = 10 // 10 AM CST
const BURN_MINUTE = 0
const BURN_TIMEZONE = 'America/Chicago'

function isDST(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset()
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
  const stdTimezoneOffset = Math.max(jan, jul)
  return date.getTimezoneOffset() < stdTimezoneOffset
}

export function getNextBurnDate(): Date {
  const now = new Date()
  
  // Create a date object in CST
  const cstNow = new Date(now.toLocaleString('en-US', { timeZone: BURN_TIMEZONE }))
  const cstYear = cstNow.getFullYear()
  const cstMonth = cstNow.getMonth()
  
  // Set initial burn date to 1st of current month at 10 AM CST
  const burnDate = new Date(Date.UTC(cstYear, cstMonth, 1))
  
  // Adjust for CST (UTC-6) or CDT (UTC-5)
  const isDaylightSaving = isDST(burnDate)
  burnDate.setUTCHours(BURN_HOUR + (isDaylightSaving ? 5 : 6))
  burnDate.setUTCMinutes(BURN_MINUTE)
  burnDate.setUTCSeconds(0)
  burnDate.setUTCMilliseconds(0)
  
  // If we're past this month's burn, move to next month
  if (cstNow > burnDate) {
    burnDate.setUTCMonth(burnDate.getUTCMonth() + 1)
  }
  
  return burnDate
}

export function getCurrentMonthDates() {
  const nextBurn = getNextBurnDate()
  
  // Start date is the 1st of the current month at burn time
  const startDate = new Date(nextBurn)
  startDate.setUTCMonth(startDate.getUTCMonth() - 1)
  
  return {
    startDate: startDate.toISOString(),
    endDate: nextBurn.toISOString(),
    nextBurnDate: nextBurn.toISOString()
  }
}

export function formatDateToCst(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: BURN_TIMEZONE,
    hour12: true
  }) + ' CST'
}

export function getTimeUntilNextBurn(): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const nextBurn = getNextBurnDate()
  
  // Convert both dates to UTC for comparison
  const diff = nextBurn.getTime() - now.getTime()
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds }
}

export function getBurnProgress(): number {
  const { startDate, endDate } = getCurrentMonthDates()
  const start = new Date(startDate)
  const end = new Date(endDate)
  const now = new Date()
  
  const totalTime = end.getTime() - start.getTime()
  const elapsedTime = now.getTime() - start.getTime()
  
  return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100))
}
