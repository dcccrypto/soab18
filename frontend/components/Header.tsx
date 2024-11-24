'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { NAV_LINKS } from '@/constants'
import { ButtonBase } from './ui/button-base'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  isDarkMode?: boolean
  toggleTheme?: () => void
}

interface NavLink {
  href: string
  label: string
  isActive: boolean
}

export const Header = ({ isDarkMode = true, toggleTheme }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const navLinks: NavLink[] = Object.entries(NAV_LINKS).map(([key, href]) => ({
    href,
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    isActive: pathname === href
  }))

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
              {navLinks.map(({ href, label, isActive }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-orange-400/90 hover:text-orange-400 transition-colors duration-300 text-base font-medium relative group
                    ${isActive ? 'text-orange-400' : ''}`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
              <ButtonBase 
                variant="default" 
                size="md"
                className="px-6 py-2 text-base font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-[0_4px_16px_rgba(255,165,0,0.15)] hover:shadow-[0_4px_16px_rgba(255,165,0,0.25)] transition-all duration-300"
                onClick={toggleTheme}
              >
                Connect Wallet
              </ButtonBase>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <ButtonBase
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 flex items-center justify-center text-orange-400"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </ButtonBase>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <nav className="bg-black/95 backdrop-blur-md border-b border-orange-500/10 shadow-lg shadow-black/20 p-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map(({ href, label, isActive }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-orange-400/90 hover:text-orange-400 transition-colors duration-300 text-base font-medium
                      ${isActive ? 'text-orange-400' : ''}`}
                    onClick={toggleMobileMenu}
                  >
                    {label}
                  </Link>
                ))}
                <ButtonBase 
                  variant="default" 
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  onClick={toggleTheme}
                >
                  Connect Wallet
                </ButtonBase>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
