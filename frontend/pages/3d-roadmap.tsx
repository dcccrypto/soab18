'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ClientOnly } from '@/components/client-only'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Users, Megaphone, LineChart, Building, Palette, Flame, Cpu, Gamepad, Vote, Moon, Sun, ArrowRight } from 'lucide-react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import { Text, Box, OrbitControls } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { ButtonBase } from '@/components/ui/button-base'
import { useScroll, useTransform } from 'framer-motion'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'
import { DragControls } from '@react-three/drei'

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
  onClick: () => void
}

interface RoadmapSceneProps {
  setSelectedPhase: (phase: RoadmapPhase) => void
}

interface SimplifiedProgressBarProps {
  progress: number
}

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const

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
    icon: Users,
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

const RoadmapCube: React.FC<RoadmapCubeProps> = ({ phase, position, onClick }) => {
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hover, setHover] = useState(false)
  const [localPosition, setLocalPosition] = useState<[number, number, number]>(position)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)

  // Idle animation
  useFrame((state) => {
    if (groupRef.current && !isDragging) {
      // Gentle floating animation
      const time = state.clock.getElapsedTime()
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1
      
      if (hover) {
        // Additional hover animation
        groupRef.current.rotation.y += 0.01
        groupRef.current.scale.setScalar(1.1)
      } else {
        // Reset scale when not hovering
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const onPointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (isDragging && groupRef.current) {
      event.stopPropagation()
      const { movementX, movementY } = event
      setRotationX((prev) => prev + movementY * 0.01)
      setRotationY((prev) => prev + movementX * 0.01)
    }
  }, [isDragging])

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setIsDragging(true)
  }

  const onPointerUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...localPosition)
    }
  }, [localPosition])

  return (
    <group 
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => {
        setHover(false)
        setIsDragging(false)
      }}
      rotation-x={rotationX}
      rotation-y={rotationY}
    >
      <mesh onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={phase.status === 'Completed' ? '#FFA500' : '#4A4A4A'} 
          roughness={0.5}
          metalness={0.5}
          opacity={hover ? 0.9 : 1}
          transparent
          emissive={phase.status === 'Completed' ? '#FFA500' : '#4A4A4A'}
          emissiveIntensity={hover ? 0.5 : 0}
        />
      </mesh>
      <Text
        position={[0, 0, 1.2]}
        fontSize={0.5}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        rotation-x={-rotationX}
        rotation-y={-rotationY}
      >
        {phase.phase}
      </Text>
    </group>
  )
}

const RoadmapScene: React.FC<RoadmapSceneProps> = ({ setSelectedPhase }) => {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 8, 20) // Adjusted camera position
  }, [camera])

  const calculatePosition = (index: number): [number, number, number] => {
    const spacing = 5 // Increased spacing between boxes
    const totalWidth = (roadmapData.length - 1) * spacing
    const xPos = (index * spacing) - (totalWidth / 2)
    return [xPos, -3, 0] // Moved boxes closer to progress bar
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        makeDefault
      />
      {roadmapData.map((phase, index) => (
        <RoadmapCube
          key={phase.phase}
          phase={phase}
          position={calculatePosition(index)}
          onClick={() => setSelectedPhase(phase)}
        />
      ))}
    </>
  )
}

const SimplifiedProgressBar: React.FC<SimplifiedProgressBarProps> = ({ progress }) => {
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

export default function Roadmap() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [progress, setProgress] = useState(66.67) // 8 out of 12 phases completed (8/12 * 100)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const handlePhaseClick = (phase: RoadmapPhase) => {
    setSelectedPhase(phase)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen gradient-dark text-white">
      <main className="min-h-screen bg-background">
        <div className="relative">
          <section className="min-h-[70vh] pt-16 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
            <motion.div 
              className="absolute inset-0 z-[1]"
              style={{ y: heroY }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/roadmapbg.png"
                  alt="Roadmap background"
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
                <h1 className="text-5xl font-bold mb-6 gradient-text">$SOBA Roadmap</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our journey to revolutionize the meme coin space
                </p>
                <div className="flex justify-center gap-4">
                  <ButtonBase
                    size="lg"
                    className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white"
                  >
                    <span className="flex items-center gap-2">
                      View Progress
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </ButtonBase>
                  <ButtonBase
                    size="lg"
                    variant="outline"
                    className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Learn More
                  </ButtonBase>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
            
            {/* Roadmap Content */}
            <div className="container mx-auto px-4 py-12 relative z-10">
              {/* Simplified Progress Bar */}
              <SimplifiedProgressBar progress={progress} />

              <div className="h-[800px] mb-12 overflow-hidden card-base">
                <Canvas>
                  <RoadmapScene setSelectedPhase={handlePhaseClick} />
                </Canvas>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {roadmapData.map((phase) => (
                  <motion.div
                    key={phase.phase}
                    className={`card-base p-6 cursor-pointer
                      ${phase.status === 'Completed' 
                        ? 'bg-gradient-to-br from-orange-600/90 to-red-700/90' 
                        : 'bg-black/40 hover:bg-black/50'}`}
                    onClick={() => handlePhaseClick(phase)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center mb-4">
                      <phase.icon className={`w-8 h-8 mr-3 ${phase.status === 'Completed' ? 'text-yellow-300' : 'text-orange-500'}`} />
                      <h3 className="text-xl font-bold">{phase.title}</h3>
                    </div>
                    <p className={`text-lg mb-3 ${phase.status === 'Completed' ? 'text-yellow-200' : 'text-orange-400'}`}>{phase.status}</p>
                    <p className="text-base text-gray-400">{phase.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Ready to Join the $SOBA Revolution?</h2>
                <p className="text-xl mb-8 text-gray-400">Don't miss out on the opportunity to be part of something extraordinary. Join our community today!</p>
                <div className="flex justify-center gap-4">
                  <ButtonBase
                    size="lg"
                    className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white"
                  >
                    <span className="flex items-center gap-2">
                      Buy $SOBA Now
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </ButtonBase>
                  <ButtonBase
                    size="lg"
                    variant="outline"
                    className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Join Our Community
                  </ButtonBase>
                </div>
              </div>

              {/* Phase Details Dialog */}
              <ClientOnly>
                <DynamicDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DynamicDialogContent className="bg-black/95 text-white border-orange-500">
                    <DynamicDialogHeader>
                      <DynamicDialogTitle className="text-2xl font-bold gradient-text">
                        {selectedPhase?.title}
                      </DynamicDialogTitle>
                      <DynamicDialogDescription>
                        <p className="text-orange-400 mb-4 text-lg">{selectedPhase?.status}</p>
                        <h4 className="text-xl font-semibold mb-2 text-orange-300">Objective:</h4>
                        <p className="mb-4 text-gray-400">{selectedPhase?.objective}</p>
                        <h4 className="text-xl font-semibold mb-2 text-orange-300">Details:</h4>
                        <p className="text-gray-400">{selectedPhase?.details}</p>
                      </DynamicDialogDescription>
                    </DynamicDialogHeader>
                    <ButtonBase 
                      onClick={() => setIsDialogOpen(false)} 
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Close
                    </ButtonBase>
                  </DynamicDialogContent>
                </DynamicDialog>
              </ClientOnly>
            </div>
          </section>
        </div>
      </main>
      <div className="h-32 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 transition-all duration-700" />
    </div>
  )
}