import { useTheme as useNextTheme } from 'next-themes'

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  const currentTheme = theme === 'system' ? systemTheme : theme
  
  return {
    isDarkMode: currentTheme === 'dark',
    toggleTheme: () => setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }
} 