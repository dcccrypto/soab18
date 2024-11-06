"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, MessageCircle, Zap, ArrowRight, Moon, Sun, Twitter, Send, Award, Calendar, UserCircle, Vote } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CommunityPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isProposalsOpen, setIsProposalsOpen] = useState(false)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const upcomingEvents = [
    { date: "2024-11-15", name: "SOBA Meme Contest", description: "Show off your meme-making skills and win SOBA tokens!" },
    { date: "2024-11-20", name: "AMA with Crypto Bastard", description: "Get your questions ready for our founder!" },
    { date: "2024-11-25", name: "Community Governance Vote", description: "Help decide the next big SOBA initiative!" },
  ]

  const activeProposals = [
    { id: 1, title: "Implement Community-Driven Content Creation Program", description: "This proposal aims to establish a program where community members can contribute content and earn rewards.", votes: { for: 1500, against: 500 } },
    { id: 2, title: "Increase Meme Contest Frequency", description: "Should we hold meme contests weekly instead of monthly?", votes: { for: 2000, against: 800 } },
    { id: 3, title: "Launch $SOBA Merchandise Store", description: "Create an online store for $SOBA-themed merchandise, with profits going back to the community treasury.", votes: { for: 1800, against: 700 } },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`backdrop-blur-md ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} min-h-screen`}>
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-8">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_256x256-ncAT5qaZrGhObqpoOr5sQQ2Dj5huL2.png" 
              alt="Sol Bastard Logo" 
              width={100} 
              height={100} 
              className="w-24 h-auto" 
            />
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Home</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">White Paper</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Roadmap</Link>
              <Button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center gap-2">
                Buy $SOBA
                <ArrowRight className="w-4 h-4" />
              </Button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-orange-500 text-white"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-6 text-center">Join the $SOBA Cult!</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            The $SOBA community is all about fun, engagement, and supporting each other. Become part of an adventure inspired by Crypto Bastard's energy, where laughs meet innovation and everyone benefits.
          </p>

          {/* Community Mission */}
          <Card className="mb-12 bg-[#111] border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Our Mission</CardTitle>
              <CardDescription className="text-orange-300/80">
                Building a lively, supportive network of crypto enthusiasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-orange-300">
                At $SOBA, we're dedicated to creating a vibrant community that goes beyond just holding tokens. We believe in the power of collective growth, shared knowledge, and the thrill of being part of something revolutionary. Our mission is to foster an environment where every member feels valued, heard, and excited about the future of crypto.
              </p>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg bg-[#111] border-orange-900/50"
            >
              <div className="flex items-center mb-4">
                <Twitter className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Twitter</h3>
              </div>
              <p className="text-orange-300 mb-4">Stay updated with the latest $SOBA news and engage with our community.</p>
              <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] text-white">Follow Us</Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg bg-[#111] border-orange-900/50"
            >
              <div className="flex items-center mb-4">
                <Send className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">Telegram</h3>
              </div>
              <p className="text-orange-300 mb-4">Join our Telegram group for real-time discussions and community updates.</p>
              <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] text-white">Join Group</Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg bg-[#111] border-orange-900/50"
            >
              <div className="flex items-center mb-4">
                <MessageCircle className="w-8 h-8 mr-3 text-[#FF6B00]" />
                <h3 className="text-xl font-bold text-orange-400">X (Twitter)</h3>
              </div>
              <p className="text-orange-300 mb-4">Connect with fellow $SOBA holders and participate in community events.</p>
              <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] text-white">Follow Us</Button>
            </motion.div>
          </div>

          {/* Community Initiatives */}
          <Card className="mb-12 bg-[#111] border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Community Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-semibold text-orange-400 mb-2">Giveaways and Rewards</h4>
                  <p className="text-orange-300">Participate in regular giveaways and earn rewards for your active participation in the $SOBA community.</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-orange-400 mb-2">Meme Contests</h4>
                  <p className="text-orange-300">Showcase your creativity in our meme contests and win exclusive $SOBA prizes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="mb-12 bg-[#111] border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Upcoming Events</CardTitle>
              <CardDescription className="text-orange-300/80">
                Don't miss out on these exciting community events!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <Calendar className="w-6 h-6 mr-3 text-[#FF6B00] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-orange-400">{event.name}</h4>
                      <p className="text-orange-300 text-sm">{event.date}</p>
                      <p className="text-orange-300">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Community Member */}
          <Card className="mb-12 bg-[#111] border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Featured Community Member</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <UserCircle className="w-16 h-16 mr-6 text-[#FF6B00]" />
              <div>
                <h4 className="text-xl font-semibold text-orange-400 mb-2">@SobaMaster</h4>
                <p className="text-orange-300 mb-2">Joined: January 2024</p>
                <p className="text-orange-300">SobaMaster has been an outstanding contributor to our community, creating hilarious memes and helping newcomers navigate the world of $SOBA. Their dedication and creativity inspire us all!</p>
              </div>
            </CardContent>
          </Card>

          {/* Community Governance */}
          <Card className="mb-12 bg-[#111] border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">Community Governance</CardTitle>
              <CardDescription className="text-orange-300/80">
                Have your say in the future of $SOBA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-orange-300">As a community-driven project, we value the input of every $SOBA holder. Participate in our governance process to shape the future of our ecosystem.</p>
                <div className="flex items-center">
                  <Vote className="w-6 h-6 mr-3 text-[#FF6B00]" />
                  <p className="text-orange-300">Current Proposal: Should we implement a community-driven content creation program?</p>
                </div>
                <Dialog open={isProposalsOpen} onOpenChange={setIsProposalsOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] text-white">View Active Proposals</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-[#111] text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-orange-500">Active Proposals</DialogTitle>
                      <DialogDescription className="text-orange-300">
                        Review and vote on current community proposals.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh]">
                      {activeProposals.map((proposal) => (
                        <Card key={proposal.id} className="mb-4 bg-[#222] border-orange-900/50">
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold text-orange-400">{proposal.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-orange-300 mb-2">{proposal.description}</p>
                            <div className="flex justify-between text-sm">
                              <span className="text-green-400">For: {proposal.votes.for}</span>
                              <span className="text-red-400">Against: {proposal.votes.against}</span>
                            </div>
                            <div className="mt-2 flex space-x-2">
                              <Button className="flex-1 bg-green-600 hover:bg-green-700">Vote For</Button>
                              <Button className="flex-1 bg-red-600 hover:bg-red-700">Vote Against</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

        </main>

        {/* Footer */}
        <footer className="py-8 backdrop-blur-lg bg-[#111] bg-opacity-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">White Paper</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">Roadmap</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300  transition-colors  duration-300">Tokenomics</Link>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <Zap size={24} />
                </Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <Twitter size={24} />
                </Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <Send size={24} />
                </Link>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Sol Bastard. All rights reserved.</p>
              <a href="mailto:contact@solbastardsoba.com" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                contact@solbastardsoba.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}