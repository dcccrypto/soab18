import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow pt-[64px]">
        {children}
      </main>
      <Footer />
    </div>
  )
} 