"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Twitter, Send, Users, Award, Gift, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SOCIAL_LINKS, ICON_SIZES, ASSETS } from '../constants'

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={ASSETS.LOGO}
            alt="SOBA Logo"
            width={ASSETS.LOGO_DIMENSIONS.width}
            height={ASSETS.LOGO_DIMENSIONS.height}
            className="mx-auto mb-8 w-24 h-24"
          />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-orange-400">Join the $SOBA Community</h1>
        <p className="text-xl text-orange-300 mb-8">
          Be part of the most vibrant and engaging crypto community on Solana
        </p>
      </div>

      {/* Community Stats */}
      <Card className="max-w-6xl mx-auto mb-12 bg-[#111] border-orange-900/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-[#FF6B00]" />
            <h3 className="text-2xl font-bold text-orange-400">10,000+</h3>
            <p className="text-orange-300">Community Members</p>
          </div>
          <div className="text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-[#FF6B00]" />
            <h3 className="text-2xl font-bold text-orange-400">500+</h3>
            <p className="text-orange-300">Daily Active Users</p>
          </div>
          <div className="text-center">
            <Gift className="w-8 h-8 mx-auto mb-2 text-[#FF6B00]" />
            <h3 className="text-2xl font-bold text-orange-400">100+</h3>
            <p className="text-orange-300">Weekly Giveaways</p>
          </div>
        </div>
      </Card>

      {/* Social Media Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {Object.entries(SOCIAL_LINKS).map(([platform, { url, icon }]) => (
          <motion.div
            key={platform}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-lg shadow-lg bg-[#111] border-orange-900/50"
          >
            <div className="flex items-center mb-4">
              <Image
                src={icon}
                alt={`${platform} icon`}
                width={ICON_SIZES.SOCIAL.width}
                height={ICON_SIZES.SOCIAL.height}
                className="mr-3"
              />
              <h3 className="text-xl font-bold text-orange-400">{platform}</h3>
            </div>
            <p className="text-orange-300 mb-4">Stay updated with the latest $SOBA news and engage with our community.</p>
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors"
            >
              Join Us <ChevronRight className="ml-1 w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Community Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-[#111] border-orange-900/50"
        >
          <h3 className="text-xl font-bold mb-4 text-orange-400">Weekly Meme Contests</h3>
          <p className="text-orange-300 mb-4">
            Showcase your creativity and win $SOBA tokens by participating in our weekly meme contests.
          </p>
          <ul className="list-disc list-inside text-orange-300/80 space-y-2">
            <li>Submit your best $SOBA-themed memes</li>
            <li>Community voting for winners</li>
            <li>Weekly prizes in $SOBA tokens</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-[#111] border-orange-900/50"
        >
          <h3 className="text-xl font-bold mb-4 text-orange-400">Community Governance</h3>
          <p className="text-orange-300 mb-4">
            Have your say in the future of $SOBA by participating in our community governance system.
          </p>
          <ul className="list-disc list-inside text-orange-300/80 space-y-2">
            <li>Vote on project proposals</li>
            <li>Suggest new features and initiatives</li>
            <li>Help shape the project's direction</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}