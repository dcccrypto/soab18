import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, NAV_LINKS, ICON_SIZES } from '@/constants'
import { ButtonBase } from './ui/button-base'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-900 via-black to-black py-12 border-t border-orange-500/10 transition-all duration-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Image
                src="/images/assets/icons/logo.svg"
                alt="SOBA Logo"
                width={32}
                height={32}
                className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                priority
              />
              <h3 className="text-xl font-bold gradient-text">$SOBA</h3>
            </Link>
            <p className="text-gray-400/90 text-sm leading-relaxed max-w-xs">
              The most innovative memecoin on Solana, building a vibrant community and revolutionary features.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 gradient-text">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: NAV_LINKS.TOKENOMICS, text: 'Tokenomics' },
                { href: NAV_LINKS.BURNS, text: 'Token Burns' },
                { href: NAV_LINKS.COMMUNITY, text: 'Community' }
              ].map((link) => (
                <li key={link.text}>
                  <ButtonBase 
                    variant="ghost"
                    size="sm"
                    className="w-full text-left justify-start hover:bg-orange-500/10 text-gray-400/90 hover:text-orange-400 transition-all duration-300"
                    onClick={() => window.location.href = link.href}
                  >
                    {link.text}
                  </ButtonBase>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 gradient-text">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: NAV_LINKS.WHITEPAPER, text: 'Whitepaper' },
                { href: NAV_LINKS.ROADMAP, text: 'Roadmap' },
                { href: '#faq', text: 'FAQ' }
              ].map((link) => (
                <li key={link.text}>
                  <ButtonBase 
                    variant="ghost"
                    size="sm"
                    className="w-full text-left justify-start hover:bg-orange-500/10 text-gray-400/90 hover:text-orange-400 transition-all duration-300"
                    onClick={() => window.location.href = link.href}
                  >
                    {link.text}
                  </ButtonBase>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 gradient-text">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {Object.values(SOCIAL_LINKS).map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-full bg-black hover:bg-neutral-900/80 transition-all duration-300 shadow-lg shadow-black/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <Image 
                    src={social.icon}
                    alt={`${social.name} icon`}
                    width={ICON_SIZES.SOCIAL.width}
                    height={ICON_SIZES.SOCIAL.height}
                    className="w-10 h-10 transition-transform group-hover:scale-105"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/5 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-orange-500/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Sol Bastard. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/privacy-policy" 
                className="text-sm text-gray-500 hover:text-orange-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-500 hover:text-orange-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.03)_0%,transparent_70%)] pointer-events-none" />
    </footer>
  )
}
