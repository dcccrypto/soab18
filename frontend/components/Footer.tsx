'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/constants'
import { cn } from '@/lib/utils'

const socialLinksArray = Object.values(SOCIAL_LINKS)

export function Footer() {
  return (
    <footer className="relative">
      {/* Footer background with smooth gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 backdrop-blur-[2px]" />
      
      {/* Top border gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-4">
            <motion.div 
              className="flex items-center gap-4 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/assets/icons/logo.svg"
                alt="SOBA Logo"
                width={32}
                height={32}
                className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                priority
              />
              <span className="text-orange-500 font-bold text-xl">$SOBA</span>
            </motion.div>
            <p className="text-sm text-gray-400 max-w-xs">
              The most innovative memecoin on Solana, building a vibrant community and revolutionary features.
            </p>
          </div>

          {/* Quick Links Section */}
          <nav className="flex flex-col gap-6">
            <h4 className="text-orange-500 font-semibold text-lg">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/tokenomics', label: 'Tokenomics' },
                { href: '/token-burns', label: 'Token Burns' },
                { href: '/community', label: 'Community' }
              ].map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href}
                    className="text-orange-400 hover:text-orange-300 transition-colors relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300 rounded-lg -z-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Resources Section */}
          <nav className="flex flex-col gap-6">
            <h4 className="text-orange-500 font-semibold text-lg">Resources</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/whitepaper', label: 'Whitepaper' },
                { href: '/roadmap', label: 'Roadmap' },
                { href: '/faq', label: 'FAQ' }
              ].map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href}
                    className="text-orange-400 hover:text-orange-300 transition-colors relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300 rounded-lg -z-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Connect Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-orange-500 font-semibold text-lg">Connect</h4>
            <div className="flex gap-4">
              {socialLinksArray.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group p-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={social.icon}
                    alt={`${social.name} Icon`}
                    width={24}
                    height={24}
                    className="relative z-10"
                  />
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300 rounded-full" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-orange-500/10 text-center text-sm text-gray-400">
          <p> 2024 $SOBA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
