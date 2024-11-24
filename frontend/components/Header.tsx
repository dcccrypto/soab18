'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { NAV_LINKS } from '@/constants'
import { ButtonBase } from './ui/button-base'

interface HeaderProps {
  isDarkMode?: boolean
  toggleTheme?: () => void
}

export const Header = ({ isDarkMode = true, toggleTheme }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-b from-black via-black/98 to-black/95 backdrop-blur-md border-b border-orange-500/10 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                priority
                className="w-10 h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {Object.entries(NAV_LINKS).map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  className="text-orange-400/90 hover:text-orange-400 transition-colors duration-300 text-base font-medium relative group"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <ButtonBase 
                variant="default" 
                size="md"
                className="px-6 py-2 text-base font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-[0_4px_16px_rgba(255,165,0,0.15)] hover:shadow-[0_4px_16px_rgba(255,165,0,0.25)] transition-all duration-300"
              >
                Buy $SOBA
              </ButtonBase>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-orange-500 p-2 rounded-xl hover:bg-orange-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/98 to-black/95 backdrop-blur-md border-b border-orange-500/10 shadow-lg shadow-black/20"
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col space-y-2 py-4">
                {Object.entries(NAV_LINKS).map(([key, href]) => (
                  <ButtonBase
                    key={key}
                    variant="ghost"
                    size="md"
                    className="w-full justify-start text-left hover:bg-orange-500/10"
                    onClick={() => {
                      window.location.href = href;
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </ButtonBase>
                ))}
                <ButtonBase 
                  variant="default"
                  size="md"
                  className="w-full shadow-[0_4px_16px_rgba(255,165,0,0.15)] hover:shadow-[0_4px_16px_rgba(255,165,0,0.25)]"
                >
                  Buy $SOBA
                </ButtonBase>
                {toggleTheme && (
                  <ButtonBase
                    variant="ghost"
                    size="md"
                    onClick={toggleTheme}
                    className="w-full justify-start text-left hover:bg-orange-500/10"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-5 h-5 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </ButtonBase>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
} 
