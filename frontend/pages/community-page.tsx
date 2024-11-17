"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Users, MessageCircle, Zap, ArrowRight, Moon, Sun, Send, Award, Calendar, UserCircle, Vote } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ButtonBase } from '@/components/ui/button-base'
import { Progress } from "@/components/ui/progress"
import { Toaster, toast } from "sonner"
import { 
  SOCIAL_LINKS,
  SOCIAL_FEED_DATA,
  ICON_SIZES
} from '@/constants'
import dynamic from 'next/dynamic'
import { ClientOnly } from '@/components/client-only'

// Dynamic imports for Dialog components
const DynamicDialog = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.Dialog),
  { ssr: false }
)

const DynamicDialogContent = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogContent),
  { ssr: false }
)

const DynamicDialogHeader = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogHeader),
  { ssr: false }
)

const DynamicDialogTitle = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogTitle),
  { ssr: false }
)

const DynamicDialogDescription = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogDescription),
  { ssr: false }
)

// Add animation variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

// Add interfaces for type safety
interface Vote {
  for: number
  against: number
}

interface Proposal {
  id: number
  title: string
  description: string
  votes: Vote
  endDate: string
  hasVoted?: 'for' | 'against' | null
}

export default function CommunityPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isProposalsOpen, setIsProposalsOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const upcomingEvents = [
    { date: "2024-11-15", name: "SOBA Meme Contest", description: "Show off your meme-making skills and win SOBA tokens!" },
    { date: "2024-11-20", name: "AMA with Crypto Bastard", description: "Get your questions ready for our founder!" },
    { date: "2024-11-25", name: "Community Governance Vote", description: "Help decide the next big SOBA initiative!" },
  ]

  const [activeProposals, setActiveProposals] = useState<Proposal[]>([
    { 
      id: 1, 
      title: "Implement Community-Driven Content Creation Program",
      description: "This proposal aims to establish a program where community members can contribute content and earn rewards.",
      votes: { for: 1500, against: 500 },
      endDate: "2024-12-01",
      hasVoted: null
    },
    { 
      id: 2, 
      title: "Increase Meme Contest Frequency",
      description: "Should we hold meme contests weekly instead of monthly?",
      votes: { for: 2000, against: 800 },
      endDate: "2024-11-25",
      hasVoted: null
    },
    { 
      id: 3, 
      title: "Launch $SOBA Merchandise Store",
      description: "Create an online store for $SOBA-themed merchandise, with profits going back to the community treasury.",
      votes: { for: 1800, against: 700 },
      endDate: "2024-12-15",
      hasVoted: null
    }
  ])

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setActiveProposals(prevProposals => 
      prevProposals.map(proposal => {
        if (proposal.id === proposalId && !proposal.hasVoted) {
          const updatedVotes = {
            ...proposal.votes,
            [voteType]: proposal.votes[voteType] + 1
          }
          toast.success(`Vote submitted successfully for ${voteType === 'for' ? 'supporting' : 'opposing'} the proposal`, {
            duration: 3000,
          })
          return {
            ...proposal,
            votes: updatedVotes,
            hasVoted: voteType
          }
        }
        return proposal
      })
    )
  }

  const calculateProgress = (proposal: Proposal) => {
    const total = proposal.votes.for + proposal.votes.against
    return total > 0 ? (proposal.votes.for / total) * 100 : 50
  }

  const getRemainingDays = (endDate: string) => {
    const remaining = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return remaining > 0 ? remaining : 0
  }

  // Update the proposals section with voting functionality
  const renderProposalCard = (proposal: Proposal) => (
    <motion.div
      key={proposal.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-black/40 border border-orange-500/20"
    >
      <h4 className="text-lg font-semibold text-orange-400 mb-2">{proposal.title}</h4>
      <p className="text-orange-300 mb-4">{proposal.description}</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">For: {proposal.votes.for.toLocaleString()}</span>
            <span className="text-gray-500">|</span>
            <span className="text-red-400">Against: {proposal.votes.against.toLocaleString()}</span>
          </div>
          <span className="text-orange-300">
            {getRemainingDays(proposal.endDate)} days remaining
          </span>
        </div>

        <Progress 
          value={calculateProgress(proposal)} 
          className="h-2 bg-red-500/20"
          indicatorClassName="bg-gradient-to-r from-green-500 to-green-600"
        />

        <div className="flex gap-2 justify-end">
          <ButtonBase
            variant="default"
            size="sm"
            onClick={() => handleVote(proposal.id, 'for')}
            disabled={proposal.hasVoted !== null}
            className={`bg-green-600 hover:bg-green-700 ${
              proposal.hasVoted === 'for' ? 'ring-2 ring-green-400' : ''
            }`}
          >
            {proposal.hasVoted === 'for' ? 'Voted For' : 'Vote For'}
          </ButtonBase>
          <ButtonBase
            variant="default"
            size="sm"
            onClick={() => handleVote(proposal.id, 'against')}
            disabled={proposal.hasVoted !== null}
            className={`bg-red-600 hover:bg-red-700 ${
              proposal.hasVoted === 'against' ? 'ring-2 ring-red-400' : ''
            }`}
          >
            {proposal.hasVoted === 'against' ? 'Voted Against' : 'Vote Against'}
          </ButtonBase>
        </div>
      </div>
    </motion.div>
  )

  // Update social links section
  const socialLinks = [
    {
      ...SOCIAL_LINKS.TWITTER,
      description: "Stay updated with the latest $SOBA news and engage with our community.",
    },
    {
      ...SOCIAL_LINKS.TELEGRAM,
      description: "Join our Telegram group for real-time discussions and community updates.",
    },
    {
      ...SOCIAL_LINKS.TIKTOK,
      description: "Watch our latest content and viral $SOBA moments.",
    }
  ]

  // Update social feed section
  const latestUpdates = SOCIAL_FEED_DATA.X_UPDATES
  const telegramHighlights = SOCIAL_FEED_DATA.TELEGRAM_HIGHLIGHTS

  const handleProfileView = (username: string) => {
    toast.info(`Profile view functionality coming soon for ${username}`, {
      duration: 3000,
    })
  }

  const handleFollow = (username: string) => {
    toast.success(`Successfully followed ${username}!`, {
      duration: 3000,
    })
  }

  const handleSocialLink = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer')
  }

  return (
    <div className="min-h-screen gradient-dark text-white">
      <Toaster richColors position="top-center" />
      <Header />
      
      <main className="pb-16">
        <section className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
          <motion.div 
            className="absolute inset-0 z-[1]"
            style={{ y: heroY }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/communitypagebg.png"
                alt="Community background"
                fill
                priority
                className="object-cover object-center opacity-70 transition-opacity duration-700"
                quality={100}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90 transition-all duration-700" />
            </div>
          </motion.div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto space-y-6"
            >
              <h1 className="text-5xl font-bold mb-6 text-center gradient-text">Join the $SOBA Cult!</h1>
              <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-100">
                The $SOBA community is all about fun, engagement, and supporting each other. Become part of an adventure inspired by Crypto Bastard's energy, where laughs meet innovation and everyone benefits.
              </p>
            </motion.div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <Card className="card-base p-6 md:p-8 lg:p-10 relative z-10">
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
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {socialLinks.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="card-base p-6 rounded-lg shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={ICON_SIZES.SOCIAL.width / 3}
                      height={ICON_SIZES.SOCIAL.height / 3}
                      className="mr-3"
                    />
                    <h3 className="text-xl font-bold text-orange-400">{item.name}</h3>
                  </div>
                  <p className="text-orange-300 mb-4">{item.description}</p>
                  <ButtonBase 
                    className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] text-white"
                    onClick={() => handleSocialLink(item.url)}
                  >
                    Follow Us
                  </ButtonBase>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Upcoming Community Events
                </h2>
                <p className="text-gray-400">
                  Don't miss out on these exciting $SOBA community activities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-orange-500" />
                      <h3 className="text-xl font-semibold text-orange-400">{event.name}</h3>
                    </div>
                    <p className="text-orange-300 mb-2">{event.description}</p>
                    <p className="text-sm text-orange-400/80">{event.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Community Governance
                </h2>
                <p className="text-gray-400">
                  Shape the future of $SOBA through active participation
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Vote className="w-6 h-6 text-orange-500" />
                    <h3 className="text-xl font-semibold text-orange-400">Active Proposals</h3>
                  </div>
                  <ButtonBase
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProposalsOpen(true)}
                    className="text-orange-400 border-orange-500/20 hover:border-orange-500/40"
                  >
                    View All
                  </ButtonBase>
                </div>

                <div className="space-y-4">
                  {activeProposals.map(renderProposalCard)}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Featured Community Member
                </h2>
                <p className="text-gray-400">
                  Recognizing outstanding contributions to the $SOBA community
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto p-6 rounded-xl bg-black/40 border border-orange-500/20"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <UserCircle className="w-20 h-20 text-orange-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-orange-400 mb-2">@SobaMaster</h3>
                    <p className="text-sm text-orange-300 mb-4">Member since January 2024</p>
                    <p className="text-orange-300 leading-relaxed">
                      SobaMaster has been an outstanding contributor to our community, creating hilarious memes and helping newcomers navigate the world of $SOBA. Their dedication and creativity inspire us all!
                    </p>
                    <div className="flex gap-4 mt-6">
                      <ButtonBase
                        variant="outline"
                        size="sm"
                        onClick={() => handleProfileView('SobaMaster')}
                        className="text-orange-400 border-orange-500/20 hover:border-orange-500/40"
                        aria-label="View SobaMaster's profile"
                      >
                        View Profile
                      </ButtonBase>
                      <ButtonBase
                        variant="outline"
                        size="sm"
                        onClick={() => handleFollow('SobaMaster')}
                        className="text-orange-400 border-orange-500/20 hover:border-orange-500/40"
                        aria-label="Follow SobaMaster"
                      >
                        Follow
                      </ButtonBase>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <div className="card-base p-6 md:p-8 lg:p-10 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Community Updates
                </h2>
                <p className="text-gray-400">
                  Latest news and highlights from our social channels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* X Updates */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Latest X Updates</h3>
                  {SOCIAL_FEED_DATA.X_UPDATES.map((update, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-black/40 border border-orange-500/20"
                    >
                      <p className="text-orange-300 mb-2">{update.content}</p>
                      <div className="flex justify-between text-sm text-orange-400">
                        <span>{update.timestamp}</span>
                        <span>{update.engagement} interactions</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Telegram Highlights */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Telegram Highlights</h3>
                  {SOCIAL_FEED_DATA.TELEGRAM_HIGHLIGHTS.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-black/40 border border-orange-500/20"
                    >
                      <p className="text-orange-300 mb-2">{highlight.content}</p>
                      <div className="flex justify-between text-sm text-orange-400">
                        <span>{highlight.author}</span>
                        <span>{highlight.timestamp}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ClientOnly>
          <DynamicDialog open={isProposalsOpen} onOpenChange={setIsProposalsOpen}>
            <DynamicDialogContent className="sm:max-w-[600px] bg-[#111] border border-orange-500/20">
              <DynamicDialogHeader>
                <DynamicDialogTitle className="text-2xl font-bold text-orange-500">Active Proposals</DynamicDialogTitle>
                <DynamicDialogDescription className="text-orange-300">
                  Review and vote on current community proposals
                </DynamicDialogDescription>
              </DynamicDialogHeader>
              <ScrollArea className="max-h-[60vh] mt-4">
                <div className="space-y-4 pr-4">
                  {activeProposals.map(renderProposalCard)}
                </div>
              </ScrollArea>
            </DynamicDialogContent>
          </DynamicDialog>
        </ClientOnly>
      </main>
    </div>
  )
}