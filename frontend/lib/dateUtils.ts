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

export function getCurrentMonthDates() {
  const now = new Date()
  const cstNow = new Date(now.toLocaleString('en-US', { timeZone: BURN_TIMEZONE }))
  const cstYear = cstNow.getFullYear()
  const cstMonth = cstNow.getMonth()
  
  // Start date is 1st of current month
  const startDate = new Date(Date.UTC(cstYear, cstMonth, 1))
  const isDaylightSaving = isDST(startDate)
  startDate.setUTCHours(BURN_HOUR + (isDaylightSaving ? 5 : 6))
  startDate.setUTCMinutes(BURN_MINUTE)
  startDate.setUTCSeconds(0)
  startDate.setUTCMilliseconds(0)
  
  // End date is 1st of next month
  const endDate = new Date(startDate)
  endDate.setUTCMonth(endDate.getUTCMonth() + 1)
  
  return { startDate, endDate }
}

export function getNextBurnDate(): Date {
  const now = new Date()
  const cstNow = new Date(now.toLocaleString('en-US', { timeZone: BURN_TIMEZONE }))
  const cstYear = cstNow.getFullYear()
  const cstMonth = cstNow.getMonth()
  
  // Set initial burn date to 1st of current month
  const burnDate = new Date(Date.UTC(cstYear, cstMonth, 1))
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

export function getBurnDates() {
  const now = new Date()
  const cstNow = new Date(now.toLocaleString('en-US', { timeZone: BURN_TIMEZONE }))
  const cstYear = cstNow.getFullYear()
  const cstMonth = cstNow.getMonth()
  
  // Current month's burn date (1st of current month)
  const currentBurnDate = new Date(Date.UTC(cstYear, cstMonth, 1))
  const isDaylightSaving = isDST(currentBurnDate)
  currentBurnDate.setUTCHours(BURN_HOUR + (isDaylightSaving ? 5 : 6))
  currentBurnDate.setUTCMinutes(BURN_MINUTE)
  currentBurnDate.setUTCSeconds(0)
  currentBurnDate.setUTCMilliseconds(0)
  
  // Next month's burn date
  const nextBurnDate = new Date(currentBurnDate)
  nextBurnDate.setUTCMonth(nextBurnDate.getUTCMonth() + 1)
  
  return {
    currentBurn: currentBurnDate,
    nextBurn: nextBurnDate,
    isAfterCurrentBurn: cstNow > currentBurnDate
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
