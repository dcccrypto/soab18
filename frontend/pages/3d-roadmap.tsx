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

// Define interfaces for type safety
interface RoadmapPhase {
  phase: number
  icon: React.ElementType
  title: string
  status: 'Completed' | 'In Progress' | 'Upcoming'
  description: string
  objective: string
  details: string
}

interface RoadmapCubeProps {
  phase: RoadmapPhase
  position: [number, number, number]
  onClick: (phase: RoadmapPhase) => void
}

interface RoadmapSceneProps {
  setSelectedPhase: (phase: RoadmapPhase) => void
}

interface SimplifiedProgressBarProps {
  progress: number
}

const roadmapData: RoadmapPhase[] = [
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

const RoadmapCube = ({ phase, position, onClick }: RoadmapCubeProps) => {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <Box
      args={[2.5, 2.5, 2.5]}
      ref={mesh}
      position={position}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={() => onClick(phase)}
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

const RoadmapScene = ({ setSelectedPhase }: RoadmapSceneProps) => {
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

const SimplifiedProgressBar = ({ progress }: SimplifiedProgressBarProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center mt-2 text-orange-400">
        {Math.round(progress)}% Complete
      </div>
    </div>
  )
}

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [progress] = useState(66.67) // 8 out of 12 phases completed

  const handlePhaseClick = (phase: RoadmapPhase) => {
    setSelectedPhase(phase)
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Content only */}
    </div>
  )
}