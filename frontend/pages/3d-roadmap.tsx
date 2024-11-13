'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, Users, Megaphone, LineChart, Building, Handshake, Palette, Flame, Cpu, Gamepad, Vote, ArrowRight, TrendingUp } from 'lucide-react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Box, OrbitControls } from '@react-three/drei'
import { Mesh } from 'three'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ROADMAP_PHASES, NAV_LINKS, ASSETS, ICON_SIZES } from '../constants'
import { SocialLinks } from '@/components/SocialLinks'

interface RoadmapPhase {
  phase: number;
  icon: any;
  title: string;
  status: string;
  description: string;
  objective: string;
  details: string;
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
    description: "Growing our social media presence",
    objective: "Build a strong and engaged community across multiple platforms.",
    details: "Focused on community engagement through Twitter, Telegram, and TikTok, creating a vibrant ecosystem of $SOBA supporters."
  },
  {
    phase: 3,
    icon: Megaphone,
    title: "Marketing Push",
    status: "In Progress",
    description: "Expanding brand awareness",
    objective: "Increase visibility and attract new community members.",
    details: "Strategic marketing campaigns across social media platforms, influencer partnerships, and community-driven content creation."
  },
  {
    phase: 4,
    icon: LineChart,
    title: "Exchange Listings",
    status: "Upcoming",
    description: "Major exchange partnerships",
    objective: "Improve accessibility and trading volume.",
    details: "Working on partnerships with major cryptocurrency exchanges to list $SOBA, making it more accessible to a wider audience."
  },
  {
    phase: 5,
    icon: Building,
    title: "Platform Development",
    status: "Planned",
    description: "Building utility features",
    objective: "Create practical use cases for $SOBA.",
    details: "Development of staking platform, governance system, and other utility features to enhance the $SOBA ecosystem."
  },
  {
    phase: 6,
    icon: Handshake,
    title: "Strategic Partnerships",
    status: "Planned",
    description: "Ecosystem expansion",
    objective: "Form strategic alliances within the crypto space.",
    details: "Establishing partnerships with other projects and platforms to create synergies and expand the $SOBA ecosystem."
  },
  {
    phase: 7,
    icon: Palette,
    title: "NFT Launch",
    status: "Planned",
    description: "Unique NFT collection",
    objective: "Create exclusive digital assets for the community.",
    details: "Launch of unique NFT collections with utility within the $SOBA ecosystem, providing additional value to holders."
  },
  {
    phase: 8,
    icon: Flame,
    title: "Token Burns",
    status: "Ongoing",
    description: "Regular supply reduction",
    objective: "Create deflationary pressure on token supply.",
    details: "Implementation of regular token burning mechanisms to reduce supply and potentially increase value over time."
  },
  {
    phase: 9,
    icon: Cpu,
    title: "Tech Integration",
    status: "Planned",
    description: "Advanced features",
    objective: "Implement cutting-edge blockchain features.",
    details: "Integration of advanced blockchain features and cross-chain functionality to enhance the technical capabilities of $SOBA."
  },
  {
    phase: 10,
    icon: Gamepad,
    title: "GameFi Elements",
    status: "Planned",
    description: "Gaming integration",
    objective: "Add gaming elements to the ecosystem.",
    details: "Development of gaming features and integration with existing blockchain games to create entertaining use cases for $SOBA."
  },
  {
    phase: 11,
    icon: Vote,
    title: "DAO Governance",
    status: "Planned",
    description: "Community governance",
    objective: "Implement decentralized governance.",
    details: "Launch of DAO governance system allowing token holders to participate in key decisions about the project's future."
  },
  {
    phase: 12,
    icon: TrendingUp,
    title: "Global Expansion",
    status: "Planned",
    description: "Worldwide adoption",
    objective: "Achieve global recognition and adoption.",
    details: "Focus on global expansion through localized marketing, community building, and strategic partnerships in different regions."
  }
];

interface RoadmapCubeProps {
  phase: RoadmapPhase;
  position: [number, number, number];
  onClick: () => void;
}

const RoadmapCube: React.FC<RoadmapCubeProps> = ({ phase, position, onClick }) => {
  const mesh = useRef<Mesh>(null)
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

interface RoadmapSceneProps {
  setSelectedPhase: (phase: RoadmapPhase) => void;
}

const RoadmapScene: React.FC<RoadmapSceneProps> = ({ setSelectedPhase }) => {
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

interface SimplifiedProgressBarProps {
  progress: number;
}

const SimplifiedProgressBar: React.FC<SimplifiedProgressBarProps> = ({ progress }) => {
  const completedPhases = Math.floor((progress / 100) * 12)

  return (
    <div className="relative w-full h-2 bg-gray-700 rounded-full mb-12">
      <motion.div
        className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
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
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [progress, setProgress] = useState(66.67) // 8 out of 12 phases completed

  const handlePhaseClick = (phase: RoadmapPhase) => {
    setSelectedPhase(phase)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="backdrop-blur-md bg-black bg-opacity-50 min-h-screen">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-6 text-center">$SOBA Roadmap</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Embark on an exciting journey with $SOBA as we revolutionize the crypto landscape. Our roadmap outlines our ambitious plans and milestones, showcasing our commitment to innovation and community growth.
          </p>
          
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
                    : 'bg-gray-800'}`}
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
              <Button 
                asChild
                className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white font-bold text-lg px-8 py-4 rounded-full transition-colors duration-300 flex items-center gap-2"
              >
                <Link href="#dex-section">
                  Buy $SOBA Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white text-lg px-8 py-4 rounded-full"
              >
                <Link href={NAV_LINKS.COMMUNITY}>Join Our Community</Link>
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

        {/* Social Links */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <SocialLinks className="gap-6" />
          </div>
        </div>
      </div>
    </div>
  )
}