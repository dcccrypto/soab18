'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Copy, Flame, TrendingUp, Users } from 'lucide-react'
import { ContractAddress } from '@/components/ContractAddress'
import { SocialLinks } from '@/components/SocialLinks'
import { 
  TOKEN_INFO, 
  CONTRACT_ADDRESS, 
  DEX_LINKS, 
  ASSETS, 
  ICON_SIZES,
  NAV_LINKS 
} from '../constants'

export default function LandingPage() {
  const [burnedTokens] = useState(TOKEN_INFO.BURNED_TOKENS)
  const [burnedValue] = useState("$1,234,567")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src={ASSETS.LOGO}
                alt="SOBA Logo"
                width={ASSETS.LOGO_DIMENSIONS.width * 1.5}
                height={ASSETS.LOGO_DIMENSIONS.height * 1.5}
                className="mx-auto mb-8"
                priority
              />
              <h1 className="text-5xl font-bold mb-4">Welcome to $SOBA</h1>
              <p className="text-xl text-gray-300 mb-8">
                The most rebellious memecoin on Solana
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  asChild
                  className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white"
                >
                  <Link href="#dex-section">Buy $SOBA</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-500/20"
                >
                  <Link href={NAV_LINKS.WHITEPAPER}>Read Whitepaper</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contract Address & Listings Section */}
      <section className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <ContractAddress />
            <div className="flex flex-wrap gap-4 justify-center">
              {DEX_LINKS.map((platform) => (
                <Link 
                  key={platform.name} 
                  href={platform.href}
                  className="text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Image 
                    src={platform.icon}
                    alt={`${platform.name} icon`}
                    width={ICON_SIZES.SOCIAL.width}
                    height={ICON_SIZES.SOCIAL.height}
                    className="w-4 h-4"
                  />
                  {platform.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Sol Bastard Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Sol Bastard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-red-500/20 transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p>United by memes, powered by passion. The $SOBA army stands strong.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-orange-500/20 transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monthly Burns</h3>
              <p>Watch the supply shrink and value soar with our transparent burn strategy.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visionary Project</h3>
              <p>More than a meme. $SOBA is here to leave a lasting mark on crypto.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Burn Tracker Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <Flame className="h-8 w-8 text-red-500 mr-2" />
                Burn Tracker
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Tokens Burned:</p>
                  <p className="text-2xl font-bold">{burnedTokens} $SOBA</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Value Burned:</p>
                  <p className="text-2xl font-bold">{burnedValue} USD</p>
                </div>
              </div>
              <Button 
                asChild
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Link href={NAV_LINKS.BURNS}>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Gallery */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/20 transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <Image 
                  src={`/placeholder.svg?height=200&width=200`} 
                  alt={`Community Meme ${i}`} 
                  width={200} 
                  height={200} 
                  className="w-full h-auto" 
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              asChild
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Link href={NAV_LINKS.COMMUNITY}>Submit Your Meme</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media Feed & Engagement */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Join the Conversation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Latest from TikTok</h3>
              <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                TikTok Feed Placeholder
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">X Updates</h3>
              <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                X Feed Placeholder
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Telegram Highlights</h3>
              <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                Telegram Feed Placeholder
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <SocialLinks className="gap-6" />
          </div>
        </div>
      </section>
    </div>
  )
}