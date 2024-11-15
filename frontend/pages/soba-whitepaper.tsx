'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Flame, Users, TrendingUp, Calendar, Download, ExternalLink } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { Button } from "@/components/ui/button"
import { TOKEN_INFO, TEAM_MEMBERS, ROADMAP_PHASES, ASSETS, ICON_SIZES } from '../constants'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ButtonBase } from '@/components/ui/button-base'
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { fadeInUpVariant } from '@/lib/animations'

const WhitepaperSection = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-base p-6 md:p-8 lg:p-10 relative z-10 bg-black/50 rounded-lg shadow-lg scroll-mt-20 border border-orange-500/20"
    >
      <h2 className="text-3xl font-bold mb-6 gradient-text border-b border-orange-500/20 pb-2">{title}</h2>
      {children}
    </motion.div>
  )
}

const TeamMember = ({ name, role, description, imageUrl }: { name: string; role: string; description: string; imageUrl: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="card-base p-6 flex items-center space-x-4 bg-black/40 border border-orange-500/20 hover:border-orange-500/40 transition-colors duration-300"
  >
    <Image 
      src={imageUrl} 
      alt={name} 
      width={64} 
      height={64} 
      className="rounded-full object-cover"
      unoptimized
    />
    <div>
      <h3 className="font-bold text-orange-400">{name}</h3>
      <p className="text-orange-300/90">{role}</p>
      <p className="text-sm text-orange-300/70">{description}</p>
    </div>
  </motion.div>
)

export default function WhitePaper() {
  const [activeSection, setActiveSection] = useState('introduction')
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const handleDownload = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('$SOBA Whitepaper', 20, 20)
    doc.setFontSize(12)
    doc.text('This is a sample PDF of the $SOBA Whitepaper.', 20, 30)
    doc.text('For the full content, please visit our website.', 20, 40)
    doc.save('soba-whitepaper.pdf')
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const sections = [
    { id: 'introduction', title: '1. Introduction to $SOBA' },
    { id: 'tokenomics', title: '2. Tokenomics' },
    { id: 'roadmap', title: '3. Roadmap' },
    { id: 'community', title: '4. Community Initiatives' },
    { id: 'team', title: '5. Team' },
    { id: 'vision', title: '6. Vision and Future Plans' },
    { id: 'disclaimer', title: '7. Legal Disclaimer' },
  ]

  return (
    <div className="min-h-screen gradient-dark text-white">
      <Header />
      
      <main>
        <section className="min-h-[70vh] pt-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] z-0" />
          <motion.div 
            className="absolute inset-0 z-[1]"
            style={{ y: heroY }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/whitepaperbg.png"
                alt="Whitepaper background"
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
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text drop-shadow-2xl leading-tight">
                $SOBA Whitepaper
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
                The Memecoin with a Mission
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8">
                <ButtonBase
                  onClick={handleDownload}
                  variant="default"
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Full Whitepaper (PDF)
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </ButtonBase>
              </div>
            </motion.div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="Table of Contents" id="toc">
              <nav>
                <ol className="list-decimal list-inside space-y-3 text-orange-300">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`hover:text-orange-500 transition-colors ${
                          activeSection === section.id ? 'text-orange-500 font-bold' : ''
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Introduction */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="1. Introduction to $SOBA" id="introduction">
              <div className="space-y-6 text-orange-300">
                <p>
                  $SOBA represents a new era in memecoins, combining the fun and engagement of meme culture with real utility and community value. Born on the Solana blockchain, $SOBA aims to revolutionize how we think about community-driven cryptocurrencies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-black/30 rounded-lg border border-orange-500/20"
                  >
                    <h3 className="text-xl font-bold mb-2 text-orange-400">Our Mission</h3>
                    <p>To create a vibrant, engaged community that benefits from both the entertainment value of memecoins and the practical utility of DeFi.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-black/30 rounded-lg border border-orange-500/20"
                  >
                    <h3 className="text-xl font-bold mb-2 text-orange-400">Our Vision</h3>
                    <p>To become the leading community-driven memecoin on Solana, setting new standards for transparency and community engagement.</p>
                  </motion.div>
                </div>
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Tokenomics */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="2. Tokenomics" id="tokenomics">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-orange-400">Token Distribution</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Total Supply: {TOKEN_INFO.TOTAL_SUPPLY} $SOBA tokens</li>
                  <li>Current Circulating Supply: {TOKEN_INFO.CIRCULATING_SUPPLY} tokens</li>
                  <li>Burned Tokens: {TOKEN_INFO.BURNED_TOKENS} tokens</li>
                  <li>Founder Holdings: {TOKEN_INFO.FOUNDER_HOLDINGS} tokens (4.08% held by Crypto Bastard)</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-orange-400">Fair Launch</h3>
                <p className="text-gray-300">
                  $SOBA was launched on Pump.fun, ensuring equal opportunity for all investors. This approach aligns with our commitment to fairness and community empowerment.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-orange-400">Liquidity Security</h3>
                <p className="text-gray-300">
                  All liquidity is permanently burned, enhancing stability and fostering community trust. This measure prevents rug pulls and ensures the long-term viability of $SOBA.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-400">Deflationary Model</h3>
                <p className="text-gray-300">
                  $SOBA implements a deflationary model through regular token burns. This mechanism is designed to increase scarcity and potentially enhance the value of $SOBA over time.
                </p>
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Roadmap */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="3. Roadmap" id="roadmap">
              <div className="space-y-6">
                {ROADMAP_PHASES.map((phase, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg">
                    <Calendar className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-orange-400">{phase.phase}: {phase.title}</p>
                      <p className="text-sm text-orange-300 mb-2">{phase.status}</p>
                      <p className="text-gray-300">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Community Initiatives */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="4. Community Initiatives" id="community">
              <p className="mb-6 text-gray-300">
                The $SOBA community is the lifeblood of our project. We're committed to fostering a vibrant, engaged, and rewarding environment for all our members.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Social Media Engagement</h3>
                  <p className="text-gray-300">
                    We maintain an active presence on TikTok, Twitter (X), and Telegram, providing real-time updates, hosting AMAs, and encouraging community interaction.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Meme Contests</h3>
                  <p className="text-gray-300">
                    Regular meme contests showcase our community's creativity and humor, with $SOBA tokens awarded to the best entries.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Charitable Initiatives</h3>
                  <p className="text-gray-300">
                    A portion of $SOBA funds is allocated to community-chosen charitable causes, amplifying our positive impact beyond the crypto sphere.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Governance Participation</h3>
                  <p className="text-gray-300">
                    $SOBA holders have a voice in key project decisions through our governance system, ensuring the community shapes the future of $SOBA.
                  </p>
                </div>
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Team */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="5. Team" id="team">
              <div className="space-y-6">
                {TEAM_MEMBERS.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    imageUrl={member.imageUrl}
                  />
                ))}
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Vision and Future Plans */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="6. Vision and Future Plans" id="vision">
              <p className="mb-6 text-gray-300">
                $SOBA aims to redefine the memecoin landscape by combining humor with real utility and community value. Our vision extends beyond just being a token; we're building an ecosystem that rewards creativity, engagement, and loyalty.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2  text-orange-400">NFT Integration</h3>
                  <p className="text-gray-300">Launching unique NFT collections that offer exclusive benefits to $SOBA holders.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-orange-400">DeFi Features</h3>
                  <p className="text-gray-300">Developing staking and yield farming opportunities to provide additional value to our community.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-orange-400">Cross-Chain Expansion</h3>
                  <p className="text-gray-300">Exploring opportunities to expand $SOBA's presence across multiple blockchain networks.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-orange-400">Real-World Partnerships</h3>
                  <p className="text-gray-300">Forging alliances with businesses to increase $SOBA's utility in everyday transactions.</p>
                </div>
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>

        {/* Legal Disclaimer */}
        <ScrollAnimatedSection>
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
            <WhitepaperSection title="7. Legal Disclaimer" id="disclaimer">
              <div className="space-y-4 text-orange-300/80">
                <p>
                  This whitepaper is for informational purposes only and does not constitute financial advice. $SOBA tokens are not securities and do not represent ownership in any company.
                </p>
                <p>
                  Cryptocurrency investments carry high risk, and you should consult with a financial advisor before making any investment decisions.
                </p>
                <p>
                  The $SOBA team is not responsible for any losses incurred from trading or holding $SOBA tokens. By participating in the $SOBA ecosystem, you acknowledge that you have read, understood, and agree to abide by all terms and conditions set forth by the project.
                </p>
              </div>
            </WhitepaperSection>
          </div>
        </ScrollAnimatedSection>
      </main>

      <div className="h-32 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 transition-all duration-700" />
    </div>
  )
}