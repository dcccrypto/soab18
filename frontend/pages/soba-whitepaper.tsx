'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Flame, Users, TrendingUp, Calendar, Download, ExternalLink } from 'lucide-react'
import { jsPDF } from 'jspdf'

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

  interface Section {
    id: string
    title: string
  }

  const sections: Section[] = [
    { id: 'introduction', title: '1. Introduction to $SOBA' },
    { id: 'tokenomics', title: '2. Tokenomics' },
    { id: 'roadmap', title: '3. Roadmap' },
    { id: 'community', title: '4. Community Initiatives' },
    { id: 'team', title: '5. Team' },
    { id: 'vision', title: '6. Vision and Future Plans' },
    { id: 'disclaimer', title: '7. Legal Disclaimer' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-orange-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        $SOBA Whitepaper
      </motion.h1>
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
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-DBqVkxZx-T3IBDgcc0UVW81J7xogS5cUSXwPGrR.png"
            alt="SOBA Logo"
            className="w-48 h-48 mx-auto mb-8"
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
              <li>Total Supply: 1,000,000,000 $SOBA tokens</li>
              <li>Current Circulating Supply: 925,220,331.49 tokens</li>
              <li>Burned Tokens: 74,779,668.51 tokens</li>
              <li>Founder Holdings: 41,080,000 tokens (4.08% held by Crypto Bastard)</li>
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
            {[
              { phase: "Phase 1", title: "Fair Launch", status: "Completed", description: "Successfully launched on Pump.fun and Raydium, establishing $SOBA's presence in the market." },
              { phase: "Phase 2", title: "Community Building", status: "Completed", description: "Engaged community across TikTok, Twitter (X), and Telegram, fostering a strong $SOBA culture." },
              { phase: "Phase 3", title: "Marketing Expansion", status: "Completed", description: "Launched campaigns featuring Crypto Bastard and partnered with key influencers to increase visibility." },
              { phase: "Phase 4", title: "Listings and Growth", status: "Completed", description: "Secured listings on CoinMarketCap and CoinGecko, enhancing credibility and reach." },
              { phase: "Phase 5", title: "Exchange Listings", status: "In Progress", description: "Expanding $SOBA's presence on various cryptocurrency exchanges for wider accessibility." },
              { phase: "Phase 6", title: "Strategic Partnerships", status: "Upcoming", description: "Forming alliances with complementary projects to strengthen the $SOBA ecosystem." },
              { phase: "Phase 7", title: "NFT Launch", status: "Upcoming", description: "Releasing an exclusive $SOBA NFT collection to add value for our community." },
              { phase: "Phase 8", title: "Advanced Features", status: "Planned", description: "Implementing staking, rewards systems, and other engaging utilities for $SOBA holders." },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-orange-400">{item.phase}: {item.title}</p>
                  <p className="text-sm text-orange-300 mb-2">{item.status}</p>
                  <p className="text-gray-300">{item.description}</p>
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
            <TeamMember
              name="Crypto Bastard"
              role="Founder"
              description="Famous TikTok influencer and the visionary behind $SOBA, bringing unparalleled reach and charisma to the project."
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <TeamMember
              name="Pb (DarkCobraCalls)"
              role="Project Manager and Developer"
              description="Oversees project management, team coordination, and leads the development efforts, ensuring the technical success of $SOBA."
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <TeamMember
              name="Dan Margin"
              role="Marketing Lead"
              description="Experienced negotiator with strong connections to numerous crypto influencers, driving $SOBA's promotional efforts."
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <TeamMember
              name="Titus"
              role="Project Lead"
              description="Dynamic leader passionately driving the vision forward, supporting negotiations and strategic decisions."
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <TeamMember
              name="Alex_TNT"
              role="NFT and Graphic Designer"
              description="Responsible for NFT development and graphic design, ensuring high-quality visual standards across the project."
              imageUrl="/placeholder.svg?height=200&width=200"
            />
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

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">For the latest updates and information, visit our official website and social media channels.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://solbastard.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> Website
            </a>
            <a href="https://twitter.com/solbastard" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> Twitter
            </a>
            <a href="https://t.me/solbastard" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}