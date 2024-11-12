import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { Sun, Moon, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export default function Header({ isDarkMode = true, toggleTheme }: HeaderProps) {
  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <Link href="/">
          <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-DBqVkxZx-T3IBDgcc0UVW81J7xogS5cUSXwPGrR.png" 
            alt="Sol Bastard Logo" 
            width={100} 
            height={100} 
            className="w-24 h-auto" 
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Home
          </Link>
          <Link href="/soba-whitepaper" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            White Paper
          </Link>
          <Link href="/community-page" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Community
          </Link>
          <Link href="/3d-roadmap" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Roadmap
          </Link>
          <Button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center gap-2">
            Buy $SOBA
            <ArrowRight className="w-4 h-4" />
          </Button>
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
} 
