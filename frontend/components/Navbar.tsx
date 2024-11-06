import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="SOBA Logo" 
            width={40} 
            height={40}
            className="mr-2"
          />
          <span className="text-2xl font-bold text-orange-400">SOBA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/burns-page" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Burns
          </Link>
          <Link href="/tokenomics-page" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Tokenomics
          </Link>
          <Link href="/3d-roadmap" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Roadmap
          </Link>
          <Link href="/community-page" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
            Community
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-orange-400 hover:text-orange-300"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-orange-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 p-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/burns-page" 
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Burns
            </Link>
            <Link 
              href="/tokenomics-page" 
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Tokenomics
            </Link>
            <Link 
              href="/3d-roadmap" 
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmap
            </Link>
            <Link 
              href="/community-page" 
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-orange-400 hover:text-orange-300 justify-start"
            >
              {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
} 
