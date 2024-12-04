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
import { AnimatedCard } from '@/components/AnimatedCard'
import { formatDateNew } from '@/lib/utils'

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

// Update community section titles and descriptions
const COMMUNITY_SECTIONS = {
  HERO: {
    TITLE: "The SOBA Social Club",
    SUBTITLE: "Where distinguished meme connoisseurs gather"
  },
  FEATURES: [
    {
      title: "Premium Discussions",
      description: "Share thoughts with fellow SOBA enthusiasts in our sophisticated chat lounges",
      icon: MessageCircle
    },
    {
      title: "Exclusive Events",
      description: "Join our regular cigar lounge sessions and premium networking events",
      icon: Calendar
    },
    {
      title: "VIP Recognition",
      description: "Stand out with special roles and privileges in our distinguished community",
      icon: Award
    }
  ],
  PROPOSALS: {
    TITLE: "Gentleman's Agreement",
    DESCRIPTION: "Review and vote on proposals with fellow SOBA connoisseurs",
    EMPTY_STATE: "No active proposals at the moment. Enjoy a cigar while you wait."
  }
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
      <h4 className="text-lg font-semibold text-[#FF6B00] mb-2">{proposal.title}</h4>
      <p className="text-white/90 leading-relaxed mb-4">{proposal.description}</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">For: {proposal.votes.for.toLocaleString()}</span>
            <span className="text-white/50">|</span>
            <span className="text-red-400">Against: {proposal.votes.against.toLocaleString()}</span>
          </div>
          <span className="text-white/80">
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
      description: "Get the latest $SOBA memes and updates hot off the press!",
    },
    {
      ...SOCIAL_LINKS.TELEGRAM,
      description: "Join the 24/7 party where all the magic happens!",
    },
    {
      ...SOCIAL_LINKS.TIKTOK,
      description: "Watch $SOBA take over the internet, one video at a time!",
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
              <h1 className="text-5xl font-bold mb-6 text-center text-[#FF6B00]">Welcome to the $SOBA Squad!</h1>
              <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
                This isn't just another crypto community - it's a party! Join our cigar-chomping chimp and thousands of others in the most entertaining corner of Solana.
              </p>
            </motion.div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 gradient-text">
                The SOBA Cigar Lounge
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Where alpha chimps gather to discuss power moves and premium gains. No paper hands allowed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCard
                  icon={<Users className="w-8 h-8 text-orange-500" />}
                  title="Alpha Society"
                  description="Join the most sophisticated apes in crypto. We smoke cigars and make gains."
                />
                <AnimatedCard
                  icon={<MessageCircle className="w-8 h-8 text-orange-500" />}
                  title="Power Networking"
                  description="Connect with fellow sigma traders. Share alpha, not beta excuses."
                />
                <AnimatedCard
                  icon={<Award className="w-8 h-8 text-orange-500" />}
                  title="Elite Benefits"
                  description="Exclusive perks for diamond-handed holders. Paper hands need not apply."
                />
              </div>
            </div>
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
                    <h3 className="text-xl font-bold text-[#FF6B00]">{item.name}</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-4">{item.description}</p>
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
                <h2 className="text-3xl font-bold mb-4 text-[#FF6B00]">
                  Upcoming Community Events
                </h2>
                <p className="text-white/80">
                  Don't miss out on these exciting $SOBA community activities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {upcomingEvents.map((event, index) => (
                  <AnimatedCard
                    key={index}
                    delay={index * 0.1}
                    className="p-6 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 hover:bg-black/60 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-[#FF6B00]" />
                      <h3 className="text-xl font-semibold text-[#FF6B00]">{event.name}</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed mb-2">{event.description}</p>
                    <p className="text-sm text-white/80">{formatDateNew(event.date)}</p>
                  </AnimatedCard>
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
                <h2 className="text-3xl font-bold mb-4 text-[#FF6B00]">
                  Community Governance
                </h2>
                <p className="text-white/80">
                  Shape the future of $SOBA through active participation
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Vote className="w-6 h-6 text-[#FF6B00]" />
                    <h3 className="text-xl font-semibold text-[#FF6B00]">Active Proposals</h3>
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
                <h2 className="text-3xl font-bold mb-4 text-[#FF6B00]">
                  Featured Community Member
                </h2>
                <p className="text-white/80">
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
                    <UserCircle className="w-20 h-20 text-[#FF6B00]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#FF6B00] mb-2">@SobaMaster</h3>
                    <p className="text-sm text-white/80 mb-4">Member since January 2024</p>
                    <p className="text-white/90 leading-relaxed">
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

        <ClientOnly>
          <DynamicDialog open={isProposalsOpen} onOpenChange={setIsProposalsOpen}>
            <DynamicDialogContent className="sm:max-w-[600px] bg-[#111] border border-orange-500/20">
              <DynamicDialogHeader>
                <DynamicDialogTitle className="text-2xl font-bold text-[#FF6B00]">Active Proposals</DynamicDialogTitle>
                <DynamicDialogDescription className="text-white/80">
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

