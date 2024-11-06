'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Users, Megaphone, LineChart, Building, Handshake, Palette, Flame, Cpu, Gamepad, Vote, Moon, Sun, ArrowRight } from 'lucide-react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Box, OrbitControls } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const roadmapData = [
  {
    phase: 1,
    icon: Rocket,
    title: "Fair Launch",
    status: "Completed",
    description: "Launch on Pump.fun and Raydium",
    objective: "Make $SOBA accessible to early adopters, establishing its presence.",
    details: "Our journey began with a fair launch, ensuring equal opportunity for all participants. This phase marked the birth of $SOBA on the Solana blockchain."
  },
  {
    phase: 2,
    icon: Users,
    title: "Community Building",
    status: "Completed",
    description: "Engagement on TikTok, Twitter (X), Telegram",
    objective: "Build a loyal, vibrant community to amplify $SOBA's brand.",
    details: "We focused on creating a strong, engaged community across various social platforms. Meme contests and events helped foster a sense of belonging and excitement around $SOBA."
  },
  {
    phase: 3,
    icon: Megaphone,
    title: "Marketing Expansion",
    status: "Completed",
    description: "Campaigns featuring Crypto Bastard, influencer partnerships",
    objective: "Grow brand awareness and reach broader audiences.",
    details: "Our marketing efforts expanded, leveraging the influence of Crypto Bastard and other key figures in the crypto space to increase $SOBA's visibility."
  },
  {
    phase: 4,
    icon: LineChart,
    title: "Listings and Growth",
    status: "Completed",
    description: "Listings on CoinMarketCap and CoinGecko, community giveaways",
    objective: "Increase visibility on major tracking platforms.",
    details: "This phase saw $SOBA listed on major crypto tracking platforms, significantly boosting our credibility and reach. Community giveaways further incentivized participation."
  },
  {
    phase: 5,
    icon: Building,
    title: "Exchange Listings",
    status: "Completed",
    description: "Additional exchange listings",
    objective: "Broaden access to $SOBA for easier trading.",
    details: "We expanded $SOBA's presence on various cryptocurrency exchanges, making it more accessible to a wider range of traders and investors."
  },
  {
    phase: 6,
    icon: Handshake,
    title: "Strategic Partnerships",
    status: "Completed",
    description: "Collaborations with other projects and influencers",
    objective: "Strengthen $SOBA's ecosystem through partnerships.",
    details: "Strategic alliances were formed with complementary projects and influential figures in the crypto space, enhancing $SOBA's ecosystem and reach."
  },
  {
    phase: 7,
    icon: Palette,
    title: "NFT Launch",
    status: "Completed",
    description: "Release exclusive $SOBA NFT collection",
    objective: "Expand the ecosystem with collectible digital assets.",
    details: "We launched our exclusive NFT collection, providing unique digital assets to our community and adding another layer of value to the $SOBA ecosystem."
  },
  {
    phase: 8,
    icon: Flame,
    title: "Regular Burns",
    status: "Completed",
    description: "Implement regular burns",
    objective: "Boost long-term value by reducing supply.",
    details: "A token burning mechanism was implemented to systematically reduce $SOBA's supply, aiming to increase its scarcity and potential value over time."
  },
  {
    phase: 9,
    icon: Cpu,
    title: "Advanced Features",
    status: "Upcoming",
    description: "NFT staking, AI-driven PFP Generator, gated content",
    objective: "Enhance the ecosystem with unique, community-focused features.",
    details: "This exciting phase will introduce advanced features like NFT staking, an AI-powered profile picture generator, and exclusive gated content for $SOBA holders."
  },
  {
    phase: 10,
    icon: Gamepad,
    title: "Gamification",
    status: "Upcoming",
    description: "Leaderboards, achievement system, social sharing",
    objective: "Drive engagement through interactive experiences.",
    details: "We plan to gamify the $SOBA experience with leaderboards, an achievement system, and social sharing features to boost community engagement and interaction."
  },
  {
    phase: 11,
    icon: Vote,
    title: "DAO Transition",
    status: "Upcoming",
    description: "Decentralized governance, community voting",
    objective: "Empower the community to shape $SOBA's direction.",
    details: "This phase will mark $SOBA's transition to a Decentralized Autonomous Organization (DAO), giving our community direct influence over the project's future direction."
  },
  {
    phase: 12,
    icon: Rocket,
    title: "Expansion",
    status: "Upcoming",
    description: "Strategic alliances, cross-platform engagement, mainstream presence",
    objective: "Broaden $SOBA's reputation beyond crypto.",
    details: "The final phase of our current roadmap focuses on expanding $SOBA's influence beyond the crypto sphere, aiming for mainstream recognition and adoption."
  }
]

const RoadmapCube = ({ phase, position, onClick }) => {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <Box
      args={[2.5, 2.5, 2.5]}
      ref={mesh}
      position={position}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color={phase.status === 'Completed' ? '#FFA500' : '#4A4A4A'} />
      <Text
        position={[0, 0, 1.26]}
        fontSize={0.8}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {phase.phase}
      </Text>
    </Box>
  )
}

const RoadmapScene = ({ setSelectedPhase }) => {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 5, 25)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      {roadmapData.map((phase, index) => (
        <RoadmapCube
          key={phase.phase}
          phase={phase}
          position={[(index % 4 - 1.5) * 4, -Math.floor(index / 4) * 4 + 4, 0]}
          onClick={() => setSelectedPhase(phase)}
        />
      ))}
    </>
  )
}

const SimplifiedProgressBar = ({ progress }) => {
  const completedPhases = Math.floor((progress / 100) * roadmapData.length)

  return (
    <div className="relative h-8 mb-12 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-2">
        {roadmapData.map((phase, index) => (
          <div
            key={phase.phase}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index < completedPhases ? 'bg-white text-orange-500' : 'bg-gray-400 text-white'
            }`}
          >
            {phase.phase}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Roadmap() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedPhase, setSelectedPhase] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [progress, setProgress] = useState(66.67) // 8 out of 12 phases completed (8/12 * 100)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase)
    setIsDialogOpen(true)
  }

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
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Community</Link>
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
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

        {/* Roadmap Content */}
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-6 text-center">$SOBA Roadmap</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Embark on an exciting journey with $SOBA as we revolutionize the crypto landscape. Our roadmap outlines our ambitious plans and milestones, showcasing our commitment to innovation and community growth.
          </p>
          
          {/* Simplified Progress Bar */}
          <SimplifiedProgressBar progress={progress} />

          <div className="h-[800px] mb-12 overflow-hidden">
            <Canvas>
              <RoadmapScene setSelectedPhase={handlePhaseClick} />
            </Canvas>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {roadmapData.map((phase) => (
              <motion.div
                key={phase.phase}
                className={`p-6 rounded-lg shadow-lg cursor-pointer
                  ${phase.status === 'Completed' 
                    ? 'bg-gradient-to-br from-orange-600 to-red-700' 
                    : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
                onClick={() => handlePhaseClick(phase)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center mb-4">
                  <phase.icon className={`w-8 h-8 mr-3 ${phase.status === 'Completed' ? 'text-yellow-300' : 'text-orange-500'}`} />
                  <h3 className="text-xl font-bold">{phase.title}</h3>
                </div>
                <p className={`text-lg mb-3 ${phase.status === 'Completed' ? 'text-yellow-200' : 'text-orange-400'}`}>{phase.status}</p>
                <p className="text-base">{phase.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the $SOBA Revolution?</h2>
            <p className="text-xl mb-8">Don't miss out on the opportunity to be part of something extraordinary. Join our community today!</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold text-lg px-8 py-4 rounded-full transition-colors duration-300 flex items-center gap-2">
                Buy $SOBA Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white text-lg px-8 py-4 rounded-full">
                Join Our Community
              </Button>
            </div>
          
          </div>

          {/* Phase Details Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-gray-900 text-white border-orange-500">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-orange-400">{selectedPhase?.title}</DialogTitle>
                <DialogDescription>
                  <p className="text-orange-400 mb-4 text-lg">{selectedPhase?.status}</p>
                  <h4 className="text-xl font-semibold mb-2 text-orange-300">Objective:</h4>
                  <p className="mb-4 text-gray-300">{selectedPhase?.objective}</p>
                  <h4 className="text-xl font-semibold mb-2 text-orange-300">Details:</h4>
                  <p className="text-gray-300">{selectedPhase?.details}</p>
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => setIsDialogOpen(false)} className="bg-orange-500 hover:bg-orange-600 text-white">Close</Button>
            </DialogContent>
          </Dialog>
        </main>

        {/* Footer */}
        <footer className="py-8 backdrop-blur-lg bg-black bg-opacity-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">White Paper</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">Roadmap</Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Link>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2h-19C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM5 19.5v-13c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v13c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5z"></path><path d="M12 6l-4 4h3v4h2v-4h3l-4-4z"></path></svg>
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