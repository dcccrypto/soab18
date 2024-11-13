import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { ASSETS, NAV_LINKS, ICON_SIZES } from '../constants';

interface HeaderProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export default function Header({ isDarkMode = true, toggleTheme }: HeaderProps) {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'White Paper', href: NAV_LINKS.WHITEPAPER },
    { name: 'Community', href: NAV_LINKS.COMMUNITY },
    { name: 'Roadmap', href: NAV_LINKS.ROADMAP },
  ];

  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <Link href="/">
          <Image 
            src={ASSETS.LOGO}
            alt="SOBA Logo" 
            width={ICON_SIZES.SOCIAL.width * 2}
            height={ICON_SIZES.SOCIAL.height * 2}
            className="w-24 h-auto" 
            priority
          />
        </Link>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
          <Button 
            asChild
            className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center gap-2"
          >
            <Link href="#dex-section">
              Buy $SOBA
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun size={ICON_SIZES.SOCIAL.width} />
              ) : (
                <Moon size={ICON_SIZES.SOCIAL.height} />
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
} 
