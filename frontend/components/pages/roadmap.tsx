'use client'

import { useState, useRef, useEffect, useCallback, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ClientOnly } from '@/components/client-only'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Rocket, Users, Megaphone, LineChart, Building, Palette, Flame, Cpu, Gamepad, Vote, Moon, Sun, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ButtonBase } from '@/components/ui/button-base'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'
import type { Group } from 'three'
import type { ThreeEvent } from '@react-three/fiber'

// Dynamically import Three.js components
const DynamicCanvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
})

// Dynamically import Text component
const DynamicText = dynamic(() => 
  import('@react-three/drei').then((mod) => mod.Text), 
  { ssr: false }
)

const DynamicRoadmapScene = dynamic(() => {
  return Promise.all([
    import('@react-three/fiber'),
    import('@react-three/drei'),
    import('three')
  ]).then(([fiber, drei, THREE]) => {
    const RoadmapScene: React.FC<RoadmapSceneProps> = ({ setSelectedPhase }) => {
      const { camera, gl } = fiber.useThree()
    
      useEffect(() => {
        if (camera) {
          camera.position.set(0, 10, 25)
          camera.lookAt(0, 0, 0)
        }
        if (gl) {
          gl.setClearColor('#111111', 1)
        }
      }, [camera, gl])
    
      const calculatePosition = (index: number): [number, number, number] => {
        const spacing = 6
        const totalWidth = (roadmapData.length - 1) * spacing
        const xPos = (index * spacing) - (totalWidth / 2)
        return [xPos, 0, 0]
      }
    
      return (
        <>
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 15, 10]} intensity={2} />
          <pointLight position={[-10, 15, -10]} intensity={2} />
          <spotLight 
            position={[0, 20, 0]} 
            intensity={1.5} 
            angle={0.6}
            penumbra={0.5}
            castShadow
          />
          <hemisphereLight intensity={0.7} groundColor="#ff8f00" />
          
          <drei.OrbitControls 
            enableZoom={true}
            enablePan={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            makeDefault
            maxDistance={40}
            minDistance={15}
            target={[0, 0, 0]}
          />
          
          {roadmapData.map((phase, index) => (
            <RoadmapCube
              key={phase.phase}
              phase={phase}
              position={calculatePosition(index)}
              onClick={() => setSelectedPhase(phase)}
              useFrame={fiber.useFrame}
            />
          ))}
        </>
      )
    }
    return RoadmapScene
  })
}, {
  ssr: false,
})

// Phase Number Text Component
const PhaseNumber: React.FC<{
  number: number;
  position: [number, number, number];
  rotationX: number;
  rotationY: number;
  isCompleted: boolean;
  status: string;
}> = ({ number, position, rotationX, rotationY, isCompleted, status }) => {
  return (
    <Suspense fallback={null}>
      <DynamicText
        position={position}
        fontSize={1.2}
        color={isCompleted ? "#FFFFFF" : "#CCCCCC"}
        anchorX="center"
        anchorY="middle"
        rotation-x={-rotationX}
        rotation-y={-rotationY}
        outlineWidth={0.08}
        outlineColor="#000000"
        characters="0123456789"
        material-toneMapped={false}
        material-fog={false}
      >
        {number}
      </DynamicText>
      <DynamicText
        position={[position[0], position[1] - 1.5, position[2]]}
        fontSize={0.3}
        color={isCompleted ? "#FFFFFF" : "#CCCCCC"}
        anchorX="center"
        anchorY="middle"
        rotation-x={-rotationX}
        rotation-y={-rotationY}
        outlineWidth={0.03}
        outlineColor="#000000"
        material-toneMapped={false}
        material-fog={false}
      >
        {status}
      </DynamicText>
    </Suspense>
  )
}

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
  useFrame: any
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
    title: "Grand Opening",
    status: "Completed",
    description: "Debuted with sophistication on Pump.fun and Raydium",
    objective: "Establish SOBA as the most distinguished memecoin on Solana.",
    details: "Launched with style, giving our distinguished early adopters a chance to join the SOBA society."
  },
  {
    phase: 2,
    icon: Users,
    title: "Elite Society",
    status: "Completed",
    description: "Building our circle of distinguished holders",
    objective: "Cultivate a community of refined crypto enthusiasts.",
    details: "Created an exclusive community of sophisticated meme connoisseurs who appreciate the finer things in life."
  },
  {
    phase: 3,
    icon: Megaphone,
    title: "Brand Elevation",
    status: "Completed",
    description: "Spreading the SOBA lifestyle across platforms",
    objective: "Position SOBA as the premium choice in memecoins.",
    details: "Executed sophisticated marketing campaigns that set us apart from ordinary memecoins."
  },
  {
    phase: 4,
    icon: LineChart,
    title: "Market Recognition",
    status: "Completed",
    description: "Listed on CoinMarketCap and CoinGecko with exclusive rewards",
    objective: "Establish credibility in the broader crypto market.",
    details: "Achieved listings on major platforms while maintaining our premium status through strategic holder rewards."
  },
  {
    phase: 5,
    icon: Building,
    title: "Exchange Dominance",
    status: "Completed",
    description: "Expanding SOBA's presence across premium exchanges",
    objective: "Make SOBA accessible to sophisticated traders worldwide.",
    details: "Like a cigar-smoking chimp taking over the finest establishments, SOBA has claimed its place on prestigious trading platforms."
  },
  {
    phase: 6,
    icon: Users,
    title: "Power Moves",
    status: "Completed",
    description: "High-profile partnerships and collaborations",
    objective: "Build alliances with fellow crypto aristocrats.",
    details: "Formed strategic partnerships that would make any cigar lounge proud, establishing SOBA as a force to be reckoned with."
  },
  {
    phase: 7,
    icon: Palette,
    title: "Digital Luxuries",
    status: "Completed",
    description: "Launch of exclusive SOBA NFT collection",
    objective: "Create digital assets worthy of our distinguished chimp.",
    details: "Released a collection of NFTs that capture SOBA's essence - sophisticated, bold, and unapologetically badass."
  },
  {
    phase: 8,
    icon: Flame,
    title: "Smoke & Style",
    status: "Completed",
    description: "Implementation of regular token burns",
    objective: "Enhance SOBA's value through calculated scarcity.",
    details: "Established our signature burn mechanism - where tokens disappear like smoke from a premium cigar, making SOBA increasingly exclusive."
  },
  {
    phase: 9,
    icon: Cpu,
    title: "Premium Features",
    status: "Upcoming",
    description: "Exclusive NFT staking and VIP content access",
    objective: "Enhance the SOBA ecosystem with distinguished features.",
    details: "Development of sophisticated features including NFT staking, AI-driven PFP Generator, and exclusive gated content for our distinguished holders."
  },
  {
    phase: 10,
    icon: Gamepad,
    title: "Elite Engagement",
    status: "Upcoming",
    description: "Sophisticated social features and rewards",
    objective: "Create an engaging experience worthy of our refined community.",
    details: "Implementation of exclusive leaderboards, achievement systems, and sophisticated social sharing features for our distinguished members."
  },
  {
    phase: 11,
    icon: Vote,
    title: "Gentleman's DAO",
    status: "Upcoming",
    description: "Refined governance system",
    objective: "Establish sophisticated community governance.",
    details: "Transition to a distinguished DAO structure, enabling our refined community to participate in governance decisions."
  },
  {
    phase: 12,
    icon: Rocket,
    title: "Global Sophistication",
    status: "Upcoming",
    description: "Strategic expansion and mainstream elegance",
    objective: "Elevate SOBA to new heights of recognition.",
    details: "Strategic expansion through sophisticated partnerships and refined cross-platform engagement to establish SOBA in mainstream consciousness."
  }
]

const RoadmapCube: React.FC<RoadmapCubeProps> = ({ phase, position, onClick, useFrame }) => {
  const groupRef = useRef<Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hover, setHover] = useState(false)
  const [localPosition, setLocalPosition] = useState<[number, number, number]>(position)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)

  useFrame((state: any) => {
    if (groupRef.current && !isDragging) {
      const time = state.clock.getElapsedTime()
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.15
      
      if (hover) {
        groupRef.current.rotation.y += 0.02
        groupRef.current.scale.setScalar(1.15)
      } else {
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
      <mesh 
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial 
          color={phase.status === 'Completed' ? '#FFA500' : '#4A4A4A'} 
          roughness={0.2}
          metalness={0.8}
          opacity={hover ? 0.95 : 1}
          transparent
          emissive={phase.status === 'Completed' ? '#FFA500' : '#4A4A4A'}
          emissiveIntensity={hover ? 1 : 0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          reflectivity={1}
        />
      </mesh>
      <PhaseNumber
        number={phase.phase}
        position={[0, 0, 1.6]}
        rotationX={rotationX}
        rotationY={rotationY}
        isCompleted={phase.status === 'Completed'}
        status={phase.status}
      />
    </group>
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

// Mobile Card Component
const PhaseCard: React.FC<{ phase: RoadmapPhase; onClick: () => void }> = ({ phase, onClick }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300
        ${phase.status === 'Completed' 
          ? 'bg-gradient-to-br from-orange-600/90 to-red-700/90' 
          : 'bg-black/40 hover:bg-black/50'}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-full ${phase.status === 'Completed' ? 'bg-orange-500' : 'bg-gray-700'}`}>
          <phase.icon className={`w-6 h-6 ${phase.status === 'Completed' ? 'text-white' : 'text-orange-500'}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{phase.title}</h3>
          <p className={`text-sm ${phase.status === 'Completed' ? 'text-orange-200' : 'text-orange-400'}`}>
            Phase {phase.phase}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className={`text-sm font-semibold ${phase.status === 'Completed' ? 'text-orange-200' : 'text-orange-400'}`}>
          {phase.status}
        </p>
        <p className="text-gray-300">{phase.description}</p>
      </div>
    </motion.div>
  )
}

export default function Roadmap() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [progress, setProgress] = useState(66.67) // 8 out of 12 phases completed (8/12 * 100)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const [isMobile, setIsMobile] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePhaseClick = (phase: RoadmapPhase) => {
    setSelectedPhase(phase)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen gradient-dark text-white">
      <main className="min-h-screen bg-transparent">
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
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent z-0" />
            
            {/* Roadmap Content */}
            <div className="container mx-auto px-4 py-12 relative z-10">
              {/* Simplified Progress Bar */}
              <SimplifiedProgressBar progress={progress} />

              {isMobile ? (
                <div className="space-y-4 px-4">
                  <motion.div 
                    className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {roadmapData.map((phase) => (
                      <PhaseCard
                        key={phase.phase}
                        phase={phase}
                        onClick={() => handlePhaseClick(phase)}
                      />
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="h-[800px] w-full mb-12 overflow-hidden card-base relative bg-gradient-to-b from-transparent to-black/20">
                  <ClientOnly>
                    <DynamicCanvas
                      camera={{ position: [0, 10, 25], fov: 60 }}
                      shadows
                      dpr={[1, 2]}
                    >
                      <Suspense fallback={null}>
                        <DynamicRoadmapScene setSelectedPhase={handlePhaseClick} />
                      </Suspense>
                    </DynamicCanvas>
                  </ClientOnly>
                </div>
              )}

              {/* CTA Section */}
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Ready to Join the $SOBA Revolution?</h2>
                <p className="text-xl mb-8 text-gray-400">Don't miss out on the opportunity to be part of something extraordinary. Join our community today!</p>
                <div className="flex justify-center gap-4">
                  <ButtonBase
                    size="lg"
                    className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white"
                    onClick={() => window.open("https://jup.ag/swap/soba-SOL", "_blank")}
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

