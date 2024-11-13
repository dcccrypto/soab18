'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flame, Users, TrendingUp, Calendar, Download, ExternalLink } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { TOKEN_INFO, TEAM_MEMBERS, ROADMAP_PHASES, ASSETS, ICON_SIZES } from '../constants'

const WhitepaperSection = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 bg-gray-800 rounded-lg p-6 shadow-lg scroll-mt-20"
    >
      <h2 className="text-3xl font-bold mb-6 text-orange-500 border-b border-orange-500 pb-2">{title}</h2>
      {children}
    </motion.div>
  )
}

const TeamMember = ({ name, role, description, imageUrl }: { name: string; role: string; description: string; imageUrl: string }) => (
  <div className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
    <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full object-cover" />
    <div>
      <p className="font-bold text-orange-400">{name}</p>
      <p className="text-orange-300">{role}</p>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </div>
)

export default function WhitePaper() {
  const [activeSection, setActiveSection] = useState('introduction')

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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Cover Page */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 text-orange-500">$SOBA Whitepaper</h1>
          <p className="text-2xl mb-8 text-orange-300">The Memecoin with a Mission</p>
          <Image
            src={ASSETS.LOGO}
            alt="SOBA Logo"
            width={ASSETS.LOGO_DIMENSIONS.width}
            height={ASSETS.LOGO_DIMENSIONS.height}
            className="mx-auto mb-8"
          />
          <button
            onClick={handleDownload}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Download Full Whitepaper PDF"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Full Whitepaper (PDF)
          </button>
        </motion.div>

        {/* Table of Contents */}
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

        {/* Introduction */}
        <WhitepaperSection title="1. Introduction to $SOBA" id="introduction">
          <p className="mb-4 text-gray-300">
            Sol Bastard ($SOBA) is a revolutionary MEMEcoin inspired by Crypto Bastard, a renowned TikTok Influencer celebrated for his entertaining and insightful crypto content. While $SOBA embodies the playful spirit of Crypto Bastard, it's backed by a dedicated team committed to creating real value in the crypto space.
          </p>
          <p className="mb-6 text-gray-300">
            Our mission is to forge a vibrant, inclusive community where humor and shared purpose converge, bringing tangible benefits to all members. $SOBA isn't just another token; it's a movement that combines the best of meme culture with serious crypto innovation.
          </p>
          <div className="flex items-center justify-center space-x-8 my-8">
            <div className="text-center">
              <Flame className="w-16 h-16 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-orange-300">Community-Driven</p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-orange-300">Fair Launch</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-orange-300">Innovative Features</p>
            </div>
          </div>
        </WhitepaperSection>

        {/* Tokenomics */}
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

        {/* Roadmap */}
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

        {/* Community Initiatives */}
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

        {/* Team */}
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

        {/* Vision and Future Plans */}
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

        {/* Legal Disclaimer */}
        <WhitepaperSection title="7. Legal Disclaimer" id="disclaimer">
          <p className="text-sm text-gray-400 mb-4">
            This whitepaper is for informational purposes only and does not constitute financial advice. $SOBA tokens are not securities and do not represent ownership in any company. Cryptocurrency investments carry high risk, and you should consult with a financial advisor before making any investment decisions.
          </p>
          <p className="text-sm text-gray-400  mb-4">
            The $SOBA team is not responsible for any losses incurred from trading or holding $SOBA tokens. By participating in the $SOBA ecosystem, you acknowledge that you have read, understood, and agree to abide by all terms and conditions set forth by the project.
          </p>
          <p className="text-sm text-gray-400">
            This document may be updated or altered without notice. It is the responsibility of the reader to ensure they are referring to the most current version of the whitepaper.
          </p>
        </WhitepaperSection>
      </div>
    </div>
  )
}