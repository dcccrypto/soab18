'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Flame, Users, TrendingUp, Calendar, Download, ExternalLink } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { Button } from "@/components/ui/button"
import { TOKEN_INFO, TEAM_MEMBERS, ROADMAP_PHASES, ASSETS, ICON_SIZES } from '@/constants'
import { ButtonBase } from '@/components/ui/button-base'
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection'
import { fadeInUpVariant } from '@/lib/animations'
import html2canvas from 'html2canvas'
import { useTokenStats } from '@/hooks/useTokenStats'
import fetcher from '@/lib/fetcher'
import { type MetricItems, MetricItem } from '@/types'
import { type RoadmapPhase } from '@/types'

const PDF_STYLES = {
  COLORS: {
    PRIMARY: '#FF6B00',
    TEXT: '#404040',
    SECONDARY: '#808080'
  },
  FONTS: {
    TITLE: 24,
    HEADING: 16,
    BODY: 12,
    FOOTER: 10
  },
  SPACING: {
    MARGIN: 40,
    LINE_HEIGHT: 18,
    PARAGRAPH_GAP: 10,
    SECTION_GAP: 20
  }
} as const

const WhitepaperSection = ({ title, children, id }: { title: string, children: React.ReactNode, id: string }) => (
  <section id={id} className="py-16">
    <h2 className="text-3xl font-bold mb-8 text-orange-400">{title}</h2>
    <div className="space-y-6">
      {children}
    </div>
  </section>
)

const TeamMember = ({ name, role, description, imageUrl }: { name: string; role: string; description: string; imageUrl: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 shadow-[0_4px_16px_rgba(255,165,0,0.1)] hover:shadow-[0_4px_16px_rgba(255,165,0,0.15)]"
  >
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 rounded-full" />
        <Image 
          src={imageUrl} 
          alt={name} 
          width={64} 
          height={64} 
          className="rounded-full object-cover relative z-10"
          unoptimized
        />
      </div>
      <div>
        <h3 className="font-bold text-[#FF6B00]">{name}</h3>
        <p className="text-white/90 text-sm">{role}</p>
        <p className="text-white/80 text-sm mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
)

export default function WhitePaper() {
  const [activeSection, setActiveSection] = useState('introduction')
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { data: tokenStats } = useTokenStats()

  const handleDownload = async () => {
    setIsGeneratingPDF(true)
    try {
      // Create new jsPDF instance - using A4 format
      const doc = new jsPDF('p', 'pt', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = PDF_STYLES.SPACING.MARGIN
      
      // Title page
      doc.setFontSize(PDF_STYLES.FONTS.TITLE)
      doc.setTextColor(255, 107, 0) // Orange color
      doc.text('$SOBA Whitepaper', margin, 80, { align: 'left' })
      
      doc.setFontSize(14)
      doc.setTextColor(128, 128, 128) // Gray color
      doc.text('The Memecoin with a Mission', margin, 120)
      
      // Add sections
      let y = 180 // Starting y position after title
      
      // Process each section
      for (const section of sections) {
        // Add section title
        doc.setFontSize(PDF_STYLES.FONTS.HEADING)
        doc.setTextColor(255, 107, 0)
        if (y > 750) { // Check if we need a new page
          doc.addPage()
          y = 60
        }
        doc.text(section.title, margin, y)
        y += 30

        // Get section content
        const sectionElement = document.getElementById(section.id)
        if (sectionElement) {
          // Get all paragraphs in the section
          const paragraphs = sectionElement.getElementsByTagName('p')
          
          doc.setFontSize(PDF_STYLES.FONTS.BODY)
          doc.setTextColor(64, 64, 64)
          
          for (const p of Array.from(paragraphs)) {
            // Split text into lines that fit the page width
            const lines = doc.splitTextToSize(
              p.textContent || '', 
              pageWidth - (margin * 2)
            ) as string[]
            
            // Check if we need a new page
            if (y + (lines.length * PDF_STYLES.SPACING.LINE_HEIGHT) > 780) {
              doc.addPage()
              y = 60
            }
            
            // Add lines to PDF
            lines.forEach((line: string) => {
              doc.text(line, margin, y)
              y += PDF_STYLES.SPACING.LINE_HEIGHT
            })
            
            y += PDF_STYLES.SPACING.PARAGRAPH_GAP // Space between paragraphs
          }
        }
        
        y += PDF_STYLES.SPACING.SECTION_GAP // Space between sections
      }
      
      // Add footer
      doc.setFontSize(PDF_STYLES.FONTS.FOOTER)
      doc.setTextColor(128, 128, 128)
      const pageCount = (doc as any).internal.pages.length - 1
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text(
          `Page ${i} of ${pageCount}`, 
          pageWidth / 2, 
          doc.internal.pageSize.getHeight() - 20, 
          { align: 'center' }
        )
      }
      
      // Save the PDF
      doc.save('soba-whitepaper.pdf')
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback to simple PDF
      const doc = new jsPDF()
      doc.setFontSize(16)
      doc.text('$SOBA Whitepaper', 20, 20)
      doc.setFontSize(12)
      doc.text('Error generating full whitepaper PDF.', 20, 30)
      doc.text('Please visit our website to view the complete whitepaper.', 20, 40)
      doc.save('soba-whitepaper.pdf')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const sections = [
    { id: 'introduction', title: 'Introduction to $SOBA' },
    { id: 'tokenomics', title: 'Tokenomics' },
    { id: 'roadmap', title: 'Roadmap' },
    { id: 'community', title: 'Community Initiatives' },
    { id: 'team', title: 'Team' },
    { id: 'vision', title: 'Vision and Future Plans' },
    { id: 'disclaimer', title: 'Legal Disclaimer' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen">
        <div className="relative">
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
                    disabled={isGeneratingPDF}
                    className="group relative overflow-hidden"
                  >
                    <span className="flex items-center gap-2">
                      {isGeneratingPDF ? (
                        <>
                          <span className="animate-spin">⚪</span>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                      <Download className="w-5 h-5" />
                      Download Full Whitepaper (PDF)
                        </>
                      )}
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
                  <ol className="list-decimal list-inside space-y-3">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`hover:text-[#FF6B00] transition-colors duration-300 ${
                            activeSection === section.id ? 'text-[#FF6B00] font-bold' : 'text-white/90'
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
              <WhitepaperSection title="1. Introduction to SOBA" id="introduction">
                <div className="space-y-6">
                  <p className="text-white/90 leading-relaxed">
                    Welcome to SOBA (SOL Bastard) - where luxury meets memes! Like our cigar-smoking chimp mascot, we believe in living large while keeping it real. We're building something special that combines the flash of success with real community value.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div>
                      <h3 className="text-xl font-bold mb-3 text-[#FF6B00]">The SOBA Way</h3>
                      <p className="text-white/90 leading-relaxed">
                        To create the most sophisticated yet entertaining crypto community. We're here to show that making money can be both classy and fun!
                      </p>
                    </motion.div>
                    <motion.div>
                      <h3 className="text-xl font-bold mb-3 text-[#FF6B00]">The Grand Plan</h3>
                      <p className="text-white/90 leading-relaxed">
                        To the penthouse suite! We're building premium features, growing our high-class community, and enjoying the finer things in crypto.
                      </p>
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
                <div className="space-y-8">
                  <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-[#FF6B00]">How $SOBA Works</h3>
                    <ul className="list-disc list-inside space-y-3 text-white/90">
                      <li>Total Supply: <span className="text-white">1 Billion $SOBA (and shrinking!)</span></li>
                      <li>Tokens in Circulation: <span className="text-white">{tokenStats?.circulatingSupply || 0} tokens</span></li>
                      <li>Tokens Burned: <span className="text-white">{TOKEN_INFO.BURNED_TOKENS} tokens (gone forever!)</span></li>
                      <li>Team Holdings: <span className="text-white">{tokenStats?.founderBalance || 0} tokens</span></li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Fair Launch</h3>
                    <p className="text-white/90 leading-relaxed">
                      $SOBA was launched on Pump.fun, ensuring equal opportunity for all investors. This approach aligns with our commitment to fairness and community empowerment.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Liquidity Security</h3>
                    <p className="text-white/90 leading-relaxed">
                      All liquidity is permanently burned, enhancing stability and fostering community trust. This measure prevents rug pulls and ensures the long-term viability of $SOBA.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Deflationary Model</h3>
                    <p className="text-white/90 leading-relaxed">
                      $SOBA implements a deflationary model through regular token burns. This mechanism is designed to increase scarcity and potentially enhance the value of $SOBA over time.
                    </p>
                  </div>
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
                  {ROADMAP_PHASES.map((phase: RoadmapPhase, index: number) => (
                    <div 
                      key={phase.phase}
                      className="flex items-start space-x-4 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 shadow-[0_4px_16px_rgba(255,165,0,0.1)] hover:shadow-[0_4px_16px_rgba(255,165,0,0.15)]"
                    >
                      <Calendar className="w-6 h-6 text-[#FF6B00] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-[#FF6B00]">{phase.phase}: {phase.title}</p>
                        <p className="text-sm text-white/90 mb-2">{phase.status}</p>
                        <p className="text-white/90 leading-relaxed">{phase.description}</p>
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
                <div className="space-y-8">
                  <p className="text-white/90 leading-relaxed">
                  The $SOBA community is the lifeblood of our project. We're committed to fostering a vibrant, engaged, and rewarding environment for all our members.
                </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Social Media Engagement</h3>
                      <p className="text-white/90 leading-relaxed">
                      We maintain an active presence on TikTok, Twitter (X), and Telegram, providing real-time updates, hosting AMAs, and encouraging community interaction.
                    </p>
                  </div>
                    <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Meme Contests</h3>
                      <p className="text-white/90 leading-relaxed">
                        Show off your meme-making skills! The best memes win $SOBA tokens, and you get eternal glory in our hall of fame.
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Giving Back</h3>
                      <p className="text-white/90 leading-relaxed">
                        We set aside some funds for good causes. The community picks where it goes - because doing good should be part of the fun!
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Have Your Say</h3>
                      <p className="text-white/90 leading-relaxed">
                        Hold $SOBA, get a voice! Help shape our future through community votes. Your token, your voice!
                      </p>
                    </div>
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
                <div className="space-y-8">
                  <p className="text-white/90 leading-relaxed">
                    $SOBA isn't your average memecoin - we're a cigar-smoking chimp bastard building an empire. Led by the notorious SOL Bastard, we're creating an ecosystem where only the most alpha traders thrive. No weak hands in our cigar lounge.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Alpha NFTs</h3>
                      <p className="text-white/90 leading-relaxed">
                        Exclusive NFT collections that separate the alphas from the betas. Only diamond-handed holders get access to our premium benefits.
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-[#FF6B00]">Sigma DeFi</h3>
                      <p className="text-white/90 leading-relaxed">
                        Building the most alpha yield farming and staking platform. While others chase memes, we're building generational wealth.
                      </p>
                    </div>
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
                <div className="space-y-4 p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20">
                  <p className="text-white/90 leading-relaxed">
                    This whitepaper is for informational purposes only and does not constitute financial advice. $SOBA tokens are not securities and do not represent ownership in any company.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    Cryptocurrency investments carry high risk, and you should consult with a financial advisor before making any investment decisions.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    The $SOBA team is not responsible for any losses incurred from trading or holding $SOBA tokens. By participating in the $SOBA ecosystem, you acknowledge that you have read, understood, and agree to abide by all terms and conditions set forth by the project.
                  </p>
                </div>
              </WhitepaperSection>
            </div>
          </ScrollAnimatedSection>
        </div>
      </main>

      <div className="h-32 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 transition-all duration-700" />
    </div>
  )
}

