import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/toaster'
import { Layout } from '@/components/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
      disableTransitionOnChange
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </ThemeProvider>
  )
} 
