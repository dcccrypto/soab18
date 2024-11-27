import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/toaster'
import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15000,
        gcTime: 1000 * 60 * 5,
        retry: 3,
      },
    },
  }));

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
} 
